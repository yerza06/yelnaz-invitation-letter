/* ── Floating petals ── */
(function () {
    const hero = document.getElementById('hero');
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'petal';
        p.style.cssText = `
            left:${Math.random()*100}%;
            width:${7+Math.random()*10}px;
            height:${11+Math.random()*14}px;
            animation-duration:${9+Math.random()*14}s;
            animation-delay:${Math.random()*10}s;
            background:${Math.random()>.5
                ? 'linear-gradient(135deg,rgba(201,168,76,.35),rgba(212,175,55,.15))'
                : 'linear-gradient(135deg,rgba(139,26,46,.25),rgba(139,26,46,.1))'};
            border-radius:${Math.random()>.5 ? '50% 0' : '0 50%'};
        `;
        hero.appendChild(p);
    }
})();

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => revealObs.observe(el));

/* ── Countdown ── */
const TARGET = new Date('2026-07-01T18:00:00');
function pad(n) { return String(n).padStart(2,'0'); }
function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
        ['cd-days','cd-hours','cd-min','cd-sec'].forEach(id => document.getElementById(id).textContent = '00');
        return;
    }
    document.getElementById('cd-days').textContent  = pad(Math.floor(diff/86400000));
    document.getElementById('cd-hours').textContent = pad(Math.floor(diff%86400000/3600000));
    document.getElementById('cd-min').textContent   = pad(Math.floor(diff%3600000/60000));
    document.getElementById('cd-sec').textContent   = pad(Math.floor(diff%60000/1000));
}
tick();
setInterval(tick, 1000);

/* ── Nav dots ── */
const SECTIONS = ['hero','countdown','invitation','details','location','rsvp'];
const dots = document.querySelectorAll('.nd');

dots.forEach((d, i) => {
    d.addEventListener('click', () => {
        document.getElementById(SECTIONS[i]).scrollIntoView({ behavior:'smooth' });
    });
});

const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const idx = SECTIONS.indexOf(e.target.id);
        if (idx < 0) return;
        dots.forEach(d => d.classList.remove('active'));
        dots[idx].classList.add('active');
    });
}, { threshold: 0.45 });

SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el) secObs.observe(el);
});

/* ── Music button ── */
(function () {
    const audio     = document.getElementById('bg-audio');
    const btn       = document.getElementById('music-btn');
    const iconPlay  = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');

    function setPlaying(playing) {
        if (playing) {
            iconPlay.style.display  = 'none';
            iconPause.style.display = '';
            btn.classList.add('playing');
            btn.setAttribute('aria-label', 'Музыканы тоқтату');
        } else {
            iconPlay.style.display  = '';
            iconPause.style.display = 'none';
            btn.classList.remove('playing');
            btn.setAttribute('aria-label', 'Музыканы қосу');
        }
    }

    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.volume = 0.45;
            audio.play().then(() => setPlaying(true)).catch(() => {});
        } else {
            audio.pause();
            setPlaying(false);
        }
    });

    audio.addEventListener('ended',   () => setPlaying(false));
    audio.addEventListener('pause',   () => setPlaying(false));
    audio.addEventListener('playing', () => setPlaying(true));
})();

/* ── RSVP Form ── */
(function () {
    const form        = document.getElementById('rsvp-form');
    const nameInput   = document.getElementById('rf-name');
    const spouseWrap  = document.getElementById('rf-spouse-wrap');
    const successBox  = document.getElementById('rsvp-success');
    const nameErr     = document.getElementById('rf-name-err');
    const attErr      = document.getElementById('rf-att-err');
    const spouseErr   = document.getElementById('rf-spouse-err');

    // Show/hide spouse question based on attendance
    form.querySelectorAll('input[name="attending"]').forEach(radio => {
        radio.addEventListener('change', () => {
            attErr.classList.remove('show');
            if (radio.value === 'yes') {
                spouseWrap.style.display = 'flex';
            } else {
                spouseWrap.style.display = 'none';
                form.querySelectorAll('input[name="spouse"]').forEach(r => r.checked = false);
            }
        });
    });

    form.querySelectorAll('input[name="spouse"]').forEach(radio => {
        radio.addEventListener('change', () => spouseErr.classList.remove('show'));
    });

    nameInput.addEventListener('input', () => {
        nameErr.classList.remove('show');
        nameInput.classList.remove('error');
    });

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name      = nameInput.value.trim();
        const attending = form.querySelector('input[name="attending"]:checked');
        const spouse    = form.querySelector('input[name="spouse"]:checked');

        let valid = true;

        if (!name) {
            nameErr.classList.add('show');
            nameInput.classList.add('error');
            valid = false;
        }
        if (!attending) {
            attErr.classList.add('show');
            valid = false;
        }
        if (attending && attending.value === 'yes' && !spouse) {
            spouseErr.classList.add('show');
            valid = false;
        }

        if (!valid) return;

        // Build WhatsApp message
        let msg = '';
        if (attending.value === 'yes') {
            const withSpouse = spouse.value === 'with';
            msg = `Сәлем! Мен ${name}.\n\nYelnaz'дың Қыз ұзату тойына (1 шілде 2026) қатысамын.`;
            msg += withSpouse
                ? '\nЖұбайыммен бірге келемін. (2 адам)'
                : '\nЖалғыз келемін. (1 адам)';
        } else {
            msg = `Сәлем! Мен ${name}.\n\nӨкінішке орай, Yelnaz'дың Қыз ұзату тойына (1 шілде 2026) келе алмаймын.`;
        }

        const url = `https://wa.me/77071900557?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');

        // Show success
        form.style.display = 'none';
        successBox.style.display = 'flex';
    });
})();
