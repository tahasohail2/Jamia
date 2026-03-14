import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import { useFormContext } from '../context/FormContext';
import type { DataRow } from '../components/DataTable';

export default function RecordDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { records } = useFormContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const recordId = Number(id);
    const rec = records.find(r => r.id === recordId);
    const index = records.findIndex(r => r.id === recordId);

    if (!rec) {
        return (
            <>
                <Navbar />
                <div className="App">
                    <div className="form-content">
                        <Card>
                            <p className="description textCenter" style={{ fontSize: '28px' }}>
                                ریکارڈ نہیں ملا
                            </p>
                            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                                <button className="submit-button" onClick={() => navigate('/records')}>
                                    واپس فارمز کی فہرست
                                    <span className="button-icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="19" y1="12" x2="5" y2="12"></line>
                                            <polyline points="12 19 5 12 12 5"></polyline>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </Card>
                    </div>
                </div>
            </>
        );
    }

    const isNew = rec.admissionType === 'نیا داخلہ';

    const step1Rows: DataRow[] = [
        { label: 'داخلہ کی نوعیت', value: rec.admissionType },
        { label: 'جنس', value: rec.gender },
        { label: 'شعبہ', value: rec.department },
    ];

    const step2Rows: DataRow[] = isNew
        ? [
            { label: 'نام طالب/ طالبہ', value: rec.studentName },
            { label: 'والد کا نام', value: rec.fatherName },
            { label: 'تاریخ پیدائش', value: rec.dob, isLtr: true },
            { label: 'شناختی کارڈ/ب فارم نمبر', value: rec.cnic, isLtr: true },
            { label: 'فون نمبر', value: rec.phone, isLtr: true },
            { label: 'وٹس ایپ/ٹیلی گرام نمبر', value: rec.whatsapp, isLtr: true },
            { label: 'مکمل پتہ', value: rec.fullAddress },
            { label: 'موجودہ پتا (رہائش)', value: rec.currentAddress },
            { label: 'مطلوبہ شعبہ و درجہ تعلیم', value: rec.requiredGrade },
            { label: 'سابقہ تعلیم کی تفصیل', value: rec.previousEducation },
        ]
        : [
            { label: 'داخلہ نمبر (رجسٹریشن)', value: rec.registrationNo, isLtr: true },
            { label: 'نام طالب/ طالبہ', value: rec.studentName },
            { label: 'والد کا نام', value: rec.fatherName },
            { label: 'تاریخ پیدائش', value: rec.dob, isLtr: true },
            { label: 'شناختی کارڈ/ب فارم نمبر', value: rec.cnic, isLtr: true },
            { label: 'فون نمبر', value: rec.phone, isLtr: true },
            { label: 'وٹس ایپ/ٹیلی گرام نمبر', value: rec.whatsapp, isLtr: true },
            { label: 'مکمل پتہ', value: rec.fullAddress },
            { label: 'موجودہ پتا (رہائش)', value: rec.currentAddress },
            { label: 'پچھلے سال کا شعبہ و درجہ', value: rec.lastYearGrade },
            { label: 'آئندہ شعبہ و درجہ (بعد از ترقی)', value: rec.nextYearGrade },
            { label: 'سالانہ امتحان پارٹ 1 : حاصل کردہ نمبر', value: rec.examPart1Marks, isLtr: true },
            { label: 'سالانہ امتحان پارٹ 2 : حاصل کردہ نمبر', value: rec.examPart2Marks, isLtr: true },
            { label: 'مجموعی حاصل کردہ نمبر', value: rec.totalMarks, isLtr: true },
            { label: 'ملاحظات / عذر', value: rec.remarks },
        ];

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="form-content">
                    <Card
                        headerLeft={`فارم نمبر ${index + 1} کی تفصیلات`}
                        headerRight={rec.studentName || 'امیدوار'}
                        bodyStyle={{ padding: '16px 24px 32px' }}
                    >
                        <p
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '14px',
                                color: '#888',
                                textAlign: 'left',
                                marginBottom: '16px',
                            }}
                        >
                            Submitted: {rec.submittedAt}
                        </p>

                        <DataTable sectionTitle="بنیادی انتخاب" rows={step1Rows} />
                        <DataTable
                            sectionTitle={isNew ? 'نیا داخلہ کوائف' : 'زیر تعلیم کوائف'}
                            rows={step2Rows}
                        />

                        {/* Document URLs Section */}
                        {(rec.certificateUrls?.length || rec.cnicUrls?.length || rec.additionalUrls?.length) ? (
                            <div style={{ marginTop: '32px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                                <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#058464' }}>
                                    اپ لوڈ شدہ دستاویزات
                                </h3>
                                
                                {rec.certificateUrls && rec.certificateUrls.length > 0 && (
                                    <div style={{ marginBottom: '16px' }}>
                                        <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                                            اسناد / سرٹیفیکیٹ:
                                        </p>
                                        {rec.certificateUrls.map((url, idx) => (
                                            <a
                                                key={idx}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'block',
                                                    padding: '8px 12px',
                                                    marginBottom: '6px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '6px',
                                                    color: '#058464',
                                                    textDecoration: 'none',
                                                    fontSize: '14px',
                                                    fontFamily: 'Roboto, sans-serif'
                                                }}
                                            >
                                                📄 Certificate {idx + 1}
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {rec.cnicUrls && rec.cnicUrls.length > 0 && (
                                    <div style={{ marginBottom: '16px' }}>
                                        <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                                            شناختی کارڈ / ب فارم:
                                        </p>
                                        {rec.cnicUrls.map((url, idx) => (
                                            <a
                                                key={idx}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'block',
                                                    padding: '8px 12px',
                                                    marginBottom: '6px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '6px',
                                                    color: '#058464',
                                                    textDecoration: 'none',
                                                    fontSize: '14px',
                                                    fontFamily: 'Roboto, sans-serif'
                                                }}
                                            >
                                                🆔 CNIC {idx + 1}
                                            </a>
                                        ))}
                                    </div>
                                )}

                                {rec.additionalUrls && rec.additionalUrls.length > 0 && (
                                    <div style={{ marginBottom: '16px' }}>
                                        <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                                            اضافی دستاویزات:
                                        </p>
                                        {rec.additionalUrls.map((url, idx) => (
                                            <a
                                                key={idx}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'block',
                                                    padding: '8px 12px',
                                                    marginBottom: '6px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '6px',
                                                    color: '#058464',
                                                    textDecoration: 'none',
                                                    fontSize: '14px',
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

                        <div className="success-buttons">
                            <button className="submit-button" onClick={() => navigate('/records')}>
                                واپس فارمز کی فہرست
                                <span className="button-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                </span>
                            </button>
                            <button className="submit-button" onClick={() => navigate('/')}>
                                واپس ہوم پیج
                                <span className="button-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
