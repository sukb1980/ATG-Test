import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import clsx from 'clsx'; // Using clsx for conditional classes if needed, else ignore

const WIDGETS = [
    {
        title: 'Leave Balance',
        icon: 'beach_access',
        color: 'bg-blue-50', // Tailwind classes likely not available, using raw styles
        iconColor: '#3b82f6',
        content: (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: 'var(--md-sys-color-outline-variant)' }}>
                    <span className="body-medium">Annual Leave</span>
                    <span className="headline-small font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="body-medium">Sick Leave</span>
                    <span className="headline-small font-bold">5</span>
                </div>
            </div>
        )
    },
    {
        title: 'Pending Approvals',
        icon: 'fact_check',
        iconColor: '#f59e0b',
        content: (
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="body-medium font-bold">LPO #4921</span>
                        <span className="label-small">Stationery</span>
                    </div>
                    <Badge color="warning">Action</Badge>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="body-medium font-bold">Leave Req</span>
                        <span className="label-small">John Doe</span>
                    </div>
                    <Badge color="warning">Review</Badge>
                </div>
            </div>
        )
    },
    {
        title: 'My Tickets',
        icon: 'confirmation_number',
        iconColor: '#8b5cf6',
        content: (
            <div className="flex flex-col gap-3 h-full justify-between">
                <div className="flex justify-between items-center">
                    <span className="body-medium">Open Tickets</span>
                    <span className="headline-small text-primary">2</span>
                </div>
                <Button variant="outlined" style={{ width: '100%' }} onClick={() => window.location.hash = '#/it-desk'}>View All</Button>
            </div>
        )
    }
];

const QUICK_ACTIONS = [
    { label: 'Apply Leave', icon: 'event_available', path: '/leave/apply' },
    { label: 'Raise Ticket', icon: 'add_circle', path: '/it-desk/new' },
    { label: 'Profile', icon: 'person', path: '/settings' },
    { label: 'Policies', icon: 'policy', path: '/documents' },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const { role } = useUser();

    return (
        <div className="flex flex-col gap-8 fade-in">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="headline-medium text-primary">Good Morning, Alex</h1>
                    <p className="body-medium text-secondary">Here's a summary of your workspace.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="tonal" onClick={() => navigate('/')} style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }} title="Logout">
                        <span className="material-symbols-outlined">logout</span>
                    </Button>
                    <Button variant="filled" onClick={() => navigate('/settings')} style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }} title="Profile">
                        <span className="material-symbols-outlined">person</span>
                    </Button>
                </div>
            </header>

            {/* Quick Actions */}
            <section>
                <h2 className="title-medium mb-4">Quick Actions</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                    {QUICK_ACTIONS.map((action) => (
                        <Card
                            key={action.label}
                            className="flex flex-col items-center gap-3 cursor-pointer hover:border-primary"
                            onClick={() => navigate(action.path)}
                            padding="20px"
                        >
                            <div style={{
                                color: 'var(--md-sys-color-primary)',
                                background: 'var(--md-sys-color-primary-container)',
                                width: '48px', height: '48px', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span className="material-symbols-outlined">{action.icon}</span>
                            </div>
                            <span className="label-small font-bold">{action.label}</span>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Widgets Grid */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {WIDGETS.map((widget) => (
                    <Card key={widget.title}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined" style={{ color: widget.iconColor }}>{widget.icon}</span>
                            <span className="title-medium font-bold">{widget.title}</span>
                        </div>
                        {widget.content}
                    </Card>
                ))}
            </section>
        </div>
    );
}
