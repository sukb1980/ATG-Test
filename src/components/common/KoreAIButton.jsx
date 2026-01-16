import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
// Default demo key
const DEFAULT_API_KEY = "AIzaSyBtx9kgkq1wtAf_frYKQBilk_Zt65-uN2k";

const MOCK_RESPONSES = {
    "default": "I can assist with HR, Sales, Finance, or IT Desk inquiries. Try asking 'How do I apply for leave?' or 'Show me sales figures'.",
    "leave": "Navigate to **HR Admin** to manage leave requests. Current policy allows up to 25 annual leave days.",
    "hr": "The **HR Admin** module handles onboarding, offboarding, and employee profiles.",
    "sales": "The **Sales Module** tracks quarterly reports. View Q4 projections in the Sales Dashboard.",
    "finance": "The **Finance Module** handles invoicing. New features include proactive risk management.",
    "it": "Visit **IT Desk** to raise support tickets. Average resolution time is 4 hours.",
    "sso": "SSO is enabled for all Al Tayer employees."
};

export default function KoreAIButton({ isOpen, onToggle }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to Al Tayer Enterprise. How can I assist you today?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || DEFAULT_API_KEY);

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
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                handleSend(transcript);
            };
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    const speak = (text) => {
        if (!synthRef.current) return;
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
    };

    const getMockResponse = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('leave') || lowerText.includes('holiday')) return MOCK_RESPONSES['leave'];
        if (lowerText.includes('hr')) return MOCK_RESPONSES['hr'];
        if (lowerText.includes('sales')) return MOCK_RESPONSES['sales'];
        if (lowerText.includes('finance')) return MOCK_RESPONSES['finance'];
        if (lowerText.includes('it')) return MOCK_RESPONSES['it'];
        return MOCK_RESPONSES['default'];
    };

    const fetchGeminiResponse = async (userText) => {
        if (!apiKey || apiKey.includes("KEY_HERE")) return getMockResponse(userText);
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
            return data.candidates?.[0]?.content?.parts?.[0]?.text || getMockResponse(userText);
        } catch {
            return getMockResponse(userText);
        }
    };

    const handleSend = async (textOverride = null) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        setMessages(prev => [...prev, { id: Date.now(), text: textToSend, isBot: false }]);
        setInput("");

        const botResponseText = await fetchGeminiResponse(textToSend);
        setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponseText, isBot: true }]);
        speak(botResponseText);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setIsSpeaking(false);
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    return (
        <>
            {/* FAB - Corporate Orange */}
            <button
                className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition-all z-50 border-2 border-white"
                onClick={onToggle}
            >
                <span className="material-symbols-outlined text-3xl">
                    {isOpen ? 'close' : 'smart_toy'}
                </span>
            </button>

            {/* Chat Window - Corporate Style */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-40 flex flex-col border border-brand-border overflow-hidden animate-fade-in font-sans">
                    {/* Header */}
                    <div className="bg-brand-navy p-4 flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <div>
                            <h3 className="font-bold font-display">Al Tayer Assistant</h3>
                            <p className="text-xs text-brand-orange uppercase tracking-wider">
                                {isSpeaking ? "Speaking..." : "Online"}
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-brand-silver space-y-3">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={clsx(
                                    "p-3 rounded-lg max-w-[85%] text-sm shadow-sm",
                                    msg.isBot
                                        ? "bg-white text-brand-charcoal self-start rounded-bl-none border border-brand-border"
                                        : "bg-brand-navy text-white self-end ml-auto rounded-br-none"
                                )}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-brand-border flex gap-2">
                        <button
                            onClick={toggleListening}
                            className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                isListening ? "bg-red-500 text-white animate-pulse" : "bg-brand-silver text-brand-navy hover:bg-brand-border"
                            )}
                        >
                            <span className="material-symbols-outlined text-xl">mic</span>
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="Type a query..."
                            className="flex-1 bg-brand-silver rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange text-brand-charcoal"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
