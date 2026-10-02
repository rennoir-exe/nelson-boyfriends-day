/* ============================================================
   BOYFRIEND'S DAY WEBSITE — script.js
   All interactive behaviour, data, animations
   ============================================================ */

'use strict';

/* ── Data ─────────────────────────────────────────────────── */

const REASONS = [
  { icon: '😊', label: 'Because you', text: 'Your little smile shows up before you even realize you are smiling.' },
  { icon: '😂', label: 'Because you', text: 'You can make me laugh with one perfectly timed, completely unserious comment.' },
  { icon: '🫶', label: 'Because you', text: 'You listen in a way that makes me feel like every thought of mine has room.' },
  { icon: '👀', label: 'Because you', text: 'That tiny jealous look you get is ridiculously cute.' },
  { icon: '💬', label: 'Because you', text: 'You have a way of making a simple conversation feel easy and fun.' },
  { icon: '💗', label: 'Because you', text: 'When you call me "bbg," I get a little shy and a lot happier.' },
  { icon: '🌷', label: 'Because you', text: 'Your calm, reassuring presence makes a room feel gentler.' },
  { icon: '✨', label: 'Because you', text: 'You notice the small details that other people might miss.' },
  { icon: '🧸', label: 'Because you', text: 'Your protective, slightly possessive side makes me feel adored.' },
  { icon: '🩷', label: 'Because you', text: 'There is a warmth in the way you are that feels unmistakably yours.' },
];

const TIMELINE = [
  { icon: '💃', date: '11th & 12th', text: 'We had feelings for each other and shared couple dances that became dear memories.' },
  { icon: '🎓', date: 'The same college', text: 'Nelson was in the same college as me, and I already had feelings for him.' },
  { icon: '💌', date: 'An old feeling', text: 'Those feelings were part of my story long before I knew where life would lead.' },
  { icon: '💔', date: 'A different chapter', text: 'Then he dated another girl, and we talked only once in a blue moon.' },
  { icon: '🍃', date: 'Life moved on', text: 'Life carried us into different chapters, with time and distance between those old moments.' },
  { icon: '🧭', date: 'Finding each other again', text: 'Eventually, we found our way back to each other.' },
  { icon: '💞', date: 'Last week', text: 'We started dating, and a new chapter became ours.' },
  { icon: '🎀', date: 'October 3, 2026', text: 'Today is Boyfriend’s Day, and I get to celebrate you as my boyfriend.' },
];

const ENVELOPES = [
  {
    icon: '💌',
    label: 'A Keepsake',
    message: 'Some things are worth remembering.'
  },
  {
    icon: '✨',
    label: 'A Small Wonder',
    message: 'Some moments become special without asking permission.'
  },
  {
    icon: '🌷',
    label: 'A Little Mark',
    message: 'Some people leave little marks on your heart.'
  },
  {
    icon: '📖',
    label: 'This Page',
    message: 'Somehow, today feels like a page I want to keep.'
  },
  {
    icon: '☁️',
    label: 'A Soft Thought',
    message: 'A quiet thought can make an ordinary day glow.'
  }
];

const OPEN_WHEN_MESSAGES = {
  miss: {
    title: 'Open when you miss me',
    message: "Even if I'm not right beside you, I hope you know that there's always a little piece of my heart thinking about you. So if you miss me... just remember that somewhere, your bbg is probably missing you too. 🥹❤️"
  },
  badDay: {
    title: "Open when you're having a bad day",
    message: "Whatever happened today, you don't have to carry it alone. Take a breath, okay? Tomorrow can be softer. And until then, remember that you have someone who is always going to be in your corner. 🫶🏻"
  },
  smile: {
    title: 'Open when you need a smile',
    message: "Hi bbg's boyfriend. 🎀\nYes, this is your official reminder that someone thinks you're extremely cute.\nNow smile.\nThat's an order. 😌❤️"
  },
  love: {
    title: 'Open when you want to know how much I love you',
    message: "I don't think I can fit everything I feel into one little website. But I hope you notice it in the little things — in the way I care, the way I remember things, the way I smile when you call me bbg, and in all the tiny moments that make being yours feel special. ❤️"
  }
};

/* ── Floating Hearts ──────────────────────────────────────── */

function createFloatingHearts() {
  const container = document.getElementById('heartsBg');
  const symbols = ['💗', '💕', '🌸', '✨', '💖', '🩷'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const leftPct = Math.random() * 100;
    const dur = 7 + Math.random() * 8;
    const delay = Math.random() * 10;
    const size = 0.9 + Math.random() * 0.8;

    heart.style.cssText = `
      left: ${leftPct}%;
      --dur: ${dur}s;
      --delay: ${delay}s;
      font-size: ${size}rem;
    `;
    container.appendChild(heart);
  }
}

/* ── Screen Navigation ──────────────────────────────────────── */

function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section || !section.matches('main > .section')) return;

  const activeSection = document.querySelector('main > .section.active');
  if (activeSection === section) return;

  if (activeSection) activeSection.classList.remove('active');
  section.scrollTop = 0;
  section.classList.add('active');
  section.focus({ preventScroll: true });

  if (section.id === 'timeline') {
    document.querySelectorAll('.timeline-item').forEach(item => item.classList.remove('visible'));
    animateTimeline();
  }
}

/* ── Build: Reasons I Love You ────────────────────────────── */

function buildReasons() {
  const grid = document.getElementById('reasonsGrid');
  REASONS.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="front">
        <span class="reason-icon">${r.icon}</span>
        <span class="reason-label">Tap to reveal 💗</span>
      </div>
      <div class="back">
        <span class="reason-icon">${r.icon}</span>
        <p class="reason-text">${r.text}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      if (card.classList.contains('flipped')) {
        card.style.borderColor = 'var(--pink)';
        spawnMiniHearts(card);
      }
    });
    grid.appendChild(card);
  });
}

function spawnMiniHearts(el) {
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const h = document.createElement('span');
    h.textContent = ['💗', '💕', '✨'][Math.floor(Math.random() * 3)];
    h.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 60}px;
      top: ${rect.top + rect.height / 2}px;
      font-size: ${0.9 + Math.random() * 0.5}rem;
      pointer-events: none;
      z-index: 999;
      animation: miniFloat 1.2s ease-out forwards;
    `;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1300);
  }
}

// inject mini float animation
const miniStyle = document.createElement('style');
miniStyle.textContent = `
  @keyframes miniFloat {
    0%   { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-70px) scale(0.5); }
  }
`;
document.head.appendChild(miniStyle);

/* ── Build: Timeline ──────────────────────────────────────── */

function buildTimeline() {
  const container = document.getElementById('timelineEl');
  TIMELINE.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.style.transitionDelay = `${i * 0.08}s`;
    el.innerHTML = `
      <div class="timeline-dot">${item.icon}</div>
      <div class="timeline-content">
        <div class="timeline-date">${item.date}</div>
        <p class="timeline-text">${item.text}</p>
      </div>
    `;
    container.appendChild(el);
  });
}

function animateTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach((item, i) => {
    setTimeout(() => item.classList.add('visible'), i * 80);
  });
}

/* ── Build: Envelopes ─────────────────────────────────────── */

function buildEnvelopes() {
  const grid = document.getElementById('envelopesGrid');
  ENVELOPES.forEach(env => {
    const wrap = document.createElement('div');
    wrap.className = 'envelope-wrap';

    const el = document.createElement('div');
    el.className = 'envelope';
    el.innerHTML = `
      <div class="envelope-flap"></div>
      <span class="envelope-icon">${env.icon}</span>
      <span class="envelope-label">${env.label}</span>
      <p class="envelope-message">${env.message}</p>
    `;
    el.addEventListener('click', () => {
      if (!el.classList.contains('opened')) {
        el.classList.add('opened');
        spawnMiniHearts(el);
      } else {
        el.classList.remove('opened');
      }
    });

    wrap.appendChild(el);
    grid.appendChild(wrap);
  });
}

function formatTime(time) {
  if (!Number.isFinite(time) || time < 0) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

const MEMORY_CAPSULE_NOTES = [
  {
    title: 'Note 01 — Back Then',
    text: 'Even before we had the right words for it, there was something about you that stayed with me.'
  },
  {
    title: 'Note 02 — Those Dances',
    text: 'I still smile thinking about a little moment with you and wishing the song would last longer.'
  },
  {
    title: 'Note 03 — The In-Between',
    text: 'Even in the quieter stretches, a little part of me kept a soft place for you.'
  },
  {
    title: 'Note 04 — Somehow, You',
    text: 'Out of everyone, you have this way of feeling familiar and new all at once.'
  },
  {
    title: 'Note 05 — Bbg',
    text: 'When you call me bbg, I cannot help smiling. It feels like our own tiny word. ♡'
  },
  {
    title: 'Note 06 — Now It’s Us',
    text: 'I am so glad this is our chapter now. I want to keep choosing little moments with you.'
  }
];

function setupMemoryCapsule() {
  const capsule = document.getElementById('memoryCapsule');
  const openBtn = document.getElementById('memoryOpenBtn');
  const noteCard = document.getElementById('memoryNoteCard');
  const noteHeader = document.getElementById('memoryNoteHeader');
  const noteText = document.getElementById('memoryNoteText');
  const noteCounter = document.getElementById('memoryNoteCounter');
  const nextBtn = document.getElementById('memoryNextBtn');
  const closeBtn = document.getElementById('memoryCloseBtn');
  const closingText = document.getElementById('memoryClosing');
  const sparkleBox = document.getElementById('memorySparkles');

  if (!capsule || !openBtn || !noteCard || !noteHeader || !noteText || !noteCounter || !nextBtn || !closeBtn || !closingText || !sparkleBox) return;

  let noteIndex = 0;
  const totalNotes = MEMORY_CAPSULE_NOTES.length;

  const renderNote = () => {
    const current = MEMORY_CAPSULE_NOTES[noteIndex];
    noteHeader.textContent = current.title;
    noteText.textContent = current.text;
    noteCounter.textContent = `${String(noteIndex + 1).padStart(2, '0')} / ${String(totalNotes).padStart(2, '0')}`;

    if (noteIndex === 0) {
      nextBtn.textContent = 'One more? ♡';
    } else if (noteIndex === totalNotes - 1) {
      nextBtn.textContent = 'Keep this one forever ♡';
    } else {
      nextBtn.textContent = 'Next little secret ♡';
    }

    nextBtn.hidden = false;
    closingText.hidden = true;
    closeBtn.hidden = true;
  };

  const createSparkles = () => {
    const icons = ['♡', '✦', '❀', '✧', '♥'];
    for (let i = 0; i < 12; i += 1) {
      const sparkle = document.createElement('span');
      sparkle.className = 'memory-sparkle';
      sparkle.textContent = icons[i % icons.length];
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${(i * 0.2).toFixed(2)}s`;
      sparkle.style.setProperty('--sparkle-size', `${0.75 + Math.random() * 0.8}rem`);
      sparkleBox.appendChild(sparkle);
    }
  };

  openBtn.addEventListener('click', () => {
    noteIndex = 0;
    renderNote();
    capsule.classList.add('is-open');
    noteCard.classList.add('is-visible');
    openBtn.disabled = true;
    closeBtn.hidden = true;
    closingText.hidden = true;
  });

  nextBtn.addEventListener('click', () => {
    if (noteIndex < totalNotes - 1) {
      noteIndex += 1;
      renderNote();
      return;
    }

    nextBtn.hidden = true;
    closingText.hidden = false;
    closeBtn.hidden = false;
  });

  closeBtn.addEventListener('click', () => {
    noteIndex = 0;
    renderNote();
    capsule.classList.remove('is-open');
    noteCard.classList.remove('is-visible');
    openBtn.disabled = false;
    closeBtn.hidden = true;
    closingText.hidden = true;
  });

  createSparkles();
  renderNote();
  noteCard.classList.remove('is-visible');
  closeBtn.hidden = true;
  closingText.hidden = true;
}

function setupSmallSurprises() {
  const calendarButton = document.getElementById('octoberThird');
  const openWhenModal = document.getElementById('openWhenSurprise');
  const messageTitle = document.getElementById('openWhenMessageTitle');
  const messageText = document.getElementById('openWhenMessage');
  const promiseButton = document.getElementById('promiseRevealBtn');
  const promiseExtra = document.getElementById('promiseExtra');
  const finalLink = document.getElementById('hiddenSurpriseLink');
  const openWhenButtons = document.querySelectorAll('.open-when-card');
  let triggerIndex = 0;

  const showModal = (modal, trigger) => {
    if (!trigger.id) trigger.id = `surpriseTrigger-${++triggerIndex}`;
    modal.hidden = false;
    modal.dataset.returnFocus = trigger.id;
    modal.querySelector('[role="dialog"]').focus({ preventScroll: true });
  };

  const closeModal = modal => {
    if (!modal || modal.hidden) return;
    const trigger = document.getElementById(modal.dataset.returnFocus);
    modal.hidden = true;
    if (trigger) trigger.focus({ preventScroll: true });
  };

  calendarButton.addEventListener('click', () => {
    showModal(document.getElementById('calendarSurprise'), calendarButton);
  });

  openWhenButtons.forEach(button => {
    button.addEventListener('click', () => {
      const message = OPEN_WHEN_MESSAGES[button.dataset.letter];
      if (!message) return;
      messageTitle.textContent = message.title;
      messageText.textContent = message.message;
      button.classList.add('is-opening');
      setTimeout(() => {
        button.classList.remove('is-opening');
        showModal(openWhenModal, button);
      }, 220);
    });
  });

  promiseButton.addEventListener('click', () => {
    promiseExtra.hidden = false;
    promiseButton.hidden = true;
  });

  finalLink.addEventListener('click', () => {
    showModal(document.getElementById('finalSurprise'), finalLink);
  });

  document.querySelectorAll('.surprise-overlay').forEach(modal => {
    modal.querySelector('.surprise-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', event => {
      if (event.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const visibleModal = [...document.querySelectorAll('.surprise-overlay')].find(modal => !modal.hidden);
    closeModal(visibleModal);
  });
}

/* ── Confetti ─────────────────────────────────────────────── */

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#f9a8c9', '#e879a0', '#d4b3f7', '#b3d9f7', '#fdebd0', '#a97bea', '#ff6eb4', '#ffcce0'];
  const shapes = ['❤️', '🌸', '✨', '💗', '🎀', '💕'];
  const pieces = [];
  const NUM = 120;

  for (let i = 0; i < NUM; i++) {
    const isEmoji = Math.random() > 0.55;
    const burstX = (Math.random() - 0.5) * 8;
    pieces.push({
      x: Math.random() * canvas.width,
      y: -30 - Math.random() * 180,
      r: 4 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: shapes[Math.floor(Math.random() * shapes.length)],
      isEmoji,
      vx: burstX,
      vy: 14 + Math.random() * 12,
      spin: (Math.random() - 0.5) * 0.2,
      angle: Math.random() * Math.PI * 2,
      opacity: 1,
      fontSize: 14 + Math.random() * 14,
    });
  }

  let frame;
  let t = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.24;
      p.vx *= 0.995;
      p.angle += p.spin;
      if (p.y > canvas.height + 24) p.opacity -= 0.18;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      if (p.isEmoji) {
        ctx.font = `${p.fontSize}px serif`;
        ctx.fillText(p.emoji, -p.fontSize / 2, p.fontSize / 2);
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    t++;
    const allGone = pieces.every(p => p.opacity <= 0);
    if (!allGone && t < 90) {
      frame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(frame);
    }
  }

  draw();
}

/* ── Final Love Letter Experience ─────────────────────────── */

const LOVE_LETTER_TEXT = [
  'Nelson, I am so happy with you. What we have means so much to me, and I treasure the care, laughter, and warmth you bring into my life. ✨',
  'You are special to me in more ways than I can fit into a letter. I cannot wait to make new memories together, from the simplest days to the ones we will talk about for years. Thank you for being you. I love you. ❤️'
];

let loveLetterTimer = null;
let loveLetterStarted = false;
let loveLetterFinished = false;

function resetLoveLetterState() {
  if (loveLetterTimer) {
    clearTimeout(loveLetterTimer);
    loveLetterTimer = null;
  }

  loveLetterStarted = false;
  loveLetterFinished = false;

  const stage = document.getElementById('letterStage');
  const envelopeWrap = document.getElementById('letterEnvelopeWrap');
  const intro = document.querySelector('.letter-intro');
  const openBtn = document.getElementById('openLetterBtn');
  const paperShell = document.getElementById('letterPaperShell');
  const letterText = document.getElementById('letterText');
  const finalSign = document.getElementById('letterFinalSign');
  const nextButton = document.getElementById('letterNextBtn');
  const confettiBtn = document.getElementById('confettiBtn');

  if (stage) stage.classList.remove('is-open');
  if (envelopeWrap) envelopeWrap.classList.remove('is-open');
  if (intro) intro.style.display = 'block';
  if (openBtn) openBtn.style.display = 'inline-flex';
  if (paperShell) {
    paperShell.classList.remove('is-visible');
    paperShell.style.visibility = 'hidden';
  }
  if (letterText) letterText.innerHTML = '';
  if (finalSign) finalSign.classList.remove('is-visible');
  if (nextButton) nextButton.hidden = true;
  if (confettiBtn) {
    confettiBtn.hidden = true;
    confettiBtn.classList.remove('is-visible');
  }
}

function finishLoveLetterTyping() {
  if (loveLetterFinished) return;
  loveLetterFinished = true;

  const finalSign = document.getElementById('letterFinalSign');
  const confettiBtn = document.getElementById('confettiBtn');

  if (finalSign) {
    finalSign.classList.add('is-visible');
  }

  setTimeout(() => {
    if (confettiBtn) {
      confettiBtn.hidden = false;
      requestAnimationFrame(() => confettiBtn.classList.add('is-visible'));
    }
    const nextButton = document.getElementById('letterNextBtn');
    if (nextButton) nextButton.hidden = false;
  }, 450);
}

function typeLoveLetter() {
  if (loveLetterFinished) return;

  const letterText = document.getElementById('letterText');
  if (!letterText) return;

  letterText.innerHTML = '';

  const paragraphs = LOVE_LETTER_TEXT.map(text => {
    const paragraph = document.createElement('p');
    paragraph.className = 'letter-body';
    letterText.appendChild(paragraph);
    return paragraph;
  });

  let paragraphIndex = 0;
  let charIndex = 0;

  function typeNextCharacter() {
    if (paragraphIndex >= paragraphs.length) {
      finishLoveLetterTyping();
      return;
    }

    const paragraph = paragraphs[paragraphIndex];
    const currentText = LOVE_LETTER_TEXT[paragraphIndex];

    if (charIndex < currentText.length) {
      paragraph.textContent += currentText.charAt(charIndex);
      charIndex += 1;
      loveLetterTimer = setTimeout(typeNextCharacter, 18 + Math.random() * 26);
      return;
    }

    paragraphIndex += 1;
    charIndex = 0;

    if (paragraphIndex < paragraphs.length) {
      loveLetterTimer = setTimeout(typeNextCharacter, 160);
      return;
    }

    finishLoveLetterTyping();
  }

  typeNextCharacter();
}

function openLoveLetter() {
  if (loveLetterStarted) return;
  loveLetterStarted = true;

  if (loveLetterTimer) {
    clearTimeout(loveLetterTimer);
    loveLetterTimer = null;
  }

  const stage = document.getElementById('letterStage');
  const envelopeWrap = document.getElementById('letterEnvelopeWrap');
  const intro = document.querySelector('.letter-intro');
  const openBtn = document.getElementById('openLetterBtn');
  const paperShell = document.getElementById('letterPaperShell');

  if (stage) stage.classList.add('is-open');
  if (envelopeWrap) envelopeWrap.classList.add('is-open');
  if (intro) intro.style.display = 'none';
  if (openBtn) openBtn.style.display = 'none';
  if (paperShell) {
    paperShell.style.visibility = 'visible';
    paperShell.classList.remove('is-visible');
    requestAnimationFrame(() => {
      paperShell.classList.add('is-visible');
    });
  }

  loveLetterTimer = setTimeout(() => typeLoveLetter(), 700);
}

/* ── Init ─────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  buildReasons();
  buildTimeline();
  buildEnvelopes();
  setupMemoryCapsule();
  setupSmallSurprises();

  const sections = [...document.querySelectorAll('main > .section')];
  sections.forEach((section, index) => {
    section.classList.toggle('active', index === 0);
    section.tabIndex = -1;
  });
  window.scrollTo(0, 0);

  const openingButton = document.getElementById('openingBtn');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const letterEnvelopeWrap = document.getElementById('letterEnvelopeWrap');

  openingButton.addEventListener('click', () => navigateToSection('welcome'));
  document.querySelectorAll('.btn-next[data-target]').forEach(button => {
    button.addEventListener('click', () => navigateToSection(button.dataset.target));
  });

  if (openLetterBtn) {
    openLetterBtn.addEventListener('click', openLoveLetter);
  }

  if (letterEnvelopeWrap) {
    letterEnvelopeWrap.addEventListener('click', openLoveLetter);
    letterEnvelopeWrap.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLoveLetter();
      }
    });
  }

  resetLoveLetterState();
});