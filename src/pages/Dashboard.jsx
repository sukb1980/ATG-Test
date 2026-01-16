import React from 'react';
import { useNavigate } from 'react-router-dom';

const MODULES = [
    { title: 'HR Admin', icon: 'diversity_3', path: '/hr-admin', desc: 'Employee Profiles & Leave Management' },
    { title: 'Sales', icon: 'trending_up', path: '/sales', desc: 'Performance Metrics & Pipeline' },
    { title: 'Finance', icon: 'account_balance', path: '/finance', desc: 'Payroll, Expenses & Invoicing' },
    { title: 'IT Desk', icon: 'desktop_windows', path: '/it-desk', desc: 'Technical Support & Asset Tracking' },
    { title: 'Legal', icon: 'gavel', path: '/legal', desc: 'Compliance & Document Library' },
    { title: 'Settings', icon: 'settings', path: '/settings', desc: 'System Configuration' },
];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto w-full fade-in pb-12">
            {/* Header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-6">
                <div>
                    <h1 className="text-4xl font-display font-medium text-brand-navy mb-2">Executive Overview</h1>
                    <p className="text-slate-500 text-lg font-light">Welcome back, Latif.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <span className="text-sm text-brand-orange uppercase tracking-widest font-bold">Today: Jan 17, 2026</span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="glass-panel p-8 border-t-4 border-t-brand-navy">
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Total Revenue (Q1)</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold text-brand-navy">$14.2M</span>
                        <span className="text-emerald-600 text-sm font-medium flex items-center">
                            <span className="material-symbols-outlined text-sm">arrow_upward</span> 12%
                        </span>
                    </div>
                </div>
                <div className="glass-panel p-8 border-t-4 border-t-brand-orange">
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Active Tickets</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold text-brand-navy">24</span>
                        <span className="text-slate-400 text-sm">Pending</span>
                    </div>
                </div>
                <div className="glass-panel p-8 border-t-4 border-t-brand-navy">
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Employee Efficiency</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold text-brand-navy">94%</span>
                        <span className="text-brand-orange text-sm font-medium">Excellent</span>
                    </div>
                </div>
            </div>

            {/* Module Grid */}
            <div>
                <h3 className="text-2xl font-display text-brand-navy mb-8">Management Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MODULES.map((mod) => (
                        <div
                            key={mod.title}
                            onClick={() => navigate(mod.path)}
                            className="glass-panel p-8 cursor-pointer group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 bg-brand-silver rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-navy transition-colors duration-300">
                                <span className="material-symbols-outlined text-brand-navy group-hover:text-white transition-colors">{mod.icon}</span>
                            </div>
                            <h3 className="text-xl font-display font-bold text-brand-navy mb-3 group-hover:text-brand-orange transition-colors">{mod.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{mod.desc}</p>

                            <div className="mt-6 flex items-center text-brand-orange text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Access Module</span>
                                <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
