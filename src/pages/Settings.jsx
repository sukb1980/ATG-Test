import React, { useState } from 'react';

export default function Settings() {
    const [notifications, setNotifications] = useState(true);
    const [sound, setSound] = useState(true);
    const [darkMode, setDarkMode] = useState(true); // Default to dark/cyber mode

    return (
        <div className="max-w-4xl mx-auto w-full fade-in">
            <h1 className="text-3xl font-bold text-white mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-slate-400">settings</span>
                SYSTEM CONFIGURATION
            </h1>

            <div className="flex flex-col gap-6">

                {/* Profile Section */}
                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold text-cyan-400 mb-4 border-b border-white/10 pb-2">User Profile</h2>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 border-2 border-white/20 flex items-center justify-center text-2xl font-bold text-white">
                            AK
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Alexander K.</h3>
                            <p className="text-slate-400">System Administrator</p>
                            <p className="text-slate-500 text-sm mt-1">ID: #ATG-8842-X</p>
                        </div>
                        <button className="ml-auto btn-primary py-2 px-4 text-sm">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold text-pink-400 mb-6 border-b border-white/10 pb-2">Preferences</h2>

                    <div className="space-y-6">
                        {/* Toggle Item */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">System Notifications</h3>
                                <p className="text-slate-500 text-sm">Receive alerts for new tickets and messages</p>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${notifications ? 'bg-cyan-600' : 'bg-slate-700'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Toggle Item */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Interface Sounds</h3>
                                <p className="text-slate-500 text-sm">Play futuristic UI sound effects</p>
                            </div>
                            <button
                                onClick={() => setSound(!sound)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${sound ? 'bg-cyan-600' : 'bg-slate-700'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${sound ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Toggle Item */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Cyber Mode</h3>
                                <p className="text-slate-500 text-sm">Enable high-contrast futuristic theme</p>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 bg-cyan-600 cursor-not-allowed opacity-80`}
                                title="Theme locked by administrator"
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm translate-x-6`}></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold text-emerald-400 mb-4 border-b border-white/10 pb-2">Security</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-medium">Last Login</h3>
                            <p className="text-slate-500 text-sm">Today at 09:42 AM from IP 192.168.1.1</p>
                        </div>
                        <button className="text-red-400 hover:text-red-300 text-sm font-medium border border-red-500/30 px-3 py-2 rounded-lg hover:bg-red-900/20 transition-colors">
                            Revoke Sessions
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
