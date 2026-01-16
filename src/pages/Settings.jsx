import React, { useState } from 'react';

export default function Settings() {
    const [toggles, setToggles] = useState({
        notifications: true,
        email: true,
        sso: true,
        darkMode: false,
        sound: false
    });

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="w-full fade-in">
            <h1 className="text-3xl font-bold text-brand-navy mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-brand-orange">settings</span>
                SYSTEM SETTINGS
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* User Profile */}
                <div className="glass-panel p-8 bg-white border border-brand-border">
                    <h2 className="text-xl font-bold text-brand-navy mb-6 text-center">User Profile</h2>
                    <div className="flex flex-col items-center">
                        <div className="relative mb-4 group cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-brand-silver border-2 border-brand-orange flex items-center justify-center text-2xl font-bold text-brand-navy">
                                LA
                            </div>
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">
                                Change
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy">Latif</h3>
                        <p className="text-sm text-slate-500 mb-6 uppercase tracking-wider">System Administrator</p>

                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center p-3 rounded bg-brand-silver">
                                <span className="text-sm text-slate-500">Employee ID</span>
                                <span className="text-sm font-bold text-brand-navy font-mono">ATG-8842</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded bg-brand-silver">
                                <span className="text-sm text-slate-500">Department</span>
                                <span className="text-sm font-bold text-brand-navy">IT Operations</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded bg-brand-silver">
                                <span className="text-sm text-slate-500">Email</span>
                                <span className="text-sm font-bold text-brand-navy">latif@altayer.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="glass-panel p-8 bg-white border border-brand-border">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Preferences</h2>
                    <div className="space-y-6">
                        {/* Toggle Item */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-brand-navy font-bold">Desktop Notifications</h4>
                                <p className="text-xs text-slate-500">Receive pop-ups for new approval requests</p>
                            </div>
                            <button
                                onClick={() => handleToggle('notifications')}
                                className={`w-12 h-6 rounded-full relative transition-colors ${toggles.notifications ? 'bg-brand-orange' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all transform ${toggles.notifications ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-brand-navy font-bold">Email Digest</h4>
                                <p className="text-xs text-slate-500">Daily summary of activity at 9:00 AM</p>
                            </div>
                            <button
                                onClick={() => handleToggle('email')}
                                className={`w-12 h-6 rounded-full relative transition-colors ${toggles.email ? 'bg-brand-orange' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all transform ${toggles.email ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-brand-navy font-bold">System Sounds</h4>
                                <p className="text-xs text-slate-500">Play sound on new messages</p>
                            </div>
                            <button
                                onClick={() => handleToggle('sound')}
                                className={`w-12 h-6 rounded-full relative transition-colors ${toggles.sound ? 'bg-brand-orange' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all transform ${toggles.sound ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>

                        <div className="pt-6 border-t border-brand-border">
                            <button className="text-red-500 text-sm hover:underline flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">lock_reset</span>
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
