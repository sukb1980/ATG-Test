// This file stores "encrypted" secrets.
// Access these using the SecurityUtils.decrypt() method.

export const SECRETS = {
    // Placeholder for the encrypted Gemini API Key.
    // To generate this, run SecurityUtils.encrypt("YOUR_REAL_API_KEY") in the console and paste the result here.
    // Currently set to an encrypted dummy key.
    GEMINI_API_KEY_ENC: "Pz4zOj0+Pj4=" // Decrypts to "DUMMY_KEY" with the current salt
};
