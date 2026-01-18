import React from 'react';

export default function Marketing() {
    return (
        <div className="w-full fade-in">
            <h1 className="text-3xl font-bold text-brand-navy mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-purple-500">ads_click</span>
                MARKETING HUB
            </h1>

            {/* Marketing Stats Row - 2x2 on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">45k</span>
                    <span className="text-[10px] md:text-sm text-purple-400 uppercase tracking-widest">Impressions</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">3.2%</span>
                    <span className="text-[10px] md:text-sm text-purple-400 uppercase tracking-widest">CTR</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">850</span>
                    <span className="text-[10px] md:text-sm text-purple-400 uppercase tracking-widest">Leads</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">4.5x</span>
                    <span className="text-[10px] md:text-sm text-purple-400 uppercase tracking-widest">Budget ROI</span>
                </div>
            </div>

            <div className="glass-panel p-8 text-center mb-8">
                <h2 className="text-2xl font-bold text-brand-navy mb-4">Current Campaign: "Future Forward"</h2>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[65%]"></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">Campaign Progress: 65%</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Social Media Assets', 'Email Templates', 'Brand Guidelines', 'SEO Analytics', 'Content Calendar', 'Event Planning'].map((item) => (
                    <div key={item} className="glass-panel p-6 hover:bg-brand-silver cursor-pointer transition-all group border border-brand-border">
                        <h3 className="text-lg font-bold text-brand-navy group-hover:text-purple-600 mb-2">{item}</h3>
                        <p className="text-sm text-slate-500">Access latest resources • Updated 2h ago</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
