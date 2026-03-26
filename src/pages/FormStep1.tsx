import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Stepper from '../components/Stepper';
import Card from '../components/Card';
import FormField from '../components/FormField';
import { useFormContext } from '../context/FormContext';
import { useToast } from '../components/ToastContainer';
import {
    PLACEHOLDER_OPTION,
    admissionTypes,
    genders,
    departments,
} from '../constants';

export default function FormStep1() {
    const navigate = useNavigate();
    const { updateFormData } = useFormContext();
    const { showToast } = useToast();
    const [admissionType, setAdmissionType] = useState(PLACEHOLDER_OPTION);
    const [gender, setGender] = useState(PLACEHOLDER_OPTION);
    const [department, setDepartment] = useState(PLACEHOLDER_OPTION);
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

    const handleAdmissionTypeChange = (value: string) => {
        setAdmissionType(value);
        clearFieldError('admissionType');
    };

    const handleGenderChange = (value: string) => {
        setGender(value);
        clearFieldError('gender');
    };

    const handleDepartmentChange = (value: string) => {
        setDepartment(value);
        clearFieldError('department');
    };

    const handleSubmit = () => {
        const errors: Record<string, string> = {};

        if (admissionType === PLACEHOLDER_OPTION) {
            errors.admissionType = 'داخلہ کی نوعیت منتخب کریں';
        }
        if (gender === PLACEHOLDER_OPTION) {
            errors.gender = 'جنس منتخب کریں';
        }
        if (department === PLACEHOLDER_OPTION) {
            errors.department = 'شعبہ منتخب کریں';
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            showToast('تمام لازمی معلومات پُر کریں', 'error');
            return;
        }

        setFieldErrors({});
        updateFormData({ admissionType, gender, department });
        showToast('پہلا مرحلہ مکمل ہوا', 'success');
        navigate('/form/step2');
    };

    return (
        <>
            <Navbar />
            <Stepper activeStep={1} />
            <div className="form-progress">
                <div className="form-progress-bar" style={{ width: '50%' }} />
            </div>
            <div className="App">
                <div className="form-content" style={{ marginTop: '170px' }}>
                    <Card headerLeft="پہلا مرحلہ" headerRight="درخواست فارم" style={{ marginTop: '50px' }}>
                        <p className="description textCenter" style={{ fontSize: '30px', marginBottom: '16px' }}>
                            <span className="red_text" style={{ fontSize: '30px' }}>پہلا مرحلہ :</span>{' '}
                            داخلے کی نوعیت ، جنس اور شعبہ منتخب کریں ۔ (*) ستارے کے نشان والی تمام معلومات پُر کرنا لازمی ہیں ۔
                        </p>

                        <FormField
                            label="داخلہ کی نوعیت"
                            required
                            type="select"
                            id="admission-type"
                            value={admissionType}
                            onChange={handleAdmissionTypeChange}
                            options={admissionTypes}
                            error={fieldErrors.admissionType}
                        />

                        <FormField
                            label="جنس"
                            required
                            type="select"
                            id="gender"
                            value={gender}
                            onChange={handleGenderChange}
                            options={genders}
                            error={fieldErrors.gender}
                        />

                        <FormField
                            label="شعبہ"
                            required
                            type="select"
                            id="department"
                            value={department}
                            onChange={handleDepartmentChange}
                            options={departments}
                            error={fieldErrors.department}
                        />

                        <div className="form-footer" style={{ marginTop: '48px' }}>
                            <button className="submit-button" id="btn-step1-submit" onClick={handleSubmit}>
                                اگلا مرحلہ
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
        </>
    );
}
