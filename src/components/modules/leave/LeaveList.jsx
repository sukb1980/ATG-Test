import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';

const MOCK_LEAVES = [
    { id: 1, type: 'Annual Leave', from: '2025-12-20', to: '2025-12-28', days: 5, status: 'Pending', reason: 'Family vacation' },
    { id: 2, type: 'Sick Leave', from: '2025-11-10', to: '2025-11-11', days: 2, status: 'Approved', reason: 'Flu' },
    { id: 3, type: 'Casual Leave', from: '2025-10-05', to: '2025-10-06', days: 1, status: 'Rejected', reason: 'Personal work' },
];

export default function LeaveList() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    const filteredLeaves = filter === 'All' ? MOCK_LEAVES : MOCK_LEAVES.filter(l => l.status === filter);

    return (
        <div className="p-4 fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="headline-small text-primary">Leave Management</h1>
                    <p className="body-medium text-secondary">View and manage your time off.</p>
                </div>
                <Button onClick={() => navigate('/leave/new')}>
                    <span className="material-symbols-outlined">add</span>
                    Apply Leave
                </Button>
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                    <Button
                        key={status}
                        variant={filter === status ? 'filled' : 'tonal'}
                        onClick={() => setFilter(status)}
                        style={{ padding: '8px 16px', height: '36px' }}
                    >
                        {status}
                    </Button>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                {filteredLeaves.map(leave => (
                    <Card key={leave.id} onClick={() => navigate(`/leave/${leave.id}`)}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="title-medium font-bold">{leave.type}</h3>
                                <p className="body-small text-secondary" style={{ marginTop: '4px' }}>
                                    {leave.from} - {leave.to} • {leave.days} Days
                                </p>
                                <p className="body-small text-secondary" style={{ marginTop: '4px', fontStyle: 'italic' }}>
                                    "{leave.reason}"
                                </p>
                            </div>
                            <Badge color={leave.status === 'Approved' ? 'success' : leave.status === 'Rejected' ? 'error' : 'warning'}>
                                {leave.status}
                            </Badge>
                        </div>
                    </Card>
                ))}
                {filteredLeaves.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-8 text-secondary">
                        <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '8px' }}>event_busy</span>
                        <p>No leaves found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
