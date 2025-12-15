import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';

export default function LeaveDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock
    const leave = {
        id, type: 'Annual Leave', from: 'Dec 20, 2025', to: 'Dec 28, 2025', days: 5, status: 'Pending',
        reason: 'Family vacation to Bali. Need time to recharge.', delegate: 'Sarah Smith'
    };

    const timeline = [
        { date: 'Today 10:30 AM', title: 'Application Submitted', desc: 'You submitted the request', done: true },
        { date: 'Pending', title: 'Manager Approval', desc: 'Waiting for Jane Doe', done: false },
        { date: 'Pending', title: 'HR Processing', desc: '', done: false },
    ];

    return (
        <div className="p-4 fade-in max-w-2xl mx-auto">
            <Button variant="text" onClick={() => navigate('/leave')} style={{ paddingLeft: 0, gap: 0, marginBottom: '16px' }}>
                <span className="material-symbols-outlined">arrow_back</span> Back to List
            </Button>

            <div className="flex justify-between items-start mb-4">
                <h1 className="headline-small">Leave Request #{id}</h1>
                <Badge color="warning">Pending</Badge>
            </div>

            <div className="flex flex-col gap-4">
                <Card>
                    <h2 className="title-medium mb-4">Details</h2>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                            <p className="label-small text-secondary">Type</p>
                            <p className="body-medium">{leave.type}</p>
                        </div>
                        <div>
                            <p className="label-small text-secondary">Duration</p>
                            <p className="body-medium">{leave.days} Days</p>
                        </div>
                        <div>
                            <p className="label-small text-secondary">Start Date</p>
                            <p className="body-medium">{leave.from}</p>
                        </div>
                        <div>
                            <p className="label-small text-secondary">End Date</p>
                            <p className="body-medium">{leave.to}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="label-small text-secondary">Reason</p>
                            <p className="body-medium">{leave.reason}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="label-small text-secondary">Delegated To</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-6 h-6 rounded-full bg-blue-200 text-xs flex items-center justify-center">SS</div>
                                <span>{leave.delegate}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h2 className="title-medium mb-4">Approval Timeline</h2>
                    <div className="flex flex-col">
                        {timeline.map((item, idx) => (
                            <div key={idx} className="flex gap-4 relative">
                                {/* Line */}
                                {idx !== timeline.length - 1 && (
                                    <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-24px', width: '2px', background: '#E0E2EC' }} />
                                )}

                                <div style={{
                                    width: '24px', height: '24px', borderRadius: '50%',
                                    background: item.done ? 'var(--md-sys-color-primary)' : '#E0E2EC',
                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 1
                                }}>
                                    {item.done && <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check</span>}
                                </div>

                                <div style={{ paddingBottom: '24px' }}>
                                    <p className="label-small text-secondary">{item.date}</p>
                                    <p className="body-medium font-bold">{item.title}</p>
                                    {item.desc && <p className="body-small text-secondary">{item.desc}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Action Buttons for Manager (Simulated) */}
                {/* <div className="flex gap-2">
           <Button variant="filled" style={{ backgroundColor: 'var(--md-sys-color-error)' }}>Reject</Button>
           <Button variant="filled" style={{ backgroundColor: '#146C2E' }}>Approve</Button>
        </div> */}
            </div>
        </div>
    );
}
