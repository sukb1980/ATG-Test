import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Input from '../../common/Input';

export default function TicketForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/it-desk');
        }, 1000);
    };

    return (
        <div className="p-4 fade-in max-w-2xl mx-auto">
            <Button variant="text" onClick={() => navigate('/it-desk')} style={{ paddingLeft: 0, gap: 0, marginBottom: '16px' }}>
                <span className="material-symbols-outlined">arrow_back</span> Back
            </Button>

            <h1 className="headline-small text-primary mb-6">Create New Ticket</h1>

            <Card>
                <div className="flex flex-col gap-4">
                    <Input label="Subject" placeholder="Brief summary of the issue" />

                    <div className="flex flex-col gap-2">
                        <label className="label-small text-secondary">Category</label>
                        <div className="flex gap-2">
                            {['Hardware', 'Software', 'Network'].map(c => (
                                <Button key={c} variant="tonal" style={{ fontSize: '12px', padding: '8px 16px' }}>{c}</Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="label-small text-secondary">Priority</label>
                        <select style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--md-sys-color-outline)' }}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="label-small text-secondary">Description</label>
                        <textarea className="w-full p-3 border rounded" rows="5" style={{ resize: 'none', borderColor: 'var(--md-sys-color-outline)' }} placeholder="Describe the issue in detail..."></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="label-small text-secondary">Attachments</label>
                        <div style={{ border: '2px dashed #ccc', padding: '24px', textAlign: 'center', borderRadius: '8px' }}>
                            <span className="material-symbols-outlined text-secondary">cloud_upload</span>
                            <p className="body-small text-secondary">Click to upload or drag files here</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outlined" onClick={() => navigate('/it-desk')}>Cancel</Button>
                        <Button variant="filled" onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Ticket'}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
