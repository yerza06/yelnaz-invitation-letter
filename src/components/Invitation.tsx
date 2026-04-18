import './Invitation.css';
export default function Invitation() {
    return (
        <section id="invitation">
            <div className="invitation-inner">
                <span className="section-eyebrow reveal">Шақыру хат</span>
                <h2
                    className="section-title reveal"
                    style={{ textAlign: 'center', fontSize: 'clamp(22px, 4.5vw, 40px)', lineHeight: 1.45 }}
                >
                    Құрметті ағайын-туыс, бауырлар,<br /><em>құда-жекжат, нағашы-жиен, бөлелер,</em><br />әріптестер және қадірлі дос-жарандар!

                </h2>

                <p className="inv-text reveal">
                    Сәздерді берекелі шаңырақ бойжеткен аяулы
                    <strong> Елназ</strong> қызымызды ата-анасының аялы алақанынан құтты босағасына шығарып салу рәсіміне арналған салтанатты дастарханның қадірлі қонағы болуға шақырамыз!
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

                <span className="section-eyebrow reveal" style={{ display: 'block', marginTop: '44px', marginBottom: '8px' }}>
                    Той иелері
                </span>
                <p className="inv-signature reveal" style={{ marginTop: 0, fontSize: 'clamp(22px, 5vw, 30px)' }}>
                    — Абылай және Айнұр —
                </p>
            </div>
        </section>
    );
}
