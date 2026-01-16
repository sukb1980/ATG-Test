import React from 'react';

export default function ITDesk() {
    return (
        <div className="w-full fade-in">
            <div className="flex justify-between items-end mb-8">
                <h1 className="text-3xl font-bold text-white font-display tracking-tight flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-purple-500">support_agent</span>
                    IT SERVICE DESK
                </h1>
                <button className="btn-primary flex items-center gap-2 py-2 px-4 shadow-[0_0_15px_rgba(192,132,252,0.3)] border-purple-400/30 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500">
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Ticket
                </button>
            </div>

            {/* Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-panel p-6 border-l-4 border-l-red-500">
                    <h3 className="text-slate-400 text-xs uppercase mb-2">My Open Tickets</h3>
                    <p className="text-3xl font-bold text-white">2</p>
                    <p className="text-xs text-red-400 mt-1">1 Critical Priority</p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-l-emerald-500">
                    <h3 className="text-slate-400 text-xs uppercase mb-2">Hardware</h3>
                    <p className="text-3xl font-bold text-white">Good</p>
                    <p className="text-xs text-emerald-400 mt-1">All Assets Healthy</p>
                </div>
                <div className="glass-panel p-6 border-l-4 border-l-purple-500">
                    <h3 className="text-slate-400 text-xs uppercase mb-2">Knowledge Base</h3>
                    <p className="text-3xl font-bold text-white">Search</p>
                    <p className="text-xs text-purple-400 mt-1">205 Articles Available</p>
                </div>
            </div>

            {/* Active Tickets */}
            <div className="glass-panel p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-6">Active Requests</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-500 text-xs border-b border-white/10">
                                <th className="py-3 font-medium uppercase tracking-wider">ID</th>
                                <th className="py-3 font-medium uppercase tracking-wider">Subject</th>
                                <th className="py-3 font-medium uppercase tracking-wider">Status</th>
                                <th className="py-3 font-medium uppercase tracking-wider">Last Update</th>
                                <th className="py-3 font-medium uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { id: '#INC-001', sub: 'VPN Access Issues', stat: 'In Progress', up: '2 mins ago' },
                                { id: '#REQ-042', sub: 'New Monitor Request', stat: 'Pending Approval', up: '1 day ago' },
                            ].map((t) => (
                                <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 text-purple-400 font-mono">{t.id}</td>
                                    <td className="py-4 text-white font-medium">{t.sub}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${t.stat === 'In Progress' ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-300'}`}>
                                            {t.stat}
                                        </span>
                                    </td>
                                    <td className="py-4 text-slate-400">{t.up}</td>
                                    <td className="py-4 text-right">
                                        <button className="text-slate-400 hover:text-white">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                            <span className="material-symbols-outlined">wifi</span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Network Status</h3>
                            <p className="text-slate-500 text-sm">All systems operational</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                </div>

                <div className="glass-panel p-6 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                            <span className="material-symbols-outlined">update</span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Planned Maintenance</h3>
                            <p className="text-slate-500 text-sm">Next update: Saturday 2AM</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
