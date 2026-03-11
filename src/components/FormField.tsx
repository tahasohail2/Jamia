import type { ChangeEvent, ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    required?: boolean;
    hint?: string;
    type?: 'text' | 'date' | 'select' | 'textarea';
    id: string;
    value: string;
    onChange: (value: string) => void;
    options?: string[];
    placeholder?: string;
    maxLength?: number;
    rows?: number;
    inputStyle?: React.CSSProperties;
    numericOnly?: boolean;
    children?: ReactNode;
    error?: string;
}

export default function FormField({
    label,
    required = false,
    hint,
    type = 'text',
    id,
    value,
    onChange,
    options = [],
    placeholder = '',
    maxLength,
    rows = 3,
    inputStyle = {},
    numericOnly = false,
    error,
}: FormFieldProps) {
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        let val = e.target.value;
        if (numericOnly) {
            val = val.replace(/[^0-9]/g, '');
        }
        onChange(val);
    };

    return (
        <div className="form-container">
            <label htmlFor={id}>
                {label}
                {required && <span className="redText">*</span>}
            </label>

            {hint && (
                <p className="greenDescription" style={{ fontSize: '18px', margin: '4px 0 8px' }}>
                    {hint}
                </p>
            )}

            {type === 'select' ? (
                <select id={id} value={value} onChange={handleInputChange} style={inputStyle}>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    rows={rows}
                    style={{
                        width: '100%',
                        resize: 'vertical',
                        fontSize: '20px',
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        fontFamily: 'MehrNastaliq',
                        ...inputStyle,
                    }}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    style={inputStyle}
                />
            )}

            {error && (
                <div className="form-field-error" style={{ marginTop: '8px' }}>
                    {error}
                </div>
            )}
        </div>
    );
}
