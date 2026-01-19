import React, { useState } from 'react';
import SpinningWheel from '../components/modules/games/SpinningWheel';
import DiceGame from '../components/modules/games/DiceGame';
import SustainabilityMission from '../components/modules/games/SustainabilityMission';
import './Games.css';

const GAMES_LIST = [
    { id: 'premier', title: 'Retail Premier League', icon: 'workspace_premium', component: SpinningWheel },
    { id: 'ramadan', title: 'Kindness Quest', icon: 'volunteer_activism', component: DiceGame },
    { id: 'green', title: 'Sustainability', icon: 'eco', component: SustainabilityMission },
];

export default function Games() {
    const [activeGame, setActiveGame] = useState('premier');

    const ActiveComponent = GAMES_LIST.find(g => g.id === activeGame)?.component || SpinningWheel;

    return (
        <div className="games-page-container fade-in">
            <div className="games-header">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-medium text-brand-navy mb-1 md:mb-2">Gamified Insights</h1>
                    <p className="text-slate-500 text-sm md:text-lg font-light">Information made fun and interactive.</p>
                </div>
            </div>

            <div className="games-layout">
                <div className="games-sidebar">
                    {GAMES_LIST.map((game) => (
                        <button
                            key={game.id}
                            className={`game-nav-item ${activeGame === game.id ? 'active' : ''}`}
                            onClick={() => setActiveGame(game.id)}
                        >
                            <span className="material-symbols-outlined">{game.icon}</span>
                            <span className="game-nav-label">{game.title}</span>
                        </button>
                    ))}
                </div>

                <div className="game-display-area">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
}
