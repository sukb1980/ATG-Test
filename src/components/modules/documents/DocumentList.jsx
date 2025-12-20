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

            <div className="flex flex-col md:flex-row gap-6 h-full" style={{ minHeight: '600px' }}>
                {/* List */}
                <div className="w-full md:w-1/3 flex flex-col gap-3">
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

                {/* Preview Pane */}
                <div className="flex-1" style={{ minHeight: '400px' }}>
                    <Card className="h-full flex flex-col" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="title-medium truncate pr-4">{selectedDoc.title}</h2>
                            <div className="flex gap-2 shrink-0">
                                <Button variant="outlined" style={{ padding: '8px' }}>
                                    <span className="material-symbols-outlined">download</span>
                                </Button>
                                <Button variant="outlined" style={{ padding: '8px' }}>
                                    <span className="material-symbols-outlined">open_in_new</span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 bg-gray-100 flex items-center justify-center p-4" style={{ position: 'relative' }}>
                            <img
                                src="https://placehold.co/600x800/png?text=Document+Preview"
                                alt="Document Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    boxShadow: 'var(--shadow-md)',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
