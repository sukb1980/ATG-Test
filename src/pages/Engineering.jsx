import React from 'react';
import DepartmentLayout from '../components/modules/DepartmentLayout';

export default function Engineering() {
    const agents = [
        { name: 'Code review and explain', desc: 'Analyzes code snippets for bugs and explains logic.' },
        { name: 'Search commit logs', desc: 'Finds relevant code changes from GitHub connectors.' },
        { name: 'Generate feature docs', desc: 'Writes technical documentation based on code.' },
        { name: 'Analyze support tickets', desc: 'Categorizes and prioritizes incoming L1/L2 tickets.' },
        { name: 'Get started writing code', desc: 'Scaffolds boilerplate for new microservices.' },
        { name: 'Adjust code style', desc: 'Refactors code to match company style guides.' },
    ];

    const metrics = [
        { label: 'Sprint Velocity', value: '105', trend: 'up', trendValue: '+15%' },
        { label: 'Open Bugs', value: '24', trend: 'down', trendValue: '-10%' },
        { label: 'Uptime', value: '99.99%', trend: 'up', trendValue: 'Stable' },
        { label: 'Deployments', value: '12', trend: 'up', trendValue: 'This Week' },
    ];

    const activity = [
        { action: 'Release v2.4.0 Deployed', time: '1 hour ago' },
        { action: 'Hotfix for Ticket #992', time: '4 hours ago' },
        { action: 'New Repo Created: atg-service-auth', time: '1 day ago' },
    ];

    return (
        <DepartmentLayout
            title="Engineering"
            description="Empower developers with AI-driven code analysis and automation."
            agents={agents}
            metrics={metrics}
            activity={activity}
        />
    );
}
