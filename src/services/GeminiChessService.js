import { SecurityUtils } from '../utils/SecurityUtils';
import { SECRETS } from '../config/secrets';

export const GeminiChessService = {
    /**
     * Interprets a natural language command into a chess move using Gemini.
     * @param {string} command - The user's spoken command (e.g., "Move knight to f3")
     * @param {string} fen - The current board state in FEN notation
     * @returns {Promise<{from: string, to: string, promotion?: string} | null>} The move object or null if invalid
     */
    getMoveFromNaturalLanguage: async (command, fen) => {
        try {
            const apiKey = SecurityUtils.decrypt(SECRETS.GEMINI_API_KEY_ENC);
            if (!apiKey || apiKey === "DUMMY_KEY" || apiKey.includes("Pz4zOj0+Pj4=")) {
                console.warn("Gemini API Key is missing or invalid. Voice commands needing AI interpretation will fail safely.");
                // We don't alert here to avoid spamming the user, just return null so the game handles it gracefully.
                return null;
            }

            const prompt = `
            You are a chess engine helper. 
            Current board FEN: ${fen}
            User command: "${command}"
            
            Interpret the command and return the move in UCI format (e.g., "e2e4" or "g1f3" or "a7a8q" for promotion).
            If the command is ambiguous or invalid, return "INVALID".
            Only return the move string, nothing else.
            `;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

            if (!text || text === "INVALID") return null;

            // Simple parsing of UCI string (e.g., "e2e4")
            if (text.length >= 4) {
                return {
                    from: text.substring(0, 2),
                    to: text.substring(2, 4),
                    promotion: text.length > 4 ? text[4] : 'q'
                };
            }

            return null;

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            return null;
        }
    },

    /**
     * Generates a short, personality-driven commentary on the AI's move or the user's last move.
     * @param {string} fen - Current board state
     * @param {string} lastMove - The user's last move (in UCI or SAN)
     * @param {string} bestMove - The move the AI has decided to make (UCI)
     * @returns {Promise<string>} The commentary text
     */
    getMoveCommentary: async (fen, lastMove, bestMove) => {
        try {
            const apiKey = SecurityUtils.decrypt(SECRETS.GEMINI_API_KEY_ENC);
            if (!apiKey || apiKey === "DUMMY_KEY" || apiKey.includes("Pz4zOj0+Pj4=")) {
                return null;
            }

            const moods = [
                "witty and slightly arrogant Grandmaster",
                "nervous beginner pretending to be a pro",
                "calm and philosophical teacher",
                "aggressive and impatient player",
                "sarcastic observer",
                "overly dramatic anime villain"
            ];
            const randomMood = moods[Math.floor(Math.random() * moods.length)];

            const prompt = `
            You are playing chess. Your personality for this move is: ${randomMood}.
            Current FEN: ${fen}
            User just played: ${lastMove || "nothing (Start of game)"}
            You are about to play: ${bestMove}
            
            IMPORTANT: Do not repeat yourself. Be unique.
            Give me a very short, human-like reaction (maximum 1 sentence). 
            Do NOT sound robotic. Sound like a real person sitting across the board.
            React to their move or hint at your plan, but keep it vague and natural.
            
            Examples of style:
            - "Ooh, bold. I didn't see that coming."
            - "Really? That's your best shot?"
            - "Interesting... let's see how you handle this."
            - "My knight is coming for you!"
            
            Keep it under 15 words.
            `;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.9, // High creativity
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 60,
                    }
                })
            });

            if (!response.ok) {
                const errBody = await response.text();
                throw new Error(`Gemini API Error ${response.status}: ${errBody}`);
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            return text || "Hmm, interesting position...";

        } catch (error) {
            console.error("Gemini Commentary Error:", error);
            // Fallback to extensive local random strings if API fails
            const fallbacks = [
                // Analytical
                "Hmm, interesting position...", "Let me calculate the lines...", "I see what you're planning.",
                "Precise play, but is it enough?", "The center control is crucial here.",
                // Aggressive
                "My pieces are ready to strike!", "You leave me no choice but to attack.", "Prepare yourself!",
                "I perceive a weakness in your defense.", "Aggression is the best defense, they say.",
                // Witty/Dismissive
                "Bold, but perhaps reckless?", "I wouldn't have done that.", "Are you sure about that one?",
                "A classic mistake, but I'll let it slide.", "You're making this too easy.",
                // Uncertain/Human
                "Wait, did I leave that unguarded?", "Let me think about this one...", "That was unexpected.",
                "Hold on, I need a second.", "Tricky, very tricky."
            ];
            return fallbacks[Math.floor(Math.random() * fallbacks.length)];
        }
    }
};
