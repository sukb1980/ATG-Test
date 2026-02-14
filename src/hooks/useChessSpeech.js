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

        // Select Voice (Priority: Google -> Natural -> Default)
        const preferredVoice = voices.find(v =>
            v.lang.includes('en') &&
            (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'))
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        } else if (voices.length > 0) {
            utterance.voice = voices[0];
        }

        // Standard settings for max compatibility
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
