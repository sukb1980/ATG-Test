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

        // Cancel previous
        if (synth.speaking) {
            synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);

        // Explicit Male Voice Priority
        let selectedVoice = voices.find(v => v.name === 'Google UK English Male');

        if (!selectedVoice) {
            selectedVoice = voices.find(v => v.name === 'Daniel');
        }

        if (!selectedVoice) { // Any male voice
            selectedVoice = voices.find(v => v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female'));
        }

        if (!selectedVoice) { // Mac fallback
            selectedVoice = voices.find(v => v.name === 'Alex');
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log(`🎤 Voice Selected: ${selectedVoice.name}`);
        } else if (voices.length > 0) {
            console.warn(`⚠️ No male voice found. Defaulting to: ${voices[0].name}`);
            utterance.voice = voices[0];
        }

        // Soft, slower, male characteristics
        utterance.rate = 0.85;
        utterance.pitch = 0.9;

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
