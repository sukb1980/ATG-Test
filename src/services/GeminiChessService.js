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
    }
};
