import React, { useState } from 'react';
import './DiceGame.css';

const QUESTS = [
    { label: 'Donations Collected', value: '$12,450', icon: 'volunteer_activism' },
    { label: 'Trees Planted', value: '450', icon: 'park' },
    { label: 'Meals Distributed', value: '1,200', icon: 'restaurant' },
    { label: 'Volunteer Hours', value: '320', icon: 'schedule' },
    { label: 'Water Bottles Recycled', value: '5,000', icon: 'recycling' },
    { label: 'Kindness Notes Shared', value: '850', icon: 'favorite' },
];

export default function DiceGame() {
    const [rolling, setRolling] = useState(false);
    const [diceValue, setDiceValue] = useState(1);
    const [result, setResult] = useState(null);

    const rollDice = () => {
        if (rolling) return;
        setRolling(true);
        setResult(null);

        // Randomly pick a quest (dice has 6 sides)
        const newValue = Math.floor(Math.random() * 6) + 1;

        setTimeout(() => {
            setDiceValue(newValue);
            setRolling(false);
            setResult(QUESTS[newValue - 1]);
        }, 1500);
    };

    return (
        <div className="dice-container">
            <h2 className="game-title">Ramadan Kindness Quest</h2>

            <div className="dice-scene">
                <div className={`dice ${rolling ? 'rolling' : ''}`} data-side={diceValue}>
                    <div className="side one">
                        <div className="dot"></div>
                    </div>
                    <div className="side two">
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <div className="side three">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <div className="side four">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <div className="side five">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <div className="side six">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            </div>

            <button className="roll-button" onClick={rollDice} disabled={rolling}>
                {rolling ? 'ROLLING...' : 'ROLL DICE'}
            </button>

            {result && (
                <div className="quest-result fade-in">
                    <span className="material-symbols-outlined quest-icon">{result.icon}</span>
                    <h3>{result.label}</h3>
                    <div className="quest-value">{result.value}</div>
                    <p>Subhan Allah! Keep it up!</p>
                </div>
            )}
        </div>
    );
}
