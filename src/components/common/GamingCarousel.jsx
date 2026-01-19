import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GamingCarousel.css';

const GAMES = [
    {
        id: 'retail-premier',
        title: 'Retail Premier League',
        desc: 'Spin for Sales & NPS Metrics',
        icon: 'workspace_premium',
        color: 'from-pink-500 to-rose-500',
        image: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'ramadan-kindness',
        title: 'Ramadan Kindness Quest',
        desc: 'Roll the Dice for Community',
        icon: 'volunteer_activism',
        color: 'from-emerald-500 to-teal-500',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'sustainability-mission',
        title: 'Sustainability Mission',
        desc: 'Track Our Green Impact',
        icon: 'eco',
        color: 'from-blue-500 to-cyan-500',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400'
    }
];

export default function GamingCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const next = () => setCurrentIndex((prev) => (prev + 1) % GAMES.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + GAMES.length) % GAMES.length);

    return (
        <div className="gaming-carousel-wrapper">
            <div className="carousel-header">
                <h2 className="text-xl md:text-2xl font-display text-brand-navy border-l-4 border-brand-orange pl-4">Gamified Insights</h2>
                <div className="carousel-controls">
                    <button onClick={prev} className="control-btn"><span className="material-symbols-outlined">chevron_left</span></button>
                    <button onClick={next} className="control-btn"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
            </div>

            <div className="carousel-view">
                <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {GAMES.map((game, index) => (
                        <div key={game.id} className="carousel-slide">
                            <div className="game-card" onClick={() => navigate('/games')}>
                                <div className="game-image" style={{ backgroundImage: `url(${game.image})` }}>
                                    <div className={`game-overlay bg-gradient-to-br ${game.color} opacity-60`}></div>
                                    <div className="game-content">
                                        <div className="game-icon-badge">
                                            <span className="material-symbols-outlined">{game.icon}</span>
                                        </div>
                                        <div className="game-text">
                                            <h3 className="game-title-text">{game.title}</h3>
                                            <p className="game-desc-text">{game.desc}</p>
                                        </div>
                                        <span className="play-badge">Play Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="carousel-indicators">
                {GAMES.map((_, i) => (
                    <div
                        key={i}
                        className={`indicator ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(i)}
                    ></div>
                ))}
            </div>
        </div>
    );
}
