import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Chess } from 'chess.js';
import { StockfishEngine } from './StockfishEngine';
import MoveHistory from './MoveHistory';
import VoiceControl from './VoiceControl';
import PastMatches from './PastMatches';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useUser } from '../../../context/UserContext';
import { GeminiChessService } from '../../../services/GeminiChessService';
import { useChessSpeech } from '../../../hooks/useChessSpeech';

const PIECE_IMAGES = {
    w: {
        p: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
        r: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
        n: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
        b: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
        q: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
        k: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    },
    b: {
        p: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
        r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
        n: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
        b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
        q: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
        k: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
    }
};

export default function ChessGame() {
    const { user } = useUser();
    // Use useRef to maintain the game instance across renders without resetting history
    const gameRef = useRef(new Chess());
    const game = gameRef.current; // Shortcut for cleaner code

    const [fen, setFen] = useState(game.fen());
    const [history, setHistory] = useState([]);
    const [playerColor, setPlayerColor] = useState('white');
    const [engineStatus, setEngineStatus] = useState("Initializing AI...");
    const [isThinking, setIsThinking] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [moveFrom, setMoveFrom] = useState(null);
    const [optionSquares, setOptionSquares] = useState({}); // { 'e2': { background: ... } }
    const [aiThought, setAiThought] = useState("");
    const [animatingSquare, setAnimatingSquare] = useState(null); // Square to highlight during animation

    async function saveGameToFirestore() {
        if (!user) return; // Don't save for guests

        let result = "Draw";
        if (game.isCheckmate()) {
            // If it's checkmate and it was white's turn, black won.
            // game.turn() returns the side TO move.
            const winner = game.turn() === 'w' ? 'Black' : 'White';
            result = winner === 'White' && playerColor === 'white' ? 'Win' : 'Loss';
            if (winner !== (game.turn() === 'w' ? 'Black' : 'White')) result = "Loss"; // Simplified logic
        }

        try {
            await addDoc(collection(db, `users/${user.uid}/games`), {
                pgn: game.pgn(),
                fen: game.fen(),
                date: serverTimestamp(),
                result: result,
                opponent: 'Stockfish AI'
            });
            console.log("Game saved!");
        } catch (error) {
            console.error("Error saving game:", error);
        }
    }

    function safeMakeMove(move) {
        try {
            console.log("Attempting move:", move);
            // DIRECT MUTATION of the ref instance to preserve history
            const result = game.move(move);

            if (result) {
                console.log("Move valid:", result);
                // Update state to trigger re-render
                setFen(game.fen());
                setHistory(game.history({ verbose: true }));
                return result;
            } else {
                console.warn("Move rejected by chess.js");
            }
        } catch (e) {
            console.warn("Exception in safeMakeMove:", e);
            return null;
        }
        return null;
    }

    // Use a ref to access the latest safeMakeMove inside the engine callback
    // This prevents stale closure issues where the callback uses an old version of 'game'
    const safeMakeMoveRef = useRef(safeMakeMove);

    useEffect(() => {
        safeMakeMoveRef.current = safeMakeMove;
    });

    // --- Fresh TTS Implementation ---
    const { speak, cancel, wakeup } = useChessSpeech();

    // 1. Auto-Speak Effect: "If text is on screen, say it."
    useEffect(() => {
        if (aiThought && aiThought.trim() !== "") {
            speak(aiThought);
        }
    }, [aiThought, speak]);

    const engineRef = React.useRef(null);

    useEffect(() => {
        const newEngine = new StockfishEngine();
        engineRef.current = newEngine;

        // AI Response Handler
        newEngine.onMessage(async (data) => {
            if (data.startsWith("bestmove")) {
                const bestMove = data.split(" ")[1];
                if (bestMove) {
                    const from = bestMove.substring(0, 2);
                    const to = bestMove.substring(2, 4);
                    const promo = bestMove.length > 4 ? bestMove[4] : 'q';

                    // 1. Generate Commentary
                    const currentFen = gameRef.current.fen();
                    const history = gameRef.current.history({ verbose: true });
                    const lastMove = history.length > 0 ? history[history.length - 1].san : null;

                    const thought = await GeminiChessService.getMoveCommentary(currentFen, lastMove, bestMove);
                    setAiThought(thought);
                    // NOTE: speak() is NOT called here anymore. 
                    // It is handled by the useEffect above automatically.

                    setEngineStatus("AI Deciding...");

                    // 2. Wait for user to read/listen (min 2.5s)
                    await new Promise(r => setTimeout(r, 2500));

                    // 3. Animation Sequence
                    // Highlight Source
                    setEngineStatus("AI Moving...");
                    setAnimatingSquare(from);
                    await new Promise(r => setTimeout(r, 600));

                    // Highlight Dest
                    setAnimatingSquare(to);
                    await new Promise(r => setTimeout(r, 600));

                    setAnimatingSquare(null);

                    // 4. Make Move
                    safeMakeMoveRef.current({
                        from: from,
                        to: to,
                        promotion: promo
                    });

                    setAiThought(""); // Clear thought after move
                    setIsThinking(false);
                    setEngineStatus("Your Turn");
                }
            }
        });
        setEngineStatus("AI Ready");

        return () => {
            newEngine.quit();
            engineRef.current = null;
            cancel(); // Stop speaking on unmount
        };
    }, []); // Empty dependency array means init once (but twice in strict mode, correctly handling cleanup)

    useEffect(() => {
        if (game.isGameOver() && !isGameOver) {
            setIsGameOver(true);
            setEngineStatus("Game Over");
            saveGameToFirestore();
        }
    }, [fen, isGameOver]); // Depend on fen instead of game object

    function onSquareClick(square) {
        console.log("Clicked:", square);

        if (game.turn() !== playerColor[0] || isThinking || isGameOver) return;

        // 1. If clicking the same square, deselect
        if (moveFrom === square) {
            setMoveFrom(null);
            setOptionSquares({});
            return;
        }

        // 2. If we have a selected piece (moveFrom), try to move to this new square
        if (moveFrom) {
            const piece = game.get(moveFrom);
            const isPawn = piece && piece.type === 'p';
            const isPromotion = isPawn && (
                (piece.color === 'w' && square[1] === '8') ||
                (piece.color === 'b' && square[1] === '1')
            );

            const move = {
                from: moveFrom,
                to: square,
            };

            if (isPromotion) {
                move.promotion = 'q';
            }

            const result = safeMakeMove(move);
            if (result) {
                // Move successful
                setMoveFrom(null);
                setOptionSquares({});

                // --- Voice Warm-up ---
                // Trigger a silent utterance immediately on user interaction 
                // to ensure browser doesn't block the subsequent AI speech.
                // --- Voice Warm-up ---
                // Trigger a silent utterance immediately on user interaction 
                // to ensure browser doesn't block the subsequent AI speech.
                wakeup();

                triggerAI();
                return;
            }
        }

        // 3. If no move was made (either no previous selection, or invalid move),
        // try to select the piece on the clicked square.
        const piece = game.get(square);
        if (piece && piece.color === playerColor[0]) {
            setMoveFrom(square);

            // Calculate valid moves for highlighting
            const moves = game.moves({ square: square, verbose: true });
            const newOptionSquares = {};

            // Highlight target squares
            moves.forEach((move) => {
                newOptionSquares[move.to] = { isOption: true };
            });
            // Highlight self
            newOptionSquares[square] = { isSelected: true };

            setOptionSquares(newOptionSquares);
        } else {
            // Clicked functionality empty square or opponent piece without a valid move
            setOptionSquares({});
            // AI is triggered automatically by the useEffect below when turn changes
            return;
        }
    }

    // Effect to trigger AI when it's their turn
    useEffect(() => {
        if (!game.isGameOver() &&
            ((game.turn() === 'w' && playerColor === 'black') ||
                (game.turn() === 'b' && playerColor === 'white'))) {

            triggerAI();
        }
    }, [fen, playerColor]); // Trigger on FEN change (move made)

    function triggerAI() {
        if (!engineRef.current) return;

        if (game.isGameOver()) return;
        setIsThinking(true);
        setEngineStatus("AI Thinking...");
        // Add small delay for realism
        setTimeout(() => {
            if (engineRef.current) {
                engineRef.current.evaluatePosition(game.fen(), 800);
            }
        }, 500);
    }

    async function handleVoiceCommand(command) {
        if (isGameOver) return;

        // 1. Try simple regex parser first (immediate response)
        const cleanCmd = command.toLowerCase().replace(/to/g, '').replace(/ /g, '');
        const coords = cleanCmd.match(/^[a-h][1-8][a-h][1-8]$/); // Strict e2e4 check

        if (coords) {
            const move = {
                from: cleanCmd.substring(0, 2),
                to: cleanCmd.substring(2, 4),
                promotion: 'q'
            };
            const result = safeMakeMove(move);
            if (result) {
                triggerAI();
                return;
            }
        }

        // 2. Fallback to Gemini AI for natural language
        setEngineStatus("Processing Speech...");
        const move = await GeminiChessService.getMoveFromNaturalLanguage(command, game.fen());

        if (move) {
            const result = safeMakeMove(move);
            if (result) {
                triggerAI();
            } else {
                setEngineStatus("Invalid Move Interpretation");
            }
        } else {
            setEngineStatus("Could not understand command");
        }
    }

    // --- Custom Board Rendering Logic ---
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    // If player is black, reverse the rendering arrays so 'h1' is bottom-left (or however rotation works)
    // Standard view: White at bottom (ranks 8->1), a->h.
    // Black view: Black at bottom (ranks 1->8), h->a.
    const boardRanks = playerColor === 'white' ? ranks : [...ranks].reverse();
    const boardFiles = playerColor === 'white' ? files : [...files].reverse();

    const renderSquare = (rank, file, isLight) => {
        const square = `${file}${rank}`;
        const piece = game.get(square);
        const isSelected = optionSquares[square]?.isSelected;
        const isOption = optionSquares[square]?.isOption;
        const isAnimating = animatingSquare === square;

        // Base background
        let bgClass = isLight ? "bg-[#ebecd0]" : "bg-[#779556]";

        // Highlights using overlay divs or simple background changes
        // Let's use simple inline styles for highlights to maintain the specific logic
        let overlay = null;
        if (isSelected) {
            bgClass = "bg-[rgba(255,255,0,0.5)]"; // Yellowish highlight
        } else if (isAnimating) {
            bgClass = "bg-[rgba(255,165,0,0.7)] shadow-[inset_0_0_20px_rgba(255,165,0,0.8)] transition-all duration-300"; // Orange highlight for AI animation
        } else if (isOption) {
            // Dot overlay
            overlay = <div className="absolute w-3 h-3 bg-[rgba(0,0,0,0.2)] rounded-full"></div>;
            if (piece) {
                // Capture ring
                overlay = <div className="absolute w-full h-full border-4 border-[rgba(0,0,0,0.2)] rounded-full"></div>;
            }
        }

        return (
            <div
                key={square}
                onClick={() => onSquareClick(square)}
                className={`w-full h-full flex items-center justify-center relative cursor-pointer ${bgClass}`}
                data-square={square}
            >
                {/* File/Rank labels for corners */}
                {file === boardFiles[0] && (
                    <span className={`absolute top-0 left-1 text-[10px] font-bold ${isLight ? "text-[#779556]" : "text-[#ebecd0]"}`}>
                        {rank}
                    </span>
                )}
                {rank === boardRanks[7] && (
                    <span className={`absolute bottom-0 right-1 text-[10px] font-bold ${isLight ? "text-[#779556]" : "text-[#ebecd0]"}`}>
                        {file}
                    </span>
                )}

                {/* Render Piece */}
                {piece && (
                    <img
                        src={PIECE_IMAGES[piece.color][piece.type]}
                        alt={`${piece.color}${piece.type}`}
                        className="w-[85%] h-[85%] select-none pointer-events-none" // prevent image drag interfering with click
                    />
                )}

                {/* Move Hint Overlay */}
                {overlay}
            </div>
        );
    };

    const renderBoard = () => {
        const squares = [];
        for (let r = 0; r < 8; r++) {
            for (let f = 0; f < 8; f++) {
                const rank = boardRanks[r];
                const file = boardFiles[f];
                const isLight = (r + f) % 2 === 0;
                squares.push(renderSquare(rank, file, isLight));
            }
        }
        return squares;
    };


    return (
        <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Grandmaster Chess
                    </h1>
                    <p className="text-slate-400 text-sm">Powered by Stockfish 16 • {engineStatus}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${engineStatus === "Your Turn" ? "bg-green-500/20 text-green-400" :
                        engineStatus.includes("Thinking") ? "bg-blue-500/20 text-blue-400 animate-pulse" :
                            "bg-slate-700 text-slate-400"
                        }`}>
                        {engineStatus}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">

                {/* Main Board Area */}
                <div className="lg:col-span-8 flex justify-center relative">
                    {/* AI Thought Bubble */}
                    {aiThought && (
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-slow">
                            <div className="bg-white text-slate-900 px-6 py-3 rounded-2xl shadow-xl border-2 border-blue-400 relative max-w-sm">
                                <p className="font-bold text-sm italic">"{aiThought}"</p>
                                {/* Triangle pointer */}
                                <div className="absolute w-4 h-4 bg-white border-b-2 border-r-2 border-blue-400 rotate-45 -bottom-2 left-1/2 -translate-x-1/2"></div>
                            </div>
                        </div>
                    )}
                    <div className="relative aspect-square w-full max-w-[600px] shadow-2xl rounded-lg overflow-hidden border-4 border-slate-700">
                        {/* 8x8 Grid */}
                        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                            {renderBoard()}
                        </div>

                        {/* Result Overlay */}
                        {isGameOver && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-600 shadow-xl text-center">
                                    <h2 className="text-3xl font-bold mb-2">Game Over</h2>
                                    <p className="text-xl mb-6 text-slate-300">
                                        {game.isCheckmate() ? "Checkmate!" : "Draw"}
                                    </p>
                                    <button
                                        onClick={() => {
                                            game.reset();
                                            setFen(game.fen());
                                            setHistory([]);
                                            setIsGameOver(false);
                                            setMoveFrom(null);
                                            setOptionSquares({});
                                            setPlayerColor('white');
                                            setEngineStatus("AI Ready");
                                        }}
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-all"
                                    >
                                        Play Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="lg:col-span-4 space-y-4">

                    {/* Move History */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 h-[300px] flex flex-col">
                        <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Move History</h3>
                        <MoveHistory moves={history} />
                    </div>

                    {/* Controls */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 grid grid-cols-2 gap-3">
                        <button
                            className="bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm transition-colors"
                            onClick={() => {
                                // Reset the game instance directly
                                game.reset();
                                // Update state to reflect reset
                                setFen(game.fen());
                                setHistory([]);
                                setIsGameOver(false);
                                setMoveFrom(null);
                                setOptionSquares({});
                                setEngineStatus("AI Ready");
                            }}
                        >
                            New Game
                        </button>
                        <button
                            className="bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm transition-colors"
                            onClick={() => {
                                setPlayerColor(playerColor === 'white' ? 'black' : 'white');
                                setMoveFrom(null);
                                setOptionSquares({});

                                if (game.fen() === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
                                    if (playerColor === 'white') {
                                        triggerAI();
                                    }
                                }
                            }}
                        >
                            Switch Sides
                        </button>
                    </div>

                    {/* Features */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Voice Settings</h3>
                        <div className="flex flex-col gap-3">
                            <VoiceControl onCommand={handleVoiceCommand} isListening={!isGameOver} />
                        </div>
                    </div>

                </div>
            </div>

            {/* Gemini Integration (Hidden/Background) */}
            <div className="hidden">
                {/* <GeminiChessService
                    gameState={fen}
                    onAdvice={(advice) => console.log("Gemini Advice:", advice)}
                /> */}
            </div>
        </div>
    );
}
