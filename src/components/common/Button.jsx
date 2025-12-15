import React from 'react';
import clsx from 'clsx';

export default function Button({ children, variant = 'filled', onClick, style, className, type = 'button', disabled }) {
    const baseStyle = {
        padding: '10px 20px',
        borderRadius: 'var(--radius-sm)', // Cleaner, tighter radius
        fontSize: '14px',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.15s ease',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style
    };

    let variantStyle = {};

    switch (variant) {
        case 'filled':
            variantStyle = {
                backgroundColor: disabled ? 'var(--md-sys-color-surface-variant)' : 'var(--md-sys-color-primary)',
                color: disabled ? 'var(--md-sys-color-on-surface-variant)' : 'var(--md-sys-color-on-primary)',
                boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
            };
            break;
        case 'outlined':
            variantStyle = {
                backgroundColor: 'transparent',
                border: '1px solid var(--md-sys-color-outline)',
                color: 'var(--md-sys-color-on-surface)',
            };
            break;
        case 'tonal':
            variantStyle = {
                backgroundColor: 'var(--md-sys-color-secondary-container)',
                color: 'var(--md-sys-color-on-secondary-container)',
            };
            break;
        case 'text':
            variantStyle = {
                backgroundColor: 'transparent',
                color: 'var(--md-sys-color-on-surface)',
                padding: '10px 12px'
            };
            break;
    }

    if (disabled) {
        variantStyle.opacity = 0.6;
    }

    return (
        <button
            type={type}
            style={{ ...baseStyle, ...variantStyle }}
            onClick={disabled ? undefined : onClick}
            className={className}
            disabled={disabled}
            onMouseEnter={(e) => {
                if (!disabled) e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
                if (!disabled) e.currentTarget.style.opacity = '1';
            }}
        >
            {children}
        </button>
    );
}
