import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    title?: string;
    headerLeft?: string;
    headerRight?: string;
    className?: string;
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}

export default function Card({
    children,
    title,
    headerLeft,
    headerRight,
    className = '',
    style,
    bodyStyle,
}: CardProps) {
    return (
        <div className={`card ${className}`} style={style}>
            {title && <div className="card-title">{title}</div>}

            {(headerLeft || headerRight) && (
                <div className="card-header">
                    <span className="card-header-label">{headerLeft}</span>
                    {headerRight && (
                        <span className="card-header-label">{headerRight}</span>
                    )}
                </div>
            )}

            <div className="card-body" style={bodyStyle}>
                {children}
            </div>
        </div>
    );
}
