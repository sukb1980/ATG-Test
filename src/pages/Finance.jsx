import React from 'react';

export default function Finance() {
    return (
        <div className="w-full fade-in">
            <h1 className="text-3xl font-bold text-brand-navy mb-8 font-display tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-emerald-500">account_balance_wallet</span>
                FINANCE & PAYROLL
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Actions */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-brand-navy mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {['Submit Expense', 'View Payslip', 'Invoice Approval', 'Budget Request'].map((action) => (
                            <button key={action} className="glass-panel p-6 flex flex-col items-center justify-center gap-3 hover:bg-brand-silver hover:-translate-y-1 transition-all group cursor-pointer shadow-sm border border-brand-border">
                                <span className="material-symbols-outlined text-3xl text-emerald-400 group-hover:scale-110 transition-transform">
                                    {action.includes('Expense') ? 'receipt_long' : action.includes('Payslip') ? 'payments' : action.includes('Invoice') ? 'approval' : 'pie_chart'}
                                </span>
                                <span className="text-brand-navy font-medium text-sm text-center">{action}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pending Approvals */}
                <div className="glass-panel p-6">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Pending Approvals</h2>
                    <div className="space-y-4">
                        {[
                            { item: 'Software License Renewal', cost: '$450.00', req: 'IT Dept' },
                            { item: 'Client Dinner', cost: '$120.50', req: 'Sales Team' },
                            { item: 'Office Supplies', cost: '$85.00', req: 'Admin' },
                        ].map((a) => (
                            <div key={a.item} className="flex justify-between items-center border-b border-brand-border pb-4 last:border-0">
                                <div>
                                    <h4 className="text-brand-navy font-medium">{a.item}</h4>
                                    <p className="text-xs text-slate-400">Req: {a.req}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-emerald-600 font-mono font-bold">{a.cost}</p>
                                    <div className="flex gap-2 mt-2">
                                        <button className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-600/30">Approve</button>
                                        <button className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded hover:bg-red-600/30">Deny</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
