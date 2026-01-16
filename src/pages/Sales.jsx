import React from 'react';
import DepartmentLayout from '../components/modules/DepartmentLayout';

export default function Sales() {
    const agents = [
        { name: 'Draft email to prospect', desc: 'Generates personalized outreach emails based on CRM data.' },
        { name: 'Get quarterly reports', desc: 'Retrieves and summarizes deal details from CRM.' },
        { name: 'Recap and prep', desc: 'Summarizes previous conversations and prepares talking points.' },
        { name: 'Automate meeting recap', desc: 'Syncs meeting notes to CRM and triggers follow-ups.' },
        { name: 'Client History brief', desc: 'Compiles a comprehensive history of client interactions.' },
    ];

    const metrics = [
        { label: 'Total Revenue', value: '$1.2M', trend: 'up', trendValue: '+12%' },
        { label: 'Deals Closed', value: '45', trend: 'up', trendValue: '+5%' },
        { label: 'Pipeline Value', value: '$3.5M', trend: 'up', trendValue: '+8%' },
        { label: 'Active Leads', value: '1,250', trend: 'down', trendValue: '-2%' },
    ];

    const activity = [
        { action: 'Deal Closed with Acme Corp', time: '2 hours ago' },
        { action: 'Q4 Projection Report Generated', time: '4 hours ago' },
        { action: 'New Lead: TechSolutions Inc.', time: '1 day ago' },
    ];

    return (
        <DepartmentLayout
            title="Sales"
            description="Accelerate deals and manage client relationships with AI-powered sales tools."
            agents={agents}
            metrics={metrics}
            activity={activity}
        />
    );
}
