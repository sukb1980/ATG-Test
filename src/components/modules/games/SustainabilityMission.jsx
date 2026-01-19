import React from 'react';
import './SustainabilityMission.css';

const SUSTAINABILITY_METRICS = [
    { title: 'Paper Wastage', value: '15%', goal: '5%', icon: 'description', color: '#ff6b6b', desc: 'Lower is better' },
    { title: 'Energy Consumed', value: '420 kWh', goal: '350 kWh', icon: 'bolt', color: '#ffd700', desc: 'Monthly store average' },
    { title: 'Recycling Rate', value: '68%', goal: '85%', icon: 'recycling', color: '#4ecdc4', desc: 'Targeting zero waste' },
];

export default function SustainabilityMission() {
    return (
        <div className="sustainability-container">
            <h2 className="game-title">Sustainability Mission</h2>
            <div className="metrics-grid">
                {SUSTAINABILITY_METRICS.map((metric, index) => (
                    <div key={index} className="metric-card" style={{ '--accent': metric.color }}>
                        <div className="metric-header">
                            <span className="material-symbols-outlined metric-icon">{metric.icon}</span>
                            <h3>{metric.title}</h3>
                        </div>
                        <div className="metric-body">
                            <div className="value-display">
                                <span className="current-value">{metric.value}</span>
                                <span className="goal-label">Goal: {metric.goal}</span>
                            </div>
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: index === 0 ? '75%' : index === 1 ? '85%' : '68%' }}
                                ></div>
                            </div>
                            <p className="metric-desc">{metric.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mission-footer">
                <p>Every small step counts towards a greener future.</p>
                <button className="pledge-button">Take the Pledge</button>
            </div>
        </div>
    );
}
