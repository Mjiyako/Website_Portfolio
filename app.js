const root = document.documentElement;

window.addEventListener('pointermove', (event) => {
    root.style.setProperty('--mouse-x', `${event.clientX}px`);
    root.style.setProperty('--mouse-y', `${event.clientY}px`);
});

const typingTarget = document.querySelector('#typed-text');
const typingPhrases = [
    'digital form development',
    'PHP and SQL-backed services',
    'React and JavaScript interfaces',
    'secure software fundamentals',
    'game development thinking'
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typePhrase() {
    if (!typingTarget) return;

    const currentPhrase = typingPhrases[phraseIndex];
    const visibleText = currentPhrase.slice(0, characterIndex);
    typingTarget.textContent = visibleText;

    if (!deleting && characterIndex < currentPhrase.length) {
        characterIndex += 1;
        window.setTimeout(typePhrase, 60);
        return;
    }

    if (!deleting && characterIndex === currentPhrase.length) {
        deleting = true;
        window.setTimeout(typePhrase, 1300);
        return;
    }

    if (deleting && characterIndex > 0) {
        characterIndex -= 1;
        window.setTimeout(typePhrase, 34);
        return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    window.setTimeout(typePhrase, 240);
}

typePhrase();

const revealItems = document.querySelectorAll('.section-panel, .panel-card, .hero-content');

revealItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.16
});

revealItems.forEach((item) => revealObserver.observe(item));

const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const activeLink = navLinks.find((link) => link.getAttribute('href') === `#${entry.target.id}`);

        if (entry.isIntersecting && activeLink) {
            navLinks.forEach((link) => link.classList.remove('active'));
            activeLink.classList.add('active');
        }
    });
}, {
    rootMargin: '-35% 0px -50% 0px',
    threshold: 0.01
});

sections.forEach((section) => sectionObserver.observe(section));
