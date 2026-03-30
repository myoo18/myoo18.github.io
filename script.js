/* ============================================================
   DARK MODE TOGGLE
   ============================================================ */
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
  }
})();

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  const icon = isDark ? "☀️" : "🌙";
  const t1 = document.getElementById("theme-toggle");
  const t2 = document.getElementById("theme-toggle-mobile");
  if (t1) t1.textContent = icon;
  if (t2) t2.textContent = icon;
}

document.addEventListener("DOMContentLoaded", () => {
  const isDark = document.body.classList.contains("dark");
  const icon = isDark ? "☀️" : "🌙";
  const t1 = document.getElementById("theme-toggle");
  const t2 = document.getElementById("theme-toggle-mobile");
  if (t1) { t1.textContent = icon; t1.addEventListener("click", () => applyTheme(!document.body.classList.contains("dark"))); }
  if (t2) { t2.textContent = icon; t2.addEventListener("click", () => applyTheme(!document.body.classList.contains("dark"))); }
});

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function toggleMenu() {
  document.querySelector(".menu-links").classList.toggle("open");
  document.querySelector(".hamburger-icon").classList.toggle("open");
}

/* ============================================================
   NAVBAR — scroll shadow + active link
   ============================================================ */
const desktopNav = document.getElementById("desktop-nav");
const navLinks   = document.querySelectorAll(".nav-links a[href^='#']");
const sections   = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Sticky shadow
  if (window.scrollY > 20) {
    desktopNav?.classList.add("scrolled");
  } else {
    desktopNav?.classList.remove("scrolled");
  }

  // Active nav link
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });

  // Back-to-top visibility
  const btn = document.getElementById("back-to-top");
  if (btn) {
    btn.classList.toggle("visible", window.scrollY > 400);
  }
}, { passive: true });

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ============================================================
   TYPING ANIMATION
   ============================================================ */
(function typingAnimation() {
  const phrases  = ["Software Developer", "Backend Engineer", "CS Graduate"];
  const el       = document.getElementById("typing-text");
  if (!el) return;

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
    }

    setTimeout(tick, deleting ? 55 : 90);
  }

  tick();
})();

