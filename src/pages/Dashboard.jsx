import React from 'react';
import Card from '../components/common/Card';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import clsx from 'clsx';

const DEPARTMENTS = [
    { title: 'HR Administration', icon: 'diversity_3', path: '/hr-admin', color: 'bg-rose-50', iconClass: 'icon-gradient-rose', desc: 'Onboarding, Offboarding, & Profile Management' },
    { title: 'Sales', icon: 'monitoring', path: '/sales', color: 'bg-blue-50', iconClass: 'icon-gradient-blue', desc: 'Pipeline, Revenue, & AI Outreach' },
    { title: 'Marketing', icon: 'ads_click', path: '/marketing', color: 'bg-purple-50', iconClass: 'icon-gradient-purple', desc: 'Campaigns, SEO, & Content Generation' },
    { title: 'Finance', icon: 'account_balance_wallet', path: '/finance', color: 'bg-emerald-50', iconClass: 'icon-gradient-green', desc: 'Invoices, Budget, & Risk Analysis' },
    { title: 'Engineering', icon: 'terminal', path: '/engineering', color: 'bg-orange-50', iconClass: 'icon-gradient-orange', desc: 'Code Analysis, Docs, & Support Tickets' },
    { title: 'Legal', icon: 'gavel', path: '/legal', color: 'bg-slate-100', iconClass: 'icon-gradient-gold', desc: 'Contracts, Compliance, & Regulations' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const { role } = useUser();

    return (
        <div className="flex flex-col gap-8 fade-in pb-20">
            {/* Header / Welcome */}
            <header className="relative overflow-hidden rounded-3xl p-10 text-white shadow-2xl skew-fix transform hover:scale-[1.01] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] z-0"></div>
                {/* Decorative background elements */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20px] left-[-20px] w-40 h-40 bg-gold-500/5 rounded-full blur-2xl"></div>

                <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-10 translate-y-[-10px]">
                    <span className="material-symbols-outlined text-[200px]">hub</span>
                </div>

                <div className="relative z-10 flex flex-col gap-2">
                    <span className="label-small text-blue-200 tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                        ENTERPRISE DASHBOARD
                    </span>
                    <h1 className="headline-large font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        Welcome, Alexander
                    </h1>
                    <p className="body-large text-blue-100 max-w-xl opacity-90 font-light">
                        Access all your enterprise modules, AI agents, and daily metrics from one central hub.
                    </p>
                </div>
            </header>

            {/* Department Grid */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="headline-small text-primary font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">grid_view</span>
                        Enterprise Modules
                    </h2>
                    <span className="body-small text-secondary">Select a department to access AI agents</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEPARTMENTS.map((dept) => (
                        <Card
                            key={dept.title}
                            className="group cursor-pointer hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                            onClick={() => navigate(dept.path)}
                            padding="24px"
                            style={{ border: '1px solid rgba(255,255,255,0.5)' }}
                        >
                            <div className="flex flex-col gap-4 h-full">
                                <div className="flex justify-between items-start">
                                    <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner", dept.color)}>
                                        <span className={clsx("material-symbols-outlined text-[36px]", dept.iconClass)}>{dept.icon}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-surface-variant/50 flex items-center justify-center delay-100 transition-all group-hover:bg-primary group-hover:text-white">
                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="title-medium font-bold mb-2 group-hover:text-primary transition-colors">{dept.title}</h3>
                                    <p className="body-small text-secondary leading-relaxed">
                                        {dept.desc}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
