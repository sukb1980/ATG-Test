import React from 'react';

export default function Engineering() {
    return (
        <div className="w-full fade-in">
            <h1 className="text-3xl font-bold text-brand-navy mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-orange-500">terminal</span>
                ENGINEERING
            </h1>

            {/* Engineering Stats Row - 2x2 on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">03</span>
                    <span className="text-[10px] md:text-sm text-orange-400 uppercase tracking-widest">Active Sprints</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">12/d</span>
                    <span className="text-[10px] md:text-sm text-orange-400 uppercase tracking-widest">Deployments</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">99.9%</span>
                    <span className="text-[10px] md:text-sm text-orange-400 uppercase tracking-widest">Uptime</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">15</span>
                    <span className="text-[10px] md:text-sm text-orange-400 uppercase tracking-widest">Open PRs</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 glass-panel p-6">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Active Sprints</h2>
                    <div className="space-y-4">
                        {[
                            { name: 'Core Infrastructure Upgrade', prog: 75, col: 'bg-blue-500' },
                            { name: 'Mobile App Refactor', prog: 30, col: 'bg-orange-500' },
                            { name: 'AI Search Integration', prog: 90, col: 'bg-emerald-500' }
                        ].map((proj) => (
                            <div key={proj.name}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-brand-navy font-medium">{proj.name}</span>
                                    <span className="text-slate-400 text-xs">{proj.prog}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${proj.col}`} style={{ width: `${proj.prog}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-6 bg-brand-navy/5">
                    <h2 className="text-xl font-bold text-brand-navy mb-4">System Health</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                            <span className="text-brand-charcoal text-sm">API Gateway</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                            <span className="text-brand-charcoal text-sm">Database (Primary)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]"></div>
                            <span className="text-brand-charcoal text-sm">Cache Cluster (High Load)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                            <span className="text-brand-charcoal text-sm">Auth Services</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
