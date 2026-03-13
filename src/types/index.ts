export interface FormData {
    admissionType: string;
    gender: string;
    department: string;
    studentName: string;
    fatherName: string;
    dob: string;
    cnic: string;
    phone: string;
    whatsapp: string;
    fullAddress: string;
    currentAddress: string;
    educationType: string;
    requiredGrade: string;
    previousEducation: string;
    registrationNo: string;
    lastYearGrade: string;
    nextYearGrade: string;
    examPart1Marks: string;
    examPart2Marks: string;
    totalMarks: string;
    remarks: string;
}

export interface SubmittedRecord extends FormData {
    id: number;
    submittedAt: string;
}

export const initialFormData: FormData = {
    admissionType: '',
    gender: '',
    department: '',
    studentName: '',
    fatherName: '',
    dob: '',
    cnic: '',
    phone: '',
    whatsapp: '',
    fullAddress: '',
    currentAddress: '',
    educationType: '',
    requiredGrade: '',
    previousEducation: '',
    registrationNo: '',
    lastYearGrade: '',
    nextYearGrade: '',
    examPart1Marks: '',
    examPart2Marks: '',
    totalMarks: '',
    remarks: '',
};
