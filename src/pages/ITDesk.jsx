import React, { useState } from 'react';

export default function ITDesk() {
    const [tickets, setTickets] = useState([
        { id: '#INC-001', sub: 'VPN Access Issues', stat: 'In Progress', up: '2 mins ago' },
        { id: '#REQ-042', sub: 'New Monitor Request', stat: 'Pending Approval', up: '1 day ago' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTicketSub, setNewTicketSub] = useState('');

    const handleCreateTicket = () => {
        if (!newTicketSub.trim()) return;
        const newTicket = {
            id: `#INC-00${tickets.length + 1}`,
            sub: newTicketSub,
            stat: 'Pending',
            up: 'Just now'
        };
        setTickets([newTicket, ...tickets]);
        setNewTicketSub('');
        setIsModalOpen(false);
    };

    return (
        <div className="w-full fade-in relative">
            <div className="flex justify-between items-end mb-8">
                <h1 className="text-3xl font-bold text-brand-navy font-display tracking-tight flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-purple-500">support_agent</span>
                    IT SERVICE DESK
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 py-2 px-6 rounded-full bg-purple-100 text-purple-600 border border-purple-200 hover:bg-purple-200 transition-all font-bold text-sm shadow-sm"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    New Ticket
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-panel p-8 max-w-md w-full shadow-2xl animate-fade-in border-t-4 border-purple-400">
                        <h2 className="text-2xl font-bold text-brand-navy mb-4">Create New Ticket</h2>
                        <div className="mb-6">
                            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Issue Subject</label>
                            <input
                                type="text"
                                value={newTicketSub}
                                onChange={(e) => setNewTicketSub(e.target.value)}
                                placeholder="e.g. Email access, Printer offline..."
                                className="w-full bg-white border border-brand-border rounded-lg p-3 text-brand-navy focus:outline-none focus:border-purple-400"
                                autoFocus
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleCreateTicket}
                                className="flex-1 py-3 rounded-lg bg-purple-100 text-purple-600 font-bold hover:bg-purple-200 transition-colors"
                            >
                                Submit Request
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-3 rounded-lg border border-brand-border text-slate-400 font-bold hover:bg-brand-silver transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Access - 2x2 on mobile, 4 columns on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="glass-panel p-4 md:p-6 border-l-4 border-l-red-500 text-center md:text-left">
                    <h3 className="text-slate-400 text-[10px] md:text-xs uppercase mb-1 md:mb-2">My Tickets</h3>
                    <p className="text-2xl md:text-3xl font-bold text-brand-navy">{tickets.length}</p>
                    <p className="text-[10px] text-red-400 mt-1">Status Active</p>
                </div>
                <div className="glass-panel p-4 md:p-6 border-l-4 border-l-emerald-500 text-center md:text-left">
                    <h3 className="text-slate-400 text-[10px] md:text-xs uppercase mb-1 md:mb-2">Hardware</h3>
                    <p className="text-2xl md:text-3xl font-bold text-brand-navy">Good</p>
                    <p className="text-[10px] text-emerald-400 mt-1">Healthy</p>
                </div>
                <div className="glass-panel p-4 md:p-6 border-l-4 border-l-purple-500 text-center md:text-left">
                    <h3 className="text-slate-400 text-[10px] md:text-xs uppercase mb-1 md:mb-2">Resolution</h3>
                    <p className="text-2xl md:text-3xl font-bold text-brand-navy">1.2h</p>
                    <p className="text-[10px] text-purple-400 mt-1">Avg Time</p>
                </div>
                <div className="glass-panel p-4 md:p-6 border-l-4 border-l-indigo-500 text-center md:text-left">
                    <h3 className="text-slate-400 text-[10px] md:text-xs uppercase mb-1 md:mb-2">KB Articles</h3>
                    <p className="text-2xl md:text-3xl font-bold text-brand-navy">205</p>
                    <p className="text-[10px] text-indigo-400 mt-1">Available</p>
                </div>
            </div>

            {/* Active Tickets */}
            <div className="glass-panel p-6 mb-8">
                <h2 className="text-xl font-bold text-brand-navy mb-6">Active Requests</h2>
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
                            {tickets.map((t) => (
                                <tr key={t.id} className="border-b border-brand-border hover:bg-brand-silver transition-colors">
                                    <td className="py-4 text-purple-400 font-mono">{t.id}</td>
                                    <td className="py-4 text-brand-navy font-medium">{t.sub}</td>
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
                            <h3 className="text-brand-navy font-bold">Network Status</h3>
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
                            <h3 className="text-brand-navy font-bold">Planned Maintenance</h3>
                            <p className="text-slate-500 text-sm">Next update: Saturday 2AM</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
