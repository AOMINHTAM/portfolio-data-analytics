// --- 1. DARK / LIGHT THEME TOGGLE ---
const themeBtn = document.getElementById('themeBtn');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  if (themeBtn) themeBtn.textContent = '🌙 DARK';
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');

    themeBtn.textContent = isLight ? '🌙 DARK' : '☀ LIGHT';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// --- 2. COPY EMAIL HELPER ---
function copyEmail(triggerEl) {
  const email = "aominhtam@gmail.com";

  function showCopiedFeedback() {
    if (triggerEl && triggerEl.classList && triggerEl.classList.contains("contact-card")) {
      const sub = triggerEl.querySelector(".contact-card-sub");
      if (sub) {
        const original = sub.getAttribute("data-original") || sub.textContent;
        sub.setAttribute("data-original", original);
        sub.textContent = "Copied! ✓";
        triggerEl.classList.add("is-copied");
        clearTimeout(triggerEl._copyTimer);
        triggerEl._copyTimer = setTimeout(() => {
          sub.textContent = original;
          triggerEl.classList.remove("is-copied");
        }, 2200);
      }
      return;
    }

    if (triggerEl && triggerEl.tagName === "BUTTON") {
      const original = triggerEl.getAttribute("data-original") || triggerEl.textContent;
      triggerEl.setAttribute("data-original", original);
      triggerEl.textContent = "✓ Email Copied";
      clearTimeout(triggerEl._copyTimer);
      triggerEl._copyTimer = setTimeout(() => {
        triggerEl.textContent = original;
      }, 2200);
      return;
    }

    alert("Email address copied to clipboard: " + email);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(showCopiedFeedback).catch(() => {
      alert("Copy email manually: " + email);
    });
  } else {
    alert("Copy email manually: " + email);
  }
}

// --- 3. SCROLLSPY: HIGHLIGHT ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNav(sectionId) {
  if (!navLinks.length) return;
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
}

function updateScrollSpy() {
  if (!sections.length || !navLinks.length) return;
  const scrollY = window.scrollY || window.pageYOffset;
  const firstSectionTop = sections[0].offsetTop - 140;
  const atBottom =
    window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40;

  if (scrollY < firstSectionTop) {
    setActiveNav("about");
    return;
  }

  if (atBottom) {
    const lastId = sections[sections.length - 1].getAttribute("id");
    if (lastId) setActiveNav(lastId);
    return;
  }

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 140;
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      setActiveNav(sectionId);
    }
  });
}

window.addEventListener("scroll", updateScrollSpy, { passive: true });
window.addEventListener("load", updateScrollSpy);
updateScrollSpy();

// Also reset nav to ABOUT ME when clicking navbar logo at top
const navLogo = document.querySelector(".navbar .logo");
if (navLogo && navLogo.getAttribute("href") === "#") {
  navLogo.addEventListener("click", () => {
    setActiveNav("about");
  });
}

// --- 4. PROJECT CATEGORY FILTER TABS, FEATURED COLLAPSE & HERO SHORTCUTS ---
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const heroFilterTriggers = document.querySelectorAll("[data-hero-filter]");
const toggleProjectsWrap = document.getElementById("toggleProjectsWrap");
const toggleProjectsBtn = document.getElementById("toggleProjectsBtn");
const projectsIntro = document.getElementById("projectsIntro");

let currentFilter = "all";
let showAllProjects = false;

function renderProjectsVisibility() {
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    const isMatch = btn.getAttribute("data-filter") === currentFilter;
    btn.classList.toggle("active", isMatch);
    btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
  });

  projectCards.forEach((card) => {
    const categories = (card.getAttribute("data-categories") || "").split(/\s+/);
    const isFeatured = card.getAttribute("data-featured") === "true";

    let shouldShow = false;
    if (currentFilter === "all") {
      shouldShow = showAllProjects || isFeatured;
    } else {
      shouldShow = categories.includes(currentFilter);
    }

    card.classList.toggle("is-hidden", !shouldShow);
  });

  if (toggleProjectsWrap && toggleProjectsBtn) {
    if (currentFilter === "all") {
      toggleProjectsWrap.classList.remove("is-hidden");
      toggleProjectsBtn.setAttribute("aria-expanded", showAllProjects ? "true" : "false");
      toggleProjectsBtn.innerHTML = showAllProjects
        ? "Show Featured Only (4) &uarr;"
        : "Show All 9 Projects (+5 More Analytics Case Studies) &darr;";
    } else {
      toggleProjectsWrap.classList.add("is-hidden");
    }
  }

  if (projectsIntro) {
    if (currentFilter === "all" && !showAllProjects) {
      projectsIntro.innerHTML =
        "Showing <strong>4 featured flagship projects</strong> (2 DE + 2 DA). Expand below to view all 9 case studies or filter by role.";
    } else if (currentFilter === "all" && showAllProjects) {
      projectsIntro.innerHTML =
        "Showing <strong>all 9 portfolio projects</strong> (2 Data Engineering + 7 Data Analytics).";
    } else if (currentFilter === "da") {
      projectsIntro.innerHTML =
        "Showing <strong>all 7 Data Analytics projects</strong> (Customer Intelligence, Conversion Funnels, Retention &amp; Basket Mining).";
    } else if (currentFilter === "de") {
      projectsIntro.innerHTML =
        "Showing <strong>both Data Engineering projects</strong> (AWS Event-Driven ELT V5.0.1 &amp; Snowflake Cloud ELT).";
    }
  }
}

function applyProjectFilter(selectedFilter) {
  currentFilter = selectedFilter || "all";
  renderProjectsVisibility();
  if (typeof updateScrollProgress === "function") updateScrollProgress();
}

if (filterBtns.length && projectCards.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyProjectFilter(btn.getAttribute("data-filter"));
    });
  });

  heroFilterTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      applyProjectFilter(trigger.getAttribute("data-hero-filter"));
    });
  });

  if (toggleProjectsBtn) {
    toggleProjectsBtn.addEventListener("click", () => {
      showAllProjects = !showAllProjects;
      renderProjectsVisibility();
      if (typeof updateScrollProgress === "function") updateScrollProgress();
    });
  }

  renderProjectsVisibility();
}

// --- 5. SCROLL READING PROGRESS BAR (ALL PAGES) ---
let updateScrollProgress = function () {};
(function initScrollProgress() {
  if (document.getElementById("scrollProgressBar")) return;

  const track = document.createElement("div");
  track.className = "scroll-progress-track";
  track.setAttribute("aria-hidden", "true");

  const bar = document.createElement("div");
  bar.id = "scrollProgressBar";
  bar.className = "scroll-progress-bar";
  track.appendChild(bar);
  document.body.prepend(track);

  updateScrollProgress = function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct =
      scrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100)) : 0;
    bar.style.width = `${pct.toFixed(2)}%`;
  };

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress, { passive: true });
  updateScrollProgress();
})();

// --- 6. BACK TO TOP FLOATING BUTTON (ALL PAGES) ---
(function initBackToTop() {
  if (document.getElementById("backToTopBtn")) return;
  const btn = document.createElement("button");
  btn.id = "backToTopBtn";
  btn.className = "back-to-top";
  btn.type = "button";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = "&uarr; Top";
  document.body.appendChild(btn);

  function updateVisibility() {
    if (window.scrollY > 360) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();

  btn.addEventListener("click", () => {
    setActiveNav("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
