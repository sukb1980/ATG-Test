import React, { useState } from 'react';
import './SpinningWheel.css';

const METRICS = [
    { label: 'Sales Growth %', color: '#FF6B6B', value: '+12.5%' },
    { label: 'Conversion Rate', color: '#4ECDC4', value: '4.2%' },
    { label: 'Mystery Audit', color: '#45B7D1', value: '92/100' },
    { label: 'NPS Score', color: '#96CEB4', value: '78' },
    { label: 'VM Compliance', color: '#FFEEAD', value: '98%' },
    { label: 'Inventory Turn', color: '#D4A5A5', value: '6.5x' },
];

export default function SpinningWheel() {
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);

    const spin = () => {
        if (spinning) return;

        setSpinning(true);
        setResult(null);

        const extraDegrees = Math.floor(Math.random() * 360) + 1440; // At least 4 full spins
        const newRotation = rotation + extraDegrees;
        setRotation(newRotation);

        setTimeout(() => {
            setSpinning(false);
            const actualDegree = newRotation % 360;
            const index = Math.floor((360 - actualDegree) / (360 / METRICS.length)) % METRICS.length;
            setResult(METRICS[index]);
        }, 4000);
    };

    return (
        <div className="wheel-container">
            <h2 className="game-title">Retail Premier League</h2>
            <div className="wheel-wrapper">
                <div className="wheel-pointer"></div>
                <div
                    className={`wheel ${spinning ? 'spinning' : ''}`}
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {METRICS.map((metric, i) => (
                        <div
                            key={i}
                            className="wheel-segment"
                            style={{
                                '--i': i,
                                '--clr': metric.color,
                                '--total': METRICS.length
                            }}
                        >
                            <span className="segment-text">{metric.label}</span>
                        </div>
                    ))}
                </div>
                <button className="spin-button" onClick={spin} disabled={spinning}>
                    {spinning ? '...' : 'SPIN'}
                </button>
            </div>

            {result && (
                <div className="result-popup fade-in">
                    <h3>{result.label}</h3>
                    <div className="result-value">{result.value}</div>
                    <p>Top Performance this month!</p>
                </div>
            )}
        </div>
    );
}
