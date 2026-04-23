import './Invitation.css';
export default function Invitation() {
    return (
        <section id="invitation">
            <div className="invitation-inner">
                <span className="section-eyebrow reveal">Шақыру</span>

                <p className="inv-text reveal">
                    Құрметті ағайын-туыс, бауырлар,<br /><em>құда-жекжат, нағашы-жиен, бөлелер,</em><br />әріптестер және қадірлі дос-жарандар!
                    <br /><br />
                    Сіздерді аяулы қызымыз <br /><strong><em>Елназдың</em></strong> <br />ата-анасының аялы алақанынан құтты босағасына шығарып салу рәсіміне арналған салтанатты ақ дастарқанымыздың қадірлі қонағы болуға шақырамыз!
                </p>

                <div className="ornament-line reveal">
                    <svg width="22" height="22" viewBox="0 0 22 22">
                        <path d="M11 1 L21 11 L11 21 L1 11 Z" fill="#C9A84C" opacity=".3" />
                        <path d="M11 5 L17 11 L11 17 L5 11 Z" fill="#C9A84C" opacity=".55" />
                        <circle cx="11" cy="11" r="2.5" fill="#8B1A2E" opacity=".45" />
                    </svg>
                </div>

                <span className="section-eyebrow reveal">
                    Той иелері
                </span>
                <p className="inv-signature reveal">
                    — Абылай & Айнұр —
                </p>
                <p className='inv-text reveal'>
                    Келіңіздер, қуанышымызға ортақ болыңыздар!
                </p>
            </div>
        </section >
    );
}
