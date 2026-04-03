import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Stepper from '../components/Stepper';
import Card from '../components/Card';
import FormField from '../components/FormField';
import ConfirmModal from '../components/ConfirmModal';
import { useFormContext } from '../context/FormContext';
import { useToast } from '../components/ToastContainer';
import { PLACEHOLDER_OPTION, gradeOptions } from '../constants';

/* ─── Shared LTR input style ─────────────────────────── */
const ltrStyle: React.CSSProperties = {
    fontFamily: 'Roboto, sans-serif',
    direction: 'ltr',
    textAlign: 'right',
};

export default function FormStep2() {
    const navigate = useNavigate();
    const { formData, error: apiError } = useFormContext();
    const { showToast } = useToast();
    const isNew = formData.admissionType === 'نیا داخلہ';
    const [loading, setLoading] = useState(false);

    /* ── local state ── */
    const [studentName, setStudentName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [dob, setDob] = useState('');
    const [cnic, setCnic] = useState(formData.cnic || '');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    // New admission
    const [educationType, setEducationType] = useState('');
    const [requiredGrade, setRequiredGrade] = useState(PLACEHOLDER_OPTION);
    const [previousEducation, setPreviousEducation] = useState('');
    // Existing student
    const [registrationNo, setRegistrationNo] = useState('');
    const [lastYearGrade, setLastYearGrade] = useState(PLACEHOLDER_OPTION);
    const [nextYearGrade, setNextYearGrade] = useState(PLACEHOLDER_OPTION);
    const [remarks, setRemarks] = useState('');

    const [error, setError] = useState(false);
    
    /* ── Document uploads (optional) ── */
    const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
    const [cnicFiles, setCnicFiles] = useState<File[]>([]);
    const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
    
    /* ── Confirmation modal state ── */
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingDeleteAction, setPendingDeleteAction] = useState<(() => void) | null>(null);
    
    /* ── Field-level validation errors ── */
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const clearFieldError = (fieldName: string) => {
        if (fieldErrors[fieldName]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    // Wrapper functions to clear errors on change
    const handleStudentNameChange = (value: string) => {
        setStudentName(value);
        clearFieldError('studentName');
    };

    const handleDobChange = (value: string) => {
        setDob(value);
        clearFieldError('dob');
    };

    const handleCnicChange = (value: string) => {
        setCnic(value);
        clearFieldError('cnic');
    };

    const handlePhoneChange = (value: string) => {
        setPhone(value);
        clearFieldError('phone');
    };

    const handleWhatsappChange = (value: string) => {
        setWhatsapp(value);
        clearFieldError('whatsapp');
    };

    const handleCurrentAddressChange = (value: string) => {
        setCurrentAddress(value);
        clearFieldError('currentAddress');
    };

    const handleEducationTypeChange = (value: string) => {
        setEducationType(value);
        clearFieldError('educationType');
    };

    const handleRequiredGradeChange = (value: string) => {
        setRequiredGrade(value);
        clearFieldError('requiredGrade');
    };

    const handleRegistrationNoChange = (value: string) => {
        setRegistrationNo(value);
        clearFieldError('registrationNo');
    };

    const handleLastYearGradeChange = (value: string) => {
        setLastYearGrade(value);
        clearFieldError('lastYearGrade');
    };

    const handleNextYearGradeChange = (value: string) => {
        setNextYearGrade(value);
        clearFieldError('nextYearGrade');
    };

    const validateFile = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const fileType = file.type;

            // Check if it's an image
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
            }
            // Check if it's a PDF
            else if (fileType === 'application/pdf') {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const content = e.target?.result as ArrayBuffer;
                    const arr = new Uint8Array(content);
                    
                    // Check PDF signature (starts with %PDF)
                    const isPDF = arr[0] === 0x25 && arr[1] === 0x50 && arr[2] === 0x44 && arr[3] === 0x46;
                    resolve(isPDF);
                };

                reader.onerror = () => {
                    resolve(false);
                };

                reader.readAsArrayBuffer(file.slice(0, 4));
            }
            // For other file types, accept them
            else {
                resolve(true);
            }
        });
    };

    const handleCertificateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newFiles: File[] = [];
            const duplicates: string[] = [];
            let hasEmptyFile = false;
            let hasCorruptFile = false;

            // Calculate current total size
            const currentTotalSize = certificateFiles.reduce((sum, file) => sum + file.size, 0);
            const maxSize = 20 * 1024 * 1024; // 20MB in bytes

            for (const file of filesArray) {
                // Check if file is empty
                if (file.size === 0) {
                    hasEmptyFile = true;
                    continue;
                }

                // Validate file integrity
                const isValid = await validateFile(file);
                if (!isValid) {
                    hasCorruptFile = true;
                    continue;
                }

                const isDuplicate = certificateFiles.some(existingFile => 
                    existingFile.name === file.name && existingFile.size === file.size
                );
                if (isDuplicate) {
                    duplicates.push(file.name);
                } else {
                    newFiles.push(file);
                }
            }

            // Check if adding new files exceeds 20MB limit
            const newTotalSize = newFiles.reduce((sum, file) => sum + file.size, 0);
            if (currentTotalSize + newTotalSize > maxSize) {
                showToast('اسناد کی کل سائز 20MB سے زیادہ نہیں ہو سکتی', 'error');
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
                setCertificateFiles(prev => [...prev, ...newFiles]);
            }

            // Reset input value to allow selecting the same file again if needed
            e.target.value = '';
        }
    };

    const handleCnicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newFiles: File[] = [];
            const duplicates: string[] = [];
            let hasEmptyFile = false;
            let hasCorruptFile = false;

            // Calculate current total size
            const currentTotalSize = cnicFiles.reduce((sum, file) => sum + file.size, 0);
            const maxSize = 20 * 1024 * 1024; // 20MB in bytes

            for (const file of filesArray) {
                // Check if file is empty
                if (file.size === 0) {
                    hasEmptyFile = true;
                    continue;
                }

                // Validate file integrity
                const isValid = await validateFile(file);
                if (!isValid) {
                    hasCorruptFile = true;
                    continue;
                }

                const isDuplicate = cnicFiles.some(existingFile => 
                    existingFile.name === file.name && existingFile.size === file.size
                );
                if (isDuplicate) {
                    duplicates.push(file.name);
                } else {
                    newFiles.push(file);
                }
            }

            // Check if adding new files exceeds 20MB limit
            const newTotalSize = newFiles.reduce((sum, file) => sum + file.size, 0);
            if (currentTotalSize + newTotalSize > maxSize) {
                showToast('شناختی کارڈ/ب فارم کی کل سائز 20MB سے زیادہ نہیں ہو سکتی', 'error');
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
                setCnicFiles(prev => [...prev, ...newFiles]);
            }

            // Reset input value
            e.target.value = '';
        }
    };

    const handleAdditionalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newFiles: File[] = [];
            const duplicates: string[] = [];
            let hasEmptyFile = false;
            let hasCorruptFile = false;

            // Calculate current total size
            const currentTotalSize = additionalFiles.reduce((sum, file) => sum + file.size, 0);
            const maxSize = 20 * 1024 * 1024; // 20MB in bytes

            for (const file of filesArray) {
                // Check if file is empty
                if (file.size === 0) {
                    hasEmptyFile = true;
                    continue;
                }

                // Validate file integrity
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

            // Check if adding new files exceeds 20MB limit
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
                // Clear picture error when file is uploaded
                clearFieldError('picture');
            }

            // Reset input value
            e.target.value = '';
        }
    };

    const removeCertificateFile = (index: number) => {
        setPendingDeleteAction(() => () => {
            setCertificateFiles(prev => prev.filter((_, i) => i !== index));
        });
        setShowConfirmModal(true);
    };

    const removeCnicFile = (index: number) => {
        setPendingDeleteAction(() => () => {
            setCnicFiles(prev => prev.filter((_, i) => i !== index));
        });
        setShowConfirmModal(true);
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
        const errors: Record<string, string> = {};
        
        /* ── Validate required fields ── */
        if (!studentName) {
            errors.studentName = 'نام طالب/طالبہ درج کریں';
            showToast('نام طالب/طالبہ درج کریں', 'error');
        }
        if (!dob) {
            errors.dob = 'تاریخ پیدائش منتخب کریں';
            showToast('تاریخ پیدائش منتخب کریں', 'error');
        }
        if (!cnic) {
            errors.cnic = 'شناختی کارڈ/ب فارم نمبر درج کریں';
            showToast('شناختی کارڈ/ب فارم نمبر درج کریں', 'error');
        } else if (cnic.length !== 13) {
            errors.cnic = 'شناختی کارڈ نمبر 13 ہندسوں پر مشتمل ہونا چاہیے';
            showToast('شناختی کارڈ نمبر 13 ہندسوں پر مشتمل ہونا چاہیے', 'error');
        }
        if (!phone) {
            errors.phone = 'فون نمبر درج کریں';
            showToast('فون نمبر درج کریں', 'error');
        } else if (phone.length !== 11) {
            errors.phone = 'فون نمبر 11 ہندسوں پر مشتمل ہونا چاہیے';
            showToast('فون نمبر 11 ہندسوں پر مشتمل ہونا چاہیے', 'error');
        } else if (!phone.startsWith('03')) {
            errors.phone = 'فون نمبر 03 سے شروع ہونا چاہیے';
            showToast('فون نمبر 03 سے شروع ہونا چاہیے', 'error');
        }
        if (whatsapp && whatsapp.length !== 11) {
            errors.whatsapp = 'وٹس ایپ نمبر 11 ہندسوں پر مشتمل ہونا چاہیے';
            showToast('وٹس ایپ نمبر 11 ہندسوں پر مشتمل ہونا چاہیے', 'warning');
        } else if (whatsapp && !whatsapp.startsWith('03')) {
            errors.whatsapp = 'وٹس ایپ نمبر 03 سے شروع ہونا چاہیے';
            showToast('وٹس ایپ نمبر 03 سے شروع ہونا چاہیے', 'warning');
        }
        if (!currentAddress) {
            errors.currentAddress = 'موجودہ پتا درج کریں';
            showToast('موجودہ پتا درج کریں', 'error');
        }
        
        // Validate picture upload (mandatory)
        if (additionalFiles.length === 0) {
            errors.picture = 'تصویر اپ لوڈ کرنا لازمی ہے';
            showToast('تصویر اپ لوڈ کرنا لازمی ہے', 'error');
        }

        if (isNew) {
            if (!educationType) {
                errors.educationType = 'دینی / عصری تعلیم درج کریں';
                showToast('دینی / عصری تعلیم درج کریں', 'error');
            }
            if (requiredGrade === PLACEHOLDER_OPTION) {
                errors.requiredGrade = 'مطلوبہ درجہ منتخب کریں';
                showToast('مطلوبہ درجہ منتخب کریں', 'error');
            }
        } else {
            if (!registrationNo) {
                errors.registrationNo = 'داخلہ نمبر درج کریں';
                showToast('داخلہ نمبر درج کریں', 'error');
            }
            if (lastYearGrade === PLACEHOLDER_OPTION) {
                errors.lastYearGrade = 'پچھلے سال کا درجہ منتخب کریں';
                showToast('پچھلے سال کا درجہ منتخب کریں', 'error');
            }
            if (nextYearGrade === PLACEHOLDER_OPTION) {
                errors.nextYearGrade = 'آئندہ درجہ منتخب کریں';
                showToast('آئندہ درجہ منتخب کریں', 'error');
            }
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setError(true);
            return;
        }

        setFieldErrors({});
        setError(false);

        /* ── Format CNIC: XXXXX-XXXXXXX-X ── */
        const formattedCnic = cnic.length === 13 
            ? `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}` 
            : cnic;

        /* ── Create FormData for file upload ── */
        const formDataToSubmit = new FormData();

        // Add all text fields
        formDataToSubmit.append('admissionType', formData.admissionType);
        formDataToSubmit.append('gender', formData.gender);
        formDataToSubmit.append('department', formData.department);
        formDataToSubmit.append('studentName', studentName);
        formDataToSubmit.append('fatherName', fatherName || '');
        formDataToSubmit.append('dob', dob);
        formDataToSubmit.append('cnic', formattedCnic);
        formDataToSubmit.append('phone', phone);
        formDataToSubmit.append('whatsapp', whatsapp || '');
        formDataToSubmit.append('fullAddress', fullAddress || '');
        formDataToSubmit.append('currentAddress', currentAddress);
        
        // New admission fields
        if (isNew) {
            formDataToSubmit.append('educationType', educationType);
            formDataToSubmit.append('requiredGrade', requiredGrade);
            formDataToSubmit.append('previousEducation', previousEducation || '');
        }
        
        // Existing student fields
        if (!isNew) {
            formDataToSubmit.append('registrationNo', registrationNo);
            formDataToSubmit.append('lastYearGrade', lastYearGrade);
            formDataToSubmit.append('nextYearGrade', nextYearGrade);
            formDataToSubmit.append('remarks', remarks || '');
        }

        // Add certificate files
        certificateFiles.forEach((file) => {
            formDataToSubmit.append('certificates', file);
        });

        // Add CNIC files
        cnicFiles.forEach((file) => {
            formDataToSubmit.append('cnicDocuments', file);
        });

        // Add additional files
        additionalFiles.forEach((file) => {
            formDataToSubmit.append('additionalDocuments', file);
        });

        try {
            setLoading(true);
            showToast('فارم جمع ہو رہا ہے...', 'info');
            
            // Send FormData directly to API
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${API_BASE_URL}/api/records`, {
                method: 'POST',
                body: formDataToSubmit
                // Don't set Content-Type header - browser will set it automatically with boundary
            });

            const data = await response.json();

            if (response.ok) {
                showToast('فارم کامیابی سے جمع ہو گیا', 'success');
                navigate('/success', { state: { record: data } });
            } else {
                showToast(data.message || 'فارم جمع کرنے میں خرابی', 'error');
            }
        } catch (err) {
            showToast('فارم جمع کرنے میں خرابی', 'error');
            console.error('Form submission failed:', err);
        } finally {
            setLoading(false);
        }
    };

    /* ═══════════════════════════════════════════════════════
       NEW ADMISSION FORM
       ═══════════════════════════════════════════════════════ */
    if (isNew) {
        return (
            <>
                <Navbar />
                <Stepper activeStep={2} />
                <div className="App">
                    <div className="form-content" style={{ marginTop: '170px' }}>
                        <Card headerLeft="دوسرا مرحلہ" headerRight="داخلہ کوائف (نیا داخلہ)" style={{ marginTop: '50px' }}>
                            <p
                                className="description textCenter"
                                style={{ fontSize: '30px', marginBottom: '16px' }}
                            >
                                <span className="red_text" style={{ fontSize: '30px' }}>نیا داخلہ :</span>{' '}
                                تمام معلومات درج کریں ۔ (*) ستارے کے نشان والی تمام معلومات پُر کرنا لازمی ہیں ۔
                            </p>

                            <FormField 
                                label="نام طالب/ طالبہ" 
                                required 
                                id="student-name" 
                                value={studentName} 
                                onChange={handleStudentNameChange} 
                                alphabeticOnly
                                error={fieldErrors.studentName}
                            />
                            <FormField 
                                label="والد کا نام" 
                                id="father-name" 
                                value={fatherName} 
                                onChange={setFatherName}
                                alphabeticOnly
                            />
                            <FormField 
                                label="تاریخ پیدائش" 
                                required 
                                type="date" 
                                id="dob" 
                                value={dob} 
                                onChange={handleDobChange} 
                                inputStyle={{ fontFamily: 'Roboto, sans-serif' }} 
                                error={fieldErrors.dob}
                            />

                            <FormField
                                label="شناختی کارڈ نمبر/ب فارم نمبر"
                                required
                                id="cnic-field"
                                value={cnic}
                                onChange={handleCnicChange}
                                maxLength={13}
                                placeholder="xxxxxxxxxxxxx"
                                numericOnly
                                inputStyle={ltrStyle}
                                error={fieldErrors.cnic}
                                readOnly
                            
                            />

                            <FormField
                                label="فون نمبر"
                                required
                                id="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                                maxLength={11}
                                placeholder="03xxxxxxxxx"
                                numericOnly
                                inputStyle={ltrStyle}
                                error={fieldErrors.phone}
                            />

                            <FormField
                                label="وٹس ایپ/ٹیلی گرام نمبر"
                                id="whatsapp"
                                value={whatsapp}
                                onChange={handleWhatsappChange}
                                maxLength={11}
                                placeholder="03xxxxxxxxx"
                                numericOnly
                                inputStyle={ltrStyle}
                                hint="(اپنا نہ ہو تو کسی عزیز کا دیا جا سکتا ہے تاہم اسکی وضاحت ضروری ہے)"
                                error={fieldErrors.whatsapp}
                            />

                            <FormField 
                                label="مکمل پتہ" 
                                type="textarea" 
                                id="full-address" 
                                value={fullAddress} 
                                onChange={setFullAddress} 
                            />
                            <FormField 
                                label="موجودہ  پتہ (رہائش)" 
                                required 
                                type="textarea" 
                                id="current-address" 
                                value={currentAddress} 
                                onChange={handleCurrentAddressChange} 
                                error={fieldErrors.currentAddress}
                            />

                            <FormField
                                label="دینی / عصری تعلیم"
                                required
                                id="education-type"
                                value={educationType}
                                onChange={handleEducationTypeChange}
                                alphabeticOnly
                                error={fieldErrors.educationType}
                            />

                            <FormField
                                label="مطلوبہ شعبہ و درجہ تعلیم"
                                required
                                type="select"
                                id="required-grade"
                                value={requiredGrade}
                                onChange={handleRequiredGradeChange}
                                options={gradeOptions}
                                error={fieldErrors.requiredGrade}
                            />

                            <FormField
                                label="نوٹ : سال گزشتہ میں کہاں زیر تعلیم رہے ، اور کیا پڑھا ؟"
                                type="textarea"
                                id="previous-education"
                                value={previousEducation}
                                onChange={setPreviousEducation}
                                hint="ادارے کا نام اور درجہ تعلیم لکھیں"
                            />

                            {/* Document Upload Section */}
                            <div style={{ marginTop: '32px' }}>
                                {/* <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#058464' }}>
                                    دستاویزات اپ لوڈ کریں (اختیاری)
                                </h3> */}
                                {/* 1. Picture */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                        تصویر (Picture) <span className="required">*</span>
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
                                            border: fieldErrors.picture ? '2px dashed #dc3545' : '2px dashed #058464',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            backgroundColor: '#f9f9f9'
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
                                        backgroundColor: '#f0f8ff', 
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
                                    
                                    {fieldErrors.picture && (
                                        <div className="form-field-error" style={{ marginTop: '8px' }}>
                                            {fieldErrors.picture}
                                        </div>
                                    )}
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

                                {/* 1. Certificates */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                        اسناد / سرٹیفیکیٹ (Certificates)
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf"
                                        onChange={handleCertificateUpload}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '12px',
                                            border: '2px dashed #058464',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            backgroundColor: '#f9f9f9'
                                        }}
                                    />
                                    <p style={{ fontSize: '14px', color: '#666', marginTop: '6px', fontFamily: 'Roboto, sans-serif' }}>
                                        Allowed formats: .jpg / .jpeg, .png, .gif, .webp, .jfif, .svg, .heic / .heif, .pdf
                                    </p>
                                    <p style={{ fontSize: '16px', color: '#666', marginTop: '4px' }}>
                                        زیادہ سے زیادہ سائز 20MB ہے
                                    </p>
                                    {certificateFiles.length > 0 && (
                                        <div style={{ marginTop: '12px' }}>
                                            <p style={{ fontSize: '16px', marginBottom: '8px', color: '#058464' }}>
                                                منتخب شدہ فائلیں: {certificateFiles.length}
                                            </p>
                                            {certificateFiles.map((file, index) => (
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
                                                        onClick={() => removeCertificateFile(index)}
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

                                {/* 3. CNIC/B-Form */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                        شناختی کارڈ / ب فارم (CNIC/B-Form)
                                    </label>
                                    <p style={{ fontSize: '18px', color: '#058464', marginBottom: '8px' }}>
                                        درست شناختی کارڈ/ب فارم کی تصویر اپ لوڈ کریں (اگلا/پچھلا)
                                    </p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf"
                                        onChange={handleCnicUpload}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '12px',
                                            border: '2px dashed #058464',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            backgroundColor: '#f9f9f9'
                                        }}
                                    />
                                    <p style={{ fontSize: '14px', color: '#666', marginTop: '6px', fontFamily: 'Roboto, sans-serif' }}>
                                        Allowed formats: .jpg / .jpeg, .png, .gif, .webp, .jfif, .svg, .heic / .heif, .pdf
                                    </p>
                                    <p style={{ fontSize: '16px', color: '#666', marginTop: '4px' }}>
                                        زیادہ سے زیادہ سائز 20MB ہے
                                    </p>
                                    {cnicFiles.length > 0 && (
                                        <div style={{ marginTop: '12px' }}>
                                            <p style={{ fontSize: '16px', marginBottom: '8px', color: '#058464' }}>
                                                منتخب شدہ فائلیں: {cnicFiles.length}
                                            </p>
                                            {cnicFiles.map((file, index) => (
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
                                                        onClick={() => removeCnicFile(index)}
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

                            <div className="form-footer" style={{ marginTop: '48px' }}>
                                <button 
                                    className="submit-button" 
                                    id="btn-step2-submit" 
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? 'جمع ہو رہا ہے...' : 'فارم جمع کروائیں'}
                                    {!loading && (
                                        <span className="button-icon-circle">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            </div>

                            {error && (
                                <div className="form-field-error mt-16">تمام لازمی معلومات پُر کریں</div>
                            )}
                            {apiError && (
                                <div className="form-field-error mt-16">{apiError}</div>
                            )}
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

    /* ═══════════════════════════════════════════════════════
       EXISTING STUDENT FORM
       ═══════════════════════════════════════════════════════ */
    return (
        <>
            <Navbar />
            <Stepper activeStep={2} />
            <div className="App">
                <div className="form-content" style={{ marginTop: '170px' }}>
                    <Card headerLeft="دوسرا مرحلہ" headerRight="داخلہ کوائف (پہلے سے زیر تعلیم)">
                        <p
                            className="description textCenter"
                            style={{ fontSize: '30px', marginBottom: '16px' }}
                        >
                            <span className="red_text" style={{ fontSize: '30px' }}>پہلے سے زیر تعلیم :</span>{' '}
                            تمام معلومات درج کریں ۔ (*) ستارے کے نشان والی تمام معلومات پُر کرنا لازمی ہیں ۔
                        </p>

                        <FormField
                            label="داخلہ نمبر (رجسٹریشن نمبر)"
                            required
                            id="registration-no"
                            value={registrationNo}
                            onChange={handleRegistrationNoChange}
                            inputStyle={{ ...ltrStyle }}
                            error={fieldErrors.registrationNo}
                        />

                        <FormField 
                            label="نام طالب/ طالبہ" 
                            required 
                            id="student-name" 
                            value={studentName} 
                            onChange={handleStudentNameChange}
                            alphabeticOnly
                            error={fieldErrors.studentName}
                        />
                        <FormField 
                            label="والد کا نام" 
                            id="father-name" 
                            value={fatherName} 
                            onChange={setFatherName}
                            alphabeticOnly
                        />
                        <FormField 
                            label="تاریخ پیدائش" 
                            required 
                            type="date" 
                            id="dob" 
                            value={dob} 
                            onChange={handleDobChange} 
                            inputStyle={{ fontFamily: 'Roboto, sans-serif' }} 
                            error={fieldErrors.dob}
                        />

                        <FormField
                            label="شناختی کارڈ/ب فارم نمبر"
                            required
                            id="cnic-field"
                            value={cnic}
                            onChange={handleCnicChange}
                            maxLength={13}
                            placeholder="xxxxxxxxxxxxx"
                            numericOnly
                            inputStyle={ltrStyle}
                            error={fieldErrors.cnic}
                            readOnly
                        />

                        <FormField
                            label="فون نمبر"
                            required
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={11}
                            placeholder="03xxxxxxxxx"
                            numericOnly
                            inputStyle={ltrStyle}
                            error={fieldErrors.phone}
                        />

                        <FormField
                            label="وٹس ایپ/ٹیلی گرام نمبر"
                            id="whatsapp"
                            value={whatsapp}
                            onChange={handleWhatsappChange}
                            maxLength={11}
                            placeholder="03xxxxxxxxx"
                            numericOnly
                            inputStyle={ltrStyle}
                            hint="(اپنا نمبر نہ ہو تو کسی عزیز کا لکھیں تاہم اسکی وضاحت ضروری ہے)"
                            error={fieldErrors.whatsapp}
                        />

                        <FormField 
                            label="مکمل پتہ" 
                            type="textarea" 
                            id="full-address" 
                            value={fullAddress} 
                            onChange={setFullAddress} 
                        />
                        <FormField 
                            label="موجودہ پتہ (رہائش)" 
                            required 
                            type="textarea" 
                            id="current-address" 
                            value={currentAddress} 
                            onChange={handleCurrentAddressChange} 
                            error={fieldErrors.currentAddress}
                        />

                        <FormField
                            label="شعبہ و درجہ (جس میں پچھلے سال زیر تعلیم تھے)"
                            required
                            type="select"
                            id="last-year-grade"
                            value={lastYearGrade}
                            onChange={handleLastYearGradeChange}
                            options={gradeOptions}
                            error={fieldErrors.lastYearGrade}
                        />

                        <FormField
                            label="آئندہ شعبہ و درجہ تعلیم (بعد از ترقی)"
                            required
                            type="select"
                            id="next-year-grade"
                            value={nextYearGrade}
                            onChange={handleNextYearGradeChange}
                            options={gradeOptions}
                            error={fieldErrors.nextYearGrade}
                        />
                        {/* If Required in future */}
                        
                        {/* <FormField
                            label="سالانہ امتحان پارٹ 1 : حاصل کردہ نمبر"
                            id="exam-part1-marks"
                            value={examPart1Marks}
                            onChange={setExamPart1Marks}
                            numericOnly
                            inputStyle={ltrStyle}
                        />

                        <FormField
                            label="سالانہ امتحان پارٹ 2 : حاصل کردہ نمبر"
                            id="exam-part2-marks"
                            value={examPart2Marks}
                            onChange={setExamPart2Marks}
                            numericOnly
                            inputStyle={ltrStyle}
                        />

                        <FormField
                            label="مجموعی حاصل کردہ نمبر"
                            id="total-marks"
                            value={totalMarks}
                            onChange={setTotalMarks}
                            numericOnly
                            inputStyle={ltrStyle}
                        /> */}

                        <FormField
                            label="نوٹ : سال گزشتہ میں دوران تعلیم اگر کوئی عذر یا شخصی معاملہ پیش آیا ہو تو اس کی تفصیلات لکھیے"
                            type="textarea"
                            id="remarks"
                            value={remarks}
                            onChange={setRemarks}
                        />

                        {/* Document Upload Section */}
                        <div style={{ marginTop: '32px' }}>
                            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#058464' }}>
                                دستاویزات اپ لوڈ کریں (اختیاری)
                            </h3>

                            {/* 1. Picture */}
                            <div style={{ marginBottom: '24px' }}>
                                <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                    تصویر (Picture) <span className="required">*</span>
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
                                        border: fieldErrors.picture ? '2px dashed #dc3545' : '2px dashed #058464',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        backgroundColor: '#f9f9f9'
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
                                    backgroundColor: '#f0f8ff', 
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
                                
                                {fieldErrors.picture && (
                                    <div className="form-field-error" style={{ marginTop: '8px' }}>
                                        {fieldErrors.picture}
                                    </div>
                                )}
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

                            {/* 2. Certificates */}
                            <div style={{ marginBottom: '24px' }}>
                                <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                    اسناد / سرٹیفیکیٹ (Certificates)
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    onChange={handleCertificateUpload}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '12px',
                                        border: '2px dashed #058464',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        backgroundColor: '#f9f9f9'
                                    }}
                                />
                                <p style={{ fontSize: '14px', color: '#666', marginTop: '6px', fontFamily: 'Roboto, sans-serif' }}>
                                    Allowed formats: .jpg / .jpeg, .png, .gif, .webp, .jfif, .svg, .heic / .heif, .pdf
                                </p>
                                <p style={{ fontSize: '16px', color: '#666', marginTop: '4px' }}>
                                    زیادہ سے زیادہ سائز 20MB ہے
                                </p>
                                {certificateFiles.length > 0 && (
                                    <div style={{ marginTop: '12px' }}>
                                        <p style={{ fontSize: '16px', marginBottom: '8px', color: '#058464' }}>
                                            منتخب شدہ فائلیں: {certificateFiles.length}
                                        </p>
                                        {certificateFiles.map((file, index) => (
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
                                                    onClick={() => removeCertificateFile(index)}
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

                            {/* 3. CNIC/B-Form */}
                            <div style={{ marginBottom: '24px' }}>
                                <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                    شناختی کارڈ / ب فارم (CNIC/B-Form)
                                </label>
                                <p style={{ fontSize: '18px', color: '#058464', marginBottom: '8px' }}>
                                    درست شناختی کارڈ/ب فارم کی تصویر اپ لوڈ کریں (اگلا/پچھلا)
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    onChange={handleCnicUpload}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '12px',
                                        border: '2px dashed #058464',
                                        borderRadius: '12px',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        backgroundColor: '#f9f9f9'
                                    }}
                                />
                                <p style={{ fontSize: '14px', color: '#666', marginTop: '6px', fontFamily: 'Roboto, sans-serif' }}>
                                    Allowed formats: .jpg / .jpeg, .png, .gif, .webp, .jfif, .svg, .heic / .heif, .pdf
                                </p>
                                <p style={{ fontSize: '16px', color: '#666', marginTop: '4px' }}>
                                    زیادہ سے زیادہ سائز 20MB ہے
                                </p>
                                {cnicFiles.length > 0 && (
                                    <div style={{ marginTop: '12px' }}>
                                        <p style={{ fontSize: '16px', marginBottom: '8px', color: '#058464' }}>
                                            منتخب شدہ فائلیں: {cnicFiles.length}
                                        </p>
                                        {cnicFiles.map((file, index) => (
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
                                                    onClick={() => removeCnicFile(index)}
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

                        <div className="form-footer" style={{ marginTop: '48px' }}>
                            <button 
                                className="submit-button" 
                                id="btn-step2-submit" 
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? 'جمع ہو رہا ہے...' : 'فارم جمع کروائیں'}
                                {!loading && (
                                    <span className="button-icon-circle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>

                        {error && (
                            <div className="form-field-error mt-16">تمام لازمی معلومات پُر کریں</div>
                        )}
                        {apiError && (
                            <div className="form-field-error mt-16">{apiError}</div>
                        )}
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
