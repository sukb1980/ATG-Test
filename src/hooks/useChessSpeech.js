/**
 * File: hooks/useChessSpeech.js
 * Custom React hook for reusable logic: useChessSpeech.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export const useChessSpeech = () => {
    const [voices, setVoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synth = window.speechSynthesis;
    const mountedRef = useRef(true);

    // 1. Load Voices Robustly
    useEffect(() => {
        const loadVoices = () => {
            const vs = synth.getVoices();
            if (mountedRef.current) {
                setVoices(vs);
                console.log(`🎤 Voices Loaded: ${vs.length}`);
            }
        };

        // Chrome loads voices asynchronously
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }

        loadVoices();

        return () => {
            mountedRef.current = false;
            if (synth.onvoiceschanged !== undefined) {
                synth.onvoiceschanged = null;
            }
        };
    }, [synth]);

    // 2. Speak Function
    const speak = useCallback((text) => {
        if (!text) return;

        console.log(`🔊 Speaking: "${text}"`);

        // Desktop Chrome Fix: Ensure resume is called if stuck
        if (synth.paused) {
            console.log("▶️ Resuming paused synth");
            synth.resume();
        }

        // Cancel previous
        if (synth.speaking) {
            synth.cancel();
        }

        // Safety: Refetch voices if empty (Desktop sometimes loses them)
        let currentVoices = voices;
        if (currentVoices.length === 0) {
            currentVoices = synth.getVoices();
            console.log(`⚠️ Voices were empty, re-fetched: ${currentVoices.length}`);
        }

        const utterance = new SpeechSynthesisUtterance(text);

        // Prioritize Indian English Voices
        const indianVoiceNames = [
            'Google English (India)',
            'Google हिन्दी', // often supports English
            'Rishi',           // iOS
            'Lekha',           // iOS/macOS
            'Veena',           // iOS/macOS
            'Sangeeta',        // iOS/macOS
            'Microsoft Ravi',  // Windows
            'Microsoft Heera'  // Windows
        ];

        let selectedVoice = currentVoices.find(v => indianVoiceNames.includes(v.name));

        // Fallback: Check for 'en-IN' language code
        if (!selectedVoice) {
            selectedVoice = currentVoices.find(v => v.lang === 'en-IN');
        }

        // Fallback: Standard Male Voices
        if (!selectedVoice) {
            const maleVoiceNames = [
                'Google UK English Male',
                'Google US English Male',
                'Microsoft David',
                'Daniel',
                'Fred'
            ];
            selectedVoice = currentVoices.find(v => maleVoiceNames.includes(v.name));
        }

        // Final Fallback: Any Male Voice
        if (!selectedVoice) {
            selectedVoice = currentVoices.find(v => v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female'));
        }

        // Mac Fallback
        if (!selectedVoice) {
            selectedVoice = currentVoices.find(v => v.name === 'Alex');
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log(`🎤 Voice Selected: ${selectedVoice.name} (${selectedVoice.lang})`);
        } else if (currentVoices.length > 0) {
            console.warn(`⚠️ No preferred voice found. Defaulting to: ${currentVoices[0].name}`);
            utterance.voice = currentVoices[0];
        }

        // Tuned for more natural, less robotic sound
        // Standard rate and pitch often sound best for modern AI voices
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error("❌ Speech Error:", e);
            setIsSpeaking(false);
        };

        synth.speak(utterance);
    }, [voices, synth]);

    const cancel = useCallback(() => {
        synth.cancel();
        setIsSpeaking(false);
    }, [synth]);

    // 3. Wakeup Function (Silent) to unlock audio context
    const wakeup = useCallback(() => {
        if (synth.speaking) return;
        const silent = new SpeechSynthesisUtterance("");
        silent.volume = 0;
        synth.speak(silent);
    }, [synth]);

    return { speak, cancel, wakeup, voices, isSpeaking };
};
