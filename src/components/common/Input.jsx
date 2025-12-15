import React from 'react';

export default function Input({ label, type = 'text', value, onChange, placeholder, style }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px', ...style }}>
            {label && <label className="label-small" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: '1px solid var(--md-sys-color-outline)',
                    backgroundColor: 'transparent',
                    color: 'var(--md-sys-color-on-surface)',
                    fontSize: '16px',
                    outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--md-sys-color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--md-sys-color-outline)'}
            />
        </div>
    );
}
