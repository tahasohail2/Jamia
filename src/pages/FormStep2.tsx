import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Stepper from '../components/Stepper';
import Card from '../components/Card';
import FormField from '../components/FormField';
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
    const { formData, submitForm, loading, error: apiError } = useFormContext();
    const { showToast } = useToast();
    const isNew = formData.admissionType === 'نیا داخلہ';

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
    const [examPart1Marks, setExamPart1Marks] = useState('');
    const [examPart2Marks, setExamPart2Marks] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [remarks, setRemarks] = useState('');

    const [error, setError] = useState(false);
    
    /* ── Document uploads (optional) ── */
    const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
    const [cnicFiles, setCnicFiles] = useState<File[]>([]);
    const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
    
    /* ── Field-level validation errors ── */
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setCertificateFiles(prev => [...prev, ...filesArray]);
        }
    };

    const handleCnicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setCnicFiles(prev => [...prev, ...filesArray]);
        }
    };

    const handleAdditionalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setAdditionalFiles(prev => [...prev, ...filesArray]);
        }
    };

    const removeCertificateFile = (index: number) => {
        setCertificateFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeCnicFile = (index: number) => {
        setCnicFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeAdditionalFile = (index: number) => {
        setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
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
        }
        if (whatsapp && whatsapp.length !== 11) {
            errors.whatsapp = 'وٹس ایپ نمبر 11 ہندسوں پر مشتمل ہونا چاہیے';
            showToast('وٹس ایپ نمبر 11 ہندسوں پر مشتمل ہونا چاہیے', 'warning');
        }
        if (!currentAddress) {
            errors.currentAddress = 'موجودہ پتا درج کریں';
            showToast('موجودہ پتا درج کریں', 'error');
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

        /* ── Build complete form data ── */
        const completeFormData = {
            ...formData,
            studentName,
            fatherName,
            dob,
            cnic: formattedCnic,
            phone,
            whatsapp,
            fullAddress,
            currentAddress,
            educationType: isNew ? educationType : '',
            requiredGrade: isNew ? requiredGrade : '',
            previousEducation: isNew ? previousEducation : '',
            registrationNo: isNew ? '' : registrationNo,
            lastYearGrade: isNew ? '' : lastYearGrade,
            nextYearGrade: isNew ? '' : nextYearGrade,
            examPart1Marks: isNew ? '' : examPart1Marks,
            examPart2Marks: isNew ? '' : examPart2Marks,
            totalMarks: isNew ? '' : totalMarks,
            remarks: isNew ? '' : remarks,
        };

        try {
            showToast('فارم جمع ہو رہا ہے...', 'info');
            await submitForm(completeFormData);
            showToast('فارم کامیابی سے جمع ہو گیا', 'success');
            navigate('/success', { state: { record: completeFormData } });
        } catch (err) {
            showToast('فارم جمع کرنے میں خرابی', 'error');
            console.error('Form submission failed:', err);
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
                        <Card headerLeft="دوسرا مرحلہ" headerRight="داخلہ کوائف (نیا داخلہ)">
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
                                onChange={setStudentName} 
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
                                onChange={setDob} 
                                inputStyle={{ fontFamily: 'Roboto, sans-serif' }} 
                                error={fieldErrors.dob}
                            />

                            <FormField
                                label="شناختی کارڈ نمبر/ب فارم نمبر"
                                required
                                id="cnic-field"
                                value={cnic}
                                onChange={setCnic}
                                maxLength={13}
                                placeholder="xxxxxxxxxxxxx"
                                numericOnly
                                inputStyle={ltrStyle}
                                error={fieldErrors.cnic}
                            />

                            <FormField
                                label="فون نمبر"
                                required
                                id="phone"
                                value={phone}
                                onChange={setPhone}
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
                                onChange={setWhatsapp}
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
                                onChange={setCurrentAddress} 
                                error={fieldErrors.currentAddress}
                            />

                            <FormField
                                label="دینی / عصری تعلیم"
                                required
                                id="education-type"
                                value={educationType}
                                onChange={setEducationType}
                                alphabeticOnly
                                error={fieldErrors.educationType}
                            />

                            <FormField
                                label="مطلوبہ شعبہ و درجہ تعلیم"
                                required
                                type="select"
                                id="required-grade"
                                value={requiredGrade}
                                onChange={setRequiredGrade}
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
                                <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#058464' }}>
                                    دستاویزات اپ لوڈ کریں (اختیاری)
                                </h3>

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
                                                    <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>
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

                                {/* 2. CNIC/B-Form */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                        شناختی کارڈ / ب فارم (CNIC/B-Form)
                                    </label>
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
                                                    <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>
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

                                {/* 3. Additional Documents */}
                                <div style={{ marginBottom: '24px' }}>
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                        اضافی دستاویزات (Additional Documents)
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf"
                                        onChange={handleAdditionalUpload}
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
                                                    <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>
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
                            onChange={setRegistrationNo}
                            inputStyle={{ ...ltrStyle }}
                            error={fieldErrors.registrationNo}
                        />

                        <FormField 
                            label="نام طالب/ طالبہ" 
                            required 
                            id="student-name" 
                            value={studentName} 
                            onChange={setStudentName}
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
                            onChange={setDob} 
                            inputStyle={{ fontFamily: 'Roboto, sans-serif' }} 
                            error={fieldErrors.dob}
                        />

                        <FormField
                            label="شناختی کارڈ/ب فارم نمبر"
                            required
                            id="cnic-field"
                            value={cnic}
                            onChange={setCnic}
                            maxLength={13}
                            placeholder="xxxxxxxxxxxxx"
                            numericOnly
                            inputStyle={ltrStyle}
                            error={fieldErrors.cnic}
                        />

                        <FormField
                            label="فون نمبر"
                            required
                            id="phone"
                            value={phone}
                            onChange={setPhone}
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
                            onChange={setWhatsapp}
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
                            onChange={setCurrentAddress} 
                            error={fieldErrors.currentAddress}
                        />

                        <FormField
                            label="شعبہ و درجہ (جس میں پچھلے سال زیر تعلیم تھے)"
                            required
                            type="select"
                            id="last-year-grade"
                            value={lastYearGrade}
                            onChange={setLastYearGrade}
                            options={gradeOptions}
                            error={fieldErrors.lastYearGrade}
                        />

                        <FormField
                            label="آئندہ شعبہ و درجہ تعلیم (بعد از ترقی)"
                            required
                            type="select"
                            id="next-year-grade"
                            value={nextYearGrade}
                            onChange={setNextYearGrade}
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
                                                <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>
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

                            {/* 2. CNIC/B-Form */}
                            <div style={{ marginBottom: '24px' }}>
                                <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                    شناختی کارڈ / ب فارم (CNIC/B-Form)
                                </label>
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
                                                <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>
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

                            {/* 3. Additional Documents */}
                            <div style={{ marginBottom: '24px' }}>
                                <label className="form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '20px' }}>
                                    اضافی دستاویزات (Additional Documents)
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,.pdf"
                                    onChange={handleAdditionalUpload}
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
                                                <span style={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>
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
        </>
    );
}
