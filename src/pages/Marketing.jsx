import React from 'react';

export default function Marketing() {
    return (
        <div className="w-full fade-in">
            <h1 className="text-3xl font-bold text-white mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-purple-500">ads_click</span>
                MARKETING HUB
            </h1>

            <div className="glass-panel p-8 text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Current Campaign: "Future Forward"</h2>
                <div className="flex justify-center gap-4 mb-6">
                    <div className="text-center px-6 border-r border-white/10">
                        <p className="text-3xl font-bold text-white">45k</p>
                        <p className="text-xs text-purple-400 uppercase">Impressions</p>
                    </div>
                    <div className="text-center px-6 border-r border-white/10">
                        <p className="text-3xl font-bold text-white">3.2%</p>
                        <p className="text-xs text-purple-400 uppercase">CTR</p>
                    </div>
                    <div className="text-center px-6">
                        <p className="text-3xl font-bold text-white">850</p>
                        <p className="text-xs text-purple-400 uppercase">Leads</p>
                    </div>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[65%]"></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">Campaign Progress: 65%</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Social Media Assets', 'Email Templates', 'Brand Guidelines', 'SEO Analytics', 'Content Calendar', 'Event Planning'].map((item) => (
                    <div key={item} className="glass-panel p-6 hover:bg-white/5 cursor-pointer transition-all group">
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-400 mb-2">{item}</h3>
                        <p className="text-sm text-slate-500">Access latest resources • Updated 2h ago</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
