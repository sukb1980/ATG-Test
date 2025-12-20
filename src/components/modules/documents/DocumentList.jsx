import React, { useState } from 'react';
import Card from '../../common/Card';
import Button from '../../common/Button';

const DOCS = [
    { id: 1, title: 'Employee Handbook 2025', type: 'PDF', size: '2.4 MB', updated: 'Dec 1, 2025' },
    { id: 2, title: 'Travel Policy', type: 'PDF', size: '1.1 MB', updated: 'Nov 15, 2025' },
    { id: 3, title: 'IT Security Guidelines', type: 'PDF', size: '3.5 MB', updated: 'Oct 20, 2025' },
    { id: 4, title: 'Holiday List 2025', type: 'Image', size: '0.5 MB', updated: 'Dec 10, 2025' },
];

export default function DocumentList() {
    const [selectedDoc, setSelectedDoc] = useState(DOCS[0]);
    const [filter, setFilter] = useState('Recent');

    // Mock filtering logic
    const filteredDocs = filter === 'Recent' ? DOCS.slice(0, 3) : DOCS;

    return (
        <div className="p-4 fade-in h-full flex flex-col">
            <h1 className="headline-small text-primary mb-6">Documents & Policies</h1>

            <div className="flex flex-col gap-6 h-full">
                {/* List */}
                <div className="w-full flex flex-col gap-3">
                    <div className="flex gap-2 mb-2">
                        <Button
                            variant={filter === 'Recent' ? 'filled' : 'text'}
                            style={{ flex: 1 }}
                            onClick={() => setFilter('Recent')}
                        >
                            Recent
                        </Button>
                        <Button
                            variant={filter === 'All' ? 'filled' : 'text'}
                            style={{ flex: 1 }}
                            onClick={() => setFilter('All')}
                        >
                            All Files
                        </Button>
                    </div>
                    {filteredDocs.map(doc => (
                        <Card
                            key={doc.id}
                            style={{
                                border: selectedDoc.id === doc.id ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                                backgroundColor: selectedDoc.id === doc.id ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedDoc(doc)}
                        >
                            <div className="flex items-center gap-3">
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '8px',
                                    backgroundColor: doc.type === 'PDF' ? '#FFDAD6' : '#E8DEF8',
                                    color: doc.type === 'PDF' ? '#410002' : '#1D192B',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span className="material-symbols-outlined">{doc.type === 'PDF' ? 'picture_as_pdf' : 'image'}</span>
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <p className="body-medium font-bold truncate">{doc.title}</p>
                                    <p className="label-small text-secondary">{doc.size} • {doc.updated}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
