import React, { useRef, useEffect } from 'react';

export default function MoveHistory({ moves = [] }) {
    const scrollRef = useRef(null);

    // Auto-scroll to bottom when moves update
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [moves]);

    // Format moves into pairs (White, Black)
    const movePairs = [];
    const safeMoves = Array.isArray(moves) ? moves : []; // Added defensive check
    for (let i = 0; i < safeMoves.length; i += 2) {
        movePairs.push({
            number: Math.floor(i / 2) + 1,
            white: safeMoves[i],
            black: safeMoves[i + 1] || null
        });
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col h-64 md:h-96">
            <div className="bg-brand-navy/50 p-3 border-b border-white/10">
                <h3 className="text-white font-display font-bold text-sm uppercase tracking-wider">Move History</h3>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <table className="w-full text-sm text-slate-300">
                    <thead>
                        <tr className="text-xs text-slate-500 uppercase text-left">
                            <th className="py-1 pl-2 w-10">#</th>
                            <th className="py-1">White</th>
                            <th className="py-1">Black</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movePairs.map((pair) => (
                            <tr key={pair.number} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                <td className="py-2 pl-2 font-mono text-slate-500">{pair.number}.</td>
                                <td className="py-2 font-medium text-white">
                                    <span className="mr-2">{pair.white.san}</span>
                                    <span className="text-xs text-slate-500">({pair.white.from}→{pair.white.to})</span>
                                </td>
                                <td className="py-2 font-medium text-slate-300">
                                    {pair.black ? (
                                        <>
                                            <span className="mr-2">{pair.black.san}</span>
                                            <span className="text-xs text-slate-500">({pair.black.from}→{pair.black.to})</span>
                                        </>
                                    ) : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {moves.length === 0 && (
                    <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                        No moves yet. Start the game!
                    </div>
                )}
            </div>
        </div>
    );
}
