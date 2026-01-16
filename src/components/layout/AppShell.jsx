import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { label: 'Overview', path: '/dashboard', icon: 'dashboard', color: 'text-cyan-400' },
    { label: 'HR Admin', path: '/hr-admin', icon: 'diversity_3', color: 'text-pink-500' },
    { label: 'Sales', path: '/sales', icon: 'monitoring', color: 'text-blue-400' },
    { label: 'Finance', path: '/finance', icon: 'account_balance_wallet', color: 'text-emerald-400' },
    { label: 'IT Desk', path: '/it-desk', icon: 'support_agent', color: 'text-purple-400' },
    { label: 'Settings', path: '/settings', icon: 'settings', color: 'text-slate-400' },
];

export default function AppShell() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-deep-space text-slate-200 overflow-hidden font-sans">

            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex w-64 flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl z-20">
                {/* Logo */}
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <span className="material-symbols-outlined text-cyan-400 mr-2 text-3xl">hub</span>
                    <div>
                        <h1 className="font-display font-bold text-white tracking-widest text-sm">AL TAYER</h1>
                        <p className="text-[10px] text-cyan-500/70 uppercase tracking-widest font-bold">Portal</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                                ${isActive ? 'bg-cyan-900/20 text-white shadow-[inset_0_0_10px_rgba(0,243,255,0.1)] border border-cyan-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
                            }
                        >
                            <span className={`material-symbols-outlined text-xl group-hover:scale-110 transition-transform ${item.color}`}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium tracking-wide">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User/Logout */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-3 w-full rounded-xl hover:bg-red-900/20 hover:text-red-400 transition-colors text-slate-500"
                    >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        <span className="text-sm font-medium">Disconnect</span>
                    </button>
                    <div className="mt-4 flex items-center gap-3 px-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border border-white/20"></div>
                        <div className="overflow-hidden">
                            <p className="text-sm text-white truncate">Alexander K.</p>
                            <p className="text-xs text-slate-500 truncate">System Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                {/* Mobile Header */}
                <header className="md:hidden h-16 border-b border-white/10 flex items-center justify-between px-4 z-20 bg-deep-space/80 backdrop-blur">
                    <span className="font-display font-bold text-white tracking-widest">AL TAYER</span>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-cyan-400">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto z-10 p-6 md:p-10 scrollbar-thin">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute inset-0 z-50 bg-deep-space/95 backdrop-blur-xl flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200 md:hidden">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white font-display">MENU</h2>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/50 hover:text-white">
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                    </div>
                    <nav className="flex-1 space-y-2">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium border border-transparent
                                    ${isActive ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'text-slate-400 hover:text-white'}`
                                }
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}
