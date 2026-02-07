/**
 * Simple utility to obfuscate API keys so they are not human-readable in the repository.
 * NOTE: This is NOT true security for client-side apps (keys can still be found by inspecting network traffic or reverse engineering).
 * It relies on a "secret" salt which is also in the code, but separates the key from plain text scanners.
 */

// This is a simple XOR cipher with Base64 encoding
const SALT = "ATG_CHESS_APP_SECRET_SALT_2026";

export const SecurityUtils = {
    /**
     * Encrypts a string (e.g., API Key)
     * @param {string} text 
     * @returns {string} Encrypted string
     */
    encrypt: (text) => {
        if (!text) return "";
        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ SALT.charCodeAt(i % SALT.length));
        }
        return btoa(result);
    },

    /**
     * Decrypts an encrypted string
     * @param {string} encryptedText 
     * @returns {string} Decrypted string
     */
    decrypt: (encryptedText) => {
        if (!encryptedText) return "";
        try {
            const text = atob(encryptedText);
            let result = "";
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(text.charCodeAt(i) ^ SALT.charCodeAt(i % SALT.length));
            }
            return result;
        } catch (e) {
            console.error("Failed to decrypt key", e);
            return "";
        }
    }
};
