import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import clsx from 'clsx';

// Default demo key (often rate limited)
const DEFAULT_API_KEY = "AIzaSyBtx9kgkq1wtAf_frYKQBilk_Zt65-uN2k";

const MOCK_RESPONSES = {
    "default": "I can help you with HR, Sales, Finance, or IT Desk inquiries. Try asking 'How do I apply for leave?' or 'Show me sales figures'.",
    "leave": "To apply for leave, navigate to the **Leave Module** in the sidebar. You can select 'Annual Leave', 'Sick Leave', or 'Emergency Leave' from the application form.",
    "hr": "For HR inquiries, you can use the **HR Administration** module. It handles onboarding, offboarding, and employee profiles.",
    "sales": "The **Sales Module** tracks quarterly reports and deal details. You can view the latest Q4 projections in the Sales Dashboard.",
    "finance": "The **Finance Module** handles invoice automation and expense approvals. Recent changes include a new 'Proactive Risk Management' feature.",
    "it": "Navigate to the **IT Desk** to raise a ticket for hardware or software issues. The average resolution time is currently 4 hours.",
    "sso": "Single Sign-On (SSO) is enabled for all enterprise employees using their Al Tayer ID."
};

export default function KoreAIButton({ isOpen, onToggle }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to Al Tayer Enterprise. How can I assist you today?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Initialize from localStorage or fallback to default
    const [apiKey, setApiKey] = useState(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        return storedKey || DEFAULT_API_KEY;
    });

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                handleSend(transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
        }

        return () => {
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, []);


    const speak = (text) => {
        if (!synthRef.current) return;
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
    };

    const getMockResponse = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('leave') || lowerText.includes('holiday')) return MOCK_RESPONSES['leave'];
        if (lowerText.includes('hr') || lowerText.includes('human')) return MOCK_RESPONSES['hr'];
        if (lowerText.includes('sales') || lowerText.includes('revenue')) return MOCK_RESPONSES['sales'];
        if (lowerText.includes('finance') || lowerText.includes('money')) return MOCK_RESPONSES['finance'];
        if (lowerText.includes('it') || lowerText.includes('computer') || lowerText.includes('ticket')) return MOCK_RESPONSES['it'];
        if (lowerText.includes('sso') || lowerText.includes('login')) return MOCK_RESPONSES['sso'];
        return MOCK_RESPONSES['default'];
    };

    const fetchGeminiResponse = async (userText) => {
        // Fallback to mock if key is placeholder or empty, or for demo stability
        if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
            return getMockResponse(userText);
        }

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: userText }] }] }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                // Fallback to mock on error
                return getMockResponse(userText);
            }

            // Extract text from Gemini response
            const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || getMockResponse(userText);
            return botResponse;

        } catch (error) {
            return getMockResponse(userText);
        }
    };

    const handleSend = async (textOverride = null) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        // Check for API Key command
        if (textToSend.toLowerCase().startsWith('apikey:')) {
            const newKey = textToSend.split(':')[1].trim();
            if (newKey) {
                localStorage.setItem('gemini_api_key', newKey);
                setApiKey(newKey);
                setMessages(prev => [...prev,
                { id: Date.now(), text: textToSend, isBot: false },
                { id: Date.now() + 1, text: "API Key updated successfully! I'm ready to help.", isBot: true }
                ]);
                setInput("");
                return;
            }
        }

        const userMsgId = Date.now();
        setMessages(prev => [...prev, { id: userMsgId, text: textToSend, isBot: false }]);
        setInput("");

        // Show typing indicator or placeholder? separate state could be better but simplified here
        const botResponseText = await fetchGeminiResponse(textToSend);

        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: botResponseText,
            isBot: true
        }]);

        speak(botResponseText);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setIsSpeaking(false);
            synthRef.current?.cancel(); // Stop speaking if user interrupts
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    return (
        <>
            {/* FAB */}
            <button
                className="ai-fab"
                style={{
                    position: 'fixed',
                    right: '24px',
                    bottom: '24px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, var(--md-sys-color-tertiary) 0%, #0891b2 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xl)',
                    zIndex: 1000,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                }}
                onClick={onToggle}
                onMouseEnter={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg) scale(1.05)' : 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = isOpen ? 'rotate(90deg)' : 'scale(1)'}
                aria-label="AI Assistant"
            >
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                    {isOpen ? 'close' : 'smart_toy'}
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={clsx('fade-in', 'glass-card')}
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '24px',
                        width: '380px',
                        height: '600px',
                        maxWidth: 'calc(100vw - 48px)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        background: 'linear-gradient(to right, var(--md-sys-color-tertiary), #06b6d4)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <div>
                            <h3 className="title-medium font-bold" style={{ color: 'white' }}>Al Tayer Assistant</h3>
                            <p className="label-small" style={{ opacity: 0.9, color: 'rgba(255,255,255,0.9)' }}>
                                {isSpeaking ? "Speaking..." : "Enterprise Knowledge Base"}
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        padding: '20px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        background: 'rgba(255, 255, 255, 0.4)'
                    }}>
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                style={{
                                    alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                                    maxWidth: '85%',
                                    padding: '14px 18px',
                                    borderRadius: '16px',
                                    borderBottomLeftRadius: msg.isBot ? '4px' : '16px',
                                    borderBottomRightRadius: msg.isBot ? '16px' : '4px',
                                    backgroundColor: msg.isBot ? 'rgba(255, 255, 255, 0.9)' : 'var(--md-sys-color-primary)',
                                    color: msg.isBot ? '#1e293b' : 'white',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    fontSize: '14px',
                                    lineHeight: '1.5'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: '16px',
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(10px)',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center'
                    }}>

                        {/* Mic Button */}
                        <button
                            onClick={toggleListening}
                            style={{
                                width: '44px', height: '44px',
                                borderRadius: '50%',
                                background: isListening ? 'var(--md-sys-color-error)' : 'white',
                                color: isListening ? 'white' : 'var(--md-sys-color-secondary)',
                                border: '1px solid var(--md-sys-color-outline-variant)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                            title="Voice Input"
                        >
                            <span className={`material-symbols-outlined ${isListening ? 'animate-pulse' : ''}`}>mic</span>
                        </button>

                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSend()}
                                placeholder={isListening ? "Listening..." : "Ask internal query..."}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    paddingRight: '40px',
                                    borderRadius: '24px',
                                    border: '1px solid var(--md-sys-color-outline-variant)',
                                    outline: 'none',
                                    fontSize: '14px',
                                    backgroundColor: 'white',
                                    boxShadow: 'inner 0 1px 2px rgba(0,0,0,0.05)'
                                }}
                            />
                        </div>

                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            style={{
                                width: '44px', height: '44px',
                                borderRadius: '50%',
                                background: input.trim() ? 'var(--md-sys-color-tertiary)' : 'var(--md-sys-color-surface-variant)',
                                color: 'white',
                                border: 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: input.trim() ? 'pointer' : 'default',
                                transition: 'all 0.2s',
                                boxShadow: input.trim() ? 'var(--shadow-md)' : 'none'
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>send</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
