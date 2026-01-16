import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import KoreAIButton from '../common/KoreAIButton';
import { useUser, ROLES } from '../../context/UserContext';

const ALL_NAV_ITEMS = [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard', color: '#00f3ff', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT, ROLES.HR_ADMIN] },
    { path: '/hr-admin', label: 'HR Admin', icon: 'diversity_3', color: '#ff0055', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/sales', label: 'Sales', icon: 'monitoring', color: '#00f3ff', roles: [ROLES.EMPLOYEE, ROLES.MANAGER] },
    { path: '/marketing', label: 'Marketing', icon: 'ads_click', color: '#bf00ff', roles: [ROLES.EMPLOYEE, ROLES.MANAGER] },
    { path: '/finance', label: 'Finance', icon: 'account_balance_wallet', color: '#00ff99', roles: [ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/engineering', label: 'Engineering', icon: 'terminal', color: '#ffaa00', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT] },
    { path: '/legal', label: 'Legal', icon: 'gavel', color: '#ffdd00', roles: [ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/it-desk', label: 'IT Desk', icon: 'support_agent', color: '#00ccff', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT] },
];

export default function AppShell() {
    const location = useLocation();
    const { role } = useUser();
    const [isChatOpen, setIsChatOpen] = React.useState(false);
    const isLoginPage = location.pathname === '/';

    if (isLoginPage) {
        return <Outlet />;
    }

    const navItems = ALL_NAV_ITEMS.filter(item => item.roles.includes(role));

    const handleLogout = () => {
        // Clear session info if any (though currently mock)
        window.location.href = '/ATG-Test/'; // Hard refresh to login
    };

    return (
        <div className="flex min-h-screen bg-deep-space text-slate-200 font-sans selection:bg-cyan-500/30">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex w-72 flex-col justify-between border-r border-cyan-900/30 bg-black/40 backdrop-blur-md fixed h-full z-30">
                <div>
                    {/* Logo Area */}
                    <div className="p-6 mb-4 border-b border-cyan-900/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity"></div>
                        <h1 className="text-xl font-bold tracking-tight text-white relative z-10 flex items-center gap-2 font-display">
                            <span className="material-symbols-outlined text-cyan-400 animate-pulse-slow">hub</span>
                            Al Tayer Group
                        </h1>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500/70 font-bold ml-8">Enterprise Portal</span>
                    </div>

                    <nav className="flex flex-col gap-2 p-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
                                    ${isActive ? 'bg-cyan-900/30 text-cyan-300 border-l-2 border-cyan-400 shadow-[inset_10px_0_20px_-10px_rgba(0,243,255,0.1)]' : 'text-slate-400 hover:text-cyan-200 hover:bg-white/5'}`
                                }
                            >
                                <span
                                    className={`material-symbols-outlined text-[20px] transition-all group-hover:scale-110 ${item.path === location.pathname ? 'drop-shadow-[0_0_5px_currentColor]' : ''}`}
                                    style={{ color: item.path === location.pathname ? item.color : 'inherit' }}
                                >
                                    {item.icon}
                                </span>
                                <span className="font-medium tracking-wide text-sm">{item.label}</span>
                                {item.path === location.pathname && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#00f3ff]"></div>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Logout - Desktop */}
                <div className="p-3 border-t border-cyan-900/30">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors hover:bg-red-900/20 group"
                    >
                        <span className="material-symbols-outlined text-red-500/70 group-hover:text-red-400 transition-colors">power_settings_new</span>
                        <span className="text-sm font-medium text-red-400/70 group-hover:text-red-400 tracking-wide">Disconnect</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 min-h-screen relative">
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,27,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(18,24,27,0.8)_2px,transparent_2px)] bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

                <header className="md:hidden flex justify-between items-center p-4 bg-black/60 backdrop-blur sticky top-0 z-40 border-b border-cyan-900/30">
                    <span className="font-bold text-slate-100 font-display tracking-widest uppercase text-sm">Al Tayer Enterprise</span>
                    <button onClick={handleLogout} className="p-2 text-red-400 bg-red-900/20 rounded border border-red-500/20">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                    </button>
                </header>

                <div className="relative z-10 p-4 md:p-8">
                    <Outlet />
                </div>
            </main>

            {/* Bottom Nav - Mobile */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-cyan-900/30 z-50 flex justify-around p-2 pb-safe">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `flex flex-col items-center p-2 rounded-lg transition-all ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-500'}`}
                    >
                        <span
                            className="material-symbols-outlined text-[24px]"
                            style={{ color: isActive ? item.color : 'inherit' }}
                        >
                            {item.icon}
                        </span>
                        <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <KoreAIButton isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
        </div>
    );
}
