import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Input from '../../common/Input';

export default function LeaveApplicationForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: 'Annual Leave',
        startDate: '',
        endDate: '',
        reason: '',
        delegatedTo: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const totalSteps = 3;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
        else navigate('/leave'); // Submit
    };

    return (
        <div className="p-4 fade-in max-w-2xl mx-auto">
            <div className="mb-6">
                <Button variant="text" onClick={() => navigate('/leave')} style={{ paddingLeft: 0, gap: 0 }}>
                    <span className="material-symbols-outlined">arrow_back</span> Back
                </Button>
                <h1 className="headline-small text-primary mt-2">Apply for Leave</h1>
                <div className="flex gap-2 mt-4">
                    {[1, 2, 3].map(s => (
                        <div key={s} style={{
                            flex: 1,
                            height: '4px',
                            background: s <= step ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-variant)',
                            borderRadius: '2px'
                        }} />
                    ))}
                </div>
            </div>

            <Card>
                {step === 1 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="title-large">Step 1: Dates & Type</h2>

                        <div className="flex flex-col gap-2">
                            <label className="label-small">Leave Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--md-sys-color-outline)' }}
                            >
                                <option>Annual Leave</option>
                                <option>Sick Leave</option>
                                <option>Casual Leave</option>
                                <option>Maternity/Paternity Leave</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input type="date" label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} />
                            <Input type="date" label="End Date" name="endDate" value={formData.endDate} onChange={handleChange} />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="title-large">Step 2: Reason & Delegation</h2>
                        <div className="flex flex-col gap-2">
                            <label className="label-small">Reason</label>
                            <textarea
                                name="reason"
                                rows="4"
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full p-3 border rounded border-gray-400"
                                style={{ resize: 'none', border: '1px solid var(--md-sys-color-outline)', borderRadius: '4px' }}
                                placeholder="Why are you taking leave?"
                            />
                        </div>
                        <Input label="Delegate Tasks To" name="delegatedTo" value={formData.delegatedTo} onChange={handleChange} placeholder="Search colleague..." />
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="title-large">Step 3: Review</h2>
                        <div className="p-4 bg-gray-100 rounded flex flex-col gap-2" style={{ backgroundColor: 'var(--md-sys-color-surface-variant)' }}>
                            <p><strong>Type:</strong> {formData.type}</p>
                            <p><strong>From:</strong> {formData.startDate || 'N/A'}</p>
                            <p><strong>To:</strong> {formData.endDate || 'N/A'}</p>
                            <p><strong>Reason:</strong> {formData.reason || 'N/A'}</p>
                            <p><strong>Delegate:</strong> {formData.delegatedTo || 'None'}</p>
                        </div>
                        <div className="flex items-center gap-2 p-3 border border-orange-200 bg-orange-50 rounded" style={{ borderColor: '#ffcc80', backgroundColor: '#fff3e0' }}>
                            <span className="material-symbols-outlined text-warning">warning</span>
                            <p className="body-small">Submitting this will notify your manager immediately.</p>
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-8">
                    {step > 1 && <Button variant="outlined" onClick={() => setStep(step - 1)}>Back</Button>}
                    <Button onClick={handleNext}>{step === totalSteps ? 'Submit Application' : 'Next Step'}</Button>
                </div>
            </Card>
        </div>
    );
}
