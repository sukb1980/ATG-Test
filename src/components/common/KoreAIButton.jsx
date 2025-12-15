import React from 'react';

export default function KoreAIButton() {
    return (
        <button
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                width: '56px',
                height: '56px',
                borderRadius: '16px', // Material 3 FAB is slightly squircle-ish or just rounded
                backgroundColor: 'var(--md-sys-color-tertiary-container)',
                color: 'var(--md-sys-color-on-tertiary-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--md-sys-elevation-level-3)',
                zIndex: 1000,
                transition: 'transform 0.2s'
            }}
            onClick={() => alert('Start KORE AI Conversation')}
            aria-label="AI Assistant"
        >
            <span className="material-symbols-outlined">smart_toy</span>
        </button>
    );
}
