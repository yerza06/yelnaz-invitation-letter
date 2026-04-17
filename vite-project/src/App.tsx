import { useState, useEffect, useRef, FormEvent } from 'react';
import './index.css';

function App() {
    const heroRef = useRef<HTMLElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', min: '00', sec: '00' });
    const [activeSection, setActiveSection] = useState('hero');

    const [attending, setAttending] = useState('');
    const [spouse, setSpouse] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({ name: false, attending: false, spouse: false });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Petals generator
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
        
        // Scroll reveal
        const revealObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add('visible');
                });
            },
            { threshold: 0.14 }
        );
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => revealObs.observe(el));

        // Nav dots active observe
        const SECTIONS = ['hero', 'invitation', 'countdown', 'details', 'location', 'rsvp'];
        const secObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (!e.isIntersecting) return;
                    if (SECTIONS.includes(e.target.id)) {
                        setActiveSection(e.target.id);
                    }
                });
            },
            { threshold: 0.45 }
        );
        SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) secObs.observe(el);
        });

        return () => {
            revealObs.disconnect();
            secObs.disconnect();
        };
    }, []);

    // Countdown
    useEffect(() => {
        const TARGET = new Date('2026-07-01T18:00:00').getTime();
        const pad = (n: number) => String(n).padStart(2, '0');

        const tick = () => {
            const diff = TARGET - Date.now();
            if (diff <= 0) {
                setTimeLeft({ days: '00', hours: '00', min: '00', sec: '00' });
                return;
            }
            setTimeLeft({
                days: pad(Math.floor(diff / 86400000)),
                hours: pad(Math.floor((diff % 86400000) / 3600000)),
                min: pad(Math.floor((diff % 3600000) / 60000)),
                sec: pad(Math.floor((diff % 60000) / 1000)),
            });
        };
        tick();
        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleMusicToggle = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.volume = 0.45;
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const nameVal = name.trim();
        let valid = true;
        const newErrors = { name: false, attending: false, spouse: false };

        if (!nameVal) {
            newErrors.name = true;
            valid = false;
        }
        if (!attending) {
            newErrors.attending = true;
            valid = false;
        }
        if (attending === 'yes' && !spouse) {
            newErrors.spouse = true;
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) return;

        let msg = '';
        if (attending === 'yes') {
            const withSpouse = spouse === 'with';
            msg = `Сәлем! Мен ${nameVal}.\n\nYelnaz'дың Қыз ұзату тойына (1 шілде 2026) қатысамын.`;
            msg += withSpouse
                ? '\nЖұбайыммен бірге келемін. (2 адам)'
                : '\nЖалғыз келемін. (1 адам)';
        } else {
            msg = `Сәлем! Мен ${nameVal}.\n\nӨкінішке орай, Yelnaz'дың Қыз ұзату тойына (1 шілде 2026) келе алмаймын.`;
        }

        const url = `https://wa.me/77071900557?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        setIsSubmitted(true);
    };

    return (
        <>
            <audio
                id="bg-audio"
                loop
                preload="none"
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlaying={() => setIsPlaying(true)}
            >
                <source src="/Қызға тілек - Қарақат Әбілдина.m4a" type="audio/mp4" />
            </audio>

            <button
                id="music-btn"
                aria-label={isPlaying ? 'Музыканы тоқтату' : 'Музыканы қосу'}
                className={isPlaying ? 'playing' : ''}
                onClick={handleMusicToggle}
            >
                <svg
                    id="icon-play"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ display: isPlaying ? 'none' : 'block' }}
                >
                    <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                <svg
                    id="icon-pause"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ display: isPlaying ? 'block' : 'none' }}
                >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                <span className="music-tip">Қызға тілек — Қарақат Әбілдина</span>
            </button>

            <nav id="nav-dots">
                {['hero', 'invitation', 'countdown', 'details', 'location', 'rsvp'].map((id) => (
                    <div
                        key={id}
                        className={`nd ${activeSection === id ? 'active' : ''}`}
                        onClick={() => scrollTo(id)}
                        title={id}
                    ></div>
                ))}
            </nav>

            <section id="hero" ref={heroRef}>
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
                    <h2 className="hero-ceremony">Қыз ұзату</h2>
                    <div className="hero-divider">
                        <div className="ornament-line">
                            <img className="ornament-line" src="/images/photo_2026-04-17_03-12-42.svg" alt="" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="hero-date">2026 жылдың 1 шілдесі</div>
                </div>

                <div className="hero-scroll">
                    <span>Төмен қарай</span>
                    <div className="scroll-bar"></div>
                </div>
            </section>

            <section id="invitation">
                <div className="invitation-inner">
                    <span className="section-eyebrow reveal">Шақыру хат</span>
                    <h2
                        className="section-title reveal"
                        style={{ textAlign: 'center', fontSize: 'clamp(22px, 4.5vw, 40px)', lineHeight: 1.45 }}
                    >
                        Құрметті ағайын-туыс, бауырлар,<br /><em>құда-жекжат, нағашы-жиен, бөлелер,</em><br />әріптестер және дос-жарандар!
                    </h2>

                    <p className="inv-text reveal">
                        Жүрегімізге толы қуаныш бен шаттықпен<br />
                        Сізді <strong>Елназдың</strong> қыз ұзату тойына<br />
                        шақырамыз.
                    </p>

                    <p className="inv-note reveal">
                        Бұл ерекше кеш — біздің сүйікті қызымыздың<br />
                        жас отау иесі болар алдындағы ең жарқын<br />
                        және ең маңызды кештердің бірі.
                    </p>

                    <p className="inv-note reveal">
                        Сіздің болуыңыз бізге зор қуаныш<br />
                        және бата-береке әкеледі.
                    </p>

                    <div className="ornament-line reveal" style={{ marginTop: '44px' }}>
                        <svg width="22" height="22" viewBox="0 0 22 22">
                            <path d="M11 1 L21 11 L11 21 L1 11 Z" fill="#C9A84C" opacity=".3" />
                            <path d="M11 5 L17 11 L11 17 L5 11 Z" fill="#C9A84C" opacity=".55" />
                            <circle cx="11" cy="11" r="2.5" fill="#8B1A2E" opacity=".45" />
                        </svg>
                    </div>

                    <p className="inv-signature reveal">— Абылай және Айнұр —</p>
                </div>
            </section>

            <section id="countdown">
                <div className="countdown-inner">
                    <img className="kz-ornament reveal" src="/images/kz-ornament-heart.svg" alt="" aria-hidden="true" />
                    <span className="section-eyebrow reveal">Мерекеге дейін</span>
                    <h2 className="section-title reveal">Шілде<br /><em>2026</em></h2>
                    <div className="cal reveal">
                        <div className="cal-head">
                            <div className="cal-dow">Дс</div>
                            <div className="cal-dow">Сс</div>
                            <div className="cal-dow">Ср</div>
                            <div className="cal-dow">Бс</div>
                            <div className="cal-dow">Жм</div>
                            <div className="cal-dow cal-dow-we">Сб</div>
                            <div className="cal-dow cal-dow-we">Жс</div>
                        </div>
                        <div className="cal-grid">
                            <div className="cal-day empty"></div>
                            <div className="cal-day empty"></div>
                            <div className="cal-day active">
                                <span className="cal-day-num">1</span>
                                <span className="cal-day-mark">Той</span>
                            </div>
                            <div className="cal-day">2</div>
                            <div className="cal-day">3</div>
                            <div className="cal-day cal-day-we">4</div>
                            <div className="cal-day cal-day-we">5</div>
                            <div className="cal-day">6</div>
                            <div className="cal-day">7</div>
                            <div className="cal-day">8</div>
                            <div className="cal-day">9</div>
                            <div className="cal-day">10</div>
                            <div className="cal-day cal-day-we">11</div>
                            <div className="cal-day cal-day-we">12</div>
                            <div className="cal-day">13</div>
                            <div className="cal-day">14</div>
                            <div className="cal-day">15</div>
                            <div className="cal-day">16</div>
                            <div className="cal-day">17</div>
                            <div className="cal-day cal-day-we">18</div>
                            <div className="cal-day cal-day-we">19</div>
                            <div className="cal-day">20</div>
                            <div className="cal-day">21</div>
                            <div className="cal-day">22</div>
                            <div className="cal-day">23</div>
                            <div className="cal-day">24</div>
                            <div className="cal-day cal-day-we">25</div>
                            <div className="cal-day cal-day-we">26</div>
                            <div className="cal-day">27</div>
                            <div className="cal-day">28</div>
                            <div className="cal-day">29</div>
                            <div className="cal-day">30</div>
                            <div className="cal-day">31</div>
                        </div>
                    </div>
                    <p className="cal-caption reveal">2026 жылдың 1 шілдесі · Сәрсенбі</p>
                    <div className="cd-grid reveal">
                        <div className="cd-item">
                            <div className="cd-num" id="cd-days">{timeLeft.days}</div>
                            <span className="cd-label">Күн</span>
                        </div>
                        <div className="cd-item">
                            <div className="cd-num" id="cd-hours">{timeLeft.hours}</div>
                            <span className="cd-label">Сағат</span>
                        </div>
                        <div className="cd-item">
                            <div className="cd-num" id="cd-min">{timeLeft.min}</div>
                            <span className="cd-label">Минут</span>
                        </div>
                        <div className="cd-item">
                            <div className="cd-num" id="cd-sec">{timeLeft.sec}</div>
                            <span className="cd-label">Секунд</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="details">
                <div className="details-inner">
                    <h2 className="program-title reveal">Тойдың бағдарламасы</h2>
                    <div className="program-timeline">
                        <div className="program-row reveal">
                            <time className="program-time">17:00</time>
                            <p className="program-desc">Қонақтардың жиналуы</p>
                        </div>
                        <div className="program-divider" aria-hidden="true"></div>
                        <div className="program-row reveal">
                            <time className="program-time">18:00</time>
                            <p className="program-desc">Тойдың басталуы</p>
                        </div>
                        <div className="program-divider" aria-hidden="true"></div>
                        <div className="program-row reveal">
                            <time className="program-time">23:00</time>
                            <p className="program-desc">Шығарып салу</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="location">
                <div className="location-inner">
                    <span className="section-eyebrow reveal">Мекенжай</span>
                    <h2 className="section-title reveal">Қалай<br /><em>жетуге болады</em></h2>
                    <div className="loc-grid">
                        <div className="loc-map reveal-left">
                            <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
                                <rect width="320" height="320" fill="#F5EDE0" />
                                <line x1="0" y1="106" x2="320" y2="106" stroke="#C9A84C" strokeWidth=".5" opacity=".2" />
                                <line x1="0" y1="213" x2="320" y2="213" stroke="#C9A84C" strokeWidth=".5" opacity=".2" />
                                <line x1="106" y1="0" x2="106" y2="320" stroke="#C9A84C" strokeWidth=".5" opacity=".2" />
                                <line x1="213" y1="0" x2="213" y2="320" stroke="#C9A84C" strokeWidth=".5" opacity=".2" />
                                <line x1="0" y1="160" x2="320" y2="160" stroke="#C9A84C" strokeWidth="2.5" opacity=".25" />
                                <line x1="160" y1="0" x2="160" y2="320" stroke="#C9A84C" strokeWidth="2.5" opacity=".25" />
                                <line x1="0" y1="220" x2="320" y2="220" stroke="#C9A84C" strokeWidth="1.5" opacity=".15" />
                                <line x1="80" y1="0" x2="80" y2="320" stroke="#C9A84C" strokeWidth="1.5" opacity=".15" />
                                <rect x="110" y="110" width="50" height="40" rx="2" fill="#C9A84C" opacity=".07" />
                                <rect x="170" y="170" width="40" height="35" rx="2" fill="#8B1A2E" opacity=".05" />
                                <path d="M160 108 C150 108 140 118 140 128 C140 142 160 162 160 162 C160 162 180 142 180 128 C180 118 170 108 160 108Z" fill="#8B1A2E" opacity=".85" />
                                <circle cx="160" cy="128" r="6" fill="white" opacity=".9" />
                                <text x="160" y="178" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fill="#2C1810" opacity=".5" letterSpacing="2.5">
                                    АЛТЫН ОРДА
                                </text>
                            </svg>
                            <span className="loc-map-label" style={{ position: 'relative', zIndex: 1, padding: '12px' }}>Карта</span>
                        </div>
                        <div className="loc-info reveal-right">
                            <div className="loc-item">
                                <svg className="loc-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                                    <path d="M16 3C10.5 3 6 7.5 6 13c0 8.5 10 16 10 16s10-7.5 10-16c0-5.5-4.5-10-10-10z" />
                                    <circle cx="16" cy="13" r="3.5" />
                                </svg>
                                <div>
                                    <p className="loc-label">Мекенжай</p>
                                    <p className="loc-value">«Алтын Орда» банкет залы<br />Абай даңғылы, 42</p>
                                </div>
                            </div>
                            <div className="loc-item">
                                <svg className="loc-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                                    <circle cx="16" cy="16" r="12" />
                                    <path d="M16 9v7l5 5" />
                                </svg>
                                <div>
                                    <p className="loc-label">Уақыты</p>
                                    <p className="loc-value">18:00 · 1 шілде 2026</p>
                                </div>
                            </div>
                            <div className="loc-item">
                                <svg className="loc-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                                    <rect x="4" y="20" width="24" height="8" rx="1.5" />
                                    <path d="M8 20v-6a8 8 0 0116 0v6" />
                                    <circle cx="16" cy="24" r="1.5" fill="currentColor" />
                                </svg>
                                <div>
                                    <p className="loc-label">Парковка</p>
                                    <p className="loc-value">Тегін тұрақ бар · 50+ орын</p>
                                </div>
                            </div>
                            <div className="loc-item">
                                <svg className="loc-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                                    <path d="M4 8h24M4 16h16M4 24h10" />
                                </svg>
                                <div>
                                    <p className="loc-label">Жол нұсқаулары</p>
                                    <p className="loc-value">Орталық саябақтан<br />5 минут жаяу жүру</p>
                                </div>
                            </div>
                            <a href="https://2gis.kz" className="btn-gold reveal">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <path d="M12 2C7.6 2 4 5.6 4 10c0 7 8 14 8 14s8-7 8-14c0-4.4-3.6-8-8-8z" />
                                    <circle cx="12" cy="10" r="2.5" />
                                </svg>
                                Картаны ашу
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="rsvp">
                <div className="rsvp-inner">
                    <svg className="reveal" style={{ display: 'block', margin: '0 auto 36px', opacity: 0.22 }} width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <path d="M36 2 L70 36 L36 70 L2 36 Z" stroke="#C9A84C" strokeWidth="1" />
                        <path d="M36 12 L60 36 L36 60 L12 36 Z" stroke="#C9A84C" strokeWidth="1" />
                        <path d="M36 22 L50 36 L36 50 L22 36 Z" fill="#C9A84C" opacity=".25" />
                        <circle cx="36" cy="36" r="5" fill="#C9A84C" opacity=".5" />
                    </svg>

                    <span className="section-eyebrow reveal">Растаңыз</span>
                    <h2 className="section-title reveal">Келетіндігіңізді<br /><em>білдіріңіз</em></h2>

                    <p className="rsvp-text reveal">
                        Шараға қатысу мүмкіндігіңіз туралы<br />
                        <strong>20 маусымға дейін</strong> хабарлауыңызды өтінеміз
                    </p>

                    {!isSubmitted ? (
                        <form id="rsvp-form" className="rsvp-form reveal" noValidate onSubmit={handleSubmit}>
                            <div className="rf-field">
                                <label className="rf-label" htmlFor="rf-name">Атыңыз</label>
                                <input
                                    className={`rf-input ${errors.name ? 'error' : ''}`}
                                    id="rf-name"
                                    type="text"
                                    placeholder="Аты-жөніңізді жазыңыз"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) setErrors({ ...errors, name: false });
                                    }}
                                />
                                <span className={`rf-error ${errors.name ? 'show' : ''}`} id="rf-name-err">Атыңызды жазыңыз</span>
                            </div>

                            <div className="rf-field">
                                <label className="rf-label">Қатысуыңыз</label>
                                <div className="rf-radio-group">
                                    <label className="rf-radio">
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="yes"
                                            checked={attending === 'yes'}
                                            onChange={(e) => {
                                                setAttending(e.target.value);
                                                if (errors.attending) setErrors({ ...errors, attending: false });
                                            }}
                                        />
                                        <span className="rf-radio-box">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        <span className="rf-radio-text">Келемін</span>
                                    </label>
                                    <label className="rf-radio">
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="no"
                                            checked={attending === 'no'}
                                            onChange={(e) => {
                                                setAttending(e.target.value);
                                                setSpouse('');
                                                if (errors.attending) setErrors({ ...errors, attending: false });
                                            }}
                                        />
                                        <span className="rf-radio-box">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </span>
                                        <span className="rf-radio-text">Келе алмаймын</span>
                                    </label>
                                </div>
                                <span className={`rf-error ${errors.attending ? 'show' : ''}`} id="rf-att-err">Таңдаңыз</span>
                            </div>

                            {attending === 'yes' && (
                                <div className="rf-field rf-spouse-wrap" id="rf-spouse-wrap">
                                    <label className="rf-label">Жолдасыңызбен</label>
                                    <div className="rf-radio-group">
                                        <label className="rf-radio">
                                            <input
                                                type="radio"
                                                name="spouse"
                                                value="with"
                                                checked={spouse === 'with'}
                                                onChange={(e) => {
                                                    setSpouse(e.target.value);
                                                    if (errors.spouse) setErrors({ ...errors, spouse: false });
                                                }}
                                            />
                                            <span className="rf-radio-box">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                                    <path d="M16 3.13a4 4 0 010 7.75" />
                                                </svg>
                                            </span>
                                            <span className="rf-radio-text">Жұбайыммен келемін</span>
                                        </label>
                                        <label className="rf-radio">
                                            <input
                                                type="radio"
                                                name="spouse"
                                                value="alone"
                                                checked={spouse === 'alone'}
                                                onChange={(e) => {
                                                    setSpouse(e.target.value);
                                                    if (errors.spouse) setErrors({ ...errors, spouse: false });
                                                }}
                                            />
                                            <span className="rf-radio-box">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </span>
                                            <span className="rf-radio-text">Жалғыз келемін</span>
                                        </label>
                                    </div>
                                    <span className={`rf-error ${errors.spouse ? 'show' : ''}`} id="rf-spouse-err">Таңдаңыз</span>
                                </div>
                            )}

                            <button type="submit" className="rf-submit" id="rf-submit">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp арқылы жіберу
                            </button>
                        </form>
                    ) : (
                        <div className="rsvp-success" id="rsvp-success">
                            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                                <circle cx="26" cy="26" r="25" stroke="#C9A84C" strokeWidth="1.5" opacity=".5" />
                                <polyline points="15,27 22,34 37,19" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="rsvp-success-title">Рахмет!</p>
                            <p className="rsvp-success-text">Хабарыңыз жіберілді.<br />Сізді той үстелінде күтеміз!</p>
                        </div>
                    )}
                </div>
            </section>

            <footer>
                <p>© 2026 · Yelnaz қыз ұзату тойы · Барлық қонақтарды сүйіспеншілікпен қарсы аламыз</p>
            </footer>
        </>
    );
}

export default App;
