import React from 'react';
import Card from '../components/common/Card';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import clsx from 'clsx';

const DEPARTMENTS = [
    { title: 'HR Administration', icon: 'people', path: '/hr-admin', color: 'bg-rose-500', desc: 'Onboarding, Offboarding, & Profile Management' },
    { title: 'Sales', icon: 'point_of_sale', path: '/sales', color: 'bg-blue-500', desc: 'Pipeline, Revenue, & AI Outreach' },
    { title: 'Marketing', icon: 'campaign', path: '/marketing', color: 'bg-purple-500', desc: 'Campaigns, SEO, & Content Generation' },
    { title: 'Finance', icon: 'payments', path: '/finance', color: 'bg-emerald-500', desc: 'Invoices, Budget, & Risk Analysis' },
    { title: 'Engineering', icon: 'code', path: '/engineering', color: 'bg-orange-500', desc: 'Code Analysis, Docs, & Support Tickets' },
    { title: 'Legal', icon: 'gavel', path: '/legal', color: 'bg-slate-600', desc: 'Contracts, Compliance, & Regulations' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const { role } = useUser();

    return (
        <div className="flex flex-col gap-8 fade-in pb-20">
            {/* Header / Welcome */}
            <header className="relative overflow-hidden rounded-3xl p-10 text-white shadow-2xl skew-fix">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 z-0"></div>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="material-symbols-outlined text-[200px]">apartment</span>
                </div>

                <div className="relative z-10 flex flex-col gap-2">
                    <span className="label-small text-blue-200 tracking-wider">ENTERPRISE DASHBOARD</span>
                    <h1 className="headline-large font-bold">Welcome, Alexander</h1>
                    <p className="body-large text-blue-100 max-w-xl opacity-90">
                        Access all your enterprise modules, AI agents, and daily metrics from one central hub.
                    </p>
                </div>
            </header>

            {/* Department Grid */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="headline-small text-primary font-bold">Enterprise Modules</h2>
                    <span className="body-small text-secondary">Select a department to access AI agents</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DEPARTMENTS.map((dept) => (
                        <Card
                            key={dept.title}
                            className="group cursor-pointer hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
                            onClick={() => navigate(dept.path)}
                            padding="24px"
                        >
                            <div className="flex flex-col gap-4 h-full">
                                <div className="flex justify-between items-start">
                                    <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", dept.color)}>
                                        <span className="material-symbols-outlined text-[28px]">{dept.icon}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-primary text-[20px]">arrow_forward</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="title-medium font-bold mb-1 group-hover:text-primary transition-colors">{dept.title}</h3>
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
