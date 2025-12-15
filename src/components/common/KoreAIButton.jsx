import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';

export default function KoreAIButton({ isOpen, onToggle }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your AI Assistant. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now(), text: input, isBot: false }]);
        setInput("");

        // Mock reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "I'm a demo bot. I can't actually do that yet, but I look nice!",
                isBot: true
            }]);
        }, 1000);
    };

    return (
        <>
            {/* FAB */}
            <button
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: 'var(--md-sys-color-tertiary)',
                    color: 'var(--md-sys-color-on-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 1000,
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                    border: 'none',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                }}
                onClick={onToggle}
                onMouseEnter={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(1.05)' : 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg)' : 'scale(1)'}
                aria-label="AI Assistant"
            >
                <span className="material-symbols-outlined">{isOpen ? 'close' : 'smart_toy'}</span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fade-in"
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '24px',
                        width: '350px',
                        height: '500px',
                        maxWidth: 'calc(100vw - 48px)',
                        zIndex: 999
                    }}
                >
                    <Card style={{ height: '100%', padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        {/* Header */}
                        <div style={{
                            padding: '16px',
                            background: 'var(--md-sys-color-tertiary)',
                            color: 'var(--md-sys-color-on-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <span className="material-symbols-outlined">smart_toy</span>
                            <div>
                                <h3 className="title-medium font-bold">Kore AI</h3>
                                <p className="label-small" style={{ opacity: 0.9 }}>Always here to help</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f8fafc' }}>
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    style={{
                                        alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                                        maxWidth: '80%',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        borderBottomLeftRadius: msg.isBot ? '4px' : '12px',
                                        borderBottomRightRadius: msg.isBot ? '12px' : '4px',
                                        backgroundColor: msg.isBot ? 'white' : 'var(--md-sys-color-primary-container)',
                                        color: msg.isBot ? 'var(--md-sys-color-on-surface)' : 'var(--md-sys-color-on-primary-container)',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                        fontSize: '14px'
                                    }}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div style={{ padding: '12px', borderTop: '1px solid var(--md-sys-color-outline-variant)', display: 'flex', gap: '8px' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                style={{
                                    flex: 1,
                                    padding: '10px 16px',
                                    borderRadius: '24px',
                                    border: '1px solid var(--md-sys-color-outline-variant)',
                                    outline: 'none',
                                    fontSize: '14px'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    width: '40px', height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--md-sys-color-tertiary)',
                                    color: 'white',
                                    border: 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>send</span>
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}
