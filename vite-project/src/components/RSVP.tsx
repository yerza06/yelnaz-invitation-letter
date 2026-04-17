import { useState, FormEvent } from 'react';
import './RSVP.css';

export default function RSVP() {
    const [attending, setAttending] = useState('');
    const [spouse, setSpouse] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({ name: false, attending: false, spouse: false });
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        <section id="rsvp">
            <div className="rsvp-inner">
                <svg className="reveal" width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 36px', opacity: 0.9 }}>
                    <path d="M50 10 L65 50 L50 90 L35 50 Z" stroke="#C9A84C" strokeWidth="1.5" fill="#C9A84C" fillOpacity="0.1" />
                    <path d="M50 10 C 80 0, 95 30, 80 50 C 70 63, 50 40, 65 30 C 75 20, 85 35, 80 45" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M50 10 C 20 0, 5 30, 20 50 C 30 63, 50 40, 35 30 C 25 20, 15 35, 20 45" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M50 90 C 80 100, 95 70, 80 50 C 70 37, 50 60, 65 70 C 75 80, 85 65, 80 55" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M50 90 C 20 100, 5 70, 20 50 C 30 37, 50 60, 35 70 C 25 80, 15 65, 20 55" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    
                    <image href="/images/photo_2026-04-17_03-12-42.svg" x="20" y="35" width="60" height="30" />
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
    );
}
