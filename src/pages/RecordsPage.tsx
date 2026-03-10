import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useFormContext } from '../context/FormContext';

export default function RecordsPage() {
    const navigate = useNavigate();
    const { records, deleteRecord, clearAllRecords } = useFormContext();
    const count = records.length;

    if (count === 0) {
        return (
            <>
                <Navbar />
                <div className="App">
                    <div className="form-content">
                        <Card headerLeft="جمع شدہ فارمز">
                            <div className="empty-state">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="#999">
                                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                                </svg>
                                <p className="description textCenter" style={{ fontSize: '28px' }}>
                                    ابھی تک کوئی فارم جمع نہیں ہوا
                                </p>
                                <div style={{ marginTop: '32px' }}>
                                    <button className="submit-button" onClick={() => navigate('/')}>
                                        واپس ہوم پیج
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </>
        );
    }

    const handleDelete = (index: number) => {
        if (window.confirm('کیا آپ واقعی یہ ریکارڈ حذف کرنا چاہتے ہیں؟')) {
            deleteRecord(index);
        }
    };

    const handleClearAll = () => {
        if (window.confirm('کیا آپ واقعی تمام ریکارڈز حذف کرنا چاہتے ہیں؟')) {
            clearAllRecords();
        }
    };

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="form-content">
                    <Card
                        headerLeft="تمام جمع شدہ فارمز"
                        headerRight={`کل: ${count}`}
                        bodyStyle={{ padding: '16px 24px' }}
                    >
                        <div
                            className="flex row"
                            style={{ gap: '16px', marginBottom: '24px', justifyContent: 'flex-start' }}
                        >
                            <button className="submit-button" onClick={() => navigate('/')}>
                                واپس ہوم پیج
                            </button>
                            <button
                                className="btn-outline-green"
                                style={{ borderColor: '#c62828', color: '#c62828' }}
                                onClick={handleClearAll}
                            >
                                تمام ریکارڈ حذف کریں
                            </button>
                        </div>

                        <div className="records-list">
                            {records.map((rec, idx) => {
                                const isNew = rec.admissionType === 'نیا داخلہ';
                                return (
                                    <div className="record-card" key={rec.id}>
                                        <div className="record-card-header">
                                            <h3>{rec.studentName || 'امیدوار'}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span
                                                    style={{
                                                        fontSize: '16px',
                                                        opacity: 0.8,
                                                        fontFamily: 'Roboto, sans-serif',
                                                    }}
                                                >
                                                    {rec.submittedAt}
                                                </span>
                                                <div className="record-number">{idx + 1}</div>
                                            </div>
                                        </div>
                                        <div className="record-card-body">
                                            <div className="record-mini-grid">
                                                <MiniItem label="نام" value={rec.studentName} />
                                                <MiniItem label="والد کا نام" value={rec.fatherName} />
                                                <MiniItem label="داخلہ کی نوعیت" value={rec.admissionType} />
                                                <MiniItem
                                                    label="فون نمبر"
                                                    value={rec.phone}
                                                    style={{ fontFamily: 'Roboto', direction: 'ltr', textAlign: 'left' }}
                                                />
                                                <MiniItem label="شعبہ" value={rec.department} />
                                                <MiniItem
                                                    label={isNew ? 'مطلوبہ درجہ' : 'آئندہ درجہ'}
                                                    value={isNew ? rec.requiredGrade : rec.nextYearGrade}
                                                />
                                            </div>
                                            <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                                                <button
                                                    className="btn-outline-green"
                                                    onClick={() => navigate(`/records/${idx}`)}
                                                >
                                                    تفصیلات دیکھیں
                                                </button>
                                                <button
                                                    className="btn-outline-green"
                                                    style={{ borderColor: '#c62828', color: '#c62828' }}
                                                    onClick={() => handleDelete(idx)}
                                                >
                                                    حذف کریں
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

/* ─── Mini grid item ─────────────────────────────────── */
interface MiniItemProps {
    label: string;
    value: string;
    style?: React.CSSProperties;
}

function MiniItem({ label, value, style }: MiniItemProps) {
    return (
        <div className="record-mini-item">
            <span className="record-mini-label">{label}</span>
            <span className="record-mini-value" style={style}>
                {value || '—'}
            </span>
        </div>
    );
}
