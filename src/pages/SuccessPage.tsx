import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PrintableForm from '../components/PrintableForm';
import type { SubmittedRecord } from '../types';

export default function SuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const record = location.state?.record as SubmittedRecord | undefined;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleOpenSchedule = () => {
        // Open the PDF in a new tab with the correct path
        const pdfUrl = `${window.location.origin}/nizam-ul-amal-3-02-2026.pdf`;
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Navbar />
            
            {/* Printable Form - Hidden on screen, visible on print */}
            {record && <PrintableForm record={record} />}
            
            <div className="App">
                <div className="form-content">

                    {/* ═══════ SECTION 1: Thank You Card ═══════ */}
                    <div className="card">
                        <div className="card-body" style={{ textAlign: 'center', padding: '48px 32px' }}>
                            {/* Logo */}
                            <div className="success-logo-wrapper">
                                <img
                                    src="/1.png"
                                    alt="Jamia Nizamia Rizvia Logo"
                                    className="success-logo"
                                />
                            </div>

                            {/* جزاک اللہ خیرا */}
                            <h2 className="jazak-heading">جزاک اللہ خیرًا</h2>

                            {/* Confirmation message */}
                            <p className="description textCenter" style={{ fontSize: '28px', marginTop: '16px' }}>
                                آپ کا{' '}
                                <span className="red_text" style={{ fontSize: '28px' }}>آن لائن فارم</span>{' '}
                                جامعہ رضویہ ضیاء العلوم کو وصول ہوگیا ہے ۔
                            </p>

                            {/* Print Button */}
                            <div style={{ marginTop: '24px' }}>
                                <button className="submit-button" id="btn-print-form" onClick={handlePrint}>
                                    اپنا داخلہ فارم پرنٹ کریں
                                    <span className="button-icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                            <rect x="6" y="14" width="12" height="8"></rect>
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            {/* New form message */}
                            <p className="description textCenter" style={{ fontSize: '24px', marginTop: '32px' }}>
                                کسی اور امیدوار کا فارم پُر کرنے کے لیے بٹن پر کلک کریں ۔
                            </p>

                            {/* New Form Button */}
                            <div style={{ marginTop: '16px' }}>
                                <button className="submit-button" id="btn-new-form" onClick={() => navigate('/')}>
                                    نیا فارم پُر کریں
                                    <span className="button-icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ═══════ PRINTABLE FORM DATA ═══════ */}
                    {record && (
                        <div className="card print-only" style={{ marginTop: '24px' }}>
                            <div className="card-header" style={{ justifyContent: 'center' }}>
                                <span className="card-header-label" style={{ textAlign: 'center', fontSize: '28px' }}>
                                    داخلہ فارم کی تفصیلات
                                </span>
                            </div>
                            <div className="card-body" style={{ padding: '32px' }}>
                                {/* Basic Information */}
                                <div style={{ marginBottom: '24px' }}>
                                    <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                        <span className="green_text" style={{ fontSize: '24px', fontWeight: 700 }}>داخلہ کی نوعیت:</span>{' '}
                                        {record.admissionType}
                                    </p>
                                    <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                        <span className="green_text" style={{ fontSize: '24px', fontWeight: 700 }}>جنس:</span>{' '}
                                        {record.gender}
                                    </p>
                                    <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                        <span className="green_text" style={{ fontSize: '24px', fontWeight: 700 }}>شعبہ:</span>{' '}
                                        {record.department}
                                    </p>
                                </div>

                                {/* Personal Information */}
                                <div style={{ marginBottom: '24px', borderTop: '2px solid #e0e0e0', paddingTop: '16px' }}>
                                    <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                        <span className="blue_text" style={{ fontSize: '24px', fontWeight: 700 }}>نام طالب/طالبہ:</span>{' '}
                                        {record.studentName}
                                    </p>
                                    {record.fatherName && (
                                        <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                            <span className="blue_text" style={{ fontSize: '24px', fontWeight: 700 }}>والد کا نام:</span>{' '}
                                            {record.fatherName}
                                        </p>
                                    )}
                                    <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                        <span className="blue_text" style={{ fontSize: '24px', fontWeight: 700 }}>تاریخ پیدائش:</span>{' '}
                                        <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr', display: 'inline-block' }}>{record.dob}</span>
                                    </p>
                                    <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                        <span className="blue_text" style={{ fontSize: '24px', fontWeight: 700 }}>شناختی کارڈ/ب فارم:</span>{' '}
                                        <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr', display: 'inline-block' }}>{record.cnic}</span>
                                    </p>
                                    <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                        <span className="blue_text" style={{ fontSize: '24px', fontWeight: 700 }}>فون نمبر:</span>{' '}
                                        <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr', display: 'inline-block' }}>{record.phone}</span>
                                    </p>
                                    {record.whatsapp && (
                                        <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                            <span className="blue_text" style={{ fontSize: '24px', fontWeight: 700 }}>وٹس ایپ/ٹیلی گرام:</span>{' '}
                                            <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr', display: 'inline-block' }}>{record.whatsapp}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Address Information */}
                                <div style={{ marginBottom: '24px', borderTop: '2px solid #e0e0e0', paddingTop: '16px' }}>
                                    {record.fullAddress && (
                                        <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                            <span className="green_text" style={{ fontSize: '24px', fontWeight: 700 }}>مکمل پتہ:</span>{' '}
                                            {record.fullAddress}
                                        </p>
                                    )}
                                    <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                        <span className="green_text" style={{ fontSize: '24px', fontWeight: 700 }}>موجودہ پتہ:</span>{' '}
                                        {record.currentAddress}
                                    </p>
                                </div>

                                {/* New Admission Specific Fields */}
                                {record.admissionType === 'نیا داخلہ' && (
                                    <div style={{ marginBottom: '24px', borderTop: '2px solid #e0e0e0', paddingTop: '16px' }}>
                                        <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                            <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>مطلوبہ شعبہ و درجہ:</span>{' '}
                                            {record.requiredGrade}
                                        </p>
                                        {record.previousEducation && (
                                            <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                                <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>سابقہ تعلیم:</span>{' '}
                                                {record.previousEducation}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Existing Student Specific Fields */}
                                {record.admissionType === 'پہلے سے زیر تعلیم' && (
                                    <div style={{ marginBottom: '24px', borderTop: '2px solid #e0e0e0', paddingTop: '16px' }}>
                                        <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                            <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>رجسٹریشن نمبر:</span>{' '}
                                            <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr', display: 'inline-block' }}>{record.registrationNo}</span>
                                        </p>
                                        <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                            <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>پچھلے سال کا درجہ:</span>{' '}
                                            {record.lastYearGrade}
                                        </p>
                                        <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                            <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>آئندہ درجہ:</span>{' '}
                                            {record.nextYearGrade}
                                        </p>
                                        {record.examPart1Marks && (
                                            <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                                <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>پارٹ 1 نمبر:</span>{' '}
                                                <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr', display: 'inline-block' }}>{record.examPart1Marks}</span>
                                            </p>
                                        )}
                                        {record.examPart2Marks && (
                                            <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                                <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>پارٹ 2 نمبر:</span>{' '}
                                                <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr', display: 'inline-block' }}>{record.examPart2Marks}</span>
                                            </p>
                                        )}
                                        {record.totalMarks && (
                                            <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                                <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>مجموعی نمبر:</span>{' '}
                                                <span style={{ fontFamily: 'Roboto, sans-serif', direction: 'ltr', display: 'inline-block' }}>{record.totalMarks}</span>
                                            </p>
                                        )}
                                        {record.remarks && (
                                            <p className="description" style={{ fontSize: '24px', marginBottom: '12px' }}>
                                                <span className="red_text" style={{ fontSize: '24px', fontWeight: 700 }}>نوٹ:</span>{' '}
                                                {record.remarks}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Submission Info */}
                                <div style={{ marginTop: '24px', borderTop: '2px solid #e0e0e0', paddingTop: '16px' }}>
                                    <p className="description textCenter" style={{ fontSize: '20px', color: '#666' }}>
                                        <span style={{ fontFamily: 'Roboto, sans-serif' }}>
                                            جمع کرانے کی تاریخ: {record.submittedAt}
                                        </span>
                                    </p>
                                </div>

                                {/* Document URLs Section */}
                                {(record.certificateUrls?.length || record.cnicUrls?.length || record.additionalUrls?.length) ? (
                                    <div style={{ marginTop: '24px', borderTop: '2px solid #e0e0e0', paddingTop: '16px' }}>
                                        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#058464', textAlign: 'center' }}>
                                            اپ لوڈ شدہ دستاویزات
                                        </h3>
                                        
                                        {record.certificateUrls && record.certificateUrls.length > 0 && (
                                            <div style={{ marginBottom: '16px' }}>
                                                <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
                                                    اسناد / سرٹیفیکیٹ:
                                                </p>
                                                {record.certificateUrls.map((url, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'block',
                                                            padding: '8px 12px',
                                                            marginBottom: '6px',
                                                            backgroundColor: '#f0f0f0',
                                                            borderRadius: '6px',
                                                            color: '#058464',
                                                            textDecoration: 'none',
                                                            fontSize: '16px',
                                                            fontFamily: 'Roboto, sans-serif'
                                                        }}
                                                    >
                                                        📄 Certificate {idx + 1}
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {record.cnicUrls && record.cnicUrls.length > 0 && (
                                            <div style={{ marginBottom: '16px' }}>
                                                <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
                                                    شناختی کارڈ / ب فارم:
                                                </p>
                                                {record.cnicUrls.map((url, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'block',
                                                            padding: '8px 12px',
                                                            marginBottom: '6px',
                                                            backgroundColor: '#f0f0f0',
                                                            borderRadius: '6px',
                                                            color: '#058464',
                                                            textDecoration: 'none',
                                                            fontSize: '16px',
                                                            fontFamily: 'Roboto, sans-serif'
                                                        }}
                                                    >
                                                        🆔 CNIC {idx + 1}
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        {record.additionalUrls && record.additionalUrls.length > 0 && (
                                            <div style={{ marginBottom: '16px' }}>
                                                <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
                                                    اضافی دستاویزات:
                                                </p>
                                                {record.additionalUrls.map((url, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'block',
                                                            padding: '8px 12px',
                                                            marginBottom: '6px',
                                                            backgroundColor: '#f0f0f0',
                                                            borderRadius: '6px',
                                                            color: '#058464',
                                                            textDecoration: 'none',
                                                            fontSize: '16px',
                                                            fontFamily: 'Roboto, sans-serif'
                                                        }}
                                                    >
                                                        📎 Document {idx + 1}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )}

                    {/* ═══════ SECTION 2: Required Documents ═══════ */}
                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-body" style={{ padding: '32px' }}>
                            <p className="greenDescription textCenter" style={{ fontSize: '32px', textDecoration: 'underline' }}>
                                آپ کی درج شدہ معلومات جمع ہو چکی ہیں ۔
                            </p>
                            <p className="greenDescription textCenter" style={{ fontSize: '32px', textDecoration: 'underline' }}>
                                ان کا پرنٹ نکال لیجیے ۔
                            </p>

                            <p className="description textCenter" style={{ fontSize: '24px', marginTop: '24px', lineHeight: '2' }}>
                                <span className="green_text" style={{ fontSize: '24px' }}>
                                    انہیں اچھی طرح پڑھ کر اپنے دستخط کیجیے نیز اپنے والد یا سرپرست کو ہدایات اور داخلہ فارم کے صفحات مکمل پڑھوا کر ان سے تصدیق کروائیے اور
                                </span>
                            </p>

                            {/* Numbered List */}
                            <div className="required-docs-list">
                                <p className="doc-item blue">
                                    <span className="doc-number">1</span>
                                    . اپنے شناختی کارڈ/ب فارم کی فوٹو کاپی
                                </p>
                                <p className="doc-item green">
                                    <span className="doc-number">2</span>
                                    . اپنے والد/سرپرست کے شناختی کارڈ کی فوٹو کاپی
                                </p>
                                <p className="doc-item blue">
                                    <span className="doc-number">3</span>
                                    . اپنی تازہ تصویر
                                </p>
                                <p className="doc-item green">
                                    <span className="doc-number">4</span>
                                    . اپنے والد/سرپرست کی تازہ تصویر
                                </p>
                                <p className="doc-item blue">
                                    <span className="doc-number">5</span>
                                    . اپنی موجودہ دینی و عصری تعلیم کی آخری سند/رزلٹ کارڈ/سرٹیفکیٹ کی فوٹو کاپی
                                </p>
                                <p className="doc-item green">
                                    <span className="doc-number">6</span>
                                    . داخلہ فارم اور ہدایات و ضوابط والے دستخط شدہ صفحات
                                </p>
                               
                            </div>

                           
                            <p className="greenDescription textCenter" style={{ fontSize: '28px', marginTop: '24px', textDecoration: 'underline' }}>
                                ان تمام چیزوں کے ہمراہ داخلہ ٹیسٹ و انٹرویو کے لیے حسب شیڈول جامعہ کے دفتر میں تشریف لائیں
                            </p>
                        </div>
                    

                    {/* ═══════ SECTION 3: Location & Date ═══════ */}
                    
                        
                        <div className="card-body" style={{ padding: '32px' }}>
                            {/* Date & Time Card */}
                            

                            {/* Google Map Embed */}
                            <div className="map-container">
                                <iframe
                                    title="Jamia Rizwia Zia-ul-Uloom Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.6177135977155!2d73.0703382!3d33.6411529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9526d2675415%3A0xfc60c892e8b2055e!2sJamia%20Rizwia%20Zia-ul-Uloom%20%26%20Jamia%20Amina%20Zia-al-Binaat!5e0!3m2!1sen!2s!4v1773157647419!5m2!1sen!2s"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* Warning Text */}
                            <div style={{ marginTop: '24px' }}>
                                <p className="redDescription textCenter" style={{ fontSize: '26px', textDecoration: 'underline' }}>
                                    یاد رہے کہ داخلہ پہلے آئیے پہلے پائیے اور میرٹ کی بنیاد پر ہوگا
                                </p>

                                <p className="description textCenter" style={{ fontSize: '22px', marginTop: '16px', lineHeight: '2', color: '#e91e90', fontWeight: 700 }}>
                                    لہذا اگر قواعد و ضوابط میں درج شرائط کے مطابق مطلوبہ درجے کے لیے آپ کی موجودہ تعلیمی قابلیت پوری نہ ہوئی یا غلط معلومات فراہم کی گئیں یا آپ کی درخواست تاخیر سے جمع ہوئی یا آپ کی درخواست جمع ہونے سے پہلے ہماری محدود تعداد/گنجائش مکمل ہوگئی تو آپ جامعہ میں داخلے کے اہل نہیں ہوں گے ۔
                                </p>
                            </div>

                            {/* Bottom Print Button */}
                            <div style={{ textAlign: 'center', marginTop: '32px' }}>
                                <button className="submit-button" id="btn-print-instructions" onClick={handleOpenSchedule}>
                                    شیڈول
                                    <span className="button-icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
