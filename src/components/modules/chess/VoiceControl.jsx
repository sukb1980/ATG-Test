import React, { useState, useEffect } from 'react';

export default function VoiceControl({ onCommand }) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [supportError, setSupportError] = useState(false);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setSupportError(true);
        }
    }, []);

    const toggleListening = () => {
        if (supportError) return;

        if (isListening) {
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            setTranscript("Listening...");
        };

        recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const text = event.results[last][0].transcript;
            setTranscript(`Recognized: "${text}"`);
            if (onCommand) {
                onCommand(text);
            }
        };

        recognition.onerror = (event) => {
            setTranscript(`Error: ${event.error}`);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    if (supportError) {
        return (
            <div className="mt-4 text-xs text-red-400">
                Voice control not supported in this browser.
            </div>
        );
    }

    return (
        <div className="mt-4 flex flex-col items-center gap-2">
            <button
                onClick={toggleListening}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all shadow-lg ${isListening
                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                        : 'bg-brand-orange hover:bg-orange-600 text-white'
                    }`}
            >
                <span className="material-symbols-outlined">
                    {isListening ? 'mic' : 'mic_none'}
                </span>
                <span className="font-medium">
                    {isListening ? 'Stop Listening' : 'Voice Command'}
                </span>
            </button>

            {transcript && (
                <div className="text-white/80 text-sm font-light italic">
                    {transcript}
                </div>
            )}
        </div>
    );
}
