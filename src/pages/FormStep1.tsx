import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Stepper from '../components/Stepper';
import Card from '../components/Card';
import FormField from '../components/FormField';
import { useFormContext } from '../context/FormContext';
import {
    PLACEHOLDER_OPTION,
    admissionTypes,
    genders,
    departments,
} from '../constants';

export default function FormStep1() {
    const navigate = useNavigate();
    const { updateFormData } = useFormContext();
    const [admissionType, setAdmissionType] = useState(PLACEHOLDER_OPTION);
    const [gender, setGender] = useState(PLACEHOLDER_OPTION);
    const [department, setDepartment] = useState(PLACEHOLDER_OPTION);
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (
            admissionType === PLACEHOLDER_OPTION ||
            gender === PLACEHOLDER_OPTION ||
            department === PLACEHOLDER_OPTION
        ) {
            setError(true);
            return;
        }

        setError(false);
        updateFormData({ admissionType, gender, department });
        navigate('/form/step2');
    };

    return (
        <>
            <Navbar />
            <Stepper activeStep={1} />
            <div className="App">
                <div className="form-content" style={{ marginTop: '170px' }}>
                    <Card headerLeft="پہلا مرحلہ" headerRight="درخواست فارم">
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
                            onChange={setAdmissionType}
                            options={admissionTypes}
                        />

                        <FormField
                            label="جنس"
                            required
                            type="select"
                            id="gender"
                            value={gender}
                            onChange={setGender}
                            options={genders}
                        />

                        <FormField
                            label="شعبہ"
                            required
                            type="select"
                            id="department"
                            value={department}
                            onChange={setDepartment}
                            options={departments}
                        />

                        <div className="form-footer" style={{ marginTop: '48px' }}>
                            <button className="submit-button" id="btn-step1-submit" onClick={handleSubmit}>
                                اگلا مرحلہ
                            </button>
                        </div>

                        {error && (
                            <div className="form-field-error mt-16">
                                تمام لازمی معلومات پُر کریں
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
}
