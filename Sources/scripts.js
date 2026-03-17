/* ============================================================
   GLOBAL TUI SCRIPTS — shared across all pages
   ============================================================ */

(() => {
  'use strict';

  /* ── Clock ──────────────────────────────────────────────── */
  function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('fr-FR', { hour12: false });
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ── Year ───────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Active nav link ────────────────────────────────────── */
  const currentPath = location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === currentPath) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ── Modal helpers ──────────────────────────────────────── */
  window.openModal = function(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('open');
  };
  window.closeModal = function(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('open');
  };
  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) m.classList.remove('open');
    });
  });
  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });

  /* ── Discord OAuth gate ─────────────────────────────────── */
  // Usage: data-discord-gate="<direct-download-url>" on any element with class discord-gate-btn
  // When clicked, shows the discord modal; after "auth" (link), proceeds to download.
  document.querySelectorAll('.discord-gate-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const dl = btn.closest('[data-download-url]')?.dataset?.downloadUrl
                  || btn.dataset.downloadUrl;
      const modal = document.getElementById('discord-modal');
      if (!modal) return;
      modal.dataset.pendingUrl = dl || '';
      modal.classList.add('open');
    });
  });
  window.discordProceed = function() {
    const modal = document.getElementById('discord-modal');
    if (!modal) return;
    const url = modal.dataset.pendingUrl;
    // Open discord oauth / invite (replace with real OAuth or invite link)
    window.open('https://discord.com/invite/1leeway', '_blank');
    if (url) {
      // Brief delay to let Discord open first, then trigger download
      setTimeout(() => { window.location.href = url; }, 800);
    }
    modal.classList.remove('open');
  };

  /* ── Global terminal animations hooks ───────────────────── */
  function applyStaggerReveal() {
    const selectors = [
      '.nav-links a',
      '.btn',
      '.tag',
      '.nav-tile',
      '.log-line',
      '.menu-item',
      '.filter-chip',
      '.gun-card',
      '.proj-chip',
      '.proj-card',
      '.category-btn',
      '.res-card',
      '.badge',
      '.social-link',
      '.music-btn'
    ];
    const nodes = document.querySelectorAll(selectors.join(','));
    nodes.forEach((el, i) => {
      el.style.setProperty('--stagger', String(i % 20));
      el.classList.add('anim-in');
    });
  }

  // Small random CRT pulse on key text zones for "old TV" feel
  function setupCrtPulse() {
    const pulseTargets = document.querySelectorAll('.site-title, .statusbar, .ascii-art, .username, .discord-line');
    if (!pulseTargets.length) return;
    setInterval(() => {
      const el = pulseTargets[Math.floor(Math.random() * pulseTargets.length)];
      if (!el) return;
      el.style.filter = 'brightness(1.15)';
      setTimeout(() => {
        el.style.filter = '';
      }, 80);
    }, 4200);
  }

  // Run after first paint so page-specific scripts/classes are in place
  setTimeout(() => {
    applyStaggerReveal();
    setupCrtPulse();
  }, 30);

})();
