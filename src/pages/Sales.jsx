import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REVENUE_DATA = {
    'Q4 2025': [40, 65, 45, 80, 55, 90, 70, 85],
    'Q3 2025': [55, 40, 75, 45, 90, 60, 80, 65],
};

export default function Sales() {
    const [period, setPeriod] = useState('Q4 2025');
    const data = REVENUE_DATA[period];

    return (
        <div className="w-full animate-fade-in">
            <h1 className="text-3xl font-bold text-brand-navy mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-blue-500">monitoring</span>
                SALES OVERVIEW
            </h1>

            {/* Metrics - 2x2 on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {['Total Revenue', 'Active Deals', 'Conv. Rate', 'Avg Deal Size'].map((label, i) => (
                    <div key={label} className="glass-panel p-4 md:p-5 relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest mb-1">{label}</p>
                            <p className="text-xl md:text-2xl font-bold text-brand-navy group-hover:text-blue-600 transition-colors">
                                {i === 0 ? (period === 'Q4 2025' ? '$4.2M' : '$3.8M') : i === 1 ? (period === 'Q4 2025' ? '142' : '128') : i === 2 ? '24%' : '$32k'}
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
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
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="bg-white border border-brand-border text-brand-charcoal text-xs rounded px-2 py-1 focus:outline-none focus:border-brand-orange cursor-pointer"
                        >
                            <option>Q4 2025</option>
                            <option>Q3 2025</option>
                        </select>
                    </div>

                    {/* CSS Bar Chart Simulation */}
                    <div className="flex-1 flex items-end justify-between px-4 gap-4 border-b border-brand-border pb-2 h-64">
                        {data.map((h, i) => (
                            <div key={`${period}-${i}`} className="w-full bg-blue-900/30 rounded-t relative group h-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
                                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t group-hover:opacity-100 opacity-80"
                                ></motion.div>
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20">
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
