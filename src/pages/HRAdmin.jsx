import React from 'react';
import DepartmentLayout from '../components/modules/DepartmentLayout';

export default function HRAdmin() {
    const agents = [
        { name: 'Onboarding Agent', desc: 'Guides new hires through paperwork and setup.' },
        { name: 'IT Provisioning Agent', desc: 'Automates device and software access requests.' },
        { name: 'Training Compliance', desc: 'Tracks mandatory training completion rates.' },
        { name: 'Employee Offboarding', desc: 'Manages exit interviews and access revocation.' },
        { name: 'Manager Approvals', desc: 'Consolidates leave and expense requests for approval.' },
        { name: 'Employee Profile Change', desc: 'Updates personal and banking details securely.' },
        { name: 'Performance Review', desc: 'Assists managers in drafting performance feedback.' },
        { name: 'Team Insights', desc: 'Analyzes engagement surveys and team sentiment.' },
    ];

    const metrics = [
        { label: 'New Hires (Q4)', value: '8', trend: 'up', trendValue: '+2' },
        { label: 'Attrition Rate', value: '4%', trend: 'down', trendValue: '-1%' },
        { label: 'Training Completion', value: '92%', trend: 'up', trendValue: '+5%' },
        { label: 'Open Positions', value: '12', trend: 'up', trendValue: '+3' },
    ];

    const activity = [
        { action: 'New Hire Onboarding: Sarah J.', time: '1 hour ago' },
        { action: 'Policy Update: Remote Work', time: '1 day ago' },
        { action: 'Performance Cycle Started', time: '2 days ago' },
    ];

    return (
        <DepartmentLayout
            title="HR Administration"
            description="Manage the complete employee lifecycle from onboarding to offboarding."
            agents={agents}
            metrics={metrics}
            activity={activity}
        />
    );
}
