import './Details.css';

export default function Details() {
    return (
        <section id="details">
            <div className="details-inner">
                <h2 className="program-title reveal">Тойдың бағдарламасы:</h2>
                
                <div className="program-grid">
                    <div className="program-line"></div>
                    
                    {/* Item 1 */}
                    <div className="program-grid-item left-content reveal-left">
                        <div className="program-img-wrapper">
                            <img src="/images/photo_2026-04-18_02-27-27_.jpg" alt="17:00" />
                        </div>
                    </div>
                    <div className="program-grid-item right-content reveal-right">
                        <div className="program-info">
                            <time>17:00</time>
                            <p>ҚОНАҚТАРДЫҢ<br/>ЖИНАЛУЫ</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="program-grid-item left-content text-right reveal-left">
                        <div className="program-info">
                            <time>18:00</time>
                            <p>ТОЙДЫҢ<br/>БАСТАЛУЫ</p>
                        </div>
                    </div>
                    <div className="program-grid-item right-content reveal-right">
                        <div className="program-img-wrapper">
                            <img src="/images/photo_2026-04-18_02-27-37_.jpg" alt="18:00" />
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="program-grid-item left-content reveal-left">
                        <div className="program-img-wrapper">
                            <img src="/images/photo_2026-04-18_02-27-45_.jpg" alt="23:00" />
                        </div>
                    </div>
                    <div className="program-grid-item right-content reveal-right">
                        <div className="program-info">
                            <time>23:00</time>
                            <p>ШЫҒАРЫП<br/>САЛУ</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
