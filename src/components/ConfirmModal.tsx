interface ConfirmModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
            onClick={onCancel}
        >
            <div 
                style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    maxWidth: '450px',
                    width: '90%',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <p style={{
                    fontSize: '22px',
                    marginBottom: '32px',
                    color: '#333',
                    lineHeight: '1.6',
                }}>
                    {message}
                </p>
                
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                }}>
                    <button
                        onClick={onConfirm}
                        style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 32px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#c82333';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#dc3545';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        ہاں
                    </button>
                    
                    <button
                        onClick={onCancel}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 32px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#5a6268';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#6c757d';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        نہیں
                    </button>
                </div>
            </div>
        </div>
    );
}
