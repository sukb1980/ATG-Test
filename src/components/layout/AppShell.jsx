import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import KoreAIButton from '../common/KoreAIButton';
import { useUser, ROLES } from '../../context/UserContext';
import './AppShell.css';

const ALL_NAV_ITEMS = [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT, ROLES.HR_ADMIN] },
    { path: '/hr-admin', label: 'HR Admin', icon: 'people', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/sales', label: 'Sales', icon: 'point_of_sale', roles: [ROLES.EMPLOYEE, ROLES.MANAGER] },
    { path: '/marketing', label: 'Marketing', icon: 'campaign', roles: [ROLES.EMPLOYEE, ROLES.MANAGER] },
    { path: '/finance', label: 'Finance', icon: 'payments', roles: [ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/engineering', label: 'Engineering', icon: 'code', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT] },
    { path: '/legal', label: 'Legal', icon: 'gavel', roles: [ROLES.MANAGER, ROLES.HR_ADMIN] },
    // Keeping Legacy IT Desk for support
    { path: '/it-desk', label: 'IT Desk', icon: 'support_agent', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT] },
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
                            <span className="material-symbols-outlined icon">{item.icon}</span>
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
                        <span className="material-symbols-outlined icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <KoreAIButton isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
        </div>
    );
}
