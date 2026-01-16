import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        // Simulate SSO Redirection Delay
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 60%)',
                zIndex: -1
            }} />

            <div className="flex flex-col items-center z-10 w-full max-w-md p-6 fade-in">
                {/* Logo Area */}
                <div className="mb-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-glow"
                        style={{
                            background: 'linear-gradient(135deg, var(--md-sys-color-primary) 0%, #1e293b 100%)',
                            boxShadow: 'var(--shadow-glow)'
                        }}>
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '32px' }}>apartment</span>
                    </div>
                    <h1 className="headline-medium font-bold mb-2">Al Tayer Group</h1>
                    <p className="body-medium text-secondary">Enterprise Access Portal</p>
                </div>

                {/* Login Card */}
                <Card className="w-full glass-card" padding="40px">
                    <div className="flex flex-col gap-6">
                        <div className="text-center mb-2">
                            <h2 className="title-medium mb-1">Welcome Back</h2>
                            <p className="body-small text-secondary">Please sign in with your corporate credential</p>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-4">
                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"
                                    style={{
                                        borderColor: 'var(--md-sys-color-secondary) transparent var(--md-sys-color-secondary) transparent'
                                    }}
                                />
                                <span className="label-small text-secondary">Authenticating with SSO...</span>
                            </div>
                        ) : (
                            <>
                                <Button
                                    variant="gradient"
                                    onClick={handleLogin}
                                    style={{ width: '100%', height: '52px', fontSize: '16px' }}
                                >
                                    Sign in with Enterprise ID
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={() => { }}
                                    style={{ width: '100%' }}
                                >
                                    Trouble signing in?
                                </Button>
                            </>
                        )}
                    </div>
                </Card>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="label-small text-secondary" style={{ opacity: 0.6 }}>
                        SECURE SYSTEM ACCESS • © 2025 AL TAYER GROUP
                    </p>
                </div>
            </div>
        </div>
    );
}
