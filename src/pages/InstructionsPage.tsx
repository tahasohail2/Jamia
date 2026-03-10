import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function InstructionsPage() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="form-content">
                    <Card>
                        <p className="redDescription textCenter" style={{ fontSize: '30px' }}>
                            آن لائن فارم "2" مراحل پر مشتمل ہے ۔
                        </p>

                        <p className="redDescription textCenter" style={{ fontSize: '36px', margin: '24px 0' }}>
                            امیدوار آن لائن فارم میں ایک بار اگلے مرحلے میں جا کر پچھلے مرحلے میں واپس نہیں جاسکتا ۔ لہذا احتیاط سے آن لائن فارم پُر کرے ۔
                        </p>

                        <p className="description" style={{ marginTop: '24px' }}>
                            <span className="red_text" style={{ fontSize: '28px' }}>پہلا مرحلہ :</span>{' '}
                            پہلے مرحلے میں{' '}
                            <span className="red_text" style={{ fontSize: '28px' }}>داخلے کی نوعیت</span>،{' '}
                            <span className="red_text" style={{ fontSize: '28px' }}>جنس</span> اور{' '}
                            <span className="red_text" style={{ fontSize: '28px' }}>شعبہ</span> منتخب کریں ۔ (*) ستارے کے نشان والی تمام معلومات پُر کرنا لازمی ہیں ۔
                        </p>

                        <p className="description" style={{ marginTop: '24px' }}>
                            <span className="red_text" style={{ fontSize: '28px' }}>دوسرا مرحلہ :</span>{' '}
                            دوسرے مرحلے میں اپنی{' '}
                            <span className="green_text" style={{ fontSize: '28px' }}>ذاتی معلومات</span> اور{' '}
                            <span className="green_text" style={{ fontSize: '28px' }}>تعلیمی کوائف</span> درج کریں ۔
                        </p>

                        <hr className="divider" />

                        <div className="flex row alignCenter" style={{ gap: '16px', marginTop: '16px' }}>
                            <p className="description">ہدایات پڑھ لی ہیں تو فارم پُر کرتے ہیں ۔</p>
                            <button
                                className="submit-button"
                                id="btn-start-form"
                                onClick={() => navigate('/form/step1')}
                            >
                                فارم پُر کریں
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
