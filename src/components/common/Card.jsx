import React from 'react';

export default function Card({ children, className, style, padding = '24px', onClick }) {
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                backgroundColor: 'var(--md-sys-color-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                boxShadow: 'var(--shadow-sm)',
                padding: padding,
                transition: 'all 0.2s ease',
                cursor: onClick ? 'pointer' : 'default',
                ...style
            }}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.borderColor = 'var(--md-sys-color-primary)';
                }
            }}
            onMouseLeave={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'var(--md-sys-color-outline-variant)';
                }
            }}
        >
            {children}
        </div>
    );
}
