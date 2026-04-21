import { useEffect, useState } from 'react';
import './Countdown.css';

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', min: '00', sec: '00' });

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

    return (
        <section id="countdown">
            <div className="countdown-inner">
                <img className="kz-ornament reveal" src="/images/kz-ornament-heart.svg" alt="" aria-hidden="true" />
                <span className="section-eyebrow reveal">Тойдың уақыты</span>
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
                <p className="cal-caption reveal">Сағат 18:00-ден басталады</p>
                <span className="section-eyebrow reveal" style={{ marginTop: '20px' }}>Мерекеге дейін</span>
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
    );
}
