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
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
