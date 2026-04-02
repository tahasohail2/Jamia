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
    alphabeticOnly?: boolean;
    children?: ReactNode;
    error?: string;
    readOnly?: boolean;
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
    alphabeticOnly = false,
    error,
    readOnly = false,
}: FormFieldProps) {
    // Format date value to yyyy-MM-dd format for date inputs
    const formatDateValue = (val: string, inputType: string) => {
        if (inputType === 'date' && val) {
            try {
                // If it's an ISO timestamp, extract just the date part
                if (val.includes('T')) {
                    return val.split('T')[0];
                }
                // If it's already in the correct format, return as is
                return val;
            } catch {
                return val;
            }
        }
        return val;
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        let val = e.target.value;
        if (numericOnly) {
            // Only allow numbers
            val = val.replace(/[^0-9]/g, '');
        } else if (alphabeticOnly) {
            // Only allow letters, spaces, and Urdu characters
            // This regex allows: English letters, spaces, Urdu/Arabic characters
            val = val.replace(/[0-9]/g, '');
        }
        onChange(val);
    };

    const inputClassName = `${error ? 'error' : ''} ${readOnly ? 'readonly-field' : ''}`.trim();
    const formattedValue = formatDateValue(value, type);

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
                <select 
                    id={id} 
                    value={formattedValue} 
                    onChange={handleInputChange} 
                    style={inputStyle}
                    className={inputClassName}
                    disabled={readOnly}
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : type === 'textarea' ? (
                <textarea
                    id={id}
                    value={formattedValue}
                    onChange={handleInputChange}
                    rows={rows}
                    className={inputClassName}
                    readOnly={readOnly}
                    style={{
                        width: '100%',
                        resize: 'vertical',
                        fontSize: '20px',
                        padding: '12px',
                        borderRadius: '8px',
                        fontFamily: 'MehrNastaliq',
                        ...inputStyle,
                    }}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    value={formattedValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    style={inputStyle}
                    className={inputClassName}
                    readOnly={readOnly}
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
