import './NavDots.css';
interface NavDotsProps {
    activeSection: string;
}

export default function NavDots({ activeSection }: NavDotsProps) {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav id="nav-dots">
            {['hero', 'invitation', 'countdown', 'details', 'location', 'rsvp'].map((id) => (
                <div
                    key={id}
                    className={`nd ${activeSection === id ? 'active' : ''}`}
                    onClick={() => scrollTo(id)}
                    title={id}
                ></div>
            ))}
        </nav>
    );
}
