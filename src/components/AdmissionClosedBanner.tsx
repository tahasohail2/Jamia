interface AdmissionClosedBannerProps {
    message: string;
}

export default function AdmissionClosedBanner({ message }: AdmissionClosedBannerProps) {
    return (
        <div className="admission-closed-banner" role="alert">
            <span className="admission-closed-banner__icon">⚠️</span>
            <div className="admission-closed-banner__text">
                <strong>داخلہ فی الحال بند ہے</strong>
                <p>{message}</p>
            </div>
        </div>
    );
}
