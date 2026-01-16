import React from 'react';
import DepartmentLayout from '../components/modules/DepartmentLayout';

export default function Marketing() {
    const agents = [
        { name: 'Generate campaign copy', desc: 'Creates localized ad copy and email sequences.' },
        { name: 'Research documents', desc: 'Analyzes market research and competitor reports.' },
        { name: 'Brainstorm SEO keywords', desc: 'Suggests high-traffic keywords for content strategy.' },
        { name: 'Webinar landing page', desc: 'Drafts high-converting copy for event registration.' },
        { name: 'Social media copy', desc: 'Generates engaging posts for LinkedIn and Twitter.' },
        { name: 'Holiday campaign ideas', desc: 'Brainstorms creative concepts for seasonal promotions.' },
    ];

    const metrics = [
        { label: 'Campaign ROI', value: '145%', trend: 'up', trendValue: '+10%' },
        { label: 'Leads Generated', value: '2,300', trend: 'up', trendValue: '+22%' },
        { label: 'Social Reach', value: '50k', trend: 'up', trendValue: '+5%' },
        { label: 'Avg. CTR', value: '3.2%', trend: 'down', trendValue: '-0.5%' },
    ];

    const activity = [
        { action: 'Launched "Summer Sale" Campaign', time: '1 hour ago' },
        { action: 'SEO Keyword Audit Completed', time: '3 hours ago' },
        { action: 'New Blog Post Published', time: '5 hours ago' },
    ];

    return (
        <DepartmentLayout
            title="Marketing"
            description="Drive engagement and brand growth with data-driven marketing AI."
            agents={agents}
            metrics={metrics}
            activity={activity}
        />
    );
}
