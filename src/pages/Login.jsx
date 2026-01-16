import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans">

            {/* Left Side - Image/Brand */}
            <div className="hidden lg:flex w-1/2 bg-brand-navy relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center px-10">
                    <h1 className="font-display text-5xl font-bold text-white mb-4 tracking-tight">EXCELLENCE DRIVES US</h1>
                    <p className="text-brand-border/80 text-lg font-light tracking-wide max-w-md mx-auto">
                        Premier automotive experiences across the UAE.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md">

                    <div className="mb-12 text-center lg:text-left">
                        <div className="inline-block mb-6">
                            <h2 className="font-display font-bold text-brand-navy text-2xl uppercase tracking-widest border-b-2 border-brand-orange pb-2">Al Tayer</h2>
                        </div>
                        <h1 className="text-4xl font-display font-medium text-brand-navy mb-2">Welcome Back</h1>
                        <p className="text-slate-500">Please sign in to access the Enterprise Portal.</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-2">Employee ID</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-brand-silver border border-brand-border rounded-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-slate-400"
                                placeholder="E.g. 8842-X"
                            />
                        </div>

                        {isLoading ? (
                            <div className="w-full py-4 bg-brand-navy/5 flex items-center justify-center gap-3 rounded-sm">
                                <div className="w-5 h-5 border-2 border-brand-navy border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-brand-navy text-sm font-medium uppercase tracking-wider">Authenticating...</span>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="w-full btn-primary py-4 text-sm shadow-lg shadow-orange-500/20"
                            >
                                Sign In With SSO
                            </button>
                        )}

                        <div className="flex justify-between items-center mt-8 pt-8 border-t border-brand-border/50">
                            <a href="#" className="text-sm text-slate-500 hover:text-brand-orange transition-colors">Forgot Credentials?</a>
                            <a href="#" className="text-sm text-slate-500 hover:text-brand-orange transition-colors">Contact Support</a>
                        </div>
                    </div>

                    <div className="mt-12 text-center lg:text-left">
                        <p className="text-xs text-slate-400 uppercase tracking-widest">© 2026 Al Tayer Group</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
