import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="form-content">
                    <Card>
                        <p className="redDescription textCenter" style={{ fontSize: '42px', marginBottom: '24px' }}>
                            داخلہ فارم (طلباء / طالبات)
                        </p>

                        <p className="description textCenter" style={{ fontSize: '30px', marginBottom: '16px' }}>
                            تمام کوائف انتہائی احتیاط سے مکمل کئے جائیں
                        </p>

                        <hr className="divider" />

                        <p className="description" style={{ marginTop: '24px' }}>
                            مکرمی جناب مہتمم صاحب ! السلام علیکم ورحمۃ اللہ
                        </p>

                        <p className="description" style={{ marginTop: '24px' }}>
                            <span className="red_text" style={{ fontSize: '28px' }}>ہدایات و ضوابط</span>
                            {' '}
                            <a 
                                href="/TermsAndConditions.jpeg" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                    color: '#2196f3', 
                                    textDecoration: 'underline',
                                    fontSize: '22px',
                                    cursor: 'pointer',
                                    fontFamily: 'MehrNastaliq'
                                }}
                            >
                                (دیکھنے کے لیے یہاں کلک کریں)
                            </a>
                        </p>

                        <p className="description">
                            .میں نے جامعہ کے قواعد وضوابط اورہدایات اچھی طرح پڑھ اور سمجھ لی ہیں
                        </p>

                        <p className="description">
                            .میں ان پر سچّی سے عمل پیرا ہونے کا عہد کرتا/کرتی ہوں
                        </p>

                        <p className="pinkText">
    خلاف ورزی کی صورت میں آپ کو سخت تادیبی کارروائی کا اختیار ہوگا ۔
                        </p>

                        <hr className="divider" />

                        <p className="greenDescription textCenter" style={{ fontSize: '28px', marginTop: '16px' }}>
                            میرے کوائف حسب ذیل ہیں
                        </p>

                        <p className="description textCenter" style={{ fontSize: '26px' }}>
    ان کی روشنی میں مجھے اپنے زیر سایہ تعلیم حاصل کرنے کے داخلہ عطا فرمایا جائے
                        </p>

                        <hr className="divider" />

                        <div className="flex row alignCenter" style={{ gap: '16px', marginTop: '16px' }}>
                            <p className="description">قواعد و ضوابط پڑھ لیے ہیں تو فارم پُر کریں ۔</p>
                            <button
                                className="submit-button"
                                id="btn-fill-form"
                                onClick={() => navigate('/cnic')}
                            >
                                فارم پُر کرنے کے لیے یہاں کلک کریں
                                <span className="button-icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                        <line x1="16" y1="13" x2="8" y2="13"/>
                                        <line x1="16" y1="17" x2="8" y2="17"/>
                                        <polyline points="10 9 9 9 8 9"/>
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
