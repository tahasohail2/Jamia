import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useFormContext } from '../context/FormContext';

export default function CnicPage() {
    const navigate = useNavigate();
    const { updateFormData } = useFormContext();
    const [cnic, setCnic] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (val: string) => {
        setCnic(val.replace(/[^0-9]/g, ''));
    };

    const handleSubmit = () => {
        if (!cnic || cnic.length !== 13) {
            setError(true);
            return;
        }
        setError(false);
        updateFormData({ cnic });
        navigate('/instructions');
    };

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="form-content">
                    <Card title="شناختی کارڈ / ب فارم نمبر فراہم کریں">
                        <p className="description textCenter" style={{ fontSize: '32px', marginBottom: '32px' }}>
                            امیدوار اپنا{' '}
                            <span className="red_text" style={{ fontSize: '32px' }}>شناختی کارڈ نمبر</span>{' '}
                            یا{' '}
                            <span className="red_text" style={{ fontSize: '32px' }}>ب فارم نمبر</span>{' '}
                            درج کرے ۔{' '}
                            <span className="green_text" style={{ fontSize: '32px' }}>(بغیر ڈیش کے)</span>
                        </p>

                        <div className="form-container">
                            <label htmlFor="cnic-input">
                                امیدوار کا شناختی کارڈ <span className="green_text">یا</span> ب فارم نمبر
                                <span className="redText">*</span>
                            </label>
                            <input
                                type="text"
                                id="cnic-input"
                                maxLength={13}
                                placeholder="xxxxxxxxxxxxx"
                                value={cnic}
                                onChange={(e) => handleChange(e.target.value)}
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    direction: 'ltr',
                                    textAlign: 'right',
                                    fontSize: '22px',
                                }}
                            />
                        </div>

                        <div style={{ marginTop: '32px' }}>
                            <button className="submit-button" id="btn-cnic-submit" onClick={handleSubmit}>
                                آن لائن فارم پُر کرنے کی ہدایات پڑھیں
                            </button>
                        </div>

                        {error && (
                            <div className="form-field-error mt-16">
                                شناختی کارڈ / ب فارم نمبر 13 ہندسوں پر مشتمل ہونا چاہیے
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
}
