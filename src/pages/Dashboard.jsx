import React from 'react';
import Card from '../components/common/Card';
import HeroChatInterface from '../components/common/HeroChatInterface';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const DEPARTMENTS = [
    { title: 'HR Administration', icon: 'diversity_3', path: '/hr-admin', color: 'bg-white', iconColor: 'text-rose-500', bgElement: 'bg-rose-50', desc: 'Onboarding, Offboarding, & Profile Management' },
    { title: 'Sales', icon: 'monitoring', path: '/sales', color: 'bg-white', iconColor: 'text-blue-500', bgElement: 'bg-blue-50', desc: 'Pipeline, Revenue, & AI Outreach' },
    { title: 'Marketing', icon: 'ads_click', path: '/marketing', color: 'bg-white', iconColor: 'text-purple-500', bgElement: 'bg-purple-50', desc: 'Campaigns, SEO, & Content Generation' },
    { title: 'Finance', icon: 'account_balance_wallet', path: '/finance', color: 'bg-white', iconColor: 'text-emerald-500', bgElement: 'bg-emerald-50', desc: 'Invoices, Budget, & Risk Analysis' },
    { title: 'Engineering', icon: 'terminal', path: '/engineering', color: 'bg-white', iconColor: 'text-orange-500', bgElement: 'bg-orange-50', desc: 'Code Analysis, Docs, & Support Tickets' },
    { title: 'Legal', icon: 'gavel', path: '/legal', color: 'bg-white', iconColor: 'text-amber-600', bgElement: 'bg-amber-50', desc: 'Contracts, Compliance, & Regulations' },
];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6 fade-in pb-20 max-w-7xl mx-auto">

            {/* AI Hero Section */}
            <section className="mb-4">
                <h1 className="headline-small font-bold text-slate-800 mb-4 px-1">Enterprise Command Center</h1>
                <HeroChatInterface />
            </section>

            {/* Department Grid */}
            <section>
                <div className="flex justify-between items-end mb-6 px-1">
                    <h2 className="title-medium text-slate-600 font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400">apps</span>
                        Applications & Modules
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEPARTMENTS.map((dept) => (
                        <Card
                            key={dept.title}
                            className={`group cursor-pointer border border-slate-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-lg ${dept.color}`}
                            onClick={() => navigate(dept.path)}
                            padding="0"
                        >
                            <div className="relative p-6 h-full flex flex-col gap-3 overflow-hidden rounded-2xl">
                                {/* Decorative BG */}
                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-60 translate-x-10 -translate-y-10 ${dept.bgElement}`}></div>

                                <div className="flex justify-between items-start relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl ${dept.bgElement} flex items-center justify-center`}>
                                        <span className={`material-symbols-outlined text-[32px] ${dept.iconColor}`}>{dept.icon}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                    </div>
                                </div>

                                <div className="relative z-10 mt-2">
                                    <h3 className="title-medium font-bold mb-1 text-slate-800">{dept.title}</h3>
                                    <p className="body-small text-slate-500 leading-relaxed font-medium">
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
