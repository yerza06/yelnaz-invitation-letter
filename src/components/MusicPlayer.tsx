import { useRef, useState } from 'react';
import './MusicPlayer.css';
export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMusicToggle = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.volume = 0.45;
            if (audioRef.current.currentTime === 0) {
                audioRef.current.currentTime = 27;
            }
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
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
        </>
    );
}
