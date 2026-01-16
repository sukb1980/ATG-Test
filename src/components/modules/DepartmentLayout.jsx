import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

export default function DepartmentLayout({ title, description, agents = [], metrics = [], activity = [] }) {
    return (
        <div className="flex flex-col gap-8 fade-in pb-20">
            {/* Hero Section */}
            <header className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-900 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

                <div className="relative z-10 flex flex-col gap-2">
                    <span className="label-small text-indigo-200">ENTERPRISE MODULE</span>
                    <h1 className="headline-large font-bold">{title}</h1>
                    <p className="body-large text-indigo-100 max-w-2xl text-opacity-80">{description}</p>
                </div>
            </header>

            {/* Metrics Section */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <Card key={index} padding="24px" className="flex flex-col gap-2 border-l-4 border-l-primary">
                        <span className="label-small text-secondary">{metric.label}</span>
                        <div className="flex items-end gap-2">
                            <span className="headline-medium font-bold text-primary">{metric.value}</span>
                            <span className={`label-small mb-1 ${metric.trend === 'up' ? 'text-success' : 'text-error'}`}>
                                {metric.trendValue}
                            </span>
                        </div>
                    </Card>
                ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Agents Section */}
                <section className="col-span-2 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h2 className="headline-small text-primary">Department Agents</h2>
                        <Button variant="tonal">View All Agents</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {agents.map((agent, index) => (
                            <Card
                                key={index}
                                className="hover:border-primary group cursor-pointer transition-all duration-300"
                                padding="20px"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <span className="material-symbols-outlined text-primary group-hover:text-white">smart_toy</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="title-medium font-bold group-hover:text-primary transition-colors">{agent.name}</h3>
                                        <p className="body-medium text-secondary line-clamp-2">{agent.desc}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Recent Activity / Feed */}
                <section className="col-span-1 flex flex-col gap-6">
                    <h2 className="headline-small text-primary">Recent Updates</h2>
                    <Card className="flex flex-col gap-0 h-full">
                        {activity.map((item, index) => (
                            <div key={index} className="flex gap-4 p-4 border-b last:border-0 border-outline-variant hover:bg-surface-variant/30 transition-colors">
                                <div className="mt-1">
                                    <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="body-medium font-medium">{item.action}</span>
                                    <span className="label-small text-secondary">{item.time}</span>
                                </div>
                            </div>
                        ))}
                        {activity.length === 0 && (
                            <div className="p-8 text-center text-secondary">No recent updates</div>
                        )}
                    </Card>
                </section>
            </div>
        </div>
    );
}
