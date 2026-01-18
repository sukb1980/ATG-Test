import React from 'react';

const EMPLOYEES = [
    { name: 'Sarah Connor', role: 'Security Layout', status: 'Active', dept: 'IT Ops' },
    { name: 'John Doe', role: 'Sales Lead', status: 'On Leave', dept: 'Sales' },
    { name: 'Ellen Ripley', role: 'Logistics Mgr', status: 'Active', dept: 'Operations' },
];

export default function HRAdmin() {
    return (
        <div className="w-full fade-in">
            <h1 className="text-3xl font-bold text-brand-navy mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-pink-500">diversity_3</span>
                HUMAN RESOURCES
            </h1>

            {/* Stats Row - 2x2 on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">1,240</span>
                    <span className="text-[10px] md:text-sm text-pink-400 uppercase tracking-widest">Total Staff</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">12</span>
                    <span className="text-[10px] md:text-sm text-pink-400 uppercase tracking-widest">On Leave</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">5</span>
                    <span className="text-[10px] md:text-sm text-pink-400 uppercase tracking-widest">Open Roles</span>
                </div>
                <div className="glass-panel p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-4xl font-bold text-brand-navy mb-1">08</span>
                    <span className="text-[10px] md:text-sm text-pink-400 uppercase tracking-widest">Interviews</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Employee Directory */}
                <div className="lg:col-span-2 glass-panel p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-brand-navy">Recent Activity</h2>
                        <button className="text-xs text-pink-400 border border-pink-500/30 px-3 py-1 rounded hover:bg-pink-500/10">View All</button>
                    </div>

                    <div className="space-y-4">
                        {EMPLOYEES.map((emp) => (
                            <div key={emp.name} className="flex items-center justify-between p-4 bg-white rounded-xl border border-brand-border hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-silver text-brand-navy flex items-center justify-center font-bold text-lg border border-brand-border">{emp.name.charAt(0)}</div>
                                    <div>
                                        <h4 className="text-brand-navy font-medium">{emp.name}</h4>
                                        <p className="text-xs text-slate-400">{emp.role} • {emp.dept}</p>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded border ${emp.status === 'Active' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' : 'border-orange-500/50 text-orange-400 bg-orange-500/10'}`}>
                                    {emp.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 rounded-md bg-brand-silver hover:bg-white border border-brand-border text-brand-navy transition-all flex items-center gap-3 shadow-sm hover:shadow-md">
                            <span className="material-symbols-outlined">person_add</span>
                            Onboard Employee
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-md bg-brand-silver hover:bg-white border border-brand-border text-brand-navy transition-all flex items-center gap-3 shadow-sm hover:shadow-md">
                            <span className="material-symbols-outlined">flight_takeoff</span>
                            Approve Leave
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-md bg-brand-silver hover:bg-white border border-brand-border text-brand-navy transition-all flex items-center gap-3 shadow-sm hover:shadow-md">
                            <span className="material-symbols-outlined">badge</span>
                            Issue ID Card
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
