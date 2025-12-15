import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Input from '../../common/Input';

const CATEGORIES = [
    { id: 1, name: 'Hardware', icon: 'laptop_mac', color: '#E8DEF8' },
    { id: 2, name: 'Software', icon: 'terminal', color: '#D0E4FF' },
    { id: 3, name: 'Network', icon: 'wifi', color: '#FFD8E4' },
    { id: 4, name: 'Access', icon: 'key', color: '#F2F2F2' },
];

const TICKETS = [
    { id: 1024, subject: 'Laptop overheating', category: 'Hardware', status: 'In Progress', updated: '2 hrs ago' },
    { id: 1023, subject: 'VPN Access issue', category: 'Network', status: 'Resolved', updated: 'Yesterday' },
];

export default function ITDesk() {
    const navigate = useNavigate();

    return (
        <div className="p-4 fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="headline-small text-primary">IT Service Desk</h1>
                    <p className="body-medium text-secondary">How can we help you today?</p>
                </div>
                <Button onClick={() => navigate('/it-desk/new')}>
                    <span className="material-symbols-outlined">add</span>
                    Raise Ticket
                </Button>
            </div>

            <Input placeholder="Search for help articles or services..." style={{ marginBottom: '24px' }} />

            <section className="mb-8">
                <h2 className="title-medium mb-4">Service Catalog</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CATEGORIES.map(cat => (
                        <Card key={cat.id} onClick={() => navigate('/it-desk/new')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--md-sys-color-primary)' }}>{cat.icon}</span>
                            <span className="title-small font-bold">{cat.name}</span>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="title-medium mb-4">My Tickets</h2>
                <div className="flex flex-col gap-3">
                    {TICKETS.map(ticket => (
                        <Card key={ticket.id} onClick={() => navigate(`/it-desk/${ticket.id}`)} className="cursor-pointer hover:border-primary">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--md-sys-color-secondary-container)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span className="material-symbols-outlined text-primary">confirmation_number</span>
                                    </div>
                                    <div>
                                        <h3 className="title-small font-bold">#{ticket.id} - {ticket.subject}</h3>
                                        <p className="body-small text-secondary">{ticket.category} • Last updated {ticket.updated}</p>
                                    </div>
                                </div>
                                <Badge color={ticket.status === 'Resolved' ? 'success' : 'primary'}>{ticket.status}</Badge>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
