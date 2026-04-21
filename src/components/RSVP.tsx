import { useState } from 'react';
import type { FormEvent } from 'react';
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
            msg = `Сәлем! Мен ${nameVal}.\n\nЕлназдың Қыз ұзату тойына (1 шілде 2026) қатысамын.`;
            msg += withSpouse
                ? '\nЖұбайыммен бірге келемін. (2 адам)'
                : '\nЖалғыз келемін. (1 адам)';
        } else {
            msg = `Сәлем! Мен ${nameVal}.\n\nӨкінішке орай, Елназдың Қыз ұзату тойына (1 шілде 2026) келе алмаймын.`;
        }

        const url = `https://wa.me/77071900557?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        setIsSubmitted(true);
    };

    return (
        <section id="rsvp">
            <div className="rsvp-inner">
                <svg className="reveal" width="120" height="120" viewBox="0 0 285 285" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 36px', opacity: 0.9 }}>
                    <g transform="translate(0, 285) scale(0.1, -0.1)" fill="var(--gold)" stroke="none">
                        <path d="M553 2581 c-112 -38 -238 -168 -273 -280 -11 -35 -20 -72 -20 -84 0 -12 -27 -47 -68 -87 -116 -111 -159 -236 -128 -370 18 -82 48 -132 110 -187 44 -39 46 -43 46 -96 0 -79 35 -154 111 -232 66 -69 167 -127 285 -163 34 -11 88 -37 120 -58 203 -135 523 -565 645 -868 19 -50 41 -92 47 -94 6 -2 16 14 21 35 16 59 140 297 213 408 140 214 323 425 444 511 35 25 99 57 150 75 126 44 196 84 265 150 73 70 112 148 114 231 2 56 3 58 68 127 82 87 102 142 95 266 -4 71 -9 90 -42 151 -42 76 -75 115 -123 145 -26 17 -32 28 -38 72 -10 73 -32 123 -82 189 -125 164 -270 213 -451 152 -68 -23 -80 -24 -125 -13 -82 19 -177 7 -260 -34 -91 -45 -187 -138 -219 -214 -13 -29 -25 -53 -28 -53 -3 0 -18 26 -35 58 -55 106 -165 196 -284 232 -75 24 -131 25 -195 6 -43 -13 -52 -13 -90 3 -98 43 -192 50 -273 22z m343 -172 c104 -19 221 -94 272 -173 65 -102 11 -322 -95 -387 -28 -17 -46 -21 -99 -17 -55 3 -69 8 -94 33 -39 40 -46 75 -22 105 22 28 68 30 106 5 26 -17 26 -17 26 9 0 29 -23 80 -49 110 -66 75 -208 61 -277 -29 -31 -41 -42 -107 -25 -158 10 -29 9 -41 -3 -66 -33 -62 -14 -152 40 -203 55 -50 113 -73 187 -73 37 0 67 -1 67 -2 0 -1 -18 -36 -41 -77 -22 -42 -39 -80 -37 -86 2 -6 19 1 39 14 19 13 71 36 115 51 115 39 192 85 258 155 32 33 60 59 62 57 8 -8 -25 -164 -46 -219 -24 -64 -86 -152 -149 -213 -22 -21 -41 -42 -41 -46 0 -14 45 -18 90 -8 25 6 66 23 91 40 25 16 48 29 51 29 3 0 8 -15 11 -32 3 -18 24 -127 46 -243 22 -116 43 -228 47 -250 6 -36 9 -27 30 90 43 233 83 427 88 433 3 3 14 -2 23 -10 36 -31 103 -58 152 -60 28 -1 53 1 57 5 5 4 -22 38 -58 75 -80 82 -103 116 -133 191 -24 62 -52 197 -43 207 3 3 29 -19 57 -49 57 -60 134 -106 242 -143 40 -13 92 -35 116 -50 25 -14 47 -23 50 -20 3 3 -13 39 -36 81 -22 42 -41 78 -41 80 0 2 28 3 63 3 97 -2 184 47 226 127 25 47 27 104 6 146 -14 25 -14 38 -3 90 12 58 11 63 -12 107 -14 26 -43 59 -66 75 -111 77 -257 18 -272 -110 l-5 -47 28 22 c54 43 115 21 115 -41 0 -123 -208 -145 -284 -30 -68 102 -84 233 -40 321 31 63 75 101 172 149 64 32 85 37 162 41 164 8 286 -56 389 -203 99 -141 153 -341 131 -483 -23 -143 -136 -314 -253 -381 -188 -108 -415 -355 -600 -653 -74 -119 -193 -353 -227 -447 -13 -34 -26 -64 -30 -66 -4 -2 -17 22 -30 53 -32 77 -125 266 -189 382 -169 306 -389 559 -611 706 -107 70 -152 114 -203 195 -106 167 -110 370 -13 576 64 134 138 220 234 271 95 51 167 61 278 41z" />
                    </g>
                </svg>

                {/* <span className="section-eyebrow revealg">Растаңыз</span> */}
                <h2 className="section-title reveal">Қатысуыңызды<br /><em>растаңыз</em></h2>

                <p className="rsvp-text reveal">
                    <strong>10 маусымға дейін</strong> хабарлауыңызды өтінеміз
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
