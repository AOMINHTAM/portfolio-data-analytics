// --- 0. ENTRY PRELOADER (HOMEPAGE) ---
(function initPreloader() {
  const preloader = document.getElementById("pagePreloader");
  if (!preloader) {
    window.__preloaderDone = true;
    return;
  }

  window.__preloaderDone = false;
  const minDisplayMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 0
    : 1200;
  const startTime = Date.now();
  let dismissed = false;

  function dismissPreloader() {
    if (dismissed) return;
    dismissed = true;
    const elapsed = Date.now() - startTime;
    const waitMs = Math.max(0, minDisplayMs - elapsed);

    setTimeout(() => {
      preloader.classList.add("is-done");
      preloader.setAttribute("aria-hidden", "true");
      window.__preloaderDone = true;
      window.dispatchEvent(new CustomEvent("portfolio:preloader-done"));
      setTimeout(() => {
        if (preloader.parentNode) preloader.remove();
      }, 420);
    }, waitMs);
  }

  if (document.readyState === "complete") {
    dismissPreloader();
  } else {
    window.addEventListener("load", dismissPreloader, { once: true });
    // Safety fallback so slow third-party resources never trap visitors
    setTimeout(dismissPreloader, 2400);
  }
})();

// --- 0.5 GA4 CUSTOM EVENT HELPER (SAFE NO-OP IF BLOCKED) ---
function trackEvent(eventName, params) {
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, params || {});
    } catch (_) {
      // Ignore analytics errors to never impact UX
    }
  }
}

// --- 0.6 TOAST NOTIFICATION HELPER ---
let _toastEl = null;
let _toastTimer = null;
function showToast(message) {
  if (!message) return;
  if (!_toastEl) {
    _toastEl = document.createElement("div");
    _toastEl.className = "toast-banner";
    _toastEl.setAttribute("role", "status");
    _toastEl.setAttribute("aria-live", "polite");
    _toastEl.innerHTML = '<span class="toast-dot" aria-hidden="true"></span><span class="toast-msg"></span>';
    document.body.appendChild(_toastEl);
  }
  const msgEl = _toastEl.querySelector(".toast-msg");
  if (msgEl) msgEl.textContent = message;
  _toastEl.classList.add("is-visible");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => {
    if (_toastEl) _toastEl.classList.remove("is-visible");
  }, 2400);
}

// --- 1. DARK / LIGHT THEME TOGGLE ---
let currentLang = localStorage.getItem("lang") === "vi" ? "vi" : "en";
const themeBtn = document.getElementById('themeBtn');

function syncThemeButtonLabel() {
  if (!themeBtn) return;
  const isLight = document.body.classList.contains('light-theme');
  if (currentLang === "vi") {
    themeBtn.textContent = isLight ? '🌙 TỐI' : '☀ SÁNG';
  } else {
    themeBtn.textContent = isLight ? '🌙 DARK' : '☀ LIGHT';
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
}
syncThemeButtonLabel();

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');

    syncThemeButtonLabel();
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    showToast(
      currentLang === "vi"
        ? isLight ? "Đã bật Giao diện Sáng" : "Đã bật Giao diện Tối"
        : isLight ? "Switched to Light Theme" : "Switched to Dark Theme"
    );
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
    showToast(
      currentLang === "vi"
        ? `Đã sao chép email: ${email}`
        : `Copied email: ${email}`
    );

    if (triggerEl && triggerEl.classList && triggerEl.classList.contains("contact-card")) {
      const sub = triggerEl.querySelector(".contact-card-sub");
      if (sub) {
        const original = sub.innerHTML;
        sub.textContent = currentLang === "vi" ? "Đã sao chép! ✓" : "Copied! ✓";
        triggerEl.classList.add("is-copied");
        clearTimeout(triggerEl._copyTimer);
        triggerEl._copyTimer = setTimeout(() => {
          sub.innerHTML = original;
          triggerEl.classList.remove("is-copied");
        }, 2200);
      }
      return;
    }

    if (triggerEl && triggerEl.tagName === "BUTTON") {
      const original = triggerEl.innerHTML;
      triggerEl.textContent = currentLang === "vi" ? "✓ Đã chép Email" : "✓ Email Copied";
      clearTimeout(triggerEl._copyTimer);
      triggerEl._copyTimer = setTimeout(() => {
        triggerEl.innerHTML = original;
      }, 2200);
      return;
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(showCopiedFeedback).catch(() => {
      alert("Copy email manually: " + email);
    });
  } else {
    alert("Copy email manually: " + email);
  }
}

// --- 3. SCROLLSPY: HIGHLIGHT ACTIVE NAV LINK & SYNC URL HASH ON SCROLL ---
const sections = document.querySelectorAll("section[id]");
const navLinksList = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");
let navIndicator = null;

if (navLinksList && navLinks.length) {
  navIndicator = document.createElement("span");
  navIndicator.className = "nav-indicator";
  navIndicator.setAttribute("aria-hidden", "true");
  navLinksList.appendChild(navIndicator);
}

function updateNavIndicator() {
  if (!navIndicator || !navLinksList) return;
  const activeLink = navLinksList.querySelector("a.active");
  if (!activeLink || window.innerWidth <= 900) {
    navIndicator.classList.remove("is-ready");
    return;
  }
  const width = activeLink.offsetWidth;
  const left = activeLink.offsetLeft;
  if (width <= 0) return;
  navIndicator.style.width = `${width}px`;
  navIndicator.style.transform = `translateX(${left}px)`;
  navIndicator.classList.add("is-ready");
}

window.__updateNavIndicator = updateNavIndicator;
window.addEventListener("resize", updateNavIndicator, { passive: true });
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(updateNavIndicator).catch(() => {});
}

function syncUrlHash(sectionId) {
  if (!window.history || typeof window.history.replaceState !== "function") return;
  const targetHash = sectionId ? `#${sectionId}` : "";
  const hasTrailingEmptyHash = targetHash === "" && window.location.href.endsWith("#");
  if (window.location.hash === targetHash && !hasTrailingEmptyHash) return;
  try {
    const cleanBase = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", targetHash ? `${cleanBase}${targetHash}` : cleanBase);
  } catch (_) {
    // Ignore history errors on restricted protocols (e.g. file://)
  }
}

function setActiveNav(sectionId, options) {
  const syncUrl = Boolean(options && options.syncUrl);
  if (navLinks.length) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
    });
    updateNavIndicator();
  }
  if (syncUrl) {
    const hashId = options && "hashId" in options ? options.hashId : sectionId;
    syncUrlHash(hashId);
  }
}

function updateScrollSpy(options) {
  if (!sections.length || !navLinks.length) return;
  const syncUrl = Boolean(options && options.syncUrl);
  const scrollY = window.scrollY || window.pageYOffset;
  const firstSectionTop = sections[0].offsetTop - 140;
  const atBottom =
    window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40;

  if (scrollY < firstSectionTop) {
    setActiveNav("about", { syncUrl, hashId: "" });
    return;
  }

  if (atBottom) {
    const lastId = sections[sections.length - 1].getAttribute("id");
    if (lastId) setActiveNav(lastId, { syncUrl });
    return;
  }

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 140;
    const sectionId = current.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      setActiveNav(sectionId, { syncUrl });
    }
  });
}

window.addEventListener("scroll", () => updateScrollSpy({ syncUrl: true }), { passive: true });
window.addEventListener("load", () => updateScrollSpy({ syncUrl: true }));
updateScrollSpy({ syncUrl: false });

// Also reset nav to ABOUT ME and clear URL hash when clicking navbar logo at top
const navLogo = document.querySelector(".navbar .logo");
if (navLogo && navLogo.getAttribute("href") === "#") {
  navLogo.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveNav("about", { syncUrl: true, hashId: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
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

function renderProjectsVisibility(animateTransition) {
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    const isMatch = btn.getAttribute("data-filter") === currentFilter;
    btn.classList.toggle("active", isMatch);
    btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
  });

  let visibleIndex = 0;
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

    if (shouldShow && animateTransition) {
      card.classList.remove("reveal-item", "is-revealed", "reveal-done", "is-filter-enter");
      void card.offsetWidth;
      card.style.setProperty("--filter-delay", `${Math.min(visibleIndex * 45, 270)}ms`);
      card.classList.add("is-filter-enter");
      visibleIndex += 1;
    } else if (!shouldShow) {
      card.classList.remove("is-filter-enter");
    }
  });

  if (toggleProjectsWrap && toggleProjectsBtn) {
    if (currentFilter === "all") {
      toggleProjectsWrap.classList.remove("is-hidden");
      toggleProjectsBtn.setAttribute("aria-expanded", showAllProjects ? "true" : "false");
      if (currentLang === "vi") {
        toggleProjectsBtn.innerHTML = showAllProjects
          ? "Thu gọn còn 4 dự án tiêu biểu &uarr;"
          : "Xem tất cả 9 dự án (+5 Case Study Phân tích) &darr;";
      } else {
        toggleProjectsBtn.innerHTML = showAllProjects
          ? "Show Featured Only (4) &uarr;"
          : "Show All 9 Projects (+5 More Analytics Case Studies) &darr;";
      }
    } else {
      toggleProjectsWrap.classList.add("is-hidden");
    }
  }

  if (projectsIntro) {
    if (currentLang === "vi") {
      if (currentFilter === "all" && !showAllProjects) {
        projectsIntro.innerHTML =
          "Đang hiển thị <strong>4 dự án tiêu biểu</strong> (2 DE + 2 DA). Mở rộng bên dưới để xem đủ 9 case study hoặc lọc theo vị trí.";
      } else if (currentFilter === "all" && showAllProjects) {
        projectsIntro.innerHTML =
          "Đang hiển thị <strong>toàn bộ 9 dự án</strong> (2 Data Engineering + 7 Data Analytics).";
      } else if (currentFilter === "da") {
        projectsIntro.innerHTML =
          "Đang hiển thị <strong>7 dự án Data Analytics</strong> (Customer Intelligence, Phễu chuyển đổi, Retention &amp; Giỏ hàng).";
      } else if (currentFilter === "de") {
        projectsIntro.innerHTML =
          "Đang hiển thị <strong>2 dự án Data Engineering</strong> (AWS Event-Driven ELT V5.0.1 &amp; Snowflake Cloud ELT).";
      }
    } else {
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
}

function applyProjectFilter(selectedFilter) {
  currentFilter = selectedFilter || "all";
  renderProjectsVisibility(true);
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
      renderProjectsVisibility(true);
      if (typeof updateScrollProgress === "function") updateScrollProgress();
      trackEvent("toggle_all_projects", {
        state: showAllProjects ? "expanded" : "collapsed",
      });
    });
  }

  renderProjectsVisibility(false);
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
    const backBtn = document.getElementById("backToTopBtn");
    if (backBtn) {
      backBtn.style.setProperty("--scroll-pct", `${pct.toFixed(1)}%`);
    }
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
    setActiveNav("about", { syncUrl: true, hashId: "" });
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

  document.addEventListener("click", (e) => {
    if (navbar.classList.contains("is-mobile-open") && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

// --- 8. IN-PAGE IMAGE LIGHTBOX GALLERY (DIAGRAMS & CHARTS) ---
(function initImageLightbox() {
  const targets = document.querySelectorAll(".detail-figure img, .evidence-card img");
  if (!targets.length) return;

  const galleryItems = Array.from(targets).map((img) => {
    const parentLink = img.closest("a");
    return {
      img,
      clickable: parentLink || img,
      src: parentLink ? parentLink.getAttribute("href") : img.src,
      alt: img.alt || "Expanded figure",
      getCaption: () => {
        const fig = img.closest(".detail-figure");
        const ev = img.closest(".evidence-card");
        if (fig && fig.querySelector("figcaption")) {
          return fig.querySelector("figcaption").textContent.trim();
        }
        if (ev && ev.querySelector(".evidence-caption")) {
          return ev.querySelector(".evidence-caption").textContent.trim();
        }
        return img.alt || "";
      },
    };
  });

  const backdrop = document.createElement("div");
  backdrop.id = "imageLightbox";
  backdrop.className = "lightbox-backdrop";
  backdrop.setAttribute("role", "dialog");
  backdrop.setAttribute("aria-modal", "true");
  backdrop.setAttribute("aria-hidden", "true");
  backdrop.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close image preview">&times;</button>
    <button type="button" class="lightbox-nav lightbox-nav--prev" aria-label="Previous image">&lsaquo;</button>
    <button type="button" class="lightbox-nav lightbox-nav--next" aria-label="Next image">&rsaquo;</button>
    <div class="lightbox-dialog">
      <img class="lightbox-img" src="" alt="" />
      <div class="lightbox-bar">
        <span class="lightbox-caption"></span>
        <span class="lightbox-meta-right">
          <span class="lightbox-counter"></span>
          <a class="lightbox-open-raw" href="#" target="_blank" rel="noopener noreferrer">Open Full Size ↗</a>
        </span>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const lbImg = backdrop.querySelector(".lightbox-img");
  const lbCaption = backdrop.querySelector(".lightbox-caption");
  const lbCounter = backdrop.querySelector(".lightbox-counter");
  const lbRaw = backdrop.querySelector(".lightbox-open-raw");
  const lbClose = backdrop.querySelector(".lightbox-close");
  const lbPrev = backdrop.querySelector(".lightbox-nav--prev");
  const lbNext = backdrop.querySelector(".lightbox-nav--next");
  const lbDialog = backdrop.querySelector(".lightbox-dialog");

  let activeIndex = 0;
  let touchStartX = null;

  if (galleryItems.length <= 1) {
    lbPrev.style.display = "none";
    lbNext.style.display = "none";
    lbCounter.style.display = "none";
  }

  function renderSlide(index) {
    const total = galleryItems.length;
    activeIndex = ((index % total) + total) % total;
    const item = galleryItems[activeIndex];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    lbCaption.textContent = item.getCaption();
    lbRaw.href = item.src;
    if (total > 1) {
      lbCounter.textContent = `${activeIndex + 1} / ${total}`;
    }
  }

  function openLightbox(index) {
    renderSlide(index);
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    trackEvent("open_lightbox", { image_src: galleryItems[activeIndex].src || "" });
  }

  function closeLightbox() {
    if (!backdrop.classList.contains("is-open")) return;
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item, idx) => {
    item.clickable.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });

  lbPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    renderSlide(activeIndex - 1);
  });
  lbNext.addEventListener("click", (e) => {
    e.stopPropagation();
    renderSlide(activeIndex + 1);
  });

  lbDialog.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
      }
    },
    { passive: true }
  );

  lbDialog.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null || !e.changedTouches || !e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (galleryItems.length > 1 && Math.abs(dx) > 45) {
        renderSlide(dx < 0 ? activeIndex + 1 : activeIndex - 1);
      }
    },
    { passive: true }
  );

  lbClose.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!backdrop.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (galleryItems.length > 1 && e.key === "ArrowLeft") renderSlide(activeIndex - 1);
    else if (galleryItems.length > 1 && e.key === "ArrowRight") renderSlide(activeIndex + 1);
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

    if (href.endsWith(".pdf")) {
      trackEvent("open_resume", { location: detectLinkLocation(anchor) });
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

// --- 11. BILINGUAL I18N (EN / VI) ENGINE ---
(function initBilingualI18n() {
  const navActions = document.querySelector(".nav-actions");
  if (!navActions || document.getElementById("langBtn")) return;

  const langBtn = document.createElement("button");
  langBtn.id = "langBtn";
  langBtn.className = "lang-toggle";
  langBtn.type = "button";
  langBtn.setAttribute("aria-label", "Switch language between English and Vietnamese");
  navActions.insertBefore(langBtn, navActions.firstChild);

  const path = (window.location.pathname || "").replace(/\\/g, "/");
  const projMatch = path.match(/\/projects\/([^/]+?)\.html$/i);
  const pageId = projMatch ? projMatch[1] : "home";
  const i18nBase = projMatch ? "../i18n" : "i18n";
  const pageScriptPath = projMatch ? `${i18nBase}/projects/${pageId}.js` : `${i18nBase}/${pageId}.js`;

  const SELECTORS = [
    "nav .nav-links a",
    ".status-badge span:last-child",
    ".sub-headline",
    ".hero-title",
    ".hero-desc",
    ".cta-row a",
    ".cta-row button",
    ".resume-link-text",
    ".location-tag",
    ".avatar-caption",
    ".snapshot-stat span",
    ".snapshot-stack",
    "h1", "h2", "h3", "h3 a", "h4",
    ".section-title",
    ".card-body p",
    ".timeline-date",
    ".timeline-role",
    ".timeline-desc",
    ".pipeline-pulse-title",
    ".pipeline-pulse-link",
    ".skill-card .card-sub",
    ".skill-tier-label",
    ".skill-applied",
    ".filter-btn",
    ".project-badge",
    ".project-card .project-desc",
    ".project-card .project-bullets li",
    ".project-card .project-highlights li",
    ".project-card .project-links a",
    ".project-thumb-caption span",
    ".project-card .project-actions a",
    ".cert-status",
    ".cert-issuer",
    ".cert-action a",
    ".roadmap-vision",
    ".roadmap-horizon",
    ".roadmap-years",
    ".flip-year-display",
    ".flip-front-tag",
    ".flip-hint",
    ".roadmap-list li",
    ".contact-sub",
    ".contact-card-title",
    ".contact-card-sub",
    ".footer-updated",
    "footer p:last-child",
    ".back-link",
    ".detail-meta span",
    ".scope-item",
    ".detail-block > p",
    ".detail-block > ul li",
    ".detail-block > ol li",
    ".method-box p",
    ".method-box li",
    ".callout p",
    ".callout li",
    ".hypothesis-note",
    "figcaption",
    ".evidence-caption",
    ".detail-card .project-actions a",
    ".case-nav-dir",
    ".case-nav-title",
    "table th",
    "table td",
  ];

  const _tmpl = document.createElement("template");
  function canonHtml(raw) {
    _tmpl.innerHTML = raw;
    return _tmpl.innerHTML.replace(/\s+/g, " ").trim();
  }

  const originalEn = new WeakMap();
  const originalTitle = document.title;
  const loadedScripts = new Set();

  function loadScript(src) {
    if (loadedScripts.has(src)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.onload = () => {
        loadedScripts.add(src);
        resolve();
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function collectTargets() {
    const set = new Set();
    SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.closest("svg")) return;
        if (el.tagName === "H3" && el.children.length === 1 && el.children[0].tagName === "A") {
          return;
        }
        set.add(el);
      });
    });
    return Array.from(set).filter(
      (el) => !Array.from(set).some((other) => other !== el && other.contains(el))
    );
  }

  function renderLangButton(lang) {
    langBtn.innerHTML =
      `<span class="lang-opt ${lang === "en" ? "is-active" : ""}">EN</span>` +
      `<span class="lang-sep">/</span>` +
      `<span class="lang-opt ${lang === "vi" ? "is-active" : ""}">VI</span>`;
    langBtn.setAttribute("aria-pressed", String(lang === "vi"));
  }

  function syncExtraDynamicText(lang) {
    syncThemeButtonLabel();
    if (typeof renderProjectsVisibility === "function") {
      renderProjectsVisibility();
    }
    const backBtn = document.getElementById("backToTopBtn");
    if (backBtn) {
      backBtn.innerHTML = lang === "vi" ? "&uarr; Lên đầu" : "&uarr; Top";
      backBtn.setAttribute("aria-label", lang === "vi" ? "Lên đầu trang" : "Back to top");
    }
    const lbRaw = document.querySelector(".lightbox-open-raw");
    if (lbRaw) {
      lbRaw.textContent = lang === "vi" ? "Mở ảnh gốc ↗" : "Open Full Size ↗";
    }
  }

  async function applyLanguage(lang, isUserAction) {
    currentLang = lang === "vi" ? "vi" : "en";
    localStorage.setItem("lang", currentLang);
    document.documentElement.lang = currentLang;
    renderLangButton(currentLang);

    const targets = collectTargets();
    targets.forEach((el) => {
      if (!originalEn.has(el)) {
        originalEn.set(el, el.innerHTML);
      }
    });

    if (currentLang === "vi") {
      try {
        await Promise.all([
          loadScript(`${i18nBase}/common.js`),
          loadScript(pageScriptPath),
        ]);
      } catch (_) {
        currentLang = "en";
        localStorage.setItem("lang", "en");
        document.documentElement.lang = "en";
        renderLangButton("en");
        return;
      }

      const store = window.__I18N_VI__ || {};
      const merged = Object.assign({}, store.common || {}, store[pageId] || {});
      const map = new Map();
      Object.keys(merged).forEach((k) => {
        map.set(canonHtml(k), merged[k]);
      });

      const titles = store.titles || {};
      if (titles[pageId]) {
        document.title = titles[pageId];
      }

      if (typeof window.__cancelTextAnimations === "function") {
        window.__cancelTextAnimations();
      }

      targets.forEach((el) => {
        const orig = originalEn.get(el);
        const tr = map.get(canonHtml(orig));
        if (tr !== undefined) {
          el.innerHTML = tr;
        }
      });
    } else {
      if (typeof window.__cancelTextAnimations === "function") {
        window.__cancelTextAnimations();
      }

      document.title = originalTitle;
      targets.forEach((el) => {
        const orig = originalEn.get(el);
        if (orig !== undefined) {
          el.innerHTML = orig;
        }
      });
    }

    syncExtraDynamicText(currentLang);
    if (typeof window.__updateNavIndicator === "function") {
      window.__updateNavIndicator();
    }
    if (typeof window.__refreshPipelineBar === "function") {
      window.__refreshPipelineBar();
    }
    if (typeof window.__refreshCaseStudyMeta === "function") {
      window.__refreshCaseStudyMeta();
    }
    if (typeof updateScrollProgress === "function") updateScrollProgress();
    if (isUserAction) {
      if (typeof window.__replayHeroTypewriter === "function") {
        window.__replayHeroTypewriter();
      }
      showToast(currentLang === "vi" ? "Đã chuyển sang Tiếng Việt" : "Switched to English");
      trackEvent("switch_language", { language: currentLang, page: pageId });
    }
  }

  langBtn.addEventListener("click", () => {
    const next = currentLang === "vi" ? "en" : "vi";
    applyLanguage(next, true);
  });

  // Cache pristine English HTML synchronously before any text animations mutate DOM
  collectTargets().forEach((el) => {
    if (!originalEn.has(el)) {
      originalEn.set(el, el.innerHTML);
    }
  });

  renderLangButton(currentLang);
  window.__i18nReadyPromise =
    currentLang === "vi" ? applyLanguage("vi", false) : Promise.resolve();
})();

// --- 12. TYPEWRITER TEXT REVEAL & SNAPSHOT COUNT-UP (HOMEPAGE & CASE STUDIES) ---
(function initTextAnimations() {
  const heroDesc = document.querySelector(".hero-desc");
  const subHeadline = document.querySelector(".sub-headline");
  const sectionTitles = document.querySelectorAll(".section-title");
  const snapshotBox = document.querySelector(".snapshot-metrics");
  const detailBadge = document.querySelector(".detail-header .project-badge");
  const detailTitle = document.querySelector(".detail-header h1");
  const detailHeadings = document.querySelectorAll(".detail-block h2");
  if (
    !heroDesc &&
    !subHeadline &&
    !sectionTitles.length &&
    !snapshotBox &&
    !detailBadge &&
    !detailTitle &&
    !detailHeadings.length
  ) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const activeTypewriters = new Map();
  const activeMetrics = new Set();

  function cancelTypewriter(el) {
    const job = activeTypewriters.get(el);
    if (!job) return;
    clearTimeout(job.timerId);
    clearTimeout(job.fadeTimerId);
    if (job.cursor && job.cursor.parentNode) {
      job.cursor.remove();
    }
    if (typeof job.sourceHtml === "string") {
      el.innerHTML = job.sourceHtml;
    }
    el.style.minHeight = "";
    el.style.visibility = "";
    activeTypewriters.delete(el);
  }

  function cancelAllAnimations() {
    Array.from(activeTypewriters.keys()).forEach(cancelTypewriter);
    document
      .querySelectorAll(
        ".hero-title .accent-text, .hero-desc, .sub-headline, .detail-header .project-badge, .detail-header h1"
      )
      .forEach((el) => {
        el.style.visibility = "";
      });
    activeMetrics.forEach((rafId) => cancelAnimationFrame(rafId));
    activeMetrics.clear();
  }

  function typeElement(el, opts) {
    const options = opts || {};
    const charDelay = options.charDelay || 28;
    const chunkSize = options.chunkSize || 1;
    const keepCursorMs = typeof options.keepCursorMs === "number" ? options.keepCursorMs : 600;
    const onDone = options.onDone;

    if (!el || reducedMotion) {
      if (onDone) onDone();
      return;
    }

    cancelTypewriter(el);

    const sourceHtml = el.innerHTML;
    const rectHeight = el.getBoundingClientRect().height;
    if (rectHeight > 0) {
      el.style.minHeight = `${Math.ceil(rectHeight)}px`;
    }

    const tpl = document.createElement("template");
    tpl.innerHTML = sourceHtml;

    const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_TEXT);
    const segments = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      if (currentNode.nodeValue && /\S/.test(currentNode.nodeValue)) {
        segments.push({ node: currentNode, text: currentNode.nodeValue });
        currentNode.nodeValue = "";
      }
      currentNode = walker.nextNode();
    }

    if (!segments.length) {
      el.style.minHeight = "";
      if (onDone) onDone();
      return;
    }

    el.innerHTML = "";
    el.appendChild(tpl.content);
    el.style.visibility = "";

    const cursor = document.createElement("span");
    cursor.className = "tw-cursor";
    cursor.setAttribute("aria-hidden", "true");
    segments[0].node.parentNode.insertBefore(cursor, segments[0].node.nextSibling);

    const job = { timerId: null, fadeTimerId: null, cursor, sourceHtml };
    activeTypewriters.set(el, job);

    let segIdx = 0;
    let charIdx = 0;

    function tick() {
      if (!activeTypewriters.has(el)) return;
      const seg = segments[segIdx];
      charIdx = Math.min(seg.text.length, charIdx + chunkSize);
      seg.node.nodeValue = seg.text.slice(0, charIdx);

      if (cursor.parentNode !== seg.node.parentNode || cursor.previousSibling !== seg.node) {
        seg.node.parentNode.insertBefore(cursor, seg.node.nextSibling);
      }

      if (charIdx >= seg.text.length) {
        segIdx += 1;
        charIdx = 0;
        if (segIdx >= segments.length) {
          el.style.minHeight = "";
          if (keepCursorMs <= 0) {
            cursor.remove();
            activeTypewriters.delete(el);
          } else {
            job.fadeTimerId = setTimeout(() => {
              cursor.classList.add("is-fading");
              job.fadeTimerId = setTimeout(() => {
                if (cursor.parentNode) cursor.remove();
                activeTypewriters.delete(el);
              }, 360);
            }, keepCursorMs);
          }
          if (onDone) onDone();
          return;
        }
      }

      job.timerId = setTimeout(tick, charDelay);
    }

    job.timerId = setTimeout(tick, charDelay);
  }

  function runHeroTypewriter() {
    if (reducedMotion) return;
    const accentName = document.querySelector(".hero-title .accent-text");
    const steps = [];

    if (subHeadline) {
      steps.push({ el: subHeadline, charDelay: 16, chunkSize: 2, keepCursorMs: 0 });
    }
    if (accentName) {
      steps.push({ el: accentName, charDelay: 38, chunkSize: 1, keepCursorMs: 0 });
    }
    if (heroDesc) {
      steps.push({ el: heroDesc, charDelay: 14, chunkSize: 2, keepCursorMs: 750 });
    }

    steps.forEach((step, idx) => {
      if (idx > 0) step.el.style.visibility = "hidden";
    });

    function runStep(index) {
      if (index >= steps.length) return;
      const step = steps[index];
      typeElement(step.el, {
        charDelay: step.charDelay,
        chunkSize: step.chunkSize,
        keepCursorMs: step.keepCursorMs,
        onDone: () => runStep(index + 1),
      });
    }

    runStep(0);
  }

  function runCaseHeaderTypewriter() {
    if (reducedMotion || (!detailBadge && !detailTitle)) return;
    const steps = [];

    if (detailBadge) {
      steps.push({ el: detailBadge, charDelay: 14, chunkSize: 2, keepCursorMs: 0 });
    }
    if (detailTitle) {
      steps.push({ el: detailTitle, charDelay: 22, chunkSize: 1, keepCursorMs: 700 });
    }

    steps.forEach((step, idx) => {
      if (idx > 0) step.el.style.visibility = "hidden";
    });

    function runStep(index) {
      if (index >= steps.length) return;
      const step = steps[index];
      typeElement(step.el, {
        charDelay: step.charDelay,
        chunkSize: step.chunkSize,
        keepCursorMs: step.keepCursorMs,
        onDone: () => runStep(index + 1),
      });
    }

    runStep(0);
  }

  function runPageHeaderTypewriter() {
    runHeroTypewriter();
    runCaseHeaderTypewriter();
  }

  function animateSnapshotStats() {
    if (!snapshotBox || reducedMotion || snapshotBox.dataset.twDone === "1") return;
    snapshotBox.dataset.twDone = "1";

    snapshotBox.querySelectorAll(".snapshot-stat strong").forEach((el) => {
      const raw = el.textContent.trim();
      const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
      if (!match) {
        typeElement(el, { charDelay: 55, chunkSize: 1, keepCursorMs: 400 });
        return;
      }

      const target = parseFloat(match[1]);
      const decimals = (match[1].split(".")[1] || "").length;
      const suffix = match[2] || "";
      const duration = 850;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = progress >= 1 ? raw : `${current.toFixed(decimals)}${suffix}`;
        if (progress < 1) {
          const rafId = requestAnimationFrame(frame);
          activeMetrics.add(rafId);
        }
      }

      const rafId = requestAnimationFrame(frame);
      activeMetrics.add(rafId);
    });
  }

  function observeViewportAnimations() {
    if (reducedMotion || typeof IntersectionObserver !== "function") return;

    if (snapshotBox) {
      const snapObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              snapObserver.unobserve(snapshotBox);
              animateSnapshotStats();
            }
          });
        },
        { threshold: 0.25 }
      );
      snapObserver.observe(snapshotBox);
    }

    if (sectionTitles.length) {
      const titleObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const titleEl = entry.target;
            if (titleEl.dataset.twDone === "1") return;
            titleEl.dataset.twDone = "1";
            titleObserver.unobserve(titleEl);
            typeElement(titleEl, { charDelay: 32, chunkSize: 1, keepCursorMs: 650 });
          });
        },
        { threshold: 0.35, rootMargin: "0px 0px -30px 0px" }
      );
      sectionTitles.forEach((titleEl) => titleObserver.observe(titleEl));
    }

    if (detailHeadings.length) {
      const detailHeadingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const h2El = entry.target;
            if (h2El.dataset.twDone === "1") return;
            h2El.dataset.twDone = "1";
            detailHeadingObserver.unobserve(h2El);
            typeElement(h2El, { charDelay: 22, chunkSize: 1, keepCursorMs: 550 });
          });
        },
        { threshold: 0.25, rootMargin: "0px 0px -24px 0px" }
      );
      detailHeadings.forEach((h2El) => detailHeadingObserver.observe(h2El));
    }
  }

  function startEntryAnimations() {
    const ready = window.__i18nReadyPromise || Promise.resolve();
    ready.finally(() => {
      runPageHeaderTypewriter();
      observeViewportAnimations();
    });
  }

  window.__cancelTextAnimations = cancelAllAnimations;
  window.__replayHeroTypewriter = runPageHeaderTypewriter;

  if (window.__preloaderDone) {
    startEntryAnimations();
  } else {
    window.addEventListener("portfolio:preloader-done", startEntryAnimations, { once: true });
  }
})();

// --- 13. MOUSE SPOTLIGHT GLOW & SCROLL REVEAL STAGGER ---
(function initAmbientMotion() {
  const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCaseStudy = Boolean(document.querySelector(".detail-header"));

  if (isCaseStudy) {
    document.body.classList.add("is-case-study");
  }

  // Mouse-tracking radial amber spotlight on cards
  if (hoverFine && !reducedMotion) {
    const spotlightTargets = document.querySelectorAll(
      ".card, .contact-card, .snapshot-frame, .pipeline-pulse-card, .scope-box, .detail-figure, .evidence-card, .case-nav-link"
    );
    spotlightTargets.forEach((card) => {
      card.addEventListener(
        "pointermove",
        (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${(e.clientX - rect.left).toFixed(1)}px`);
          card.style.setProperty("--my", `${(e.clientY - rect.top).toFixed(1)}px`);
        },
        { passive: true }
      );
    });
  }

  // Staggered scroll reveal for homepage & case study blocks
  const hasHomeSections = document.querySelectorAll("section[id]").length > 0;
  if ((!hasHomeSections && !isCaseStudy) || reducedMotion || typeof IntersectionObserver !== "function") {
    return;
  }

  document.documentElement.classList.add("js-anim");

  const revealGroups = hasHomeSections
    ? [
        { selector: "#about .card-body", step: 0 },
        { selector: "#experience .timeline-item", step: 90 },
        { selector: "#architecture .pipeline-pulse-card", step: 0 },
        { selector: "#architecture .skill-card", step: 75 },
        { selector: "#projects .project-card:not(.is-hidden)", step: 75 },
        { selector: "#certifications .cert-card", step: 85 },
        { selector: "#roadmap .flip-card", step: 80 },
        { selector: "#contact .contact-card", step: 65 },
      ]
    : [
        { selector: ".detail-header .detail-meta span", step: 55 },
        { selector: ".detail-card .detail-block", step: 0 },
        { selector: ".scope-box .scope-item", step: 65 },
        { selector: ".evidence-grid .evidence-card", step: 80 },
        { selector: ".case-nav .case-nav-link", step: 80 },
      ];

  const targets = [];
  revealGroups.forEach((group) => {
    document.querySelectorAll(group.selector).forEach((el, idx) => {
      const delay = Math.min(idx * group.step, 260);
      el.classList.add("reveal-item");
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.dataset.revealDelay = String(delay);
      targets.push(el);
    });
  });

  if (!targets.length) return;

  function beginObserving() {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          revealObserver.unobserve(el);
          el.classList.add("is-revealed");
          const delay = Number(el.dataset.revealDelay || "0");
          setTimeout(() => {
            el.classList.add("reveal-done");
          }, delay + 540);
        });
      },
      { threshold: isCaseStudy ? 0.01 : 0.1, rootMargin: "0px 0px -24px 0px" }
    );

    targets.forEach((el) => revealObserver.observe(el));
  }

  if (window.__preloaderDone) {
    beginObserving();
  } else {
    window.addEventListener("portfolio:preloader-done", beginObserving, { once: true });
  }
})();

// --- 14. INTERACTIVE ELT PIPELINE NODES (HOMEPAGE) ---
(function initInteractivePipeline() {
  const nodes = document.querySelectorAll(".pipeline-node[data-pipeline-node]");
  const bar = document.getElementById("pipelineDetailBar");
  if (!nodes.length || !bar) return;

  const SPECS = {
    s3: {
      stage: "INGEST",
      en: "Amazon S3: Versioned <code>raw/</code> landing zone fires <code>s3:ObjectCreated:*</code> events with zero polling.",
      vi: "Amazon S3: Vùng lưu trữ <code>raw/</code> có Versioning tự phát sự kiện <code>s3:ObjectCreated:*</code> không cần cron quét.",
    },
    sqs: {
      stage: "QUEUE",
      en: "SQS + DLQ: <code>20s</code> Long Polling, <code>VisibilityTimeout=900s</code>, <code>maxReceiveCount=3</code> + CloudWatch/SNS alarm.",
      vi: "SQS + DLQ: Long Polling <code>20s</code>, <code>VisibilityTimeout=900s</code>, <code>maxReceiveCount=3</code> kèm cảnh báo CloudWatch/SNS.",
    },
    airflow: {
      stage: "TRIGGER",
      en: "Airflow 3 (AssetWatcher): Event-driven DAG trigger yields <strong>0 empty runs</strong> and <strong>$0</strong> idle compute.",
      vi: "Airflow 3 (AssetWatcher): Kích hoạt DAG theo sự kiện đạt <strong>0 lần chạy rỗng</strong> và <strong>$0</strong> chi phí chờ.",
    },
    redshift: {
      stage: "LOAD",
      en: "Redshift Serverless: Two-phase <code>TEMP TABLE</code> swap + CSV header guard + <code>ops.pipeline_ingestion_audit</code> Safe ACK.",
      vi: "Redshift Serverless: Swap <code>TEMP TABLE</code> hai pha + kiểm tra header CSV + Safe ACK ghi nhận tại <code>ops.pipeline_ingestion_audit</code>.",
    },
    dbt: {
      stage: "MODEL",
      en: "dbt Core (Cosmos): Builds Kimball Star Schema marts &amp; executes <strong>11 automated schema/freshness tests</strong>.",
      vi: "dbt Core (Cosmos): Xây dựng Star Schema Marts chuẩn Kimball &amp; chạy <strong>11 kiểm thử tự động</strong> về chất lượng dữ liệu.",
    },
  };

  let activeKey = "s3";

  function selectNode(key) {
    const spec = SPECS[key] || SPECS.s3;
    activeKey = key in SPECS ? key : "s3";

    nodes.forEach((btn) => {
      const match = btn.getAttribute("data-pipeline-node") === activeKey;
      btn.classList.toggle("is-active", match);
      btn.setAttribute("aria-pressed", match ? "true" : "false");
    });

    const stageEl = bar.querySelector(".pipeline-detail-stage");
    const textEl = bar.querySelector(".pipeline-detail-text");
    if (stageEl) stageEl.textContent = spec.stage;
    if (textEl) textEl.innerHTML = currentLang === "vi" ? spec.vi : spec.en;
  }

  nodes.forEach((btn) => {
    const key = btn.getAttribute("data-pipeline-node");
    btn.addEventListener("click", () => selectNode(key));
    btn.addEventListener("mouseenter", () => selectNode(key));
    btn.addEventListener("focus", () => selectNode(key));
  });

  window.__refreshPipelineBar = () => selectNode(activeKey);
  selectNode(activeKey);
})();

// --- 15. CASE STUDY MINI-TOC & READING TIME ---
(function initCaseStudyMeta() {
  const detailCard = document.querySelector(".detail-card");
  const detailMeta = document.querySelector(".detail-meta");
  if (!detailCard) return;

  const headings = Array.from(detailCard.querySelectorAll(".detail-block h2"));
  let readMetaSpan = null;
  let tocNav = null;

  function computeMinutes() {
    const text = (detailCard.textContent || "").trim();
    const words = text ? text.split(/\s+/).length : 0;
    return Math.max(1, Math.round(words / 200));
  }

  function renderReadTime() {
    if (!detailMeta) return;
    if (!readMetaSpan) {
      readMetaSpan = document.createElement("span");
      readMetaSpan.className = "reading-time-meta";
      detailMeta.appendChild(readMetaSpan);
    }
    const mins = computeMinutes();
    readMetaSpan.innerHTML =
      currentLang === "vi"
        ? `<strong>Thời lượng:</strong> ~${mins} phút đọc`
        : `<strong>Read Time:</strong> ~${mins} min`;
  }

  function buildOrRefreshToc() {
    if (headings.length < 2) return;
    if (!tocNav) {
      tocNav = document.createElement("nav");
      tocNav.className = "case-toc";
      tocNav.setAttribute("aria-label", "Case study sections");
      detailCard.insertBefore(tocNav, detailCard.firstChild);
    }
    tocNav.innerHTML = "";
    headings.forEach((h2, idx) => {
      if (!h2.id) h2.id = `case-sec-${idx + 1}`;
      const pill = document.createElement("a");
      pill.href = `#${h2.id}`;
      pill.className = "case-toc-pill";
      pill.textContent = h2.textContent.trim();
      tocNav.appendChild(pill);
    });
  }

  function updateActiveToc() {
    if (!tocNav || !headings.length) return;
    const pills = tocNav.querySelectorAll(".case-toc-pill");
    let activeIdx = 0;
    const offset = 135;
    headings.forEach((h2, idx) => {
      if (h2.getBoundingClientRect().top <= offset) {
        activeIdx = idx;
      }
    });
    pills.forEach((p, idx) => p.classList.toggle("is-active", idx === activeIdx));
  }

  renderReadTime();
  buildOrRefreshToc();
  updateActiveToc();
  window.addEventListener("scroll", updateActiveToc, { passive: true });

  window.__refreshCaseStudyMeta = function () {
    renderReadTime();
    buildOrRefreshToc();
    updateActiveToc();
  };
})();

// --- 16. QUICK COMMAND PALETTE (CTRL+K / CMD+K) ---
(function initCommandPalette() {
  const navActions = document.querySelector(".nav-actions");
  if (!navActions || document.getElementById("cmdPaletteBtn")) return;

  const isSubpage = /\/projects\/[^/]+?\.html$/i.test((window.location.pathname || "").replace(/\\/g, "/"));
  const homePrefix = isSubpage ? "../index.html" : "";
  const projPrefix = isSubpage ? "" : "projects/";
  const resumeHref = isSubpage ? "../assets/Ao-Minh-Tam-Resume.pdf" : "assets/Ao-Minh-Tam-Resume.pdf";

  const triggerBtn = document.createElement("button");
  triggerBtn.id = "cmdPaletteBtn";
  triggerBtn.className = "cmd-trigger";
  triggerBtn.type = "button";
  triggerBtn.setAttribute("aria-label", "Quick search and navigation (Ctrl+K)");
  triggerBtn.innerHTML = '<span>⌘</span><kbd>Ctrl K</kbd>';
  navActions.insertBefore(triggerBtn, navActions.firstChild);

  const backdrop = document.createElement("div");
  backdrop.id = "cmdPalette";
  backdrop.className = "cmd-backdrop";
  backdrop.setAttribute("role", "dialog");
  backdrop.setAttribute("aria-modal", "true");
  backdrop.setAttribute("aria-hidden", "true");
  backdrop.innerHTML = `
    <div class="cmd-modal">
      <div class="cmd-search-wrap">
        <span class="cmd-search-icon" aria-hidden="true">⌕</span>
        <input type="text" class="cmd-input" autocomplete="off" spellcheck="false" />
        <span class="cmd-esc">ESC</span>
      </div>
      <div class="cmd-list" role="listbox"></div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const input = backdrop.querySelector(".cmd-input");
  const listEl = backdrop.querySelector(".cmd-list");
  let filteredItems = [];
  let selectedIdx = 0;

  function getCommands() {
    const vi = currentLang === "vi";
    return [
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: "AWS Event-Driven ELT Pipeline (V5.0.1)",
        sub: "DE • CloudFormation, SQS, Airflow 3, Redshift, dbt",
        action: () => { window.location.href = `${projPrefix}aws-data-pipeline.html`; },
      },
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: vi ? "Cloud ELT Snowflake, dbt & Airflow" : "Snowflake & dbt Cloud ELT Pipeline",
        sub: "DE • Snowflake, Cosmos, Star Schema",
        action: () => { window.location.href = `${projPrefix}data-pipeline.html`; },
      },
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: vi ? "Customer 360 & Phân khúc RFM" : "Customer 360 & RFM Segmentation",
        sub: "DA • Python, Pandas, Squarify",
        action: () => { window.location.href = `${projPrefix}rfm-segmentation.html`; },
      },
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: vi ? "Hiệu suất Sản phẩm & Phễu Chuyển đổi" : "Product Performance & Conversion Funnel",
        sub: "DA • Plotly Funnel, Maven Fuzzy Factory",
        action: () => { window.location.href = `${projPrefix}product-funnel.html`; },
      },
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: vi ? "Phân tích Cohort & Giữ chân Khách hàng" : "Cohort Retention Dynamics",
        sub: "DA • Cohort Heatmaps, LTV",
        action: () => { window.location.href = `${projPrefix}cohort-retention.html`; },
      },
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: vi ? "Hành trình Người dùng (Sankey)" : "User Journey Sankey Flows",
        sub: "DA • Plotly Sankey DAG, 1.18M pageviews",
        action: () => { window.location.href = `${projPrefix}user-journey-sankey.html`; },
      },
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: vi ? "Phân tích Giỏ hàng (Market Basket)" : "Market Basket Analysis (Apriori)",
        sub: "DA • mlxtend, Lift 4.25",
        action: () => { window.location.href = `${projPrefix}market-basket.html`; },
      },
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: vi ? "Lợi nhuận Khách hàng Pareto ABC" : "Customer Profitability Pareto ABC",
        sub: "DA • IQR Audit, 500 VIP Budget",
        action: () => { window.location.href = `${projPrefix}abc-inventory.html`; },
      },
      {
        group: vi ? "Case Studies (9)" : "Case Studies (9)",
        label: vi ? "Đóng góp Doanh thu Pareto 80/20" : "Pareto 80/20 Revenue Analysis",
        sub: "DA • Net Revenue, Gross Margin",
        action: () => { window.location.href = `${projPrefix}pareto-revenue.html`; },
      },
      {
        group: vi ? "Điều hướng" : "Navigation",
        label: vi ? "Giới thiệu (About Me)" : "About Me",
        sub: "#about",
        action: () => { window.location.href = `${homePrefix}#about`; },
      },
      {
        group: vi ? "Điều hướng" : "Navigation",
        label: vi ? "Học vấn & AWS FCJ" : "Education & Activities",
        sub: "#experience",
        action: () => { window.location.href = `${homePrefix}#experience`; },
      },
      {
        group: vi ? "Điều hướng" : "Navigation",
        label: vi ? "Kỹ năng & Pipeline Flow" : "Tech Stack & Pipeline Flow",
        sub: "#architecture",
        action: () => { window.location.href = `${homePrefix}#architecture`; },
      },
      {
        group: vi ? "Điều hướng" : "Navigation",
        label: vi ? "Dự án nổi bật" : "Featured Projects",
        sub: "#projects",
        action: () => { window.location.href = `${homePrefix}#projects`; },
      },
      {
        group: vi ? "Điều hướng" : "Navigation",
        label: vi ? "Chứng chỉ & Đào tạo" : "Credentials & Training",
        sub: "#certifications",
        action: () => { window.location.href = `${homePrefix}#certifications`; },
      },
      {
        group: vi ? "Điều hướng" : "Navigation",
        label: vi ? "Lộ trình 3 / 5 / 10 năm" : "Career Roadmap",
        sub: "#roadmap",
        action: () => { window.location.href = `${homePrefix}#roadmap`; },
      },
      {
        group: vi ? "Điều hướng" : "Navigation",
        label: vi ? "Liên hệ (Contact)" : "Get in Touch",
        sub: "#contact",
        action: () => { window.location.href = `${homePrefix}#contact`; },
      },
      {
        group: vi ? "Thao tác nhanh" : "Quick Actions",
        label: vi ? "Mở CV (Resume PDF)" : "Open Resume (PDF)",
        sub: "Ao-Minh-Tam-Resume.pdf",
        action: () => { window.open(resumeHref, "_blank", "noopener,noreferrer"); },
      },
      {
        group: vi ? "Thao tác nhanh" : "Quick Actions",
        label: vi ? "Sao chép Email (aominhtam@gmail.com)" : "Copy Email (aominhtam@gmail.com)",
        sub: vi ? "Chép vào clipboard" : "Copy to clipboard",
        action: () => { copyEmail(null); },
      },
      {
        group: vi ? "Thao tác nhanh" : "Quick Actions",
        label: vi ? "Đổi Giao diện Sáng / Tối" : "Toggle Dark / Light Theme",
        sub: "Theme",
        action: () => { if (themeBtn) themeBtn.click(); },
      },
      {
        group: vi ? "Thao tác nhanh" : "Quick Actions",
        label: vi ? "Chuyển ngôn ngữ (EN / VI)" : "Switch Language (EN / VI)",
        sub: "i18n",
        action: () => {
          const lb = document.getElementById("langBtn");
          if (lb) lb.click();
        },
      },
    ];
  }

  function renderList() {
    const q = (input.value || "").trim().toLowerCase();
    const all = getCommands();
    filteredItems = q
      ? all.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.sub.toLowerCase().includes(q) ||
            item.group.toLowerCase().includes(q)
        )
      : all;

    if (selectedIdx >= filteredItems.length) selectedIdx = 0;
    listEl.innerHTML = "";

    if (!filteredItems.length) {
      const empty = document.createElement("div");
      empty.className = "cmd-empty";
      empty.textContent = currentLang === "vi" ? "Không tìm thấy kết quả phù hợp." : "No matching commands found.";
      listEl.appendChild(empty);
      return;
    }

    let lastGroup = "";
    filteredItems.forEach((item, idx) => {
      if (item.group !== lastGroup) {
        lastGroup = item.group;
        const grp = document.createElement("div");
        grp.className = "cmd-group-label";
        grp.textContent = lastGroup;
        listEl.appendChild(grp);
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `cmd-item${idx === selectedIdx ? " is-selected" : ""}`;
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", idx === selectedIdx ? "true" : "false");
      btn.innerHTML = `<span>${item.label}</span><span class="cmd-item-sub">${item.sub}</span>`;
      btn.addEventListener("click", () => {
        closePalette();
        item.action();
      });
      btn.addEventListener("mouseenter", () => {
        selectedIdx = idx;
        syncSelected();
      });
      listEl.appendChild(btn);
    });
  }

  function syncSelected() {
    const btns = listEl.querySelectorAll(".cmd-item");
    btns.forEach((b, i) => {
      const active = i === selectedIdx;
      b.classList.toggle("is-selected", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
      if (active) b.scrollIntoView({ block: "nearest" });
    });
  }

  function openPalette() {
    input.value = "";
    input.placeholder =
      currentLang === "vi"
        ? "Tìm nhanh 9 Case Study, mục lục, CV, Copy Email..."
        : "Jump to 9 Case Studies, sections, CV, Copy Email...";
    selectedIdx = 0;
    renderList();
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    setTimeout(() => input.focus(), 20);
  }

  function closePalette() {
    if (!backdrop.classList.contains("is-open")) return;
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
  }

  triggerBtn.addEventListener("click", openPalette);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closePalette();
  });
  input.addEventListener("input", () => {
    selectedIdx = 0;
    renderList();
  });

  input.addEventListener("keydown", (e) => {
    if (!filteredItems.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIdx = (selectedIdx + 1) % filteredItems.length;
      syncSelected();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIdx = (selectedIdx - 1 + filteredItems.length) % filteredItems.length;
      syncSelected();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = filteredItems[selectedIdx];
      if (chosen) {
        closePalette();
        chosen.action();
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (backdrop.classList.contains("is-open")) closePalette();
      else openPalette();
    } else if (e.key === "Escape" && backdrop.classList.contains("is-open")) {
      closePalette();
    }
  });
})();
