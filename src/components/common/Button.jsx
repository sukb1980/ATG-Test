import React from 'react';
import clsx from 'clsx';

export default function Button({ children, variant = 'filled', onClick, style, className, type = 'button', disabled }) {
    const baseStyle = {
        padding: '10px 24px',
        borderRadius: 'var(--radius-full)', // Premium pill shape
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style
    };

    let variantStyle = {};

    switch (variant) {
        case 'filled':
            variantStyle = {
                background: disabled ? 'var(--md-sys-color-surface-variant)' : 'linear-gradient(135deg, var(--md-sys-color-primary) 0%, #1e293b 100%)',
                color: disabled ? 'var(--md-sys-color-on-surface-variant)' : 'var(--md-sys-color-on-primary)',
                boxShadow: disabled ? 'none' : 'var(--shadow-md)',
                border: '1px solid transparent'
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
                border: '1px solid transparent'
            };
            break;
        case 'text':
            variantStyle = {
                backgroundColor: 'transparent',
                color: 'var(--md-sys-color-on-surface)',
                padding: '10px 16px',
            };
            break;
        case 'gradient': // New Premium Variant
            variantStyle = {
                background: 'linear-gradient(135deg, var(--md-sys-color-secondary) 0%, #a16207 100%)', // Gold Gradient
                color: '#ffffff',
                boxShadow: 'var(--shadow-glow)',
                border: 'none'
            };
            break;
        default: break;
    }

    if (disabled) {
        variantStyle.opacity = 0.6;
        variantStyle.boxShadow = 'none';
    }

    return (
        <button
            type={type}
            style={{ ...baseStyle, ...variantStyle }}
            onClick={disabled ? undefined : onClick}
            className={className}
            disabled={disabled}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    if (variant === 'filled' || variant === 'gradient') {
                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    }
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    if (variant === 'filled') {
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }
                    if (variant === 'gradient') {
                        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                    }
                }
            }}
        >
            {children}
        </button>
    );
}
