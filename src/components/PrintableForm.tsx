import type { SubmittedRecord } from '../types';

interface PrintableFormProps {
    record: SubmittedRecord;
}

export default function PrintableForm({ record }: PrintableFormProps) {
    const isNew = record.admissionType === 'نیا داخلہ';
    
    // Get current date in DD-MM-YYYY format
    const getCurrentDate = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="printable-form">
            {/* ═══════════════════════════════════════════════════════
                PAGE 1: COVER PAGE (ہدایات و ضوابط)
                ═══════════════════════════════════════════════════════ */}
            <div className="print-page cover-page">
                <div className="cover-border">
                    <div className="cover-header">
                        <h1 className="cover-title">ہدایات و ضوابط</h1>
                        <p className="cover-subtitle">
                            جامعۂ نظامیہ رضویہ " (اہلِ سنت و جماعت) " کے زیر اہتمام
                        </p>
                    </div>

                    <div className="cover-content">
                        <p className="cover-text">
                            جامعۂ نظامیہ رضویہ میں داخلہ کے لیے درج ذیل ہدایات و ضوابط کو اچھی طرح پڑھ لیجیے اور ان پر عمل کیجیے۔
                        </p>

                        <div className="instructions-list">
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                جامعہ میں داخلہ کے لیے آن لائن فارم پُر کرنا لازمی ہے۔ آن لائن فارم پُر کرنے کے بعد اس کا پرنٹ نکال کر اپنے دستخط کیجیے اور اپنے والد یا سرپرست سے تصدیق کروائیے۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                داخلہ ٹیسٹ اور انٹرویو میں شرکت کے لیے مقررہ تاریخ اور وقت پر جامعہ میں حاضر ہوں۔ ساتھ میں اپنا شناختی کارڈ/ب فارم، والد/سرپرست کا شناختی کارڈ، تازہ تصاویر، تعلیمی سندات اور دستخط شدہ داخلہ فارم لازمی لے کر آئیں۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                داخلہ ٹیسٹ میں کامیابی اور انٹرویو کے بعد ہی داخلہ دیا جائے گا۔ داخلہ فیس 1500 روپے ہے جو بوقت داخلہ جمع کرانی ہوگی۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                جامعہ میں تعلیم مکمل طور پر مفت ہے۔ کوئی سالانہ یا ماہانہ فیس نہیں ہے۔ طلباء کو کتابیں، کاپیاں اور دیگر تعلیمی سہولیات مفت فراہم کی جاتی ہیں۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                جامعہ میں داخلہ کے بعد طالب علم کو جامعہ کے قواعد و ضوابط کی پابندی لازمی ہے۔ حاضری کم از کم 80% ہونی چاہیے۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                جامعہ میں داخلہ کے بعد اگر کسی طالب علم کی حاضری، تعلیمی کارکردگی یا اخلاقی رویہ تسلی بخش نہ ہو تو انتظامیہ کو اسے جامعہ سے خارج کرنے کا مکمل اختیار ہوگا۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                جامعہ میں داخلہ کے بعد طالب علم کو جامعہ کی طرف سے فراہم کردہ یونیفارم پہننا لازمی ہے۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                جامعہ میں داخلہ کے بعد طالب علم کو جامعہ کے اوقات کی پابندی لازمی ہے۔ جامعہ کا وقت صبح 8 بجے سے دوپہر 2 بجے تک ہے۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                جامعہ میں داخلہ کے بعد طالب علم کو جامعہ کی تمام سرگرمیوں میں شرکت لازمی ہے۔
                            </p>
                            <p className="instruction-item">
                                <span className="bullet">٭</span>
                                جامعہ میں داخلہ کے بعد طالب علم کو جامعہ کے اساتذہ اور عملے کا احترام لازمی ہے۔
                            </p>
                        </div>

                        <div className="cover-footer">
                            <p className="important-note">
                                <span className="note-label">اہم نوٹ:</span>
                                میں نے مندرجہ بالا تمام ہدایات و ضوابط کو اچھی طرح پڑھ لیا ہے اور ان پر عمل کروں گا/گی۔
                            </p>

                            <div className="signature-section">
                                <div className="signature-box">
                                    <p className="signature-label">دستخط طالب/طالبہ</p>
                                    <div className="signature-line">........................</div>
                                </div>
                                <div className="signature-box">
                                    <p className="signature-label">تاریخ</p>
                                    <div className="signature-line">........................</div>
                                </div>
                            </div>

                            <div className="authority-section">
                                <p className="authority-title">ناظر اعلیٰ</p>
                                <p className="authority-name">جامعۂ نظامیہ رضویہ اہلِ سنت و جماعت</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                PAGE 2: APPLICATION FORM (درخواست داخلہ)
                ═══════════════════════════════════════════════════════ */}
            <div className="print-page form-page">
                <div className="form-border">
                    {/* Header Section */}
                    <div className="form-header-section">
                        <div className="logo-container">
                            <img src="/logo.png" alt="Logo" className="form-logo" />
                        </div>
                        
                        <div className="form-title-section">
                            <p className="bismillah">بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِیْمِ</p>
                            <h1 className="form-main-title">درخواست داخلہ</h1>
                        </div>

                        <div className="form-meta-info">
                            <div className="meta-box">
                                <span className="meta-label">رول نمبر :</span>
                                <span className="meta-value">{record.registrationNo || '---'}</span>
                            </div>
                            <div className="meta-box">
                                <span className="meta-label">تاریخ :</span>
                                <span className="meta-value">{getCurrentDate()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Purple Banner */}
                    <div className="form-banner">
                        جامعۂ نظامیہ رضویہ کے ناظم اعلیٰ محترم کی خدمت میں درد مندانہ گزارش ہے کہ
                    </div>

                    {/* Main Heading */}
                    <div className="form-section-title">
                        السلام علیکم ورحمۃ اللہ وبرکاتہ
                    </div>

                    {/* Introduction Paragraph */}
                    <div className="form-intro">
                        <p>
                            موصوف کو سلام عرض کرنے کے بعد بندہ عاجز و ناچیز بصد ادب و احترام عرض کرتا/کرتی ہوں کہ میں اپنے والد/سرپرست کی اجازت سے جامعۂ نظامیہ رضویہ میں داخلہ لینا چاہتا/چاہتی ہوں۔ میں نے جامعہ کے قواعد و ضوابط کو اچھی طرح پڑھ لیا ہے اور ان پر عمل کروں گا/گی۔ براہ کرم مجھے داخلہ دینے کی زحمت فرمائیں۔ میری تفصیلات درج ذیل ہیں:
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="form-fields">
                        {/* Row 1 */}
                        <div className="form-row">
                            <div className="form-field-inline">
                                <span className="field-label">نام والدہ :</span>
                                <span className="field-value">{record.studentName}</span>
                            </div>
                            <div className="form-field-inline">
                                <span className="field-label">والد :</span>
                                <span className="field-value">{record.fatherName || '___________'}</span>
                            </div>
                            <div className="form-field-inline">
                                <span className="field-label">تاریخ پیدائش :</span>
                                <span className="field-value ltr">{record.dob}</span>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="form-row">
                            <div className="form-field-inline wide">
                                <span className="field-label">شناختی کارڈ نمبر :</span>
                                <span className="field-value ltr">{record.cnic}</span>
                            </div>
                            <div className="form-field-inline">
                                <span className="field-label">موبائل نمبر :</span>
                                <span className="field-value ltr">{record.phone}</span>
                            </div>
                        </div>

                        {/* Row 3 - Address */}
                        <div className="form-row">
                            <div className="form-field-block">
                                <span className="field-label">مکمل پتہ :</span>
                                <span className="field-value">{record.fullAddress || record.currentAddress}</span>
                            </div>
                        </div>

                        {/* Row 4 - Current Address */}
                        <div className="form-row">
                            <div className="form-field-block">
                                <span className="field-label">موجودہ پتہ :</span>
                                <span className="field-value">{record.currentAddress}</span>
                            </div>
                        </div>

                        {/* Row 5 - Department & Gender */}
                        <div className="form-row">
                            <div className="form-field-inline">
                                <span className="field-label">شعبہ (بنین/بنات) :</span>
                                <span className="field-value">{record.gender}</span>
                            </div>
                            <div className="form-field-inline">
                                <span className="field-label">درس نظامی :</span>
                                <span className="field-value">{record.department}</span>
                            </div>
                            <div className="form-field-inline">
                                <span className="field-label">دیگر :</span>
                                <span className="field-value">___</span>
                            </div>
                        </div>

                        {/* Conditional Fields - New Admission */}
                        {isNew && (
                            <>
                                <div className="form-row">
                                    <div className="form-field-inline wide">
                                        <span className="field-label">تعلیمی قابلیت (موجودہ) :</span>
                                        <span className="field-value">{record.requiredGrade}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-field-block">
                                        <span className="field-label">سابقہ ادارہ/سکول کا نام :</span>
                                        <span className="field-value">{record.previousEducation || '___________'}</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Conditional Fields - Existing Student */}
                        {!isNew && (
                            <>
                                <div className="form-row">
                                    <div className="form-field-inline">
                                        <span className="field-label">رجسٹریشن نمبر :</span>
                                        <span className="field-value ltr">{record.registrationNo}</span>
                                    </div>
                                    <div className="form-field-inline">
                                        <span className="field-label">پچھلے سال کا درجہ :</span>
                                        <span className="field-value">{record.lastYearGrade}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-field-inline wide">
                                        <span className="field-label">آئندہ درجہ (بعد از ترقی) :</span>
                                        <span className="field-value">{record.nextYearGrade}</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Guardian Contact */}
                        <div className="form-row">
                            <div className="form-field-inline">
                                <span className="field-label">سرپرست کا نام/والد کا نام :</span>
                                <span className="field-value">{record.fatherName || '___________'}</span>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-field-inline">
                                <span className="field-label">موبائل نمبر :</span>
                                <span className="field-value ltr">{record.phone}</span>
                            </div>
                            <div className="form-field-inline">
                                <span className="field-label">وٹس ایپ نمبر :</span>
                                <span className="field-value ltr">{record.whatsapp || record.phone}</span>
                            </div>
                        </div>

                        {/* Guardian Address */}
                        <div className="form-row">
                            <div className="form-field-block">
                                <span className="field-label">سرپرست کا مکمل پتہ/موجودہ پتہ :</span>
                                <span className="field-value">{record.currentAddress}</span>
                            </div>
                        </div>
                    </div>

                    {/* Signature Section */}
                    <div className="form-signatures">
                        <div className="signature-group">
                            <div className="stamp-circle">
                                <img src="/logo.png" alt="Stamp" className="stamp-img" />
                            </div>
                            <div className="signature-line-bottom">_______________</div>
                            <p className="signature-label-bottom">دستخط سرپرست/والد کے</p>
                        </div>

                        <div className="signature-group">
                            <div className="stamp-circle">
                                <img src="/logo.png" alt="Stamp" className="stamp-img" />
                            </div>
                            <div className="signature-line-bottom">_______________</div>
                            <p className="signature-label-bottom">دستخط امیدوار کے</p>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="form-footer-section">
                        <div className="footer-box">
                            <p className="footer-label">دفتر جامعہ کے لیے مخصوص</p>
                            <div className="footer-content">
                                <p>داخلہ منظور/نامنظور : <span className="underline-space">___________</span></p>
                                <p className="footer-signature">دستخط و مہر ناظم</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
