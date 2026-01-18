import React from 'react';

export default function Legal() {
    return (
        <div className="w-full fade-in">
            <h1 className="text-3xl font-bold text-brand-navy mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-amber-500">gavel</span>
                LEGAL & COMPLIANCE
            </h1>

            {/* Legal Stats Row - 2x2 on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">42</span>
                    <span className="text-[10px] md:text-sm text-amber-500 uppercase tracking-widest">Active Contracts</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">05</span>
                    <span className="text-[10px] md:text-sm text-amber-500 uppercase tracking-widest">Pending Sign</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">98%</span>
                    <span className="text-[10px] md:text-sm text-amber-500 uppercase tracking-widest">Compliance</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">02</span>
                    <span className="text-[10px] md:text-sm text-amber-500 uppercase tracking-widest">New Claims</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-panel p-6">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Document Library</h2>
                    <div className="space-y-2">
                        {['NDA Template 2025', 'Employee Handbook v4.2', 'Remote Work Policy', 'Data Privacy Guidelines'].map((doc) => (
                            <div key={doc} className="flex items-center justify-between p-4 bg-white rounded-xl border border-brand-border hover:border-amber-500/30 group cursor-pointer transition-colors shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-500">
                                        <span className="material-symbols-outlined">description</span>
                                    </div>
                                    <span className="text-brand-charcoal font-medium group-hover:text-brand-navy">{doc}</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-600 group-hover:text-amber-400">download</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-6 bg-amber-50/50">
                    <h2 className="text-xl font-bold text-brand-navy mb-4">Compliance Status</h2>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-500 flex items-center justify-center text-xl font-bold text-brand-navy">
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
