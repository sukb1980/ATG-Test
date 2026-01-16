import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500); // Simulate auth delay
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-deep-space relative overflow-hidden font-sans">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Login Container */}
            <div className="relative z-10 w-full max-w-md p-6">

                {/* Logo / Header */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-900 to-blue-900 rounded-2xl flex items-center justify-center border border-cyan-500/30 shadow-[0_0_30px_rgba(0,243,255,0.2)] mb-6">
                        <span className="material-symbols-outlined text-4xl text-cyan-400">apartment</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 font-display">Al Tayer Group</h1>
                    <p className="text-cyan-400/60 text-sm tracking-widest uppercase font-bold">Enterprise Portal</p>
                </div>

                {/* Glass Card Form */}
                <div className="glass-panel p-8 backdrop-blur-2xl bg-black/40 border border-white/10">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-semibold text-white mb-1">Welcome Back</h2>
                        <p className="text-slate-400 text-sm">Secure Employee Access</p>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-6 gap-4">
                            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                            <p className="text-cyan-400 text-sm animate-pulse">Authenticating...</p>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="w-full btn-primary flex items-center justify-center gap-3 group"
                        >
                            <span>Sign in with SSO</span>
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    )}

                    <div className="mt-6 text-center">
                        <button className="text-slate-500 text-xs hover:text-cyan-400 transition-colors">
                            Need help signing in?
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-slate-600 text-[10px] uppercase tracking-widest">
                        Protected System • Authorized Use Only
                    </p>
                </div>
            </div>
        </div>
    );
}
