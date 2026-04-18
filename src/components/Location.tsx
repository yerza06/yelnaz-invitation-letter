import './Location.css';
export default function Location() {
    return (
        <section id="location">
            <div className="location-inner">
                <span className="section-eyebrow reveal">Мекенжай</span>
                <h2 className="section-title reveal">Сіздерді осы<br /><em>жерде күтеміз</em></h2>
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
                                SAMRUK 777
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
                                <p className="loc-value">«Samruk 777» банкет залы<br />Беимбет Майлин, 20/10</p>
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

                        <a href="https://2gis.kz/astana/geo/70000001039202760/71.482906,51.146843" target="_blank" rel="noopener noreferrer" className="btn-gold reveal">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '8px' }}>
                                <path d="M12 2C7.6 2 4 5.6 4 10c0 7 8 14 8 14s8-7 8-14c0-4.4-3.6-8-8-8z" />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>
                            КАРТАНЫ АШУ
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
