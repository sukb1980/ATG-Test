import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useUser } from '../../../context/UserContext';

export default function PastMatches() {
    const { user } = useUser();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        const q = query(
            collection(db, `users/${user.uid}/games`),
            orderBy('date', 'desc'),
            limit(10)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const games = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMatches(games);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching games:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (!user) return <div className="text-slate-500 text-xs mt-2">Sign in to see history.</div>;

    return (
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4 h-64 overflow-hidden flex flex-col">
            <h3 className="font-display font-bold text-white mb-2 text-sm uppercase">Recent Matches</h3>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                {loading ? (
                    <div className="text-slate-400 text-xs">Loading...</div>
                ) : matches.length === 0 ? (
                    <div className="text-slate-400 text-xs">No matches found.</div>
                ) : (
                    <div className="space-y-2">
                        {matches.map(game => (
                            <div key={game.id} className="bg-white/5 p-2 rounded text-xs hover:bg-white/10 transition-colors cursor-default">
                                <div className="flex justify-between text-slate-300 mb-1">
                                    <span>{new Date(game.date?.toDate()).toLocaleDateString()}</span>
                                    <span className={game.result === 'Win' ? 'text-green-400' : 'text-slate-400'}>
                                        {game.result}
                                    </span>
                                </div>
                                <div className="text-slate-500 truncate font-mono">
                                    {game.pgn ? game.pgn.substring(0, 20) + "..." : "No moves"}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
