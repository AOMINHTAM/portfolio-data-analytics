// --- 0. GA4 CUSTOM EVENT HELPER (SAFE NO-OP IF BLOCKED) ---
function trackEvent(eventName, params) {
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, params || {});
    } catch (_) {
      // Ignore analytics errors to never impact UX
    }
  }
}

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
    trackEvent("toggle_theme", { theme: isLight ? "light" : "dark" });
  });
}

// --- 2. COPY EMAIL HELPER ---
function copyEmail(triggerEl) {
  const email = "aominhtam@gmail.com";
  const location =
    triggerEl && triggerEl.classList && triggerEl.classList.contains("contact-card")
      ? "contact_grid"
      : "hero";
  trackEvent("click_contact", { method: "copy_email", location });

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
      const selected = btn.getAttribute("data-filter") || "all";
      applyProjectFilter(selected);
      trackEvent("filter_projects", { track: selected, source: "tab" });
    });
  });

  heroFilterTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const selected = trigger.getAttribute("data-hero-filter") || "all";
      applyProjectFilter(selected);
      trackEvent("filter_projects", { track: selected, source: "hero" });
    });
  });

  if (toggleProjectsBtn) {
    toggleProjectsBtn.addEventListener("click", () => {
      showAllProjects = !showAllProjects;
      renderProjectsVisibility();
      if (typeof updateScrollProgress === "function") updateScrollProgress();
      trackEvent("toggle_all_projects", {
        state: showAllProjects ? "expanded" : "collapsed",
      });
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

// --- 7. MOBILE HAMBURGER MENU (ALL PAGES) ---
(function initMobileNav() {
  const navbar = document.querySelector(".navbar");
  const navActions = document.querySelector(".nav-actions");
  const navMenu = document.querySelector(".nav-links");
  if (!navbar || !navActions || !navMenu || document.getElementById("mobileMenuBtn")) return;

  const menuBtn = document.createElement("button");
  menuBtn.id = "mobileMenuBtn";
  menuBtn.className = "nav-menu-btn";
  menuBtn.type = "button";
  menuBtn.setAttribute("aria-label", "Toggle navigation menu");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.textContent = "☰";
  navActions.appendChild(menuBtn);

  function closeMenu() {
    navbar.classList.remove("is-mobile-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  }

  menuBtn.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-mobile-open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

// --- 8. IN-PAGE IMAGE LIGHTBOX MODAL (DIAGRAMS & CHARTS) ---
(function initImageLightbox() {
  const targets = document.querySelectorAll(".detail-figure img, .evidence-card img");
  if (!targets.length) return;

  const backdrop = document.createElement("div");
  backdrop.id = "imageLightbox";
  backdrop.className = "lightbox-backdrop";
  backdrop.setAttribute("role", "dialog");
  backdrop.setAttribute("aria-modal", "true");
  backdrop.setAttribute("aria-hidden", "true");
  backdrop.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close image preview">&times;</button>
    <div class="lightbox-dialog">
      <img class="lightbox-img" src="" alt="" />
      <div class="lightbox-bar">
        <span class="lightbox-caption"></span>
        <a class="lightbox-open-raw" href="#" target="_blank" rel="noopener noreferrer">Open Full Size ↗</a>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const lbImg = backdrop.querySelector(".lightbox-img");
  const lbCaption = backdrop.querySelector(".lightbox-caption");
  const lbRaw = backdrop.querySelector(".lightbox-open-raw");
  const lbClose = backdrop.querySelector(".lightbox-close");

  function openLightbox(src, alt, captionText) {
    lbImg.src = src;
    lbImg.alt = alt || "Expanded figure";
    lbCaption.textContent = captionText || alt || "";
    lbRaw.href = src;
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    trackEvent("open_lightbox", { image_src: src || "" });
  }

  function closeLightbox() {
    if (!backdrop.classList.contains("is-open")) return;
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  targets.forEach((img) => {
    const parentLink = img.closest("a");
    const clickable = parentLink || img;
    clickable.addEventListener("click", (e) => {
      e.preventDefault();
      const fig = img.closest(".detail-figure");
      const ev = img.closest(".evidence-card");
      let cap = img.alt;
      if (fig && fig.querySelector("figcaption")) {
        cap = fig.querySelector("figcaption").textContent.trim();
      } else if (ev && ev.querySelector(".evidence-caption")) {
        cap = ev.querySelector(".evidence-caption").textContent.trim();
      }
      openLightbox(parentLink ? parentLink.getAttribute("href") : img.src, img.alt, cap);
    });
  });

  lbClose.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();

// --- 9. GA4 CUSTOM EVENT TRACKING (CASE STUDIES & CONTACT LINKS) ---
(function initAnalyticsTracking() {
  function extractSlug(anchor) {
    const explicit = anchor.getAttribute("data-case-slug");
    if (explicit) return explicit;
    const href = anchor.getAttribute("href") || "";
    const match = href.match(/([^/]+)\.html$/i);
    return match ? match[1] : href;
  }

  function detectLinkLocation(el) {
    if (el.closest(".contact-grid")) return "contact_grid";
    if (el.closest(".hero")) return "hero";
    if (el.closest(".project-card")) return "project_card";
    if (el.closest(".detail-card")) return "case_study";
    if (el.closest("#certifications")) return "credentials";
    return "other";
  }

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    // Case study navigation clicks (thumbnails, card buttons, prev/next bar)
    if (anchor.classList.contains("project-thumb")) {
      trackEvent("open_case_study", {
        project_slug: extractSlug(anchor),
        source: "card_thumb",
      });
      return;
    }

    if (anchor.classList.contains("case-nav-link")) {
      trackEvent("open_case_study", {
        project_slug: extractSlug(anchor),
        source: anchor.classList.contains("case-nav-link--prev") ? "prev_nav" : "next_nav",
      });
      return;
    }

    const href = anchor.getAttribute("href") || "";
    if (href.startsWith("projects/") && href.endsWith(".html")) {
      trackEvent("open_case_study", {
        project_slug: extractSlug(anchor),
        source: "card_btn",
      });
      return;
    }

    // Contact & outbound profile clicks
    if (href.startsWith("mailto:")) {
      trackEvent("click_contact", {
        method: "send_email",
        location: detectLinkLocation(anchor),
      });
    } else if (href.includes("linkedin.com")) {
      trackEvent("click_contact", {
        method: "linkedin",
        location: detectLinkLocation(anchor),
      });
    } else if (href.includes("github.com/AOMINHTAM")) {
      trackEvent("click_contact", {
        method: "github",
        location: detectLinkLocation(anchor),
      });
    } else if (href.includes("facebook.com")) {
      trackEvent("click_contact", {
        method: "community_share",
        location: detectLinkLocation(anchor),
      });
    }
  });
})();

// --- 10. CAREER ROADMAP 3D FLIP CARDS (TOUCH & KEYBOARD) ---
(function initRoadmapFlipCards() {
  const cards = document.querySelectorAll(".flip-card");
  if (!cards.length) return;

  const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");

  function toggleCard(card) {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!hoverCapable.matches) {
        toggleCard(card);
      }
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCard(card);
      }
    });
  });
})();
