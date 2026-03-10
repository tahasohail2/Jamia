import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Stepper from '../components/Stepper';
import Card from '../components/Card';
import FormField from '../components/FormField';
import { useFormContext } from '../context/FormContext';
import { PLACEHOLDER_OPTION, gradeOptions } from '../constants';
import type { SubmittedRecord } from '../types';

/* ─── Shared LTR input style ─────────────────────────── */
const ltrStyle: React.CSSProperties = {
    fontFamily: 'Roboto, sans-serif',
    direction: 'ltr',
    textAlign: 'right',
};

export default function FormStep2() {
    const navigate = useNavigate();
    const { formData, updateFormData, addRecord, resetFormData } = useFormContext();
    const isNew = formData.admissionType === 'نیا داخلہ';

    /* ── local state ── */
    const [studentName, setStudentName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [dob, setDob] = useState('');
    const [cnic, setCnic] = useState(formData.cnic);
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    // New admission
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

    const handleSubmit = () => {
        /* ── Validate required fields ── */
        if (!studentName || !dob || !cnic || !phone || !currentAddress) {
            setError(true);
            return;
        }

        if (isNew && requiredGrade === PLACEHOLDER_OPTION) {
            setError(true);
            return;
        }

        if (
            !isNew &&
            (!registrationNo ||
                lastYearGrade === PLACEHOLDER_OPTION ||
                nextYearGrade === PLACEHOLDER_OPTION)
        ) {
            setError(true);
            return;
        }

        setError(false);

        /* ── Persist to context ── */
        const fields = {
            studentName,
            fatherName,
            dob,
            cnic,
            phone,
            whatsapp,
            fullAddress,
            currentAddress,
            ...(isNew
                ? { requiredGrade, previousEducation }
                : { registrationNo, lastYearGrade, nextYearGrade, examPart1Marks, examPart2Marks, totalMarks, remarks }),
        };
        updateFormData(fields);

        /* ── Build record ── */
        const record: SubmittedRecord = {
            id: Date.now(),
            submittedAt: new Date().toLocaleString('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
            }),
            admissionType: formData.admissionType,
            gender: formData.gender,
            department: formData.department,
            studentName,
            fatherName,
            dob,
            cnic,
            phone,
            whatsapp,
            fullAddress,
            currentAddress,
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

        addRecord(record);
        resetFormData();
        navigate('/success', { state: { record } });
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

                            <FormField label="نام طالب/ طالبہ" required id="student-name" value={studentName} onChange={setStudentName} />
                            <FormField label="والد کا نام" id="father-name" value={fatherName} onChange={setFatherName} />
                            <FormField label="تاریخ پیدائش" required type="date" id="dob" value={dob} onChange={setDob} inputStyle={{ fontFamily: 'Roboto, sans-serif' }} />

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
                            />

                            <FormField label="مکمل پتہ" type="textarea" id="full-address" value={fullAddress} onChange={setFullAddress} />
                            <FormField label="موجودہ پتا (رہائش)" required type="textarea" id="current-address" value={currentAddress} onChange={setCurrentAddress} />

                            <FormField
                                label="مطلوبہ شعبہ و درجہ تعلیم"
                                required
                                type="select"
                                id="required-grade"
                                value={requiredGrade}
                                onChange={setRequiredGrade}
                                options={gradeOptions}
                            />

                            <FormField
                                label="نوٹ : سال گزشتہ میں کہاں زیر تعلیم رہے ، اور کیا پڑھا ؟"
                                type="textarea"
                                id="previous-education"
                                value={previousEducation}
                                onChange={setPreviousEducation}
                                hint="ادارے کا نام اور درجہ تعلیم لکھیں"
                            />

                            <div className="form-footer" style={{ marginTop: '48px' }}>
                                <button className="submit-button" id="btn-step2-submit" onClick={handleSubmit}>
                                    فارم جمع کروائیں
                                </button>
                            </div>

                            {error && (
                                <div className="form-field-error mt-16">تمام لازمی معلومات پُر کریں</div>
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
                        />

                        <FormField label="نام طالب/ طالبہ" required id="student-name" value={studentName} onChange={setStudentName} />
                        <FormField label="والد کا نام" id="father-name" value={fatherName} onChange={setFatherName} />
                        <FormField label="تاریخ پیدائش" required type="date" id="dob" value={dob} onChange={setDob} inputStyle={{ fontFamily: 'Roboto, sans-serif' }} />

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
                        />

                        <FormField label="مکمل پتہ" type="textarea" id="full-address" value={fullAddress} onChange={setFullAddress} />
                        <FormField label="موجودہ پتا (رہائش)" required type="textarea" id="current-address" value={currentAddress} onChange={setCurrentAddress} />

                        <FormField
                            label="شعبہ و درجہ (جس میں پچھلے سال زیر تعلیم تھے)"
                            required
                            type="select"
                            id="last-year-grade"
                            value={lastYearGrade}
                            onChange={setLastYearGrade}
                            options={gradeOptions}
                        />

                        <FormField
                            label="آئندہ شعبہ و درجہ تعلیم (بعد از ترقی)"
                            required
                            type="select"
                            id="next-year-grade"
                            value={nextYearGrade}
                            onChange={setNextYearGrade}
                            options={gradeOptions}
                        />

                        <FormField
                            label="سالانہ امتحان پارٹ 1 : حاصل کردہ نمبر"
                            id="exam-part1-marks"
                            value={examPart1Marks}
                            onChange={setExamPart1Marks}
                            inputStyle={ltrStyle}
                        />

                        <FormField
                            label="سالانہ امتحان پارٹ 2 : حاصل کردہ نمبر"
                            id="exam-part2-marks"
                            value={examPart2Marks}
                            onChange={setExamPart2Marks}
                            inputStyle={ltrStyle}
                        />

                        <FormField
                            label="مجموعی حاصل کردہ نمبر"
                            id="total-marks"
                            value={totalMarks}
                            onChange={setTotalMarks}
                            inputStyle={ltrStyle}
                        />

                        <FormField
                            label="نوٹ : سال گزشتہ میں دوران تعلیم اگر کوئی عذر یا شخصی معاملہ پیش آیا ہو تو اس کی تفصیلات لکھیے"
                            type="textarea"
                            id="remarks"
                            value={remarks}
                            onChange={setRemarks}
                        />

                        <div className="form-footer" style={{ marginTop: '48px' }}>
                            <button className="submit-button" id="btn-step2-submit" onClick={handleSubmit}>
                                فارم جمع کروائیں
                            </button>
                        </div>

                        {error && (
                            <div className="form-field-error mt-16">تمام لازمی معلومات پُر کریں</div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
}
