import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import KoreAIButton from '../common/KoreAIButton';

const NAV_ITEMS = [
    { label: 'Overview', path: '/dashboard', icon: 'dashboard' },
    { label: 'HR Admin', path: '/hr-admin', icon: 'diversity_3' },
    { label: 'Sales', path: '/sales', icon: 'trending_up' },
    { label: 'Finance', path: '/finance', icon: 'account_balance' },
    { label: 'IT Desk', path: '/it-desk', icon: 'desktop_windows' },
    { label: 'Legal', path: '/legal', icon: 'gavel' },
    { label: 'Marketing', path: '/marketing', icon: 'ads_click' },
    { label: 'Engineering', path: '/engineering', icon: 'terminal' },
    { label: 'Settings', path: '/settings', icon: 'settings' },
];

export default function AppShell() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // State for Chatbot

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-brand-silver font-sans overflow-hidden">

            {/* Sidebar (Desktop) - Corporate Navy */}
            <aside className="hidden md:flex w-72 flex-col bg-brand-navy shadow-xl z-20">
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-center border-b border-white/5 bg-[#0A1D36]">
                    <div className="text-center">
                        <h1 className="font-display font-bold text-white text-2xl tracking-wide uppercase">Al Tayer</h1>
                        <p className="text-[10px] text-brand-orange uppercase tracking-[0.3em] font-medium mt-1">Automotive</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-8 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-8 py-3 transition-all duration-300 group relative
                                ${isActive ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`
                            }
                        >
                            {/* Active Indicator Line */}
                            {({ isActive }) => (
                                <>
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-orange"></div>}
                                    <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-brand-orange' : 'text-slate-500 group-hover:text-white'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium tracking-wide uppercase">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User/Logout */}
                <div className="p-6 bg-[#0A1D36] border-t border-white/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-white text-brand-navy flex items-center justify-center font-display font-bold text-lg">
                            LA
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">Latif</p>
                            <p className="text-xs text-slate-400 truncate uppercase tracking-wider">Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 rounded-sm transition-all text-sm uppercase tracking-wider group"
                    >
                        <span className="material-symbols-outlined text-lg group-hover:text-brand-orange transition-colors">logout</span>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-brand-silver">

                {/* Mobile Header */}
                <header className="md:hidden h-16 bg-brand-navy flex items-center justify-between px-4 z-20 shadow-md">
                    <span className="font-display font-bold text-white text-lg uppercase tracking-widest">Al Tayer</span>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto z-10 p-6 md:p-12 scrollbar-thin">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 15, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -15, scale: 0.98 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Chatbot Button Integration */}
                <KoreAIButton isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
            </main>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute inset-0 z-50 bg-brand-navy flex flex-col p-6 animate-fade-in md:hidden">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                        <h2 className="text-xl font-bold text-white font-display uppercase">Menu</h2>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/50 hover:text-white">
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                    </div>
                    <nav className="flex-1 space-y-2 overflow-y-auto">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-4 rounded-sm text-sm font-medium uppercase tracking-wider border-l-4 
                                    ${isActive ? 'bg-white/5 text-white border-brand-orange' : 'border-transparent text-slate-400 hover:text-white'}`
                                }
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full flex items-center justify-center gap-2 py-4 border border-white/10 text-white/70 hover:text-white hover:bg-white/5 rounded-sm transition-all text-sm uppercase tracking-wider"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Sign Out</span>
                    </button>
                </div>
            )}
        </div>
    );
}
