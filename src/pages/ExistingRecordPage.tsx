import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar';
import PrintableForm from '../components/PrintableForm';
import type { SubmittedRecord } from '../types';

export default function ExistingRecordPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const record = location.state?.record as SubmittedRecord;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Debug logging
    useEffect(() => {
        console.log('ExistingRecordPage - location.state:', location.state);
        console.log('ExistingRecordPage - record:', record);
        console.log('ExistingRecordPage - additionalUrls:', record?.additionalUrls);
        console.log('ExistingRecordPage - first picture URL:', record?.additionalUrls?.[0]);
    }, [location.state, record]);

    if (!record) {
        console.error('No record data found in location.state');
        navigate('/');
        return null;
    }

    const isNew = record.admissionType === 'نیا داخلہ';
    
    // Get current date in DD-MM-YYYY format
    const getCurrentDate = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        const printableContent = document.querySelector('.printable-form') as HTMLElement;
        if (!printableContent) {
            alert('فارم نہیں ملا۔ براہ کرم دوبارہ کوشش کریں۔');
            return;
        }

        try {
            // Temporarily show the element for rendering
            const originalDisplay = printableContent.style.display;
            printableContent.style.display = 'block';
            printableContent.style.position = 'absolute';
            printableContent.style.left = '-9999px';
            printableContent.style.top = '0';
            printableContent.style.width = '210mm'; // A4 width

            // Get all print pages
            const pages = printableContent.querySelectorAll('.print-page');
            
            // Create PDF with A4 dimensions
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Process each page
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i] as HTMLElement;
                
                // Capture the page as canvas
                const canvas = await html2canvas(page, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    windowWidth: 794, // A4 width in pixels at 96 DPI
                    windowHeight: 1123 // A4 height in pixels at 96 DPI
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Add new page if not the first page
                if (i > 0) {
                    pdf.addPage();
                }

                // Add image to PDF
                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            }

            // Restore original display
            printableContent.style.display = originalDisplay;
            printableContent.style.position = '';
            printableContent.style.left = '';
            printableContent.style.top = '';
            printableContent.style.width = '';

            // Save the PDF
            const filename = `داخلہ_فارم_${record.studentName}_${getCurrentDate()}.pdf`;
            pdf.save(filename);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('PDF بنانے میں خرابی آئی ہے۔ براہ کرم دوبارہ کوشش کریں۔');
        }
    };

    return (
        <>
            <Navbar />
            
            {/* Printable Form - Hidden on screen, visible on print */}
            <PrintableForm record={record} />
            
            <div className="App">
                <div className="form-content" style={{ marginTop: '170px' }}>
                    {/* Alert Message */}
                    <div style={{ 
                        background: '#fff3cd', 
                        border: '2px solid #ffc107',
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        <p className="description" style={{ fontSize: '28px', color: '#856404' }}>
                            اس شناختی کارڈ نمبر سے فارم پہلے سے جمع ہو چکا ہے
                        </p>
                    </div>

                    {/* Form Display */}
                    <div className="existing-record-form">
                        {/* Header Section */}
                        <div className="existing-record-header">
                            <div className="existing-record-logo">
                                <img src="/1.png" alt="Logo" />
                            </div>
                            
                            <div className="existing-record-title">
                                <p className="bismillah-text">بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِیْمِ</p>
                                <h1 className="form-title-text">درخواست داخلہ</h1>
                            </div>

                            <div className="existing-record-meta">
                                {/* Profile Picture */}
                                <div style={{ 
                                    width: '90px', 
                                    height: '110px', 
                                    border: '2px solid #000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    backgroundColor: '#f5f5f5',
                                    marginBottom: '8px'
                                }}>
                                    {record.additionalUrls && record.additionalUrls.length > 0 ? (
                                        <img 
                                            key={record.additionalUrls[0]} 
                                            src={record.additionalUrls[0]} 
                                            alt="Profile" 
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover' 
                                            }}
                                            onLoad={() => console.log('Image loaded:', record.additionalUrls[0])}
                                            onError={(e) => console.error('Image load error:', e, record.additionalUrls[0])}
                                        />
                                    ) : (
                                        <div style={{ 
                                            textAlign: 'center', 
                                            color: '#999',
                                            fontSize: '14px',
                                            fontWeight: 600
                                        }}>
                                            تصویر
                                        </div>
                                    )}
                                </div>
                                
                                <div className="meta-item">
                                    <span className="meta-label">رول نمبر : </span>
                                    <span className="meta-value">
                                        {!isNew && record.registrationNo ? record.registrationNo : (record.id ? String(record.id) : '---')}
                                    </span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">تاریخ : </span>
                                    <span className="meta-value">{getCurrentDate()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Purple Banner */}
                        <div className="existing-record-banner">
                            جامعہ رضویہ ضیاء العلوم کے ناظم اعلیٰ محترم کی خدمت میں درد مندانہ گزارش ہے کہ
                        </div>

                        {/* Main Heading */}
                        <div className="existing-record-greeting">
                            السلام علیکم ورحمۃ اللہ وبرکاتہ
                        </div>

                        {/* Form Fields */}
                        <div className="existing-record-fields">
                            {/* Row 1 */}
                            <div className="field-row field-row-3">
                                <div className="field-item">
                                    <span className="field-label">نام :</span>
                                    <span className="field-value">{record.studentName}</span>
                                </div>
                                <div className="field-item">
                                    <span className="field-label">والد :</span>
                                    <span className="field-value">{record.fatherName || '___________'}</span>
                                </div>
                                <div className="field-item">
                                    <span className="field-label">تاریخ پیدائش :</span>
                                    <span className="field-value ltr">{record.dob}</span>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="field-row field-row-2">
                                <div className="field-item field-item-wide">
                                    <span className="field-label">شناختی کارڈ نمبر :</span>
                                    <span className="field-value ltr">{record.cnic}</span>
                                </div>
                                <div className="field-item">
                                    <span className="field-label">موبائل نمبر :</span>
                                    <span className="field-value ltr">{record.phone}</span>
                                </div>
                            </div>

                            {/* Row 3 - Address */}
                            <div className="field-row field-row-full">
                                <div className="field-item field-item-full">
                                    <span className="field-label">مکمل پتہ :</span>
                                    <span className="field-value">{record.fullAddress || record.currentAddress}</span>
                                </div>
                            </div>

                            {/* Row 4 - Current Address */}
                            <div className="field-row field-row-full">
                                <div className="field-item field-item-full">
                                    <span className="field-label">موجودہ پتہ :</span>
                                    <span className="field-value">{record.currentAddress}</span>
                                </div>
                            </div>

                            {/* Row 4.5 - Education Type (only for new admissions) */}
                            {isNew && (
                                <div className="field-row field-row-full">
                                    <div className="field-item field-item-full">
                                        <span className="field-label">دینی / عصری تعلیم :</span>
                                        <span className="field-value">{record.educationType || '___________'}</span>
                                    </div>
                                </div>
                            )}

                            {/* Row 5 - Department & Gender */}
                            <div className="field-row field-row-2">
                                <div className="field-item">
                                    <span className="field-label">شعبہ (بنین/بنات) :</span>
                                    <span className="field-value">{record.gender}</span>
                                </div>
                                <div className="field-item">
                                    <span className="field-label">درس نظامی :</span>
                                    <span className="field-value">{record.department}</span>
                                </div>
                            </div>

                            {/* Conditional Fields - New Admission */}
                            {isNew && (
                                <>
                                    <div className="field-row field-row-full">
                                        <div className="field-item field-item-full">
                                            <span className="field-label">تعلیمی قابلیت (موجودہ) :</span>
                                            <span className="field-value">{record.requiredGrade}</span>
                                        </div>
                                    </div>
                                    <div className="field-row field-row-full">
                                        <div className="field-item field-item-full">
                                            <span className="field-label">سابقہ ادارہ/سکول کا نام :</span>
                                            <span className="field-value">{record.previousEducation || '___________'}</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Conditional Fields - Existing Student */}
                            {!isNew && (
                                <>
                                    <div className="field-row field-row-2">
                                        <div className="field-item">
                                            <span className="field-label">رجسٹریشن نمبر :</span>
                                            <span className="field-value ltr">{record.registrationNo}</span>
                                        </div>
                                        <div className="field-item">
                                            <span className="field-label">پچھلے سال کا درجہ :</span>
                                            <span className="field-value">{record.lastYearGrade}</span>
                                        </div>
                                    </div>
                                    <div className="field-row field-row-full">
                                        <div className="field-item field-item-full">
                                            <span className="field-label">آئندہ درجہ (بعد از ترقی) :</span>
                                            <span className="field-value">{record.nextYearGrade}</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Guardian Contact */}
                            <div className="field-row field-row-2">
                                <div className="field-item">
                                    <span className="field-label">موبائل نمبر :</span>
                                    <span className="field-value ltr">{record.phone}</span>
                                </div>
                                <div className="field-item">
                                    <span className="field-label">وٹس ایپ نمبر :</span>
                                    <span className="field-value ltr">{record.whatsapp || record.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer with Buttons */}
                        <div className="existing-record-footer">
                            <button 
                                className="submit-button btn-print" 
                                onClick={handlePrint}
                            >
                                فارم پرنٹ کریں
                                <span className="button-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                        <rect x="6" y="14" width="12" height="8"></rect>
                                    </svg>
                                </span>
                            </button>
                            <button 
                                className="submit-button btn-download" 
                                onClick={handleDownload}
                            >
                                فارم ڈاؤن لوڈ کریں
                                <span className="button-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                </span>
                            </button>
                            <button 
                                className="submit-button" 
                                style={{ backgroundColor: '#ff9800' }}
                                onClick={() => navigate('/edit-picture', { state: { record } })}
                            >
                                تصویر میں تبدیلی
                                <span className="button-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                </span>
                            </button>
                            <button 
                                className="submit-button btn-back" 
                                onClick={() => navigate('/')}
                            >
                                واپس
                                <span className="button-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
