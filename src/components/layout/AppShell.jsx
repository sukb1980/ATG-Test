import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import KoreAIButton from '../common/KoreAIButton';
import { useUser, ROLES } from '../../context/UserContext';
import './AppShell.css';

const ALL_NAV_ITEMS = [
    { path: '/dashboard', label: 'Home', icon: 'home', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT, ROLES.HR_ADMIN] },
    { path: '/leave', label: 'Leave', icon: 'flight_takeoff', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/it-desk', label: 'IT Desk', icon: 'computer', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT] },
    { path: '/lpo', label: 'Approvals', icon: 'approval', roles: [ROLES.MANAGER, ROLES.HR_ADMIN] },
    { path: '/documents', label: 'Docs', icon: 'folder', roles: [ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.IT_AGENT, ROLES.HR_ADMIN] },
    // Removed Settings, managing manually
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
            </aside >

        {/* Main Content */ }
        < main className = "main-content" >
            <Outlet />
            </main >

        {/* Bottom Nav - Mobile */ }
        < nav className = "bottom-nav" >
        {
            navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <span className="material-symbols-outlined icon">{item.icon}</span>
                    <span className="label">{item.label}</span>
                </NavLink>
            ))
        }
            </nav >

        <KoreAIButton isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
        </div >
    );
}
