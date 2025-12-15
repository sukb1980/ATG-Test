import React from 'react';

export default function Badge({ children, color = 'primary' }) {
    // colors: primary, error, success, warning

    let bg = 'var(--md-sys-color-primary-container)';
    let fg = 'var(--md-sys-color-on-primary-container)';

    if (color === 'error') {
        bg = 'var(--md-sys-color-error-container)';
        fg = 'var(--md-sys-color-on-error-container)';
    } else if (color === 'success') {
        // Custom green for success
        bg = '#C4EED0';
        fg = '#00210E';
    } else if (color === 'warning') {
        bg = '#FFEFB0';
        fg = '#291D00';
    }

    return (
        <span style={{
            backgroundColor: bg,
            color: fg,
            padding: '2px 8px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 500,
            display: 'inline-block'
        }}>
            {children}
        </span>
    );
}
