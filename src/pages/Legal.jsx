import React from 'react';
import DepartmentLayout from '../components/modules/DepartmentLayout';

export default function Legal() {
    const agents = [
        { name: 'Analyze regulations', desc: 'Assesses impact of new regulations on operations.' },
        { name: 'Determine impact on contract', desc: 'Reviews existing contracts for regulatory compliance.' },
        { name: 'Determine patent claims', desc: 'Researches potential patent infringements or opportunities.' },
        { name: 'Understand contract details', desc: 'Summarizes complex legal clauses for non-legal teams.' },
        { name: 'Compare contracts', desc: 'Highlights differences between two versions of an agreement.' },
    ];

    const metrics = [
        { label: 'Contracts Reviewed', value: '15', trend: 'up', trendValue: '+2%' },
        { label: 'Compliance Score', value: '98%', trend: 'up', trendValue: 'Stable' },
        { label: 'Active Cases', value: '3', trend: 'down', trendValue: '-1' },
        { label: 'Risk Level', value: 'Low', trend: 'up', trendValue: 'Secure' },
    ];

    const activity = [
        { action: 'NDA Template Updated', time: '2 hours ago' },
        { action: 'Contract #402 Signed', time: '5 hours ago' },
        { action: 'Regulatory Alert: GDPR Update', time: '1 day ago' },
    ];

    return (
        <DepartmentLayout
            title="Legal"
            description="Streamline contract review and ensure regulatory compliance."
            agents={agents}
            metrics={metrics}
            activity={activity}
        />
    );
}
