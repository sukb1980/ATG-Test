/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-blue': '#00f3ff',
                'neon-purple': '#bf00ff',
                'deep-space': '#050a14',
                'glass-border': 'rgba(255, 255, 255, 0.1)',
                'glass-bg': 'rgba(10, 20, 40, 0.7)',
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'], // Optional if user wants full sci-fi
            },
            boxShadow: {
                'neon': '0 0 10px rgba(0, 243, 255, 0.5)',
                'neon-purple': '0 0 10px rgba(191, 0, 255, 0.5)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
