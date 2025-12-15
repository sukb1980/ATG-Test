import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Login() {
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50" style={{ backgroundColor: 'var(--md-sys-color-background)' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
                <div className="text-center mb-8">
                    <div style={{
                        width: '64px', height: '64px',
                        backgroundColor: 'var(--md-sys-color-primary)',
                        borderRadius: '12px',
                        margin: '0 auto 16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'white' }}>business_center</span>
                    </div>
                    <h1 className="headline-small font-bold text-gray-900">Sign in to ATG</h1>
                    <p className="body-medium text-secondary mt-2">Welcome back! Please enter your details.</p>
                </div>

                <Card>
                    <div className="flex flex-col gap-4">
                        <p className="body-medium text-center text-secondary mb-2">Use your company credentials to access the workspace.</p>
                        <Button
                            variant="filled"
                            onClick={handleLogin}
                            disabled={loading}
                            style={{ width: '100%', height: '48px', fontSize: '16px' }}
                        >
                            {loading ? 'Redirecting...' : 'Sign in with SSO'}
                        </Button>
                    </div>
                </Card>

                <p className="text-center mt-8 label-small text-secondary">
                    © 2025 ATG Enterprises. All rights reserved.
                </p>
            </div>
        </div>
    );
}
