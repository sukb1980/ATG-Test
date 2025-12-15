import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useUser, ROLES } from '../context/UserContext';
import clsx from 'clsx'; // Assuming clsx available or using conditionals

export default function Settings() {
    const [activeTab, setActiveTab] = useState('Profile');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        updates: true
    });
    const { role, setRole } = useUser();

    const TABS = ['Profile', 'Notifications', 'Appearance'];

    return (
        <div className="flex flex-col gap-6 fade-in max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="headline-small text-primary">Settings</h1>
                    <p className="body-medium text-secondary">Manage your preferences and account.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b overflow-x-auto" style={{ borderColor: 'var(--md-sys-color-outline-variant)' }}>
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '12px 24px',
                            cursor: 'pointer',
                            borderBottom: activeTab === tab ? '2px solid var(--md-sys-color-primary)' : '2px solid transparent',
                            color: activeTab === tab ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
                            fontWeight: activeTab === tab ? 600 : 500,
                            background: 'none',
                            fontSize: '14px'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="mt-2">
                {activeTab === 'Profile' && (
                    <div className="flex flex-col gap-6">
                        <Card>
                            <div className="flex items-start gap-6">
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#e0f2fe', overflow: 'hidden', border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    <img src="https://ui-avatars.com/api/?name=Alex+Doe&background=0D8ABC&color=fff&size=200" alt="Profile" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="headline-small font-bold">Alex Doe</h2>
                                            <p className="body-medium text-secondary">Senior Software Engineer</p>
                                            <p className="body-small text-secondary mt-1">Employee ID: ATG-10045</p>
                                        </div>
                                        <Button variant="outlined">Edit Profile</Button>
                                    </div>

                                    <div className="flex gap-2 mt-4">
                                        <Badge color="success">Active Status</Badge>
                                        <Badge color="primary">{role}</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="title-medium mb-4">Role Switching (Demo)</h3>
                            <p className="body-small text-secondary mb-4">Toggle between different user roles to preview the application permissions.</p>
                            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
                                {Object.values(ROLES).map(r => (
                                    <Button
                                        key={r}
                                        variant={role === r ? 'filled' : 'outlined'}
                                        onClick={() => setRole(r)}
                                        style={{ height: '40px', width: '100%', justifyContent: 'center' }}
                                    >
                                        {r}
                                    </Button>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 className="title-medium mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="label-small block mb-1">Email Address</label>
                                    <p className="body-medium p-2 bg-gray-50 rounded border border-gray-200">alex.doe@atg.com</p>
                                </div>
                                <div>
                                    <label className="label-small block mb-1">Phone Number</label>
                                    <p className="body-medium p-2 bg-gray-50 rounded border border-gray-200">+1 (555) 012-3456</p>
                                </div>
                                <div>
                                    <label className="label-small block mb-1">Department</label>
                                    <p className="body-medium p-2 bg-gray-50 rounded border border-gray-200">Engineering</p>
                                </div>
                                <div>
                                    <label className="label-small block mb-1">Location</label>
                                    <p className="body-medium p-2 bg-gray-50 rounded border border-gray-200">New York Office</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'Notifications' && (
                    <Card>
                        <h2 className="title-medium mb-4">Notification Preferences</h2>
                        <div className="flex flex-col gap-0 divide-y divide-gray-100">
                            {[
                                { id: 'email', label: 'Email Notifications', desc: 'Receive daily summaries and critical alerts.' },
                                { id: 'push', label: 'Push Notifications', desc: 'Get real-time updates on your device.' },
                                { id: 'updates', label: 'Product Updates', desc: 'News about ATG App features and improvements.' }
                            ].map(item => (
                                <div key={item.id} className="flex justify-between items-center py-4">
                                    <div>
                                        <p className="body-medium font-bold">{item.label}</p>
                                        <p className="body-small text-secondary">{item.desc}</p>
                                    </div>
                                    <div
                                        onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}
                                        style={{
                                            width: '44px', height: '24px',
                                            background: notifications[item.id] ? 'var(--md-sys-color-primary)' : '#e2e8f0',
                                            borderRadius: '12px',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                    >
                                        <div style={{
                                            width: '20px', height: '20px',
                                            background: 'white',
                                            borderRadius: '50%',
                                            position: 'absolute',
                                            top: '2px',
                                            left: notifications[item.id] ? '22px' : '2px',
                                            transition: 'left 0.2s',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'Appearance' && (
                    <Card>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="title-medium">Dark Mode</p>
                                <p className="body-medium text-secondary">Switch between light and dark themes.</p>
                            </div>
                            <div className="p-2 bg-yellow-50 text-yellow-700 rounded border border-yellow-200 text-sm">
                                System Default
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-secondary">
                            The application currently follows your system's color scheme preference automatically.
                        </p>
                    </Card>
                )}
            </div>

            <div className="mt-8 flex justify-center pb-8">
                <Button variant="text" style={{ color: 'var(--md-sys-color-error)' }} onClick={() => window.location.href = '/'}>
                    Sign Out of Account
                </Button>
            </div>
        </div>
    );
}
