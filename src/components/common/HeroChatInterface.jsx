import React, { useState, useEffect, useRef } from 'react';
import Card from '../common/Card';

const SUGGESTIONS = [
    { label: "Apply for Leave", icon: "flight_takeoff" },
    { label: "Show Sales Q4", icon: "monitoring" },
    { label: "IT Ticket Status", icon: "confirmation_number" },
    { label: "Policy Inquiry", icon: "gavel" }
];

const MOCK_RESPONSES = {
    "default": "I can help you with HR, Sales, Finance, or IT Desk inquiries. Try one of the quick actions below.",
    "leave": "Opening the **Leave Module**... You can select 'Annual Leave', 'Sick Leave', or 'Emergency Leave'.",
    "hr": "For HR inquiries, accessing **HR Administration**. How can I help with onboarding or profiles?",
    "sales": "Fetching **Sales Data**... Q4 revenue is up by 15% compared to last year.",
    "finance": "Accessing **Finance**... There are 3 pending invoices awaiting your approval.",
    "it": "Checking **IT Desk**... You have no open tickets at the moment.",
    "policy": "Searching **Legal Policies**... The updated remote work policy is available in the Documents section."
};

export default function HeroChatInterface() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Good Morning, Alexander. I'm ready to assist you with your enterprise tasks.", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Scroll to bottom of chat
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.parentNode.scrollTop = messagesEndRef.current.parentNode.scrollHeight;
        }
    }, [messages]);

    // Speech Recognition Setup
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

    const getMockResponse = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('leave') || lowerText.includes('holiday')) return MOCK_RESPONSES['leave'];
        if (lowerText.includes('sales') || lowerText.includes('revenue')) return MOCK_RESPONSES['sales'];
        if (lowerText.includes('finance') || lowerText.includes('money')) return MOCK_RESPONSES['finance'];
        if (lowerText.includes('it') || lowerText.includes('ticket')) return MOCK_RESPONSES['it'];
        if (lowerText.includes('policy') || lowerText.includes('legal')) return MOCK_RESPONSES['policy'];
        return MOCK_RESPONSES['default'];
    };

    const handleSend = (textOverride = null) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        // User Message
        setMessages(prev => [...prev, { id: Date.now(), text: textToSend, isBot: false }]);
        setInput("");

        // Simulated Bot Response
        setTimeout(() => {
            const botResponse = getMockResponse(textToSend);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, isBot: true }]);
        }, 800);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    return (
        <Card className="w-full bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-100 flex flex-col md:flex-row h-[500px] mb-8 relative z-10">

            {/* Left Side: Branding / Visual */}
            <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-[28px]">smart_toy</span>
                    </div>
                    <h2 className="headline-medium font-bold mb-2">Al Tayer Assistant</h2>
                    <p className="body-medium opacity-90">Your AI-powered enterprise companion. Ask about sales, tickets, or policies.</p>
                </div>

                <div className="relative z-10 mt-8">
                    <p className="label-small mb-3 opacity-80 uppercase tracking-widest">Quick Actions</p>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s.label}
                                onClick={() => handleSend(s.label)}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg px-3 py-2 text-sm flex items-center gap-2 transition-all text-white border border-white/10"
                            >
                                <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Chat Interface */}
            <div className="w-full md:w-2/3 flex flex-col bg-slate-50 relative">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isBot
                                ? 'bg-white rounded-bl-sm text-slate-700 border border-slate-100 self-start'
                                : 'bg-blue-600 text-white rounded-br-sm self-end'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="flex items-center gap-2 bg-slate-50 rounded-full px-2 py-2 border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <button
                            onClick={toggleListening}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-white text-slate-500 hover:text-blue-600 shadow-sm'
                                }`}
                        >
                            <span className="material-symbols-outlined">mic</span>
                        </button>

                        <input
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none text-slate-700 px-2 placeholder:text-slate-400"
                            placeholder="Type to ask Al Tayer AI..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />

                        <button
                            onClick={() => handleSend()}
                            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all shadow-md transform hover:scale-105 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </div>
                </div>

            </div>
        </Card>
    );
}
