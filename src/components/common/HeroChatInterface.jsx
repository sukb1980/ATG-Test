import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SUGGESTIONS = [
    { label: "Apply for Leave", icon: "flight_takeoff", path: "/hr-admin" },
    { label: "Show Sales Q4", icon: "monitoring", path: "/sales" },
    { label: "IT Ticket Status", icon: "confirmation_number", path: "/it-desk" },
    { label: "Policy Inquiry", icon: "gavel", path: "/legal" }
];

const MOCK_RESPONSES = {
    "default": "I am online. Systems nominal. Choose a module or state your command.",
    "leave": "Redirecting to **Leave Management Module**...",
    "hr": "Accessing **HR Database**. Standby...",
    "sales": "Retrieving **Q4 Sales Metrics**...",
    "finance": "Decrypting **Financial Records**...",
    "it": "Checking **IT Ticketing System**...",
    "policy": "Accessing **Legal Codex**..."
};

export default function HeroChatInterface() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { id: 1, text: "Identity Verified. Welcome, Commander. How may I assist?", isBot: true }
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

    const handleSend = (textOverride = null) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        // User Message
        setMessages(prev => [...prev, { id: Date.now(), text: textToSend, isBot: false }]);
        setInput("");

        // Simulated Bot Response
        setTimeout(() => {
            const lowerText = textToSend.toLowerCase();
            let response = MOCK_RESPONSES.default;
            let redirectPath = null;

            if (lowerText.includes('leave')) { response = MOCK_RESPONSES.leave; redirectPath = '/hr-admin'; }
            else if (lowerText.includes('hr')) { response = MOCK_RESPONSES.hr; redirectPath = '/hr-admin'; }
            else if (lowerText.includes('sales')) { response = MOCK_RESPONSES.sales; redirectPath = '/sales'; }
            else if (lowerText.includes('finance')) { response = MOCK_RESPONSES.finance; redirectPath = '/finance'; }
            else if (lowerText.includes('it')) { response = MOCK_RESPONSES.it; redirectPath = '/it-desk'; }
            else if (lowerText.includes('legal')) { response = MOCK_RESPONSES.policy; redirectPath = '/legal'; }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: response, isBot: true }]);

            if (redirectPath) {
                setTimeout(() => navigate(redirectPath), 1500);
            }
        }, 600);
    };

    const handleSuggestionClick = (suggestion) => {
        // Send message then navigate
        setMessages(prev => [...prev, { id: Date.now(), text: suggestion.label, isBot: false }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: `Initiating ${suggestion.label}...`, isBot: true }]);
            setTimeout(() => navigate(suggestion.path), 1000);
        }, 500);
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
        <div className="w-full glass-panel flex flex-col md:flex-row h-[500px] mb-8 relative z-10 overflow-hidden border-cyan-500/30 bg-black/60">

            {/* Left Side: Visual Core */}
            <div className="w-full md:w-1/3 bg-black/40 p-8 text-cyan-50 flex flex-col justify-between relative border-r border-cyan-900/30">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none"></div>

                {/* AI Hologram Core */}
                <div className="relative z-10 flex flex-col items-center mt-10">
                    <div className="w-32 h-32 rounded-full border-2 border-cyan-500/20 flex items-center justify-center relative animate-pulse-slow">
                        <div className="absolute inset-0 rounded-full border border-cyan-400/40 border-t-transparent animate-spin-slow"></div>
                        <div className="absolute inset-2 rounded-full border border-purple-500/30 border-b-transparent animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
                        <span className="material-symbols-outlined text-[64px] text-neon-blue drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">smart_toy</span>
                    </div>
                    <h2 className="text-2xl font-display font-bold mt-6 tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CORTEX AI</h2>
                    <p className="text-xs text-cyan-300/50 mt-2 text-center font-mono tracking-widest">SYSTEM: ONLINE<br />SECURE CONNECTION</p>
                </div>

                <div className="relative z-10 mt-8">
                    <p className="text-[10px] mb-3 text-cyan-500/70 uppercase tracking-[0.2em] font-bold border-b border-cyan-900/50 pb-1">Quick Protocols</p>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTIONS.map((s) => (
                            <button
                                key={s.label}
                                onClick={() => handleSuggestionClick(s)}
                                className="bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/20 hover:border-cyan-400/60 rounded-sm px-3 py-2 text-xs flex items-center gap-2 transition-all text-cyan-100 hover:text-white hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] group"
                            >
                                <span className="material-symbols-outlined text-[16px] text-cyan-500 group-hover:text-cyan-200 transition-colors">{s.icon}</span>
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Terminal Interface */}
            <div className="w-full md:w-2/3 flex flex-col bg-deep-space/40 relative backdrop-blur-sm">

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-[85%] p-4 rounded-lg text-sm leading-relaxed border ${msg.isBot
                                    ? 'bg-cyan-950/20 text-cyan-100 border-cyan-800/30 self-start font-mono border-l-4 border-l-cyan-500'
                                    : 'bg-blue-900/10 text-blue-100 border-blue-500/20 self-end border-r-4 border-r-blue-500 text-right'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-cyan-900/30 bg-black/20">
                    <div className="flex items-center gap-2 bg-black/40 rounded-lg px-2 py-2 border border-cyan-900/30 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all">
                        <button
                            onClick={toggleListening}
                            className={`w-10 h-10 rounded flex items-center justify-center transition-all ${isListening
                                    ? 'bg-red-900/20 text-red-500 animate-pulse border border-red-500/50'
                                    : 'text-cyan-700 hover:text-cyan-400'
                                }`}
                        >
                            <span className="material-symbols-outlined">mic</span>
                        </button>

                        <input
                            type="text"
                            className="flex-1 bg-transparent border-none outline-none text-cyan-50 px-2 placeholder:text-cyan-900 font-mono text-sm tracking-wide"
                            placeholder="ENTER COMMAND..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />

                        <button
                            onClick={() => handleSend()}
                            className="w-10 h-10 rounded bg-cyan-900/20 text-cyan-500 border border-cyan-800/30 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-200 transition-all"
                        >
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
