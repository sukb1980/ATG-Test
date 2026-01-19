import React from 'react';
import { useNavigate } from 'react-router-dom';
import GamingCarousel from '../components/common/GamingCarousel';

const MODULES = [
    { title: 'HR Admin', icon: 'diversity_3', path: '/hr-admin', desc: 'Employee Profiles & Leave' },
    { title: 'Sales', icon: 'trending_up', path: '/sales', desc: 'Performance & Pipeline' },
    { title: 'Finance', icon: 'account_balance', path: '/finance', desc: 'Payroll & Expenses' },
    { title: 'IT Desk', icon: 'desktop_windows', path: '/it-desk', desc: 'Support & Assets' },
    { title: 'Legal', icon: 'gavel', path: '/legal', desc: 'Compliance & Library' },
    { title: 'Marketing', icon: 'ads_click', path: '/marketing', desc: 'Brand & Campaigns' },
    { title: 'Engineering', icon: 'terminal', path: '/engineering', desc: 'Tech & Roadmap' },
    { title: 'Settings', icon: 'settings', path: '/settings', desc: 'Configuration' },
];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto w-full fade-in pb-12">
            {/* Header */}
            <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-medium text-brand-navy mb-1 md:mb-2">Executive Overview</h1>
                    <p className="text-slate-500 text-sm md:text-lg font-light">Welcome back, Latif.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <span className="text-xs md:text-sm text-brand-orange uppercase tracking-widest font-bold">
                        Today: {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date())}
                    </span>
                </div>
            </div>

            {/* Quick Stats - 2x2 on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-12">
                <div className="glass-panel p-4 md:p-8 border-t-4 border-t-brand-navy">
                    <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">Total Revenue (Q1)</p>
                    <div className="flex items-baseline gap-1 md:gap-2">
                        <span className="text-xl md:text-4xl font-display font-bold text-brand-navy">$14.2M</span>
                        <span className="text-emerald-600 text-[10px] md:text-sm font-medium flex items-center">
                            <span className="material-symbols-outlined text-[12px] md:text-sm">arrow_upward</span> 12%
                        </span>
                    </div>
                </div>
                <div className="glass-panel p-4 md:p-8 border-t-4 border-t-brand-orange">
                    <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">Active Tickets</p>
                    <div className="flex items-baseline gap-1 md:gap-2">
                        <span className="text-xl md:text-4xl font-display font-bold text-brand-navy">24</span>
                        <span className="text-slate-400 text-[10px] md:text-sm">Pending</span>
                    </div>
                </div>
                <div className="glass-panel p-4 md:p-8 border-t-4 border-t-brand-navy">
                    <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">Efficiency</p>
                    <div className="flex items-baseline gap-1 md:gap-2">
                        <span className="text-xl md:text-4xl font-display font-bold text-brand-navy">94%</span>
                        <span className="text-brand-orange text-[10px] md:text-sm font-medium">Excellent</span>
                    </div>
                </div>
                <div className="glass-panel p-4 md:p-8 border-t-4 border-t-brand-orange">
                    <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">Approvals</p>
                    <div className="flex items-baseline gap-1 md:gap-2">
                        <span className="text-xl md:text-4xl font-display font-bold text-brand-navy">08</span>
                        <span className="text-brand-navy text-[10px] md:text-sm font-medium">Pending</span>
                    </div>
                </div>
            </div>

            {/* Gaming Carousel */}
            <GamingCarousel />

            {/* Module Grid - 2 columns on mobile, 3 on desktop */}
            <div>
                <h3 className="text-xl md:text-2xl font-display text-brand-navy mb-6 md:mb-8 border-l-4 border-brand-orange pl-4">Management Modules</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {MODULES.map((mod) => (
                        <div
                            key={mod.title}
                            onClick={() => navigate(mod.path)}
                            className="glass-panel p-4 md:p-8 cursor-pointer group hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center md:items-start md:text-left"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-silver rounded-full flex items-center justify-center mb-3 md:mb-6 group-hover:bg-brand-navy transition-colors duration-300">
                                <span className="material-symbols-outlined text-[20px] md:text-[24px] text-brand-navy group-hover:text-white transition-colors">{mod.icon}</span>
                            </div>
                            <h3 className="text-sm md:text-xl font-display font-bold text-brand-navy mb-1 md:mb-3 group-hover:text-brand-orange transition-colors truncate w-full">{mod.title}</h3>
                            <p className="text-slate-500 text-[10px] md:text-sm leading-tight md:leading-relaxed line-clamp-2">{mod.desc}</p>

                            <div className="mt-4 hidden md:flex items-center text-brand-orange text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Access</span>
                                <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
