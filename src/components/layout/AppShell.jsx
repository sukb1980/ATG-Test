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

    return (
        <div className="app-shell">
            {/* Sidebar - Desktop */}
            <aside className="sidebar">
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
            </aside>

            {/* Main Content */}
            <main className="main-content">
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
