import { useState, useEffect } from 'react';

export interface AdmissionStatus {
    is_admission_open: boolean;
    message: string;
}

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export function useAdmissionStatus() {
    const [status, setStatus] = useState<AdmissionStatus | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        fetch(`${API}/api/admissions/status`)
            .then(r => r.json())
            .then((data: AdmissionStatus) => setStatus(data))
            .catch(() =>
                setStatus({
                    is_admission_open: false,
                    message: 'نظام کی حالت تصدیق نہیں ہو سکی۔ براہ کرم صفحہ دوبارہ لوڈ کریں۔',
                })
            )
            .finally(() => setChecking(false));
    }, []);

    return { status, checking };
}
