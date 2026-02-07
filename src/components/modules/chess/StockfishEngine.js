export class StockfishEngine {
    constructor() {
        // Fix for GitHub Pages deployment (base path /ATG-Test/)
        const basePath = import.meta.env.BASE_URL;
        // Ensure basePath matches what Vite provides, removing trailing slash if needed for consistent path building
        const cleanBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
        const workerPath = `${cleanBase}stockfish/stockfish.js`;

        console.log("Initializing Stockfish Worker from:", workerPath);

        try {
            this.worker = new Worker(workerPath);
            this.worker.onerror = (e) => {
                console.error("Stockfish Worker Error:", e.message, e);
            };
        } catch (error) {
            console.error("Failed to create Stockfish Worker:", error);
            this.worker = {
                postMessage: () => { },
                onmessage: null,
                terminate: () => { }
            }; // Mock worker to prevent crash
        }
        this.isReady = false;

        this.worker.onmessage = (event) => {
            const line = event.data;
            if (line === "uciok") {
                this.isReady = true;
                console.log("Stockfish Engine Ready");
            }
        };

        this.worker.postMessage("uci");
    }

    onMessage(callback) {
        this.worker.onmessage = (event) => {
            // console.log("Stockfish RAW:", event.data); // Helpful for debugging
            if (event.data === "uciok") {
                this.isReady = true;
                console.log("Stockfish Engine Ready (from hook)");
            }
            callback(event.data);
        };
    }

    evaluatePosition(fen, time = 800) {
        console.log(`Sending to Stockfish: position fen ${fen}`);
        console.log(`Sending to Stockfish: go movetime ${time}`);
        this.worker.postMessage("ucinewgame");
        this.worker.postMessage(`position fen ${fen}`);
        this.worker.postMessage(`go movetime ${time}`);
    }

    stop() {
        this.worker.postMessage("stop");
    }

    quit() {
        this.worker.postMessage("quit");
        this.worker.terminate();
    }
}
