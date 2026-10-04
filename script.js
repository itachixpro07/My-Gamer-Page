/* =========================================================
   ITACHI PROFILE — SCRIPT
   
   HOW TO MODIFY TYPEWRITER QUOTES:
   Edit the 'quotes' array below.
   Add/remove quotes as you like.
   The typewriter will cycle through them automatically.
   ========================================================= */

// ✏️ EDIT YOUR QUOTES HERE
const quotes = [
  "People live their lives bound by what they accept as correct and true. That's how they define reality.",
  "Those who forgive themselves, and are able to accept their true nature... they are the strong ones.",
  "Those who cannot acknowledge themselves will eventually fail.",
  "It is not wise to judge others based on your own preconceptions and by their appearances.",
  "Self-sacrifice... A nameless shinobi who protects peace within its shadow. That is a true shinobi.",
  "You don't become the Hokage to be acknowledged by everyone. The one who is acknowledged by everyone becomes the Hokage.",
  "Knowledge and awareness are vague, and perhaps better called illusions."
];

/* =========================================================
   TYPEWRITER EFFECT (CHARACTER BY CHARACTER)
   - Types one character at a time
   - Pauses
   - Deletes one character at a time
   - Moves to next quote
   ========================================================= */
function startTypewriter() {
  const el = document.getElementById('typewriterText');
  let quoteIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  // Speeds (ms per character)
  const TYPE_SPEED = 60;         // Speed while typing each character
  const DELETE_SPEED = 30;       // Speed while deleting each character (faster)
  const PAUSE_AFTER_TYPE = 2500; // Pause after full quote is typed
  const PAUSE_AFTER_DELETE = 500; // Pause before typing next quote
  
  function tick() {
    const currentQuote = quotes[quoteIndex];
    
    if (!isDeleting) {
      // TYPING phase — add one character at a time
      charIndex++;
      el.textContent = currentQuote.substring(0, charIndex);
      
      if (charIndex >= currentQuote.length) {
        // Finished typing — pause, then start deleting
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      // DELETING phase — remove one character at a time
      charIndex--;
      el.textContent = currentQuote.substring(0, charIndex);
      
      if (charIndex <= 0) {
        // Finished deleting — move to next quote
        isDeleting = false;
        quoteIndex = (quoteIndex + 1) % quotes.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }
  
  // Start the loop
  tick();
}

/* =========================================================
   SECTION REVEAL ON SCROLL
   ========================================================= */
function revealSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('section').forEach(s => observer.observe(s));
}

/* =========================================================
   CROWS (flying across screen)
   ========================================================= */
function spawnCrow() {
  const crow = document.createElement('div');
  crow.className = 'crow';
  crow.innerHTML = `<svg viewBox="0 0 64 32" fill="#000"><path d="M2 18 Q 10 8, 20 14 Q 24 6, 32 12 Q 40 4, 48 14 Q 58 10, 62 18 Q 50 22, 40 18 Q 32 24, 24 18 Q 14 22, 2 18 Z"/></svg>`;
  const top = 10 + Math.random() * 60;
  const duration = 12 + Math.random() * 10;
  crow.style.top = top + 'vh';
  crow.style.animation = `flyAcross ${duration}s linear forwards`;
  document.body.appendChild(crow);
  setTimeout(() => crow.remove(), duration * 1000);
}

/* =========================================================
   EMBERS (rising particles)
   ========================================================= */
function spawnEmber() {
  const ember = document.createElement('div');
  ember.className = 'ember';
  ember.style.left = Math.random() * 100 + 'vw';
  ember.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
  const duration = 6 + Math.random() * 8;
  ember.style.animationDuration = duration + 's';
  document.body.appendChild(ember);
  setTimeout(() => ember.remove(), duration * 1000);
}

/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* =========================================================
   INIT
   ========================================================= */
window.addEventListener('load', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  startTypewriter();
  revealSections();

  // Hide loader
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1600);

  // Periodic effects
  setInterval(spawnCrow, 8000);
  setInterval(spawnEmber, 400);
  setTimeout(spawnCrow, 2000);
});
// Disable right click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
    (e.ctrlKey && e.key === 'u')
  ) {
    e.preventDefault();
  }
});
