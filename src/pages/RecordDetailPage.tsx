import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import { useFormContext } from '../context/FormContext';
import type { DataRow } from '../components/DataTable';

export default function RecordDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { records } = useFormContext();

    const index = Number(id);
    const rec = records[index];

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

                        <div className="success-buttons">
                            <button className="submit-button" onClick={() => navigate('/records')}>
                                واپس فارمز کی فہرست
                            </button>
                            <button className="submit-button" onClick={() => navigate('/')}>
                                واپس ہوم پیج
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
