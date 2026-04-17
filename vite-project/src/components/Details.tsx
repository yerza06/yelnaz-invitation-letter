import './Details.css';
export default function Details() {
    return (
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
    );
}
