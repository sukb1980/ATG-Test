import React from 'react';
import HeroChatInterface from '../components/common/HeroChatInterface';
import { useNavigate } from 'react-router-dom';

const DEPARTMENTS = [
    { title: 'HR Administration', icon: 'diversity_3', path: '/hr-admin', iconColor: 'text-rose-400', desc: 'Onboarding, Offboarding, & Profile Management' },
    { title: 'Sales', icon: 'monitoring', path: '/sales', iconColor: 'text-blue-400', desc: 'Pipeline, Revenue, & AI Outreach' },
    { title: 'Marketing', icon: 'ads_click', path: '/marketing', iconColor: 'text-purple-400', desc: 'Campaigns, SEO, & Content Generation' },
    { title: 'Finance', icon: 'account_balance_wallet', path: '/finance', iconColor: 'text-emerald-400', desc: 'Invoices, Budget, & Risk Analysis' },
    { title: 'Engineering', icon: 'terminal', path: '/engineering', iconColor: 'text-orange-400', desc: 'Code Analysis, Docs, & Support Tickets' },
    { title: 'Legal', icon: 'gavel', path: '/legal', iconColor: 'text-amber-400', desc: 'Contracts, Compliance, & Regulations' },
];

export default function Dashboard() {
    const navigate = useNavigate();

    // Force scroll to top on mount
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col gap-8 fade-in pb-20 max-w-7xl mx-auto pt-4">

            {/* AI Hero Section */}
            <section>
                <h1 className="text-2xl font-bold text-cyan-50 mb-6 px-1 flex items-center gap-3 tracking-widest uppercase font-display border-l-4 border-cyan-500 pl-4 bg-gradient-to-r from-cyan-900/20 to-transparent py-2">
                    Enterprise Command Center
                </h1>
                <HeroChatInterface />
            </section>

            {/* Department Grid */}
            <section>
                <div className="flex justify-between items-end mb-6 px-1">
                    <h2 className="text-lg text-cyan-400/80 font-medium flex items-center gap-2 uppercase tracking-widest">
                        <span className="material-symbols-outlined text-lg">grid_view</span>
                        System Modules
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEPARTMENTS.map((dept) => (
                        <div
                            key={dept.title}
                            className="group cursor-pointer glass-panel p-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] hover:border-cyan-400/50 bg-black/40"
                            onClick={() => navigate(dept.path)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 rounded-lg bg-black/60 border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all shadow-inner">
                                        <span className={`material-symbols-outlined text-[32px] ${dept.iconColor} group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all`}>{dept.icon}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <span className="material-symbols-outlined text-cyan-400 text-sm">arrow_outward</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-200 group-hover:text-cyan-300 transition-colors tracking-wide">{dept.title}</h3>
                                    <p className="text-sm text-slate-500 group-hover:text-slate-400 mt-2 leading-relaxed font-light">
                                        {dept.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Effect Line */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
