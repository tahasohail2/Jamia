import type { SubmittedRecord } from '../types';

interface PrintableFormProps {
    record: SubmittedRecord;
}

export default function PrintableForm({ record }: PrintableFormProps) {
    // Validate record exists
    if (!record) {
        return <div>No record data available</div>;
    }

    const isNew = record.admissionType === 'نیا داخلہ';
    
    // Safe date formatting function
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '---';
        try {
            // If it's an ISO timestamp, extract just the date part
            if (dateString.includes('T')) {
                return dateString.split('T')[0];
            }
            return dateString;
        } catch {
            return '---';
        }
    };

    // Safe value accessor
    const safeValue = (value: any) => value || '___________';
    
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
                APPLICATION FORM (درخواست داخلہ)
                ═══════════════════════════════════════════════════════ */}
            <div className="print-page form-page">
                <div className="form-border">
                    {/* Header Section */}
                    <div className="form-header-section">
                        <div className="logo-container">
                            <img src="/1.png" alt="Logo" className="form-logo" />
                        </div>
                        
                        <div className="form-title-section">
                            <p className="bismillah">بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِیْمِ</p>
                            <h1 className="form-main-title">درخواست داخلہ</h1>
                        </div>

                        <div className="form-meta-info">
                            <div className="profile-picture-container">
                                {record.additionalUrls && record.additionalUrls.length > 0 ? (
                                    <img 
                                        src={record.additionalUrls[0]} 
                                        alt="Profile" 
                                        className="profile-picture"
                                    />
                                ) : (
                                    <div className="profile-picture-placeholder">
                                        <span>تصویر</span>
                                    </div>
                                )}
                            </div>
                            <div className="meta-boxes">
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
                    </div>

                    {/* Purple Banner */}
                    <div className="form-banner">
                        جامعہ رضویہ ضیاء العلوم کے ناظم اعلیٰ محترم کی خدمت میں درد مندانہ گزارش ہے کہ
                    </div>

                    {/* Main Heading */}
                    <div className="form-section-title">
                        السلام علیکم ورحمۃ اللہ وبرکاتہ
                    </div>

                    {/* Introduction Paragraph */}
                    <div className="form-intro">
                        <p>
                            موصوف کو سلام عرض کرنے کے بعد بندہ عاجز و ناچیز بصد ادب و احترام عرض کرتا/کرتی ہوں کہ میں اپنے والد/سرپرست کی اجازت سے جامعہ رضویہ ضیاء العلوم میں داخلہ لینا چاہتا/چاہتی ہوں۔ میں نے جامعہ کے قواعد و ضوابط کو اچھی طرح پڑھ لیا ہے اور ان پر عمل کروں گا/گی۔ براہ کرم مجھے داخلہ دینے کی زحمت فرمائیں۔ میری تفصیلات درج ذیل ہیں:
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="form-fields">
                        {/* Row 1 */}
                        <div className="form-row">
                            <div className="form-field-inline">
                                <span className="field-label">نام :</span>
                                <span className="field-value">{record.studentName}</span>
                            </div>
                            <div className="form-field-inline">
                                <span className="field-label">والد :</span>
                                <span className="field-value">{safeValue(record.fatherName)}</span>
                            </div>
                            <div className="form-field-inline">
                                <span className="field-label">تاریخ پیدائش :</span>
                                <span className="field-value ltr">{formatDate(record.dob)}</span>
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

                        {/* Row 4.5 - Education Type (only for new admissions) */}
                        {isNew && (
                            <div className="form-row">
                                <div className="form-field-inline">
                                    <span className="field-label">دینی / عصری تعلیم :</span>
                                    <span className="field-value">{safeValue(record.educationType)}</span>
                                </div>
                            </div>
                        )}

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
                                        <span className="field-value">{safeValue(record.previousEducation)}</span>
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
                                <span className="field-value">{safeValue(record.fatherName)}</span>
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
                           
                            <div className="signature-line-bottom">_______________</div>
                            <p className="signature-label-bottom">دستخط سرپرست/والد کے</p>
                        </div>

                        <div className="signature-group">
                            
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
