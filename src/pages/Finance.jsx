import React from 'react';
import DepartmentLayout from '../components/modules/DepartmentLayout';

export default function Finance() {
    const agents = [
        { name: 'Automate invoice approvals', desc: 'Processes standard invoices and expenses automatically.' },
        { name: 'Financial meeting notes', desc: 'Transcribes and highlights key financial decisions.' },
        { name: 'Proactive risk management', desc: 'Identifies potential financial risks in contracts.' },
        { name: 'Contract amendment email', desc: 'Drafts formal emails for contract adjustments.' },
        { name: 'Identify proposal considerations', desc: 'Highlights critical financial terms in new proposals.' },
        { name: 'Summarize contract', desc: 'Extracts key payment terms and obligations.' },
    ];

    const metrics = [
        { label: 'Pending Invoices', value: '12', trend: 'down', trendValue: '-5%' },
        { label: 'Budget Utilized', value: '85%', trend: 'up', trendValue: '+2%' },
        { label: 'Cash Flow', value: 'Positive', trend: 'up', trendValue: 'Stable' },
        { label: 'OpEx Month-to-Date', value: '$45k', trend: 'up', trendValue: '+3%' },
    ];

    const activity = [
        { action: 'Q3 Financial Report Approved', time: '30 mins ago' },
        { action: 'Invoice #9021 Processed', time: '2 hours ago' },
        { action: 'Budget Reallocation Alert', time: '1 day ago' },
    ];

    return (
        <DepartmentLayout
            title="Finance"
            description="Optimize financial operations and ensure compliance with AI agents."
            agents={agents}
            metrics={metrics}
            activity={activity}
        />
    );
}
