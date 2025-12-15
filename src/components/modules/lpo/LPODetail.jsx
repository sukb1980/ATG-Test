import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';

export default function LPODetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="p-4 fade-in max-w-4xl mx-auto">
            <Button variant="text" onClick={() => navigate('/lpo')} style={{ paddingLeft: 0, gap: 0, marginBottom: '16px' }}>
                <span className="material-symbols-outlined">arrow_back</span> Back to List
            </Button>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="headline-small text-primary">{id}</h1>
                    <p className="body-medium text-secondary">Vendor: Tech Solutions Inc.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outlined" style={{ color: 'var(--md-sys-color-error)', borderColor: 'var(--md-sys-color-error)' }}>Reject</Button>
                    <Button variant="outlined">Request Change</Button>
                    <Button variant="filled">Approve</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 flex flex-col gap-4">
                    <Card>
                        <h2 className="title-medium mb-4">Line Items</h2>
                        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <th className="p-2 label-small text-secondary">Item</th>
                                    <th className="p-2 label-small text-secondary text-right">Qty</th>
                                    <th className="p-2 label-small text-secondary text-right">Price</th>
                                    <th className="p-2 label-small text-secondary text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3].map(i => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td className="p-2 body-medium">Dell Latitude 5420 Laptop</td>
                                        <td className="p-2 body-medium text-right">5</td>
                                        <td className="p-2 body-medium text-right">$1,200.00</td>
                                        <td className="p-2 body-medium text-right font-bold">$6,000.00</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>

                    <Card>
                        <h2 className="title-medium mb-2">Attachments</h2>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                <span className="material-symbols-outlined text-error">picture_as_pdf</span>
                                <span className="body-medium">Quote.pdf</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                <span className="material-symbols-outlined text-primary">description</span>
                                <span className="body-medium">Contract.docx</span>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="flex flex-col gap-4">
                    <Card>
                        <h2 className="title-small font-bold mb-4">Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="body-medium text-secondary">Subtotal</span>
                            <span className="body-medium">$6,000.00</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="body-medium text-secondary">Tax (10%)</span>
                            <span className="body-medium">$600.00</span>
                        </div>
                        <div style={{ height: '1px', background: '#eee', margin: '8px 0' }} />
                        <div className="flex justify-between">
                            <span className="title-medium font-bold">Total</span>
                            <span className="title-medium font-bold text-primary">$6,600.00</span>
                        </div>
                    </Card>

                    <Card>
                        <h2 className="title-small font-bold mb-4">Approval Chain</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                                </div>
                                <div>
                                    <p className="body-small font-bold">Manager</p>
                                    <p className="label-small text-secondary">Approved Dec 14</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>pending</span>
                                </div>
                                <div>
                                    <p className="body-small font-bold">Finance Head (You)</p>
                                    <p className="label-small text-secondary">Pending</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
