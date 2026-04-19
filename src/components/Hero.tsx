import { useEffect, useState, forwardRef } from 'react';
import './Hero.css';

const Hero = forwardRef<HTMLElement, {}>((_, ref) => {
    const [petals, setPetals] = useState<{ id: number; left: number; width: number; height: number; duration: number; delay: number; bg: string; borderRad: string }[]>([]);

    useEffect(() => {
        const generatedPetals = [];
        for (let i = 0; i < 18; i++) {
            generatedPetals.push({
                id: i,
                left: Math.random() * 100,
                width: 7 + Math.random() * 10,
                height: 11 + Math.random() * 14,
                duration: 9 + Math.random() * 14,
                delay: Math.random() * 10,
                bg:
                    Math.random() > 0.5
                        ? 'linear-gradient(135deg,rgba(201,168,76,.35),rgba(212,175,55,.15))'
                        : 'linear-gradient(135deg,rgba(139,26,46,.25),rgba(139,26,46,.1))',
                borderRad: Math.random() > 0.5 ? '50% 0' : '0 50%',
            });
        }
        setPetals(generatedPetals);
    }, []);

    return (
        <section id="hero" ref={ref}>
            <div className="hero-ring"></div>
            <div className="hero-ring"></div>
            <div className="hero-ring"></div>

            {petals.map((p) => (
                <div
                    key={p.id}
                    className="petal"
                    style={{
                        left: `${p.left}%`,
                        width: `${p.width}px`,
                        height: `${p.height}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        background: p.bg,
                        borderRadius: p.borderRad,
                    }}
                ></div>
            ))}

            <img className="saukele-figure" src="/images/saukele-right.svg" alt="" aria-hidden="true" />
            <img className="saukele-figure-left" src="/images/saukele-left.svg" alt="" aria-hidden="true" />

            <div className="hero-content">
                <h1 className="hero-name">Yelnaz</h1>
                <h2 className="hero-ceremony">Qyz uzatu</h2>
                <div className="hero-divider" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="/images/photo_2026-04-17_03-12-42.svg" alt="" aria-hidden="true" style={{ height: '120px', width: 'auto' }} />
                </div>
                <div className="hero-date">2026 жылдың 1 шілдесі</div>
            </div>

            <div className="hero-scroll">
                <span>Төмен қарай</span>
                <div className="scroll-bar"></div>
            </div>
        </section>
    );
});

export default Hero;
