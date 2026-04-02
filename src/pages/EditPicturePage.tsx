import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import FormField from '../components/FormField';
import ConfirmModal from '../components/ConfirmModal';
import { useToast } from '../components/ToastContainer';
import { api } from '../services/api';
import type { SubmittedRecord } from '../types';

export default function EditPicturePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const record = location.state?.record as SubmittedRecord;

    const [loading, setLoading] = useState(false);
    const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingDeleteAction, setPendingDeleteAction] = useState<(() => void) | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!record) {
        navigate('/');
        return null;
    }

    const isNew = record.admissionType === 'نیا داخلہ';

    const validateFile = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const fileType = file.type;

            if (fileType.startsWith('image/')) {
                const img = new Image();
                const objectUrl = URL.createObjectURL(file);

                img.onload = () => {
                    URL.revokeObjectURL(objectUrl);
                    resolve(true);
                };

                img.onerror = () => {
                    URL.revokeObjectURL(objectUrl);
                    resolve(false);
                };

                img.src = objectUrl;
            } else {
                resolve(true);
            }
        });
    };

    const handleAdditionalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newFiles: File[] = [];
            const duplicates: string[] = [];
            let hasEmptyFile = false;
            let hasCorruptFile = false;

            const currentTotalSize = additionalFiles.reduce((sum, file) => sum + file.size, 0);
            const maxSize = 20 * 1024 * 1024; // 20MB

            for (const file of filesArray) {
                if (file.size === 0) {
                    hasEmptyFile = true;
                    continue;
                }

                const isValid = await validateFile(file);
                if (!isValid) {
                    hasCorruptFile = true;
                    continue;
                }

                const isDuplicate = additionalFiles.some(existingFile => 
                    existingFile.name === file.name && existingFile.size === file.size
                );
                if (isDuplicate) {
                    duplicates.push(file.name);
                } else {
                    newFiles.push(file);
                }
            }

            const newTotalSize = newFiles.reduce((sum, file) => sum + file.size, 0);
            if (currentTotalSize + newTotalSize > maxSize) {
                showToast('تصویر کی کل سائز 20MB سے زیادہ نہیں ہو سکتی', 'error');
                e.target.value = '';
                return;
            }

            if (hasEmptyFile) {
                showToast('فائل خالی ہے، اپ لوڈ نہیں کی جا سکتی', 'error');
            }

            if (hasCorruptFile) {
                showToast('فائل خراب ہے، اپ لوڈ نہیں کی جا سکتی', 'error');
            }

            if (duplicates.length > 0) {
                showToast('یہ فائل پہلے سے منتخب ہے، دوبارہ اپ لوڈ نہیں کی جا سکتی', 'warning');
            }

            if (newFiles.length > 0) {
                setAdditionalFiles(prev => [...prev, ...newFiles]);
            }

            e.target.value = '';
        }
    };

    const removeAdditionalFile = (index: number) => {
        setPendingDeleteAction(() => () => {
            setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
        });
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (pendingDeleteAction) {
            pendingDeleteAction();
        }
        setShowConfirmModal(false);
        setPendingDeleteAction(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setPendingDeleteAction(null);
    };

    const previewFile = (file: File) => {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
    };

    const handleSubmit = async () => {
        if (additionalFiles.length === 0) {
            showToast('تصویر اپ لوڈ کرنا لازمی ہے', 'error');
            return;
        }

        const formDataToSubmit = new FormData();
        
        additionalFiles.forEach((file) => {
            formDataToSubmit.append('additionalDocuments', file);
        });

        try {
            setLoading(true);
            showToast('تصویر اپ ڈیٹ ہو رہی ہے...', 'info');
            
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${API_BASE_URL}/api/records/${record.id}/picture`, {
                method: 'PATCH',
                body: formDataToSubmit
            });

            const data = await response.json();

            if (response.ok) {
                console.log('=== PICTURE UPDATE SUCCESS ===');
                console.log('1. Backend PATCH response:', data);
                
                // ALWAYS fetch the complete updated record from backend to ensure we have the latest data
                console.log('2. Fetching complete updated record from backend...');
                const updatedRecord = await api.getRecordById(record.id);
                
                console.log('3. Fetched complete record:', updatedRecord);
                console.log('4. Updated additionalUrls:', updatedRecord.additionalUrls);
                console.log('=== END PICTURE UPDATE ===');
                
                showToast('تصویر کامیابی سے اپ ڈیٹ ہو گئی', 'success');
                
                // Navigate with the freshly fetched record
                navigate('/existing-record', { 
                    state: { record: updatedRecord },
                    replace: true 
                });
            } else {
                showToast(data.message || 'تصویر اپ ڈیٹ کرنے میں خرابی', 'error');
            }
        } catch (err) {
            showToast('تصویر اپ ڈیٹ کرنے میں خرابی', 'error');
            console.error('Picture update failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="App">
                <div className="form-content" style={{ marginTop: '170px' }}>
                    <Card headerLeft="تصویر اپ ڈیٹ کریں" headerRight={`${record.studentName} - تصویر میں تبدیلی`}>
                        <p className="description textCenter" style={{ fontSize: '28px', marginBottom: '24px', color: '#058464' }}>
                            صرف تصویر اپ ڈیٹ کی جا سکتی ہے۔ باقی معلومات تبدیل نہیں کی جا سکتیں۔
                        </p>

                        {/* Display all fields as disabled */}
                        <FormField 
                            label="نام طالب/ طالبہ" 
                            id="student-name" 
                            value={record.studentName} 
                            onChange={() => {}}
                            readOnly
                        />
                        
                        {!isNew && (
                            <FormField 
                                label="داخلہ نمبر (رجسٹریشن نمبر)" 
                                id="registration-no" 
                                value={record.registrationNo} 
                                onChange={() => {}}
                                readOnly
                            />
                        )}

                        <FormField 
                            label="والد کا نام" 
                            id="father-name" 
                            value={record.fatherName || ''} 
                            onChange={() => {}}
                            readOnly
                        />

                        <FormField 
                            label="تاریخ پیدائش" 
                            type="date" 
                            id="dob" 
                            value={record.dob} 
                            onChange={() => {}}
                            readOnly
                        />

                        <FormField
                            label="شناختی کارڈ نمبر/ب فارم نمبر"
                            id="cnic-field"
                            value={record.cnic}
                            onChange={() => {}}
                            readOnly
                        />

                        <FormField
                            label="فون نمبر"
                            id="phone"
                            value={record.phone}
                            onChange={() => {}}
                            readOnly
                        />

                        <FormField
                            label="موبائل نمبر"
                            id="whatsapp"
                            value={record.whatsapp || record.phone}
                            onChange={() => {}}
                            readOnly
                        />

                        <FormField 
                            label="موجودہ پتہ (رہائش)" 
                            type="textarea" 
                            id="current-address" 
                            value={record.currentAddress} 
                            onChange={() => {}}
                            readOnly
                        />

                        <FormField 
                            label="شعبہ (بنین/بنات)" 
                            id="gender" 
                            value={record.gender} 
                            onChange={() => {}}
                            readOnly
                        />

                        <FormField 
                            label="درس نظامی" 
                            id="department" 
                            value={record.department} 
                            onChange={() => {}}
                            readOnly
                        />

                        {isNew ? (
                            <>
                                <FormField
                                    label="دینی / عصری تعلیم"
                                    id="education-type"
                                    value={record.educationType}
                                    onChange={() => {}}
                                    readOnly
                                />
                                <FormField
                                    label="مطلوبہ شعبہ و درجہ تعلیم"
                                    id="required-grade"
                                    value={record.requiredGrade}
                                    onChange={() => {}}
                                    readOnly
                                />
                            </>
                        ) : (
                            <>
                                <FormField
                                    label="شعبہ و درجہ (جس میں پچھلے سال زیر تعلیم تھے)"
                                    id="last-year-grade"
                                    value={record.lastYearGrade}
                                    onChange={() => {}}
                                    readOnly
                                />
                                <FormField
                                    label="آئندہ شعبہ و درجہ تعلیم (بعد از ترقی)"
                                    id="next-year-grade"
                                    value={record.nextYearGrade}
                                    onChange={() => {}}
                                    readOnly
                                />
                            </>
                        )}

                        {/* Picture Upload Section - ENABLED */}
                        <div style={{ marginTop: '32px', padding: '24px', backgroundColor: '#f0f8ff', borderRadius: '12px', border: '2px solid #058464' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#058464' }}>
                                تصویر اپ ڈیٹ کریں
                            </h3>

                            {/* Current Picture */}
                            {record.additionalUrls && record.additionalUrls.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ fontSize: '18px', marginBottom: '12px', color: '#333' }}>
                                        موجودہ تصویر:
                                    </p>
                                    <div style={{ 
                                        width: '120px', 
                                        height: '150px', 
                                        border: '2px solid #058464',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        backgroundColor: '#f5f5f5'
                                    }}>
                                        <img 
                                            src={record.additionalUrls[0]} 
                                            alt="Current Profile" 
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover' 
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div style={{ marginBottom: '24px' }}>
                                <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                    نئی تصویر اپ لوڈ کریں <span className="required">*</span>
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleAdditionalUpload}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '12px',
                                        border: '2px dashed #058464',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        backgroundColor: '#fff'
                                    }}
                                />
                                <p style={{ fontSize: '14px', color: '#666', marginTop: '6px', fontFamily: 'Roboto, sans-serif' }}>
                                    Allowed formats: .jpg / .jpeg, .png, .gif, .webp, .jfif, .svg, .heic / .heif
                                </p>
                                <p style={{ fontSize: '16px', color: '#666', marginTop: '4px' }}>
                                    زیادہ سے زیادہ سائز 20MB ہے
                                </p>
                                
                                {/* Photo Instructions */}
                                <div style={{ 
                                    marginTop: '16px', 
                                    padding: '16px', 
                                    backgroundColor: '#fff', 
                                    borderRadius: '8px',
                                    border: '1px solid #058464'
                                }}>
                                    <h4 style={{ fontSize: '20px', color: '#058464', marginBottom: '12px', fontWeight: 'bold' }}>
                                        ہدایات برائے تصویر کشی ⏪ برائے امیدوار ⏩
                                    </h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        <li style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.6' }}>
                                            🟡 تصویر پاسپورٹ سائز میں ہو۔
                                        </li>
                                        <li style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.6' }}>
                                            🟡 تصویر سامنے سے بنائیں اور اضافی منظر کو کراپ کر دیں۔
                                        </li>
                                        <li style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.6' }}>
                                            🟡 عمامہ شریف زیب تن کر کے تصویر بنائیں۔
                                        </li>
                                        <li style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.6' }}>
                                            🟡 نیلے بیک گراؤنڈ کے ساتھ تصویر بنائیں
                                        </li>
                                        <li style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.6' }}>
                                            🟡 فلٹرز کا استعمال نہ کریں۔
                                        </li>
                                        <li style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.6' }}>
                                            🟡 تصویر چشمہ اتار کر بنائیں
                                        </li>
                                        <li style={{ fontSize: '16px', marginBottom: '8px', lineHeight: '1.6' }}>
                                            🟡 تصویر واضح اور اچھی کوالٹی میں بنائیں۔
                                        </li>
                                        <li style={{ fontSize: '16px', marginBottom: '0', lineHeight: '1.6' }}>
                                            🟡 تصویر بنواتے وقت قمیض کے بٹن بند رکھیں۔
                                        </li>
                                    </ul>
                                </div>

                                {additionalFiles.length > 0 && (
                                    <div style={{ marginTop: '12px' }}>
                                        <p style={{ fontSize: '16px', marginBottom: '8px', color: '#058464' }}>
                                            منتخب شدہ فائلیں: {additionalFiles.length}
                                        </p>
                                        {additionalFiles.map((file, index) => (
                                            <div key={index} style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between',
                                                padding: '6px 10px',
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '6px',
                                                marginBottom: '6px'
                                            }}>
                                                <span 
                                                    onClick={() => previewFile(file)}
                                                    style={{ 
                                                        fontSize: '14px', 
                                                        fontFamily: 'Roboto, sans-serif',
                                                        cursor: 'pointer',
                                                        color: '#058464',
                                                        textDecoration: 'underline',
                                                        flex: 1
                                                    }}
                                                >
                                                    {file.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAdditionalFile(index)}
                                                    style={{
                                                        background: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        padding: '3px 10px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-footer" style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button 
                                className="submit-button" 
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{ flex: 1, maxWidth: '300px' }}
                            >
                                {loading ? 'اپ ڈیٹ ہو رہا ہے...' : 'تصویر اپ ڈیٹ کریں'}
                                {!loading && (
                                    <span className="button-icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                )}
                            </button>
                            <button 
                                className="submit-button btn-back" 
                                onClick={() => navigate('/existing-record', { state: { record } })}
                                style={{ flex: 1, maxWidth: '300px' }}
                            >
                                واپس
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
            
            <ConfirmModal
                isOpen={showConfirmModal}
                message="کیا آپ واقعی یہ فائل حذف کرنا چاہتے ہیں؟"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
}
