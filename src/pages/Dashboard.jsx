import React from 'react';
import { useNavigate } from 'react-router-dom';

const MODULES = [
    { title: 'HR Admin', icon: 'diversity_3', path: '/hr-admin', color: 'text-pink-400', desc: 'Staff Profiles & Leave' },
    { title: 'Sales', icon: 'monitoring', path: '/sales', color: 'text-blue-400', desc: 'Revenue & Pipeline' },
    { title: 'Finance', icon: 'account_balance_wallet', path: '/finance', color: 'text-emerald-400', desc: 'Invoices & Payroll' },
    { title: 'IT Desk', icon: 'support_agent', path: '/it-desk', color: 'text-purple-400', desc: 'Tickets & Assets' },
    { title: 'Legal', icon: 'gavel', path: '/legal', color: 'text-amber-400', desc: 'Compliance Docs' },
    { title: 'Settings', icon: 'settings', path: '/settings', color: 'text-slate-400', desc: 'System Config' },
];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto w-full fade-in">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display tracking-tight flex items-center gap-3">
                    <span className="w-2 h-8 bg-cyan-500 rounded-full shadow-[0_0_10px_#00f3ff]"></span>
                    COMMAND CENTER
                </h1>
                <p className="text-slate-400 text-lg">Welcome back, Commander. Systems detected normal.</p>
            </div>

            {/* AI Hero Banner - Static simpler version for stability first */}
            <div className="w-full glass-panel p-8 mb-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-transparent"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center bg-black/20 animate-pulse-slow">
                            <span className="material-symbols-outlined text-4xl text-cyan-400">smart_toy</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Cortex AI Online</h2>
                            <p className="text-cyan-200/60 text-sm">"I am ready to assist with reports and queries."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Active Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MODULES.map((mod) => (
                        <div
                            key={mod.title}
                            onClick={() => navigate(mod.path)}
                            className="glass-panel p-6 cursor-pointer hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-colors shadow-inner`}>
                                    <span className={`material-symbols-outlined text-2xl ${mod.color} group-hover:scale-110 transition-transform`}>{mod.icon}</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-600 group-hover:text-cyan-400 transition-colors">arrow_outward</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-200 group-hover:text-white mb-1">{mod.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{mod.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Simple Fade In Animation embedded
const style = document.createElement('style');
style.innerHTML = `
  .fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(style);
