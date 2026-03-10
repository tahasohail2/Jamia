// ===================== DATA =====================
const admissionTypes = [
    "آپشن منتخب کریں",
    "نیا داخلہ",
    "پہلے سے زیر تعلیم"
];

const genders = [
    "آپشن منتخب کریں",
    "مرد",
    "عورت"
];

const departments = [
    "آپشن منتخب کریں",
    "حفظ",
    "تجوید",
    "درس نظامی / عالمہ فاضلہ"
];

const gradeOptions = [
    "آپشن منتخب کریں",
    "حفظ",
    "تجوید",
    "متوسطہ",
    "عامہ اول",
    "عامہ دوئم",
    "خاصہ اول",
    "خاصہ دوئم",
    "عالیہ اول",
    "عالیہ دوئم",
    "عالمیہ اول",
    "عالمیہ دوئم"
];

// ===================== STATE =====================
let currentRoute = window.location.hash.slice(1) || '/';
let formData = {
    // Step 1 fields
    admissionType: '',
    gender: '',
    department: '',
    // Step 2 fields (New Admission)
    studentName: '',
    fatherName: '',
    dob: '',
    cnic: '',
    phone: '',
    whatsapp: '',
    fullAddress: '',
    currentAddress: '',
    requiredGrade: '',
    previousEducation: '',
    // Step 2 fields (Previously Enrolled - additional)
    registrationNo: '',
    lastYearGrade: '',
    nextYearGrade: '',
    remarks: ''
};

// ===================== SUBMITTED RECORDS =====================
let submittedRecords = JSON.parse(localStorage.getItem('submittedRecords') || '[]');

function saveRecordsToStorage() {
    localStorage.setItem('submittedRecords', JSON.stringify(submittedRecords));
}

// ===================== ROUTER =====================
function navigate(path) {
    window.location.hash = path;
}

window.addEventListener('hashchange', () => {
    currentRoute = window.location.hash.slice(1) || '/';
    render();
    window.scrollTo(0, 0);
});

// ===================== COMPONENTS =====================
function renderNavbar() {
    return `
        <div class="navbar" id="main-navbar">
            <span class="header_title" onclick="navigate('/')">جامعۂ رضویۃ ضیاء العلوم ،پاکستان</span>
            <img src="logo.png" alt="Jamia Razvia Zia ul Uloom Logo" class="logo" onclick="navigate('/')"/>
        </div>
    `;
}

function renderStepper(activeStep) {
    const totalSteps = formData.admissionType === 'پہلے سے زیر تعلیم' ? 2 : 2;
    const steps = [
        { num: 1, label: 'پہلا مرحلہ' },
        { num: 2, label: 'دوسرا مرحلہ' }
    ];

    let html = '<div class="form-steps">';
    steps.forEach((step, i) => {
        const isActive = step.num === activeStep;
        const isCompleted = step.num < activeStep;

        if (i > 0) {
            html += '<div class="form-step-seperator"></div>';
        }

        html += `<div class="form-step" onclick="navigate('/newAdmission/form/step${step.num}')">`;
        html += `<span class="form-steps-label">${step.label}</span>`;

        if (isCompleted) {
            html += `<div class="form-steps-circle-tick">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#058464" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>`;
        } else {
            html += `<div class="form-steps-circle-label">${step.num}</div>`;
        }

        html += '</div>';
    });
    html += '</div>';
    return html;
}

// ===================== PAGES =====================
function renderHomePage() {
    return `
        ${renderNavbar()}
        <div class="App">
            <div class="form-content">
                <div class="card">
                    <div class="card-body">
                        <p class="redDescription textCenter" style="font-size:42px; margin-bottom: 24px;">
                            داخلہ فارم (طلباء / طالبات)
                        </p>

                        <p class="description textCenter" style="font-size:30px; margin-bottom: 16px;">
                            تمام کوائف انتہائی احتیاط سے مکمل کئے جائیں
                        </p>

                        <hr class="divider"/>

                        <p class="description" style="margin-top: 24px;">
                            مکرمی جناب مہتمم صاحب ! السلام علیکم ورحمۃ اللہ
                        </p>

                        <p class="description">
                            .میں نے جامعہ کے قواعد وضوابط اورہدایات اچھی طرح پڑھ اور سمجھ لی ہیں
                        </p>

                        <p class="description">
                            .میں ان پر سچّی سے عمل پیرا ہونے کا عہد کرتا/کرتی ہوں
                        </p>

                        <p class="pinkText">
                            خلاف ورزی کی صورت میں آپ کو تادیبی کارروائی کا اختیار ہوگا ۔
                        </p>

                        <hr class="divider"/>

                        <p class="greenDescription textCenter" style="font-size: 28px; margin-top: 16px;">
                            میرے کوائف حسب ذیل ہیں
                        </p>

                        <p class="description textCenter" style="font-size: 26px;">
                            ان کی روشنی میں مجھے لیئے زیر سایہ تعلیم حاصل کیئےکہ داخلہ عطا فرمایا جائے
                        </p>

                        <hr class="divider"/>

                        <div class="flex row alignCenter" style="gap: 16px; margin-top: 16px;">
                            <p class="description">قواعد و ضوابط پڑھ لیے ہیں تو فارم پُر کریں ۔</p>
                            <button class="submit-button" id="btn-fill-form" onclick="navigate('/admission/cnic')">
                                فارم پُر کرنے کے لیے یہاں کلک کریں
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCnicPage() {
    return `
        ${renderNavbar()}
        <div class="App">
            <div class="form-content">
                <div class="card">
                    <div class="card-title">
                        شناختی کارڈ / ب فارم نمبر فراہم کریں
                    </div>
                    <div class="card-body">
                        <p class="description textCenter" style="font-size: 32px; margin-bottom: 32px;">
                            امیدوار اپنا <span class="red_text" style="font-size:32px;">شناختی کارڈ نمبر</span> یا <span class="red_text" style="font-size:32px;">ب فارم نمبر</span> درج کرے ۔ <span class="green_text" style="font-size:32px;">(بغیر ڈیش کے)</span>
                        </p>

                        <div class="form-container">
                            <label>
                                امیدوار کا شناختی کارڈ <span class="green_text">یا</span> ب فارم نمبر<span class="redText">*</span>
                            </label>
                            <input type="text" id="cnic-input" maxlength="13"
                                placeholder="xxxxxxxxxxxxx"
                                style="font-family: Roboto, sans-serif; direction: ltr; text-align: right; font-size: 22px;"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                        </div>

                        <div style="margin-top: 32px;">
                            <button class="submit-button" id="btn-cnic-submit" onclick="handleCnicSubmit()">
                                آن لائن فارم پُر کرنے کی ہدایات پڑھیں
                            </button>
                        </div>

                        <div id="cnic-error" style="display:none;" class="form-field-error mt-16">
                            شناختی کارڈ / ب فارم نمبر 13 ہندسوں پر مشتمل ہونا چاہیے
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleCnicSubmit() {
    const cnicInput = document.getElementById('cnic-input');
    const errorDiv = document.getElementById('cnic-error');

    if (!cnicInput.value || cnicInput.value.length !== 13) {
        errorDiv.style.display = 'block';
        return;
    }

    errorDiv.style.display = 'none';
    formData.cnic = cnicInput.value;
    navigate('/newAdmission/description');
}

function renderInstructionsPage() {
    return `
        ${renderNavbar()}
        <div class="App">
            <div class="form-content">
                <div class="card">
                    <div class="card-body">
                        <p class="redDescription textCenter" style="font-size: 30px;">
                            آن لائن فارم "2" مراحل پر مشتمل ہے ۔
                        </p>

                        <p class="redDescription textCenter" style="font-size: 36px; margin: 24px 0;">
                            امیدوار آن لائن فارم میں ایک بار اگلے مرحلے میں جا کر پچھلے مرحلے میں واپس نہیں جاسکتا ۔ لہذا احتیاط سے آن لائن فارم پُر کرے ۔
                        </p>

                        <p class="description" style="margin-top: 24px;">
                            <span class="red_text" style="font-size:28px;">پہلا مرحلہ :</span> پہلے مرحلے میں <span class="red_text" style="font-size:28px;">داخلے کی نوعیت</span>، <span class="red_text" style="font-size:28px;">جنس</span> اور <span class="red_text" style="font-size:28px;">شعبہ</span> منتخب کریں ۔ (*) ستارے کے نشان والی تمام معلومات پُر کرنا لازمی ہیں ۔
                        </p>

                        <p class="description" style="margin-top: 24px;">
                            <span class="red_text" style="font-size:28px;">دوسرا مرحلہ :</span> دوسرے مرحلے میں اپنی <span class="green_text" style="font-size:28px;">ذاتی معلومات</span> اور <span class="green_text" style="font-size:28px;">تعلیمی کوائف</span> درج کریں ۔
                        </p>

                        <hr class="divider"/>

                        <div class="flex row alignCenter" style="gap: 16px; margin-top: 16px;">
                            <p class="description">ہدایات پڑھ لی ہیں تو فارم پُر کرتے ہیں ۔</p>
                            <button class="submit-button" id="btn-start-form" onclick="navigate('/newAdmission/form/step1')">
                                فارم پُر کریں
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===================== STEP 1: Admission Type, Gender, Department =====================
function renderFormStep1() {
    const admissionTypeOptions = admissionTypes.map(a => `<option value="${a}">${a}</option>`).join('');
    const genderOptions = genders.map(g => `<option value="${g}">${g}</option>`).join('');
    const departmentOptions = departments.map(d => `<option value="${d}">${d}</option>`).join('');

    return `
        ${renderNavbar()}
        ${renderStepper(1)}
        <div class="App">
            <div class="form-content" style="margin-top: 170px;">
                <div class="card">
                    <div class="card-header">
                        <span class="card-header-label">پہلا مرحلہ</span>
                        <span class="card-header-label">درخواست فارم</span>
                    </div>
                    <div class="card-body">
                        <p class="description textCenter" style="font-size: 30px; margin-bottom: 16px;">
                            <span class="red_text" style="font-size:30px;">پہلا مرحلہ :</span> داخلے کی نوعیت ، جنس اور شعبہ منتخب کریں ۔ (*) ستارے کے نشان والی تمام معلومات پُر کرنا لازمی ہیں ۔
                        </p>

                        <!-- Admission Type -->
                        <div class="form-container">
                            <label>داخلہ کی نوعیت<span class="redText">*</span></label>
                            <select id="admission-type">
                                ${admissionTypeOptions}
                            </select>
                        </div>

                        <!-- Gender -->
                        <div class="form-container">
                            <label>جنس<span class="redText">*</span></label>
                            <select id="gender">
                                ${genderOptions}
                            </select>
                        </div>

                        <!-- Department -->
                        <div class="form-container">
                            <label>شعبہ<span class="redText">*</span></label>
                            <select id="department">
                                ${departmentOptions}
                            </select>
                        </div>

                        <!-- Submit -->
                        <div class="form-footer" style="margin-top: 48px;">
                            <button class="submit-button" id="btn-step1-submit" onclick="handleStep1Submit()">
                                اگلا مرحلہ
                            </button>
                        </div>

                        <div id="step1-error" style="display:none;" class="form-field-error mt-16">
                            تمام لازمی معلومات پُر کریں
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===================== STEP 2: Conditional Based on Admission Type =====================
function renderFormStep2() {
    const isNewAdmission = formData.admissionType === 'نیا داخلہ';
    const gradeOpts = gradeOptions.map(g => `<option value="${g}">${g}</option>`).join('');

    if (isNewAdmission) {
        return renderNewAdmissionForm(gradeOpts);
    } else {
        return renderExistingStudentForm(gradeOpts);
    }
}

function renderNewAdmissionForm(gradeOpts) {
    return `
        ${renderNavbar()}
        ${renderStepper(2)}
        <div class="App">
            <div class="form-content" style="margin-top: 170px;">
                <div class="card">
                    <div class="card-header">
                        <span class="card-header-label">دوسرا مرحلہ</span>
                        <span class="card-header-label">داخلہ کوائف (نیا داخلہ)</span>
                    </div>
                    <div class="card-body">
                        <p class="description textCenter" style="font-size: 30px; margin-bottom: 16px;">
                            <span class="red_text" style="font-size:30px;">نیا داخلہ :</span> تمام معلومات درج کریں ۔ (*) ستارے کے نشان والی تمام معلومات پُر کرنا لازمی ہیں ۔
                        </p>

                        <!-- Student Name -->
                        <div class="form-container">
                            <label>نام طالب/ طالبہ<span class="redText">*</span></label>
                            <input type="text" id="student-name" placeholder=""/>
                        </div>

                        <!-- Father Name -->
                        <div class="form-container">
                            <label>والد کا نام</label>
                            <input type="text" id="father-name" placeholder=""/>
                        </div>

                        <!-- Date of Birth -->
                        <div class="form-container">
                            <label>تاریخ پیدائش<span class="redText">*</span></label>
                            <input type="date" id="dob" style="font-family: Roboto, sans-serif;"/>
                        </div>

                        <!-- CNIC / B-Form -->
                        <div class="form-container">
                            <label>شناختی کارڈ نمبر/ب فارم نمبر<span class="redText">*</span></label>
                            <input type="text" id="cnic-field" value="${formData.cnic}" maxlength="13"
                                placeholder="xxxxxxxxxxxxx"
                                style="font-family: Roboto, sans-serif; direction: ltr; text-align: right;"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                        </div>

                        <!-- Phone Number -->
                        <div class="form-container">
                            <label>فون نمبر<span class="redText">*</span></label>
                            <input type="text" id="phone" maxlength="11"
                                placeholder="03xxxxxxxxx"
                                style="font-family: Roboto, sans-serif; direction: ltr; text-align: right;"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                        </div>

                        <!-- WhatsApp/Telegram -->
                        <div class="form-container">
                            <label>وٹس ایپ/ٹیلی گرام نمبر</label>
                            <p class="greenDescription" style="font-size: 18px; margin: 4px 0 8px;">(اپنا نہ ہو تو کسی عزیز کا دیا جا سکتا ہے تاہم اسکی وضاحت ضروری ہے)</p>
                            <input type="text" id="whatsapp" maxlength="11"
                                placeholder="03xxxxxxxxx"
                                style="font-family: Roboto, sans-serif; direction: ltr; text-align: right;"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                        </div>

                        <!-- Full Address -->
                        <div class="form-container">
                            <label>مکمل پتہ</label>
                            <textarea id="full-address" rows="3" style="width: 100%; resize: vertical; font-size: 20px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: MehrNastaliq;"></textarea>
                        </div>

                        <!-- Current Address -->
                        <div class="form-container">
                            <label>موجودہ پتا (رہائش)<span class="redText">*</span></label>
                            <textarea id="current-address" rows="3" style="width: 100%; resize: vertical; font-size: 20px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: MehrNastaliq;"></textarea>
                        </div>

                        <!-- Required Grade -->
                        <div class="form-container">
                            <label>مطلوبہ شعبہ و درجہ تعلیم<span class="redText">*</span></label>
                            <select id="required-grade">
                                ${gradeOpts}
                            </select>
                        </div>

                        <!-- Previous Education Note -->
                        <div class="form-container">
                            <label>نوٹ : سال گزشتہ میں کہاں زیر تعلیم رہے ، اور کیا پڑھا ؟</label>
                            <p class="greenDescription" style="font-size: 18px; margin: 4px 0 8px;">ادارے کا نام اور درجہ تعلیم لکھیں</p>
                            <textarea id="previous-education" rows="3" style="width: 100%; resize: vertical; font-size: 20px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: MehrNastaliq;"></textarea>
                        </div>

                        <!-- Submit -->
                        <div class="form-footer" style="margin-top: 48px;">
                            <button class="submit-button" id="btn-step2-submit" onclick="handleStep2Submit()">
                                فارم جمع کروائیں
                            </button>
                        </div>

                        <div id="step2-error" style="display:none;" class="form-field-error mt-16">
                            تمام لازمی معلومات پُر کریں
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderExistingStudentForm(gradeOpts) {
    return `
        ${renderNavbar()}
        ${renderStepper(2)}
        <div class="App">
            <div class="form-content" style="margin-top: 170px;">
                <div class="card">
                    <div class="card-header">
                        <span class="card-header-label">دوسرا مرحلہ</span>
                        <span class="card-header-label">داخلہ کوائف (پہلے سے زیر تعلیم)</span>
                    </div>
                    <div class="card-body">
                        <p class="description textCenter" style="font-size: 30px; margin-bottom: 16px;">
                            <span class="red_text" style="font-size:30px;">پہلے سے زیر تعلیم :</span> تمام معلومات درج کریں ۔ (*) ستارے کے نشان والی تمام معلومات پُر کرنا لازمی ہیں ۔
                        </p>

                        <!-- Registration Number -->
                        <div class="form-container">
                            <label>داخلہ نمبر (رجسٹریشن نمبر)<span class="redText">*</span></label>
                            <input type="text" id="registration-no" placeholder=""
                                style="font-family: Roboto, sans-serif; direction: ltr; text-align: right;"/>
                        </div>

                        <!-- Student Name -->
                        <div class="form-container">
                            <label>نام طالب/ طالبہ<span class="redText">*</span></label>
                            <input type="text" id="student-name" placeholder=""/>
                        </div>

                        <!-- Father Name -->
                        <div class="form-container">
                            <label>والد کا نام</label>
                            <input type="text" id="father-name" placeholder=""/>
                        </div>

                        <!-- Date of Birth -->
                        <div class="form-container">
                            <label>تاریخ پیدائش<span class="redText">*</span></label>
                            <input type="date" id="dob" style="font-family: Roboto, sans-serif;"/>
                        </div>

                        <!-- CNIC / B-Form -->
                        <div class="form-container">
                            <label>شناختی کارڈ/ب فارم نمبر<span class="redText">*</span></label>
                            <input type="text" id="cnic-field" value="${formData.cnic}" maxlength="13"
                                placeholder="xxxxxxxxxxxxx"
                                style="font-family: Roboto, sans-serif; direction: ltr; text-align: right;"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                        </div>

                        <!-- Phone Number -->
                        <div class="form-container">
                            <label>فون نمبر<span class="redText">*</span></label>
                            <input type="text" id="phone" maxlength="11"
                                placeholder="03xxxxxxxxx"
                                style="font-family: Roboto, sans-serif; direction: ltr; text-align: right;"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                        </div>

                        <!-- WhatsApp/Telegram -->
                        <div class="form-container">
                            <label>وٹس ایپ/ٹیلی گرام نمبر</label>
                            <p class="greenDescription" style="font-size: 18px; margin: 4px 0 8px;">(اپنا نمبر نہ ہو تو کسی عزیز کا لکھیں تاہم اسکی وضاحت ضروری ہے)</p>
                            <input type="text" id="whatsapp" maxlength="11"
                                placeholder="03xxxxxxxxx"
                                style="font-family: Roboto, sans-serif; direction: ltr; text-align: right;"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"/>
                        </div>

                        <!-- Full Address -->
                        <div class="form-container">
                            <label>مکمل پتہ</label>
                            <textarea id="full-address" rows="3" style="width: 100%; resize: vertical; font-size: 20px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: MehrNastaliq;"></textarea>
                        </div>

                        <!-- Current Address -->
                        <div class="form-container">
                            <label>موجودہ پتا (رہائش)<span class="redText">*</span></label>
                            <textarea id="current-address" rows="3" style="width: 100%; resize: vertical; font-size: 20px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: MehrNastaliq;"></textarea>
                        </div>

                        <!-- Last Year Grade -->
                        <div class="form-container">
                            <label>شعبہ و درجہ (جس میں پچھلے سال زیر تعلیم تھے)<span class="redText">*</span></label>
                            <select id="last-year-grade">
                                ${gradeOpts}
                            </select>
                        </div>

                        <!-- Next Year Grade -->
                        <div class="form-container">
                            <label>آئندہ شعبہ و درجہ تعلیم (بعد از ترقی)<span class="redText">*</span></label>
                            <select id="next-year-grade">
                                ${gradeOpts}
                            </select>
                        </div>

                        <!-- Remarks/Note -->
                        <div class="form-container">
                            <label>نوٹ : سال گزشتہ میں دوران تعلیم اگر کوئی عذر یا شخصی معاملہ پیش آیا ہو تو اس کی تفصیلات لکھیے</label>
                            <textarea id="remarks" rows="3" style="width: 100%; resize: vertical; font-size: 20px; padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-family: MehrNastaliq;"></textarea>
                        </div>

                        <!-- Submit -->
                        <div class="form-footer" style="margin-top: 48px;">
                            <button class="submit-button" id="btn-step2-submit" onclick="handleStep2Submit()">
                                فارم جمع کروائیں
                            </button>
                        </div>

                        <div id="step2-error" style="display:none;" class="form-field-error mt-16">
                            تمام لازمی معلومات پُر کریں
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===================== SUCCESS & RECORDS PAGES =====================
function renderSuccessPage() {
    const isNew = formData.admissionType === 'نیا داخلہ';

    function tableRow(label, value, isLtr) {
        return `<tr>
            <td class="label-cell">${label}</td>
            <td class="value-cell${isLtr ? ' ltr' : ''}">${value || '—'}</td>
        </tr>`;
    }

    let step2Rows = '';
    if (isNew) {
        step2Rows = `
            ${tableRow('نام طالب/ طالبہ', formData.studentName)}
            ${tableRow('والد کا نام', formData.fatherName)}
            ${tableRow('تاریخ پیدائش', formData.dob, true)}
            ${tableRow('شناختی کارڈ/ب فارم نمبر', formData.cnic, true)}
            ${tableRow('فون نمبر', formData.phone, true)}
            ${tableRow('وٹس ایپ/ٹیلی گرام نمبر', formData.whatsapp, true)}
            ${tableRow('مکمل پتہ', formData.fullAddress)}
            ${tableRow('موجودہ پتا (رہائش)', formData.currentAddress)}
            ${tableRow('مطلوبہ شعبہ و درجہ تعلیم', formData.requiredGrade)}
            ${tableRow('سابقہ تعلیم کی تفصیل', formData.previousEducation)}
        `;
    } else {
        step2Rows = `
            ${tableRow('داخلہ نمبر (رجسٹریشن)', formData.registrationNo, true)}
            ${tableRow('نام طالب/ طالبہ', formData.studentName)}
            ${tableRow('والد کا نام', formData.fatherName)}
            ${tableRow('تاریخ پیدائش', formData.dob, true)}
            ${tableRow('شناختی کارڈ/ب فارم نمبر', formData.cnic, true)}
            ${tableRow('فون نمبر', formData.phone, true)}
            ${tableRow('وٹس ایپ/ٹیلی گرام نمبر', formData.whatsapp, true)}
            ${tableRow('مکمل پتہ', formData.fullAddress)}
            ${tableRow('موجودہ پتا (رہائش)', formData.currentAddress)}
            ${tableRow('پچھلے سال کا شعبہ و درجہ', formData.lastYearGrade)}
            ${tableRow('آئندہ شعبہ و درجہ (بعد از ترقی)', formData.nextYearGrade)}
            ${tableRow('ملاحظات / عذر', formData.remarks)}
        `;
    }

    return `
        ${renderNavbar()}
        <div class="App">
            <div class="form-content">
                <div class="card">
                    <div class="card-body" style="text-align: center; padding: 48px 32px;">
                        <div style="margin-bottom: 24px;">
                            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="16 8 10 16 7 13"></polyline>
                            </svg>
                        </div>
                        <p class="redDescription textCenter" style="font-size: 36px; color: #28a745;">
                            آپ کا داخلہ فارم کامیابی سے جمع ہو گیا ہے
                        </p>
                        <p class="description textCenter" style="margin-top: 16px;">
                            آپ کا فارم موصول ہوگیا ہے ۔ جلد آپ سے رابطہ کیا جائے گا ۔
                        </p>
                    </div>
                </div>

                <div class="card" style="margin-top: 24px;">
                    <div class="card-header">
                        <span class="card-header-label">جمع شدہ معلومات کا خلاصہ</span>
                        <span class="card-header-label">درخواست فارم</span>
                    </div>
                    <div class="card-body" style="padding: 16px 24px 32px;">

                        <div class="table-section-header">پہلا مرحلہ — بنیادی انتخاب</div>
                        <table class="data-summary-table">
                            <thead><tr><th>فیلڈ</th><th>درج شدہ قدر</th></tr></thead>
                            <tbody>
                                ${tableRow('داخلہ کی نوعیت', formData.admissionType)}
                                ${tableRow('جنس', formData.gender)}
                                ${tableRow('شعبہ', formData.department)}
                            </tbody>
                        </table>

                        <div class="table-section-header">دوسرا مرحلہ — ${isNew ? 'نیا داخلہ کوائف' : 'زیر تعلیم کوائف'}</div>
                        <table class="data-summary-table">
                            <thead><tr><th>فیلڈ</th><th>درج شدہ قدر</th></tr></thead>
                            <tbody>
                                ${step2Rows}
                            </tbody>
                        </table>

                        <div class="success-buttons">
                            <button class="submit-button" onclick="navigate('/')">
                                واپس ہوم پیج
                            </button>
                            <button class="btn-view-records" onclick="navigate('/records')">
                                تمام جمع شدہ فارمز دیکھیں
                                <span class="badge-count">${submittedRecords.length}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAllRecordsPage() {
    const count = submittedRecords.length;

    if (count === 0) {
        return `
            ${renderNavbar()}
            <div class="App">
                <div class="form-content">
                    <div class="card">
                        <div class="card-header">
                            <span class="card-header-label">جمع شدہ فارمز</span>
                        </div>
                        <div class="card-body empty-state">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="#999">
                                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                            </svg>
                            <p class="description textCenter" style="font-size: 28px;">ابھی تک کوئی فارم جمع نہیں ہوا</p>
                            <div style="margin-top: 32px;">
                                <button class="submit-button" onclick="navigate('/')">واپس ہوم پیج</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    let recordCards = '';
    submittedRecords.forEach((rec, idx) => {
        const isNew = rec.admissionType === 'نیا داخلہ';
        recordCards += `
            <div class="record-card">
                <div class="record-card-header">
                    <h3>${rec.studentName || 'امیدوار'}</h3>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 16px; opacity: 0.8; font-family: Roboto, sans-serif;">${rec.submittedAt}</span>
                        <div class="record-number">${idx + 1}</div>
                    </div>
                </div>
                <div class="record-card-body">
                    <div class="record-mini-grid">
                        <div class="record-mini-item">
                            <span class="record-mini-label">نام</span>
                            <span class="record-mini-value">${rec.studentName || '—'}</span>
                        </div>
                        <div class="record-mini-item">
                            <span class="record-mini-label">والد کا نام</span>
                            <span class="record-mini-value">${rec.fatherName || '—'}</span>
                        </div>
                        <div class="record-mini-item">
                            <span class="record-mini-label">داخلہ کی نوعیت</span>
                            <span class="record-mini-value">${rec.admissionType || '—'}</span>
                        </div>
                        <div class="record-mini-item">
                            <span class="record-mini-label">فون نمبر</span>
                            <span class="record-mini-value" style="font-family: Roboto; direction: ltr; text-align: left;">${rec.phone || '—'}</span>
                        </div>
                        <div class="record-mini-item">
                            <span class="record-mini-label">شعبہ</span>
                            <span class="record-mini-value">${rec.department || '—'}</span>
                        </div>
                        <div class="record-mini-item">
                            <span class="record-mini-label">${isNew ? 'مطلوبہ درجہ' : 'آئندہ درجہ'}</span>
                            <span class="record-mini-value">${isNew ? (rec.requiredGrade || '—') : (rec.nextYearGrade || '—')}</span>
                        </div>
                    </div>
                    <div style="margin-top: 16px; display: flex; gap: 12px;">
                        <button class="btn-outline-green" onclick="viewRecordDetail(${idx})">تفصیلات دیکھیں</button>
                        <button class="btn-outline-green" style="border-color: #c62828; color: #c62828;" onclick="deleteRecord(${idx})">حذف کریں</button>
                    </div>
                </div>
            </div>
        `;
    });

    return `
        ${renderNavbar()}
        <div class="App">
            <div class="form-content">
                <div class="card" style="margin-bottom: 24px;">
                    <div class="card-header">
                        <span class="card-header-label">تمام جمع شدہ فارمز</span>
                        <span class="card-header-label" style="font-size: 20px;">کل: <span style="font-family: Roboto;">${count}</span></span>
                    </div>
                    <div class="card-body" style="padding: 16px 24px;">
                        <div class="flex row" style="gap: 16px; margin-bottom: 24px; justify-content: flex-start;">
                            <button class="submit-button" onclick="navigate('/')">واپس ہوم پیج</button>
                            <button class="btn-outline-green" style="border-color: #c62828; color: #c62828;" onclick="clearAllRecords()">تمام ریکارڈ حذف کریں</button>
                        </div>
                        <div class="records-list">${recordCards}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderRecordDetailPage(index) {
    const rec = submittedRecords[index];
    if (!rec) return renderAllRecordsPage();
    const isNew = rec.admissionType === 'نیا داخلہ';

    function tableRow(label, value, isLtr) {
        return `<tr>
            <td class="label-cell">${label}</td>
            <td class="value-cell${isLtr ? ' ltr' : ''}">${value || '—'}</td>
        </tr>`;
    }

    let detailRows = '';
    if (isNew) {
        detailRows = `
            ${tableRow('نام طالب/ طالبہ', rec.studentName)}
            ${tableRow('والد کا نام', rec.fatherName)}
            ${tableRow('تاریخ پیدائش', rec.dob, true)}
            ${tableRow('شناختی کارڈ/ب فارم نمبر', rec.cnic, true)}
            ${tableRow('فون نمبر', rec.phone, true)}
            ${tableRow('وٹس ایپ/ٹیلی گرام نمبر', rec.whatsapp, true)}
            ${tableRow('مکمل پتہ', rec.fullAddress)}
            ${tableRow('موجودہ پتا (رہائش)', rec.currentAddress)}
            ${tableRow('مطلوبہ شعبہ و درجہ تعلیم', rec.requiredGrade)}
            ${tableRow('سابقہ تعلیم کی تفصیل', rec.previousEducation)}
        `;
    } else {
        detailRows = `
            ${tableRow('داخلہ نمبر (رجسٹریشن)', rec.registrationNo, true)}
            ${tableRow('نام طالب/ طالبہ', rec.studentName)}
            ${tableRow('والد کا نام', rec.fatherName)}
            ${tableRow('تاریخ پیدائش', rec.dob, true)}
            ${tableRow('شناختی کارڈ/ب فارم نمبر', rec.cnic, true)}
            ${tableRow('فون نمبر', rec.phone, true)}
            ${tableRow('وٹس ایپ/ٹیلی گرام نمبر', rec.whatsapp, true)}
            ${tableRow('مکمل پتہ', rec.fullAddress)}
            ${tableRow('موجودہ پتا (رہائش)', rec.currentAddress)}
            ${tableRow('پچھلے سال کا شعبہ و درجہ', rec.lastYearGrade)}
            ${tableRow('آئندہ شعبہ و درجہ (بعد از ترقی)', rec.nextYearGrade)}
            ${tableRow('ملاحظات / عذر', rec.remarks)}
        `;
    }

    return `
        ${renderNavbar()}
        <div class="App">
            <div class="form-content">
                <div class="card">
                    <div class="card-header">
                        <span class="card-header-label">فارم نمبر <span style="font-family: Roboto;">${index + 1}</span> کی تفصیلات</span>
                        <span class="card-header-label">${rec.studentName || 'امیدوار'}</span>
                    </div>
                    <div class="card-body" style="padding: 16px 24px 32px;">
                        <p style="font-family: Roboto; font-size: 14px; color: #888; text-align: left; margin-bottom: 16px;">Submitted: ${rec.submittedAt}</p>

                        <div class="table-section-header">بنیادی انتخاب</div>
                        <table class="data-summary-table">
                            <thead><tr><th>فیلڈ</th><th>درج شدہ قدر</th></tr></thead>
                            <tbody>
                                ${tableRow('داخلہ کی نوعیت', rec.admissionType)}
                                ${tableRow('جنس', rec.gender)}
                                ${tableRow('شعبہ', rec.department)}
                            </tbody>
                        </table>

                        <div class="table-section-header">${isNew ? 'نیا داخلہ کوائف' : 'زیر تعلیم کوائف'}</div>
                        <table class="data-summary-table">
                            <thead><tr><th>فیلڈ</th><th>درج شدہ قدر</th></tr></thead>
                            <tbody>${detailRows}</tbody>
                        </table>

                        <div class="success-buttons">
                            <button class="submit-button" onclick="navigate('/records')">واپس فارمز کی فہرست</button>
                            <button class="submit-button" onclick="navigate('/')">واپس ہوم پیج</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function viewRecordDetail(index) {
    currentRecordIndex = index;
    navigate('/records/detail');
}

function deleteRecord(index) {
    if (confirm('کیا آپ واقعی یہ ریکارڈ حذف کرنا چاہتے ہیں؟')) {
        submittedRecords.splice(index, 1);
        saveRecordsToStorage();
        render();
    }
}

function clearAllRecords() {
    if (confirm('کیا آپ واقعی تمام ریکارڈز حذف کرنا چاہتے ہیں؟')) {
        submittedRecords = [];
        saveRecordsToStorage();
        render();
    }
}

let currentRecordIndex = 0;

// ===================== EVENT HANDLERS =====================
function handleStep1Submit() {
    const admissionType = document.getElementById('admission-type').value;
    const gender = document.getElementById('gender').value;
    const department = document.getElementById('department').value;
    const errorDiv = document.getElementById('step1-error');

    if (admissionType === 'آپشن منتخب کریں' || gender === 'آپشن منتخب کریں' || department === 'آپشن منتخب کریں') {
        errorDiv.style.display = 'block';
        return;
    }

    errorDiv.style.display = 'none';
    formData.admissionType = admissionType;
    formData.gender = gender;
    formData.department = department;

    navigate('/newAdmission/form/step2');
}

function handleStep2Submit() {
    const isNew = formData.admissionType === 'نیا داخلہ';
    const errorDiv = document.getElementById('step2-error');

    // Common required fields
    const studentName = document.getElementById('student-name').value;
    const dob = document.getElementById('dob').value;
    const cnic = document.getElementById('cnic-field').value;
    const phone = document.getElementById('phone').value;
    const currentAddress = document.getElementById('current-address').value;

    // Common optional fields
    const fatherName = document.getElementById('father-name').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const fullAddress = document.getElementById('full-address').value;

    if (!studentName || !dob || !cnic || !phone || !currentAddress) {
        errorDiv.style.display = 'block';
        return;
    }

    if (isNew) {
        const requiredGrade = document.getElementById('required-grade').value;
        const previousEducation = document.getElementById('previous-education').value;

        if (requiredGrade === 'آپشن منتخب کریں') {
            errorDiv.style.display = 'block';
            return;
        }

        formData.requiredGrade = requiredGrade;
        formData.previousEducation = previousEducation;
    } else {
        const registrationNo = document.getElementById('registration-no').value;
        const lastYearGrade = document.getElementById('last-year-grade').value;
        const nextYearGrade = document.getElementById('next-year-grade').value;
        const remarks = document.getElementById('remarks').value;

        if (!registrationNo || lastYearGrade === 'آپشن منتخب کریں' || nextYearGrade === 'آپشن منتخب کریں') {
            errorDiv.style.display = 'block';
            return;
        }

        formData.registrationNo = registrationNo;
        formData.lastYearGrade = lastYearGrade;
        formData.nextYearGrade = nextYearGrade;
        formData.remarks = remarks;
    }

    errorDiv.style.display = 'none';

    // Save common fields
    formData.studentName = studentName;
    formData.fatherName = fatherName;
    formData.dob = dob;
    formData.cnic = cnic;
    formData.phone = phone;
    formData.whatsapp = whatsapp;
    formData.fullAddress = fullAddress;
    formData.currentAddress = currentAddress;

    // Build record and save
    const record = {
        id: Date.now(),
        submittedAt: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
        admissionType: formData.admissionType,
        gender: formData.gender,
        department: formData.department,
        studentName: formData.studentName,
        fatherName: formData.fatherName,
        dob: formData.dob,
        cnic: formData.cnic,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        fullAddress: formData.fullAddress,
        currentAddress: formData.currentAddress,
        requiredGrade: formData.requiredGrade,
        previousEducation: formData.previousEducation,
        registrationNo: formData.registrationNo,
        lastYearGrade: formData.lastYearGrade,
        nextYearGrade: formData.nextYearGrade,
        remarks: formData.remarks
    };

    submittedRecords.push(record);
    saveRecordsToStorage();

    navigate('/success');
}

// ===================== ROUTER =====================
function render() {
    const root = document.getElementById('root');
    const route = currentRoute;

    if (route === '/' || route === '') {
        root.innerHTML = renderHomePage();
    } else if (route === '/admission/cnic') {
        root.innerHTML = renderCnicPage();
    } else if (route === '/newAdmission/description') {
        root.innerHTML = renderInstructionsPage();
    } else if (route === '/newAdmission/form/step1') {
        root.innerHTML = renderFormStep1();
    } else if (route === '/newAdmission/form/step2') {
        root.innerHTML = renderFormStep2();
    } else if (route === '/success') {
        root.innerHTML = renderSuccessPage();
    } else if (route === '/records') {
        root.innerHTML = renderAllRecordsPage();
    } else if (route === '/records/detail') {
        root.innerHTML = renderRecordDetailPage(currentRecordIndex);
    } else {
        root.innerHTML = renderHomePage();
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    render();
});
