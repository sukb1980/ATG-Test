import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';

const MOCK_LPOS = [
    { id: 'LPO-2025-001', vendor: 'Tech Solutions Inc.', amount: '$2,500.00', date: 'Dec 14, 2025', status: 'Pending', items: 5 },
    { id: 'LPO-2025-002', vendor: 'Office Depot', amount: '$450.50', date: 'Dec 12, 2025', status: 'Pending', items: 12 },
    { id: 'LPO-2025-003', vendor: 'Catering Co.', amount: '$1,200.00', date: 'Dec 10, 2025', status: 'Approved', items: 2 },
];

export default function LPOList() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    const toggleSelect = (id) => {
        if (selected.includes(id)) setSelected(selected.filter(s => s !== id));
        else setSelected([...selected, id]);
    };

    return (
        <div className="p-4 fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="headline-small text-primary">LPO Approvals</h1>
                    <p className="body-medium text-secondary">Review and approve purchase orders.</p>
                </div>
                <div className="flex gap-2">
                    {selected.length > 0 && (
                        <Button variant="filled">Approve Selected ({selected.length})</Button>
                    )}
                    <Button variant="tonal"><span className="material-symbols-outlined">filter_list</span> Filter</Button>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {MOCK_LPOS.map(lpo => (
                    <Card key={lpo.id} className="flex items-center gap-4 p-4 hover:shadow-2 transition-shadow">
                        <input
                            type="checkbox"
                            checked={selected.includes(lpo.id)}
                            onChange={() => toggleSelect(lpo.id)}
                            style={{ width: '20px', height: '20px' }}
                        />
                        <div className="flex-1 cursor-pointer" onClick={() => navigate(`/lpo/${lpo.id}`)}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="title-medium font-bold">{lpo.vendor}</h3>
                                    <p className="body-small text-secondary">{lpo.id} • {lpo.items} Items • {lpo.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="title-medium font-bold">{lpo.amount}</p>
                                    <Badge color={lpo.status === 'Approved' ? 'success' : 'warning'}>{lpo.status}</Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
