import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        // Add wait cursor to body
        document.body.style.cursor = 'wait';

        // Simulate SSO Redirection Delay
        setTimeout(() => {
            document.body.style.cursor = 'default';
            navigate('/dashboard');
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full relative overflow-hidden bg-slate-900">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-600/30 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/30 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-cyan-600/30 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="flex flex-col items-center z-10 w-full max-w-md p-6 fade-in scale-in">
                {/* Logo Area */}
                <div className="mb-10 text-center relative group">
                    <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse"></div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl relative z-10 border border-white/10"
                        style={{
                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        }}>
                        <span className="material-symbols-outlined text-transparent bg-clip-text bg-gradient-to-br from-blue-200 to-cyan-400" style={{ fontSize: '40px' }}>apartment</span>
                    </div>
                    <h1 className="headline-medium font-bold mb-2 text-white/90 tracking-tight">Al Tayer Group</h1>
                    <p className="body-medium text-blue-200/60 font-medium tracking-wide">ENTERPRISE PORTAL</p>
                </div>

                {/* Login Card */}
                <Card className="w-full glass-card backdrop-blur-xl border-white/10 bg-white/5" padding="40px">
                    <div className="flex flex-col gap-6">
                        <div className="text-center mb-2">
                            <h2 className="title-medium mb-1 text-white">Welcome Back</h2>
                            <p className="body-small text-slate-400">Please sign in with your corporate credential</p>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 border-4 border-blue-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 w-12 h-12 border-4 border-purple-500/20 border-b-purple-400 rounded-full animate-spin-slow"></div>
                                </div>
                                <span className="label-small text-cyan-200 animate-pulse">Authenticating with SSO...</span>
                            </div>
                        ) : (
                            <>
                                <button
                                    className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-white/10 flex items-center justify-center gap-3 group"
                                    onClick={handleLogin}
                                >
                                    <span>Sign in with Enterprise ID</span>
                                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">login</span>
                                </button>
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
