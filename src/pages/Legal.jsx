import React from 'react';

export default function Legal() {
    return (
        <div className="w-full fade-in">
            <h1 className="text-3xl font-bold text-white mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-amber-500">gavel</span>
                LEGAL & COMPLIANCE
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-panel p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Document Library</h2>
                    <div className="space-y-2">
                        {['NDA Template 2025', 'Employee Handbook v4.2', 'Remote Work Policy', 'Data Privacy Guidelines'].map((doc) => (
                            <div key={doc} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/30 group cursor-pointer transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-500">
                                        <span className="material-symbols-outlined">description</span>
                                    </div>
                                    <span className="text-slate-200 font-medium group-hover:text-white">{doc}</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-600 group-hover:text-amber-400">download</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-6 bg-gradient-to-br from-amber-900/20 to-transparent">
                    <h2 className="text-xl font-bold text-white mb-4">Compliance Status</h2>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-500 flex items-center justify-center text-xl font-bold text-white">
                            98%
                        </div>
                        <div>
                            <p className="text-amber-400 font-bold">Good Standing</p>
                            <p className="text-xs text-slate-400">Last Audit: Dec 15</p>
                        </div>
                    </div>
                    <button className="w-full btn-primary border-amber-500/30 bg-gradient-to-r from-amber-600 to-orange-600 shadow-none hover:shadow-lg">
                        Start Self-Audit
                    </button>
                </div>
            </div>
        </div>
    );
}
