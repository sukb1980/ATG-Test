import React from 'react';

export default function Card({ children, className, style, padding = '24px', onClick }) {
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                backgroundColor: 'var(--md-sys-color-surface)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-lg)',
                border: 'var(--glass-border)',
                boxShadow: 'var(--shadow-sm)',
                padding: padding,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: onClick ? 'pointer' : 'default',
                ...style
            }}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    e.currentTarget.style.borderColor = 'var(--md-sys-color-primary)';
                }
            }}
            onMouseLeave={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }
            }}
        >
            {children}
        </div>
    );
}
