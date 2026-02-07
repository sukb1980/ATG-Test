import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../context/UserContext';

export default function Login() {
    const navigate = useNavigate();
    const { loginWithGoogle, loginWithFacebook } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const handleSocialLogin = async (provider) => {
        setIsLoading(true);
        try {
            if (provider === 'google') await loginWithGoogle();
            if (provider === 'facebook') await loginWithFacebook();
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed (Check console). Using Guest mode.");
            navigate('/dashboard');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 800);
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
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleSocialLogin('google')}
                                    className="w-full py-3 flex items-center justify-center gap-3 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-sm group"
                                >
                                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                                    <span className="text-slate-700 font-medium group-hover:text-brand-navy">Sign in with Google</span>
                                </button>

                                <button
                                    onClick={() => handleSocialLogin('facebook')}
                                    className="w-full py-3 flex items-center justify-center gap-3 bg-[#1877F2] text-white shadow-sm hover:shadow-md hover:bg-[#166fe5] transition-all rounded-sm"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.971.742-2.971 2.28v1.691h3.906l-1.076 3.667h-2.83V23.691h-4.843z" />
                                    </svg>
                                    <span className="font-medium">Sign in with Facebook</span>
                                </button>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-slate-400">Or continue as Guest</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGuestLogin}
                                    className="w-full btn-primary py-4 text-sm shadow-lg shadow-orange-500/20"
                                >
                                    Enter Dashboard (Guest)
                                </button>
                            </div>
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
