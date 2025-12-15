import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';

export default function TicketDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="p-4 fade-in max-w-4xl mx-auto h-full flex flex-col">
            <Button variant="text" onClick={() => navigate('/it-desk')} style={{ paddingLeft: 0, gap: 0, marginBottom: '16px' }}>
                <span className="material-symbols-outlined">arrow_back</span> Back to IT Desk
            </Button>

            <div className="flex gap-6 h-full flex-col md:flex-row">
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col gap-4">
                    <Card className="flex-1 flex flex-col" style={{ minHeight: '60vh', padding: 0, overflow: 'hidden' }}>
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50" style={{ backgroundColor: 'var(--md-sys-color-surface-variant)' }}>
                            <div>
                                <h2 className="title-medium">Laptop overheating</h2>
                                <p className="body-small text-secondary">Ticket #{id}</p>
                            </div>
                            <Badge>In Progress</Badge>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                            {/* Messages */}
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">Me</div>
                                <div style={{ background: '#E0E2EC', padding: '12px', borderRadius: '12px 12px 12px 0' }}>
                                    <p className="body-medium">My laptop gets very hot when running Teams.</p>
                                    <p className="label-small text-secondary mt-1">10:00 AM</p>
                                </div>
                            </div>

                            <div className="flex gap-3 flex-row-reverse">
                                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">IT</div>
                                <div style={{ background: '#D0E4FF', padding: '12px', borderRadius: '12px 12px 0 12px' }}>
                                    <p className="body-medium">Hello Alex, I can help with that. Have you tried restarting?</p>
                                    <p className="label-small text-secondary mt-1">10:05 AM</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t bg-white" style={{ backgroundColor: 'var(--md-sys-color-surface)' }}>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a reply..."
                                    className="flex-1 p-2 border rounded"
                                    style={{ border: '1px solid var(--md-sys-color-outline)', borderRadius: '24px', paddingLeft: '16px' }}
                                />
                                <Button variant="filled" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>
                                    <span className="material-symbols-outlined">send</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="w-full md:w-80 flex flex-col gap-4">
                    <Card>
                        <h3 className="title-small font-bold mb-4">Ticket Info</h3>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="label-small text-secondary">Status</p>
                                <p className="body-medium">In Progress</p>
                            </div>
                            <div>
                                <p className="label-small text-secondary">Priority</p>
                                <Badge color="warning">Medium</Badge>
                            </div>
                            <div>
                                <p className="label-small text-secondary">Category</p>
                                <p className="body-medium">Hardware</p>
                            </div>
                            <div>
                                <p className="label-small text-secondary">Assigned To</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">JD</div>
                                    <span>John Doe (IT)</span>
                                </div>
                            </div>
                            <div>
                                <p className="label-small text-secondary">SLA Target</p>
                                <p className="body-medium text-error">4 hours left</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="title-small font-bold mb-2">Attachments</h3>
                        <div className="flex items-center gap-2 p-2 border rounded" style={{ borderColor: 'var(--md-sys-color-outline-variant)' }}>
                            <span className="material-symbols-outlined text-secondary">image</span>
                            <span className="body-small truncate">screenshot_error.png</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
