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

    if (!record) {
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
                    <div style={{
                        background: '#fff',
                        border: '2px solid #000',
                        borderRadius: '12px',
                        padding: '32px',
                        marginBottom: '24px'
                    }}>
                        {/* Header Section */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                            borderBottom: '2px solid #000',
                            paddingBottom: '20px'
                        }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                border: '2px solid #000',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0
                            }}>
                                <img src="/1.png" alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                            </div>
                            
                            <div style={{ flex: 1, textAlign: 'center', padding: '0 20px' }}>
                                <p style={{ fontSize: '24px', marginBottom: '8px' }}>بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِیْمِ</p>
                                <h1 style={{ fontSize: '42px', fontWeight: 900, textDecoration: 'underline' }}>درخواست داخلہ</h1>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                                <div style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '14px' }}>
                                    <span style={{ fontWeight: 700 }}>رول نمبر : </span>
                                    <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr' }}>
                                        {!isNew && record.registrationNo ? record.registrationNo : (record.id ? String(record.id) : '---')}
                                    </span>
                                </div>
                                <div style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '14px' }}>
                                    <span style={{ fontWeight: 700 }}>تاریخ : </span>
                                    <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr' }}>{getCurrentDate()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Purple Banner */}
                        <div style={{
                            background: '#4a148c',
                            color: '#fff',
                            textAlign: 'center',
                            padding: '10px',
                            fontSize: '18px',
                            fontWeight: 700,
                            margin: '20px 0',
                            borderRadius: '4px'
                        }}>
                            جامعہ رضویہ ضیاء العلوم کے ناظم اعلیٰ محترم کی خدمت میں درد مندانہ گزارش ہے کہ
                        </div>

                        {/* Main Heading */}
                        <div style={{ textAlign: 'center', fontSize: '32px', fontWeight: 900, margin: '20px 0' }}>
                            السلام علیکم ورحمۃ اللہ وبرکاتہ
                        </div>

                        {/* Form Fields */}
                        <div style={{ margin: '24px 0', fontSize: '20px', lineHeight: '2.5' }}>
                            {/* Row 1 */}
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>نام والدہ :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.studentName}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>والد :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.fatherName || '___________'}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>تاریخ پیدائش :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px', fontFamily: 'Roboto, sans-serif', direction: 'ltr', textAlign: 'left' }}>{record.dob}</span>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 2 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>شناختی کارڈ نمبر :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px', fontFamily: 'Roboto, sans-serif', direction: 'ltr', textAlign: 'left' }}>{record.cnic}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>موبائل نمبر :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px', fontFamily: 'Roboto, sans-serif', direction: 'ltr', textAlign: 'left' }}>{record.phone}</span>
                                </div>
                            </div>

                            {/* Row 3 - Address */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>مکمل پتہ :</span>
                                <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.fullAddress || record.currentAddress}</span>
                            </div>

                            {/* Row 4 - Current Address */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>موجودہ پتہ :</span>
                                <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.currentAddress}</span>
                            </div>

                            {/* Row 5 - Department & Gender */}
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>شعبہ (بنین/بنات) :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.gender}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>درس نظامی :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.department}</span>
                                </div>
                            </div>

                            {/* Conditional Fields - New Admission */}
                            {isNew && (
                                <>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                        <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>تعلیمی قابلیت (موجودہ) :</span>
                                        <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.requiredGrade}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                        <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>سابقہ ادارہ/سکول کا نام :</span>
                                        <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.previousEducation || '___________'}</span>
                                    </div>
                                </>
                            )}

                            {/* Conditional Fields - Existing Student */}
                            {!isNew && (
                                <>
                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                            <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>رجسٹریشن نمبر :</span>
                                            <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px', fontFamily: 'Roboto, sans-serif', direction: 'ltr', textAlign: 'left' }}>{record.registrationNo}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                            <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>پچھلے سال کا درجہ :</span>
                                            <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.lastYearGrade}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                        <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>آئندہ درجہ (بعد از ترقی) :</span>
                                        <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px' }}>{record.nextYearGrade}</span>
                                    </div>
                                </>
                            )}

                            {/* Guardian Contact */}
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>موبائل نمبر :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px', fontFamily: 'Roboto, sans-serif', direction: 'ltr', textAlign: 'left' }}>{record.phone}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>وٹس ایپ نمبر :</span>
                                    <span style={{ borderBottom: '1px solid #000', flex: 1, padding: '0 8px', fontFamily: 'Roboto, sans-serif', direction: 'ltr', textAlign: 'left' }}>{record.whatsapp || record.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer with Buttons */}
                        <div style={{ 
                            marginTop: '32px', 
                            borderTop: '2px solid #000', 
                            paddingTop: '20px',
                            display: 'flex',
                            gap: '16px',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button 
                                className="submit-button" 
                                onClick={handlePrint}
                                style={{ fontSize: '22px', padding: '12px 40px', background: '#2196f3', borderColor: '#2196f3' }}
                            >
                                فارم پرنٹ کریں
                            </button>
                            <button 
                                className="submit-button" 
                                onClick={handleDownload}
                                style={{ fontSize: '22px', padding: '12px 40px', background: '#ff9800', borderColor: '#ff9800' }}
                            >
                                فارم ڈاؤن لوڈ کریں
                            </button>
                            <button 
                                className="submit-button" 
                                onClick={() => navigate('/')}
                                style={{ fontSize: '22px', padding: '12px 40px' }}
                            >
                                واپس  
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
