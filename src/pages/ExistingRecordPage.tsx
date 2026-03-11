import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ur-PK');
    };

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="form-content" style={{ marginTop: '120px' }}>
                    <Card headerLeft="موجودہ فارم" headerRight="آپ کا فارم پہلے سے جمع ہے">
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <p className="description" style={{ fontSize: '28px', color: '#d32f2f' }}>
                                اس شناختی کارڈ نمبر سے فارم پہلے سے جمع ہو چکا ہے
                            </p>
                            <p className="description" style={{ fontSize: '24px', marginTop: '16px' }}>
                                جمع کرنے کی تاریخ: {formatDate(record.submittedAt)}
                            </p>
                        </div>

                        <div className="record-details" style={{ textAlign: 'right' }}>
                            <h3 style={{ fontSize: '32px', marginBottom: '24px', color: '#1976d2' }}>
                                ذاتی معلومات
                            </h3>
                            
                            <div className="detail-row">
                                <span className="detail-label">نام طالب/طالبہ:</span>
                                <span className="detail-value">{record.studentName}</span>
                            </div>

                            {record.fatherName && (
                                <div className="detail-row">
                                    <span className="detail-label">والد کا نام:</span>
                                    <span className="detail-value">{record.fatherName}</span>
                                </div>
                            )}

                            <div className="detail-row">
                                <span className="detail-label">تاریخ پیدائش:</span>
                                <span className="detail-value">{formatDate(record.dob)}</span>
                            </div>

                            <div className="detail-row">
                                <span className="detail-label">شناختی کارڈ نمبر:</span>
                                <span className="detail-value" style={{ direction: 'ltr', textAlign: 'right' }}>
                                    {record.cnic}
                                </span>
                            </div>

                            <div className="detail-row">
                                <span className="detail-label">فون نمبر:</span>
                                <span className="detail-value" style={{ direction: 'ltr', textAlign: 'right' }}>
                                    {record.phone}
                                </span>
                            </div>

                            {record.whatsapp && (
                                <div className="detail-row">
                                    <span className="detail-label">وٹس ایپ نمبر:</span>
                                    <span className="detail-value" style={{ direction: 'ltr', textAlign: 'right' }}>
                                        {record.whatsapp}
                                    </span>
                                </div>
                            )}

                            <div className="detail-row">
                                <span className="detail-label">موجودہ پتا:</span>
                                <span className="detail-value">{record.currentAddress}</span>
                            </div>

                            <h3 style={{ fontSize: '32px', marginTop: '32px', marginBottom: '24px', color: '#1976d2' }}>
                                تعلیمی معلومات
                            </h3>

                            <div className="detail-row">
                                <span className="detail-label">داخلہ کی قسم:</span>
                                <span className="detail-value">{record.admissionType}</span>
                            </div>

                            <div className="detail-row">
                                <span className="detail-label">صنف:</span>
                                <span className="detail-value">{record.gender}</span>
                            </div>

                            <div className="detail-row">
                                <span className="detail-label">شعبہ:</span>
                                <span className="detail-value">{record.department}</span>
                            </div>

                            {record.requiredGrade && (
                                <div className="detail-row">
                                    <span className="detail-label">مطلوبہ درجہ:</span>
                                    <span className="detail-value">{record.requiredGrade}</span>
                                </div>
                            )}

                            {record.registrationNo && (
                                <div className="detail-row">
                                    <span className="detail-label">رجسٹریشن نمبر:</span>
                                    <span className="detail-value">{record.registrationNo}</span>
                                </div>
                            )}

                            {record.lastYearGrade && (
                                <div className="detail-row">
                                    <span className="detail-label">پچھلے سال کا درجہ:</span>
                                    <span className="detail-value">{record.lastYearGrade}</span>
                                </div>
                            )}

                            {record.nextYearGrade && (
                                <div className="detail-row">
                                    <span className="detail-label">آئندہ درجہ:</span>
                                    <span className="detail-value">{record.nextYearGrade}</span>
                                </div>
                            )}
                        </div>

                        <div className="form-footer" style={{ marginTop: '48px', textAlign: 'center' }}>
                            <button 
                                className="submit-button" 
                                onClick={() => navigate('/')}
                                style={{ width: 'auto', padding: '16px 48px' }}
                            >
                                واپس ہوم پیج
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
