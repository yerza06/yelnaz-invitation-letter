import { useState, useEffect, useRef } from 'react';
import './index.css';

import MusicPlayer from './components/MusicPlayer';
import NavDots from './components/NavDots';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Countdown from './components/Countdown';
import Details from './components/Details';
import Location from './components/Location';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

function App() {
    const heroRef = useRef<HTMLElement>(null);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
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

    return (
        <>
            <MusicPlayer />
            <NavDots activeSection={activeSection} />

            <Hero ref={heroRef} />
            <Invitation />
            <Countdown />
            <Details />
            <Location />
            <RSVP />
            <Footer />
        </>
    );
}

export default App;
