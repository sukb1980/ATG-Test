import React from 'react';

export default function Sales() {
    return (
        <div className="w-full animate-fade-in">
            <h1 className="text-3xl font-bold text-brand-navy mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-blue-500">monitoring</span>
                SALES OVERVIEW
            </h1>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {['Total Revenue', 'Active Deals', 'Conversion Rate', 'Avg Deal Size'].map((label, i) => (
                    <div key={label} className="glass-panel p-5 relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">{label}</p>
                            <p className="text-2xl font-bold text-brand-navy group-hover:text-blue-600 transition-colors">
                                {i === 0 ? '$4.2M' : i === 1 ? '142' : i === 2 ? '24%' : '$32k'}
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl text-blue-500 -mb-2 -mr-2">trending_up</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Chart Mockup */}
                <div className="lg:col-span-2 glass-panel p-6 min-h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-brand-navy">Revenue Performance</h2>
                        <select className="bg-white border border-brand-border text-brand-charcoal text-xs rounded px-2 py-1 focus:outline-none focus:border-brand-orange">
                            <option>Q4 2025</option>
                            <option>Q3 2025</option>
                        </select>
                    </div>

                    {/* CSS Bar Chart Simulation */}
                    <div className="flex-1 flex items-end justify-between px-4 gap-4 border-b border-brand-border pb-2 h-64">
                        {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                            <div key={i} className="w-full bg-blue-900/30 rounded-t relative group h-full">
                                <div
                                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t transition-all duration-1000 group-hover:opacity-100 opacity-80"
                                    style={{ height: `${h}%` }}
                                ></div>
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ${h}k
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>WK 01</span><span>WK 02</span><span>WK 03</span><span>WK 04</span>
                        <span>WK 05</span><span>WK 06</span><span>WK 07</span><span>WK 08</span>
                    </div>
                </div>

                {/* Pipeline */}
                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Top Deals</h2>
                    <div className="space-y-4">
                        {[
                            { name: 'OmniConsumer Corp', val: '$1.2M', stage: 'Negotiation' },
                            { name: 'Cyberdyne Sys', val: '$850k', stage: 'Discovery' },
                            { name: 'Tyrell Corp', val: '$2.4M', stage: 'Proposal' },
                            { name: 'Weyland-Yutani', val: '$500k', stage: 'Closing' }
                        ].map((deal) => (
                            <div key={deal.name} className="border-b border-brand-border pb-3 last:border-0 last:pb-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-brand-navy text-sm font-bold">{deal.name}</h4>
                                    <span className="text-blue-600 font-mono text-xs font-bold">{deal.val}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500">{deal.stage}</span>
                                    <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500"
                                            style={{ width: deal.stage === 'Closing' ? '90%' : deal.stage === 'Negotiation' ? '70%' : '40%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
