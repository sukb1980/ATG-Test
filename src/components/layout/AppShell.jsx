import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import KoreAIButton from '../common/KoreAIButton';
import { useUser, ROLES } from '../../context/UserContext';
import './AppShell.css';

const ALL_NAV_ITEMS = [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard', color: '#3b82f6', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT, ROLES.HR_ADMIN] },
    { path: '/hr-admin', label: 'HR Admin', icon: 'diversity_3', color: '#e11d48', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/sales', label: 'Sales', icon: 'monitoring', color: '#3b82f6', roles: [ROLES.EMPLOYEE, ROLES.MANAGER] },
    { path: '/marketing', label: 'Marketing', icon: 'ads_click', color: '#9333ea', roles: [ROLES.EMPLOYEE, ROLES.MANAGER] },
    { path: '/finance', label: 'Finance', icon: 'account_balance_wallet', color: '#16a34a', roles: [ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/engineering', label: 'Engineering', icon: 'terminal', color: '#ea580c', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT] },
    { path: '/legal', label: 'Legal', icon: 'gavel', color: '#d97706', roles: [ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/it-desk', label: 'IT Desk', icon: 'support_agent', color: '#0891b2', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT] },
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
        <div className="app-shell">
            {/* Sidebar - Desktop */}
            <aside className="sidebar flex flex-col justify-between">
                <div>
                    <div style={{ padding: '0 12px 24px 12px', marginBottom: '16px' }}>
                        <h1 className="headline-small text-primary" style={{ margin: 0, letterSpacing: '-0.03em' }}>Al Tayer Group</h1>
                        <span className="label-small" style={{ opacity: 0.8, letterSpacing: '0.1em' }}>ENTERPRISE PORTAL</span>
                    </div>

                    <nav className="flex flex-col">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <span
                                    className="material-symbols-outlined icon"
                                    style={{ color: item.color || 'inherit' }}
                                >
                                    {item.icon}
                                </span>
                                <span className="label">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Logout - Desktop */}
                <button
                    onClick={handleLogout}
                    className="nav-item hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer w-full text-left"
                    style={{ marginTop: 'auto', border: 'none', background: 'transparent' }}
                >
                    <span className="material-symbols-outlined icon" style={{ color: '#ef4444' }}>logout</span>
                    <span className="label text-red-600">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="md:hidden flex justify-between items-center p-4 bg-surface/80 backdrop-blur sticky top-0 z-20 border-b border-white/50">
                    <span className="font-bold text-primary">Al Tayer Enterprise</span>
                    <button onClick={handleLogout} className="p-2 text-red-500 bg-red-50 rounded-lg">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                    </button>
                </header>
                <Outlet />
            </main>

            {/* Bottom Nav - Mobile */}
            <nav className="bottom-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span
                            className="material-symbols-outlined icon"
                            style={{ color: item.color || 'inherit' }}
                        >
                            {item.icon}
                        </span>
                        <span className="label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <KoreAIButton isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
        </div>
    );
}
