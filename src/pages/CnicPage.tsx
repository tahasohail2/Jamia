import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { useFormContext } from '../context/FormContext';
import { useToast } from '../components/ToastContainer';
import { api } from '../services/api';

export default function CnicPage() {
    const navigate = useNavigate();
    const { updateFormData } = useFormContext();
    const { showToast } = useToast();
    const [cnic, setCnic] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (val: string) => {
        setCnic(val.replace(/[^0-9]/g, ''));
    };

    const handleSubmit = async () => {
        if (!cnic || cnic.length !== 13) {
            showToast('شناختی کارڈ / ب فارم نمبر 13 ہندسوں پر مشتمل ہونا چاہیے', 'error');
            return;
        }
        
        setLoading(true);

        try {
            // Format CNIC with hyphens for API check
            const formattedCnic = `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`;
            
            showToast('چیک ہو رہا ہے...', 'info');
            
            // Check if CNIC already exists
            const result = await api.checkCnicExists(formattedCnic);
            
            if (result.exists && result.record) {
                // CNIC exists, navigate to existing record page
                showToast('یہ شناختی کارڈ پہلے سے موجود ہے', 'warning');
                navigate('/existing-record', { state: { record: result.record } });
            } else {
                // CNIC doesn't exist, proceed with form
                showToast('شناختی کارڈ تصدیق ہو گیا', 'success');
                updateFormData({ cnic });
                navigate('/instructions');
            }
        } catch (err) {
            console.error('Error checking CNIC:', err);
            showToast('خرابی: براہ کرم دوبارہ کوشش کریں', 'error');
            // On error, allow user to proceed
            updateFormData({ cnic });
            navigate('/instructions');
        } finally {
            setLoading(false);
        }
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
                            درج کریں ۔{' '}
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
                            <button 
                                className={`submit-button ${loading ? 'loading' : ''}`}
                                id="btn-cnic-submit" 
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'چیک ہو رہا ہے...' : 'آن لائن فارم پُر کرنے کی ہدایات پڑھیں'}
                                {!loading && (
                                    <span className="button-icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 11l3 3L22 4"/>
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
