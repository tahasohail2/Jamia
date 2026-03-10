interface StepperProps {
    activeStep: number;
}

const steps = [
    { num: 1, label: 'پہلا مرحلہ' },
    { num: 2, label: 'دوسرا مرحلہ' },
];

export default function Stepper({ activeStep }: StepperProps) {
    return (
        <div className="form-steps">
            {steps.map((step, i) => {
                const isCompleted = step.num < activeStep;

                return (
                    <div key={step.num} style={{ display: 'flex', alignItems: 'center' }}>
                        {i > 0 && <div className="form-step-seperator" />}
                        <div className="form-step">
                            <span className="form-steps-label">{step.label}</span>
                            {isCompleted ? (
                                <div className="form-steps-circle-tick">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#058464"
                                        strokeWidth="3"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="form-steps-circle-label">{step.num}</div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
