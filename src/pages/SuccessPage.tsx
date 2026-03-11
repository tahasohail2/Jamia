import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
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

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="form-content">

                    {/* ═══════ SECTION 1: Thank You Card ═══════ */}
                    <div className="card">
                        <div className="card-body" style={{ textAlign: 'center', padding: '48px 32px' }}>
                            {/* Logo */}
                            <div className="success-logo-wrapper">
                                <img
                                    src="/logo.png"
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
                                جامعہ نظامیہ رضویہ کو وصول ہوگیا ہے ۔
                            </p>

                            {/* Print Button */}
                            <div style={{ marginTop: '24px' }}>
                                <button className="submit-button" id="btn-print-form" onClick={handlePrint}>
                                    اپنا داخلہ فارم پرنٹ کریں
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
                                <p className="doc-item red" style={{ fontSize: '32px' }}>
                                    <span className="doc-number">7</span>
                                    . بوقت داخلہ فیس <span style={{ fontFamily: 'Roboto, sans-serif' }}>1500</span> روپے
                                </p>
                            </div>

                            <p className="description textCenter" style={{ fontSize: '22px', marginTop: '8px', color: '#e91e90' }}>
                                (دیگر کوئی سالانہ یا ماہانہ فیس نہیں ہے) ۔
                            </p>

                            <p className="greenDescription textCenter" style={{ fontSize: '28px', marginTop: '24px', textDecoration: 'underline' }}>
                                ان تمام چیزوں کے ہمراہ داخلہ ٹیسٹ و انٹرویو کے لیے
                            </p>
                        </div>
                    </div>

                    {/* ═══════ SECTION 3: Location & Date ═══════ */}
                    <div className="card" style={{ marginTop: '24px' }}>
                        <div className="card-header" style={{ justifyContent: 'center' }}>
                            <span className="card-header-label" style={{ textAlign: 'center', fontSize: '24px' }}>
                                ان تمام چیزوں کے ہمراہ داخلہ ٹیسٹ و انٹرویو کے لیے
                            </span>
                        </div>
                        <div className="card-body" style={{ padding: '32px' }}>
                            {/* Date & Time Card */}
                            <div className="admission-date-card">
                                <p className="date-line red" style={{ fontSize: '28px' }}>
                                    11 شوال المکرم 1447ھ
                                </p>
                                <p className="date-line red" style={{ fontSize: '24px' }}>
                                    (مؤرخہ <span style={{ fontFamily: 'Roboto, sans-serif' }}>31</span> مارچ <span style={{ fontFamily: 'Roboto, sans-serif' }}>2026</span>ء بروز منگل)
                                </p>
                                <p className="date-line blue" style={{ fontSize: '28px' }}>
                                    بجے <span style={{ fontFamily: 'Roboto, sans-serif' }}>8:00</span> بجے
                                </p>
                                <p className="date-line green" style={{ fontSize: '28px', fontWeight: 900 }}>
                                    جامعۂ رضویۃ ضیاء العلوم
                                </p>
                                <p className="date-line green" style={{ fontSize: '26px' }}>
                                    ناصر روڈ، راولپنڈی
                                </p>
                                <p className="date-line red" style={{ fontSize: '30px', fontWeight: 900 }}>
                                    تشریف لائیں
                                </p>
                            </div>

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
                                <button className="submit-button" id="btn-print-instructions" onClick={handlePrint}>
                                    ہدایات اور داخلہ فارم پرنٹ کریں
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
