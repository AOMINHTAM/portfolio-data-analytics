// --- 0. ENTRY PRELOADER (HOMEPAGE) ---
(function initPreloader() {
  const preloader = document.getElementById("pagePreloader");
  if (!preloader || window.__skipPreloader) {
    if (preloader && preloader.parentNode) preloader.remove();
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
    _toastEl.innerHTML =
      '<span class="toast-dot" aria-hidden="true"></span>' +
      '<span class="toast-msg"></span>' +
      '<span class="toast-progress" aria-hidden="true"></span>';
    document.body.appendChild(_toastEl);
  }
  const msgEl = _toastEl.querySelector(".toast-msg");
  if (msgEl) msgEl.textContent = message;
  _toastEl.classList.remove("is-counting");
  void _toastEl.offsetWidth;
  _toastEl.classList.add("is-visible", "is-counting");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => {
    if (_toastEl) _toastEl.classList.remove("is-visible", "is-counting");
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

function syncThemeColorMeta(isLight) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", isLight ? "#f8fafc" : "#0f1015");
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
}
syncThemeColorMeta(savedTheme === 'light');
syncThemeButtonLabel();

if (themeBtn) {
  themeBtn.addEventListener('click', (e) => {
    const applyThemeChange = () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');

      syncThemeColorMeta(isLight);
      syncThemeButtonLabel();
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      showToast(
        currentLang === "vi"
          ? isLight ? "Đã bật Giao diện Sáng" : "Đã bật Giao diện Tối"
          : isLight ? "Switched to Light Theme" : "Switched to Dark Theme"
      );
      trackEvent("toggle_theme", { theme: isLight ? "light" : "dark" });
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition !== "function" || reducedMotion) {
      applyThemeChange();
      return;
    }

    const rect = themeBtn.getBoundingClientRect();
    const x = e.clientX > 0 ? e.clientX : rect.left + rect.width / 2;
    const y = e.clientY > 0 ? e.clientY : rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add("is-theme-transitioning");
    const transition = document.startViewTransition(applyThemeChange);

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 480,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {});

    transition.finished.finally(() => {
      document.documentElement.classList.remove("is-theme-transitioning");
    });
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
  let pathname = window.location.pathname || "/";
  if (window.location.protocol !== "file:" && pathname.endsWith("/index.html")) {
    pathname = pathname.slice(0, -"index.html".length) || "/";
  }
  const targetHash = sectionId ? `#${sectionId}` : "";
  const hasTrailingEmptyHash = targetHash === "" && window.location.href.endsWith("#");
  const needsCleanPath = window.location.pathname !== pathname;
  if (window.location.hash === targetHash && !hasTrailingEmptyHash && !needsCleanPath) return;
  try {
    const cleanBase = `${pathname}${window.location.search}`;
    window.history.replaceState(null, "", targetHash ? `${cleanBase}${targetHash}` : cleanBase);
  } catch (_) {
    // Ignore history errors on restricted protocols (e.g. file://)
  }
}

// On HTTP/HTTPS, clean "../index.html" links on subpages to "../" so URLs never show /index.html#...
if (window.location.protocol !== "file:") {
  document.querySelectorAll('a[href^="../index.html"]').forEach((anchor) => {
    const raw = anchor.getAttribute("href") || "";
    anchor.setAttribute("href", raw.replace(/^\.\.\/index\.html/, "../"));
  });
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

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const useFlip = Boolean(animateTransition && !reducedMotion);
  const firstRects = new Map();
  if (useFlip) {
    projectCards.forEach((card) => {
      if (!card.classList.contains("is-hidden")) {
        firstRects.set(card, card.getBoundingClientRect().top);
      }
    });
  }

  filterBtns.forEach((btn) => {
    const isMatch = btn.getAttribute("data-filter") === currentFilter;
    btn.classList.toggle("active", isMatch);
    btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
  });

  let visibleIndex = 0;
  const newlyShown = [];
  const stayedVisible = [];

  projectCards.forEach((card) => {
    const categories = (card.getAttribute("data-categories") || "").split(/\s+/);
    const isFeatured = card.getAttribute("data-featured") === "true";

    let shouldShow = false;
    if (currentFilter === "all") {
      shouldShow = showAllProjects || isFeatured;
    } else {
      shouldShow = categories.includes(currentFilter);
    }

    const wasVisible = firstRects.has(card);
    card.classList.toggle("is-hidden", !shouldShow);

    if (shouldShow && useFlip) {
      card.classList.remove("reveal-item", "is-revealed", "reveal-done", "is-filter-enter");
      if (wasVisible) {
        stayedVisible.push(card);
      } else {
        newlyShown.push({ card, index: visibleIndex });
      }
      visibleIndex += 1;
    } else if (!shouldShow) {
      card.classList.remove("is-filter-enter");
    }
  });

  if (useFlip) {
    // FLIP Play for cards that remained visible and shifted position
    stayedVisible.forEach((card) => {
      const firstTop = firstRects.get(card);
      const lastTop = card.getBoundingClientRect().top;
      const dy = firstTop - lastTop;
      if (Math.abs(dy) > 1) {
        card.style.transition = "none";
        card.style.transform = `translateY(${dy}px)`;
        void card.offsetWidth;
        card.style.transition = "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)";
        card.style.transform = "translateY(0)";
        setTimeout(() => {
          card.style.transition = "";
          card.style.transform = "";
        }, 400);
      }
    });

    // Smooth enter for newly revealed cards
    newlyShown.forEach(({ card, index }) => {
      void card.offsetWidth;
      card.style.setProperty("--filter-delay", `${Math.min(index * 45, 270)}ms`);
      card.classList.add("is-filter-enter");
    });
  }

  if (toggleProjectsWrap && toggleProjectsBtn) {
    if (currentFilter === "all") {
      toggleProjectsWrap.classList.remove("is-hidden");
      toggleProjectsBtn.setAttribute("aria-expanded", showAllProjects ? "true" : "false");
      if (currentLang === "vi") {
        toggleProjectsBtn.innerHTML = showAllProjects
          ? "Thu gọn còn 4 Dự án Trọng tâm &uarr;"
          : "Xem thêm Các Phân tích Bổ sung &darr;";
      } else {
        toggleProjectsBtn.innerHTML = showAllProjects
          ? "Show Flagships Only (4) &uarr;"
          : "View Additional Analytics Modules &darr;";
      }
    } else {
      toggleProjectsWrap.classList.add("is-hidden");
    }
  }

  if (projectsIntro) {
    if (currentLang === "vi") {
      if (currentFilter === "all" && !showAllProjects) {
        projectsIntro.innerHTML =
          "Đang hiển thị <strong>4 dự án trọng tâm</strong> (2 DE + 2 DA). Lọc theo vị trí hoặc xem thêm các phân tích bổ sung bên dưới.";
      } else if (currentFilter === "all" && showAllProjects) {
        projectsIntro.innerHTML =
          "Đang hiển thị <strong>4 dự án trọng tâm</strong> cùng <strong>5 phân tích bổ sung</strong> về Vòng đời Khách hàng &amp; Phễu Chuyển đổi.";
      } else if (currentFilter === "da") {
        projectsIntro.innerHTML =
          "Đang hiển thị các phân tích <strong>Data Analytics</strong> về Vòng đời Khách hàng, Phễu Chuyển đổi &amp; Giỏ hàng.";
      } else if (currentFilter === "de") {
        projectsIntro.innerHTML =
          "Đang hiển thị <strong>2 dự án Data Engineering</strong> (AWS Event-Driven ELT V5.0.1 &amp; Snowflake Cloud ELT).";
      }
    } else {
      if (currentFilter === "all" && !showAllProjects) {
        projectsIntro.innerHTML =
          "Showing <strong>4 flagship case studies</strong> (2 DE + 2 DA). Filter by role or view supporting analytics modules below.";
      } else if (currentFilter === "all" && showAllProjects) {
        projectsIntro.innerHTML =
          "Showing <strong>4 flagship projects</strong> plus <strong>5 supporting analytics modules</strong> across Customer Lifecycle &amp; Funnel Diagnostics.";
      } else if (currentFilter === "da") {
        projectsIntro.innerHTML =
          "Showing <strong>Data Analytics</strong> studies across Customer Lifecycle &amp; E-Commerce Funnel Diagnostics.";
      } else if (currentFilter === "de") {
        projectsIntro.innerHTML =
          "Showing <strong>both Data Engineering projects</strong> (AWS Event-Driven ELT V5.0.1 &amp; Snowflake Cloud ELT).";
      }
    }
  }
}

function applyProjectFilter(selectedFilter) {
  if (typeof window.__clearSkillCrossFilter === "function") {
    window.__clearSkillCrossFilter();
  }
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
      if (typeof window.__clearSkillCrossFilter === "function") {
        window.__clearSkillCrossFilter();
      }
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
  const isNotFound = Boolean(document.querySelector(".not-found-card"));
  const projMatch = !isNotFound && path.match(/\/projects\/([^/]+?)\.html$/i);
  const pageId = isNotFound ? "notfound" : projMatch ? projMatch[1] : "home";
  const i18nBase = isNotFound
    ? window.location.protocol === "file:" ? "i18n" : "/i18n"
    : projMatch
      ? "../i18n"
      : "i18n";
  const pageScriptPath = isNotFound
    ? `${i18nBase}/common.js`
    : projMatch
      ? `${i18nBase}/projects/${pageId}.js`
      : `${i18nBase}/${pageId}.js`;

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
    ".not-found-badge",
    ".not-found-desc",
    "table th",
    "table td",
    ".sim-eyebrow",
    ".sim-controls button",
    ".sim-node span",
    ".lineage-hint",
    ".lineage-col-label",
    ".lineage-node--gold span",
    ".compare-badge",
    ".compare-list li",
    ".finops-bar-label",
    ".finops-alert",
    ".finops-disclaimer",
    ".funnel-control-head label",
    ".funnel-range-scale span",
    ".funnel-assumption-label",
    ".funnel-sku-title",
    ".funnel-step-meta span",
    ".funnel-out-label",
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
    if (typeof window.__refreshAwsWidgets === "function") {
      window.__refreshAwsWidgets();
    }
    if (typeof window.__refreshGlobalWidgets === "function") {
      window.__refreshGlobalWidgets();
    }
    if (typeof window.__refreshFunnelWidget === "function") {
      window.__refreshFunnelWidget();
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

// --- 17. AWS V5.0.1 SIMULATOR, DBT LINEAGE & BEFORE/AFTER SLIDER ---
(function initAwsInteractiveWidgets() {
  const isVi = () => document.documentElement.lang === "vi";

  // 17a. Interactive V5.0.1 CloudOps Pipeline Simulator
  let refreshSimLang = null;
  (function initAwsPipelineSimulator() {
    const root = document.getElementById("awsPipelineSimulator");
    if (!root) return;

    const dlqBadge = document.getElementById("simDlqBadge");
    const cwBadge = document.getElementById("simCwBadge");
    const costBadge = document.getElementById("simCostBadge");
    const btnValid = document.getElementById("simBtnValid");
    const btnCorrupt = document.getElementById("simBtnCorrupt");
    const btnRedrive = document.getElementById("simBtnRedrive");
    const consoleEl = document.getElementById("simConsole");
    if (!dlqBadge || !cwBadge || !costBadge || !btnValid || !btnCorrupt || !btnRedrive || !consoleEl) return;

    let timers = [];
    let dlqCount = 0;
    let inAlarm = false;
    let hasExecuted = false;

    function clearTimers() {
      timers.forEach((id) => clearTimeout(id));
      timers = [];
    }

    function scheduleStep(delay, fn) {
      const id = setTimeout(fn, delay);
      timers.push(id);
    }

    function clearVisuals() {
      root.querySelectorAll("[data-sim-node]").forEach((el) => {
        el.classList.remove("is-active", "is-success", "is-fault");
      });
      root.querySelectorAll("[data-sim-edge]").forEach((el) => {
        el.classList.remove("is-active", "is-fault");
      });
    }

    function setNodeState(key, state) {
      const el = root.querySelector(`[data-sim-node="${key}"]`);
      if (!el) return;
      el.classList.remove("is-active", "is-success", "is-fault");
      if (state) el.classList.add(state);
    }

    function setEdgeState(key, state) {
      const el = root.querySelector(`[data-sim-edge="${key}"]`);
      if (!el) return;
      el.classList.remove("is-active", "is-fault");
      if (state) el.classList.add(state);
    }

    function updateBadges() {
      dlqBadge.textContent = `SQS DLQ: ${dlqCount}`;
      dlqBadge.classList.toggle("sim-pill--alarm", dlqCount > 0);
      dlqBadge.classList.toggle("sim-pill--ok", dlqCount === 0 && hasExecuted);

      cwBadge.textContent = `CloudWatch: ${inAlarm ? "ALARM" : "OK"}`;
      cwBadge.classList.toggle("sim-pill--alarm", inAlarm);
      cwBadge.classList.toggle("sim-pill--ok", !inAlarm);

      costBadge.textContent = isVi() ? "Compute nhàn rỗi: $0.00" : "Idle Compute: $0.00";
      btnRedrive.disabled = dlqCount === 0;
      btnRedrive.classList.toggle("is-ready", dlqCount > 0);
    }

    function appendLog(text, tone) {
      const line = document.createElement("div");
      line.className = `sim-log-line${tone ? ` sim-log-${tone}` : ""}`;
      line.textContent = text;
      consoleEl.appendChild(line);
      consoleEl.scrollTop = consoleEl.scrollHeight;
    }

    function renderIdlePrompt() {
      consoleEl.innerHTML = "";
      appendLog(
        isVi()
          ? '[sẵn sàng] Bấm "Chạy lô Olist hợp lệ" hoặc "Bơm file lỗi (Test DLQ)" để mô phỏng luồng chạy V5.0.1.'
          : '[ready] Click "Push Valid Olist Batch" or "Inject Corrupt File" to simulate V5.0.1 runtime behavior.',
        "muted"
      );
    }

    btnValid.addEventListener("click", () => {
      hasExecuted = true;
      clearTimers();
      clearVisuals();
      consoleEl.innerHTML = "";
      const vi = isVi();

      scheduleStep(0, () => {
        setNodeState("s3", "is-active");
        appendLog(
          vi
            ? "[00ms] S3 PutObject: olist/raw/2026_batch/ (99.441 đơn) -> s3:ObjectCreated:*"
            : "[00ms] S3 PutObject: olist/raw/2026_batch/ (99,441 orders) -> s3:ObjectCreated:*"
        );
      });
      scheduleStep(280, () => {
        setNodeState("s3", "is-success");
        setEdgeState("s3-sqs", "is-active");
        setNodeState("sqs", "is-active");
        appendLog(
          vi
            ? "[280ms] SQS Main Queue: AssetWatcher 20s Long Poll nhận 1 batch (VisibilityTimeout=900s)."
            : "[280ms] SQS Main Queue: AssetWatcher 20s Long Poll dequeued 1 batch message (VisibilityTimeout=900s)."
        );
      });
      scheduleStep(580, () => {
        setNodeState("sqs", "is-success");
        setEdgeState("sqs-airflow", "is-active");
        setNodeState("airflow", "is-active");
        appendLog(
          vi
            ? "[580ms] Airflow 3 AssetWatcher: TriggeringAssetEventsAccessor (Mapping) kích hoạt DAG; 0 lượt cron rỗng."
            : "[580ms] Airflow 3 AssetWatcher: TriggeringAssetEventsAccessor (Mapping) triggered DAG run; 0 empty cron runs."
        );
      });
      scheduleStep(900, () => {
        setNodeState("airflow", "is-success");
        setEdgeState("airflow-redshift", "is-active");
        setNodeState("redshift", "is-active");
        appendLog(
          vi
            ? "[900ms] Redshift Hoán đổi 2 Pha: Đã kiểm tra header CSV & TEMP TABLE (>0 dòng) -> COMMIT (DELETE + INSERT) -> SWAPPED."
            : "[900ms] Redshift Two-Phase Swap: Validated CSV headers + non-empty TEMP TABLEs -> COMMIT (DELETE + INSERT) -> SWAPPED."
        );
      });
      scheduleStep(1240, () => {
        setNodeState("redshift", "is-success");
        setEdgeState("redshift-dbt", "is-active");
        setNodeState("dbt", "is-success");
        updateBadges();
        appendLog(
          vi
            ? "[1240ms] dbt Core & Safe ACK: 11 dbt schema tests ĐẠT -> ops.pipeline_ingestion_audit = COMPLETED -> SQS DeleteMessage ACK."
            : "[1240ms] dbt Core & Safe ACK: 11 dbt schema tests OK -> ops.pipeline_ingestion_audit = COMPLETED -> SQS DeleteMessage ACK."
        );
      });
      scheduleStep(1520, () => {
        appendLog(
          vi
            ? "[hoàn tất] 17/17 tasks đạt (200 OK) | Redshift tạm nghỉ -> Compute nhàn rỗi: $0.00"
            : "[done] 17/17 tasks passed (200 OK) | Redshift paused -> Idle Compute: $0.00",
          "ok"
        );
      });

      trackEvent("simulator_run", { mode: "valid_batch", page: "aws-data-pipeline" });
    });

    btnCorrupt.addEventListener("click", () => {
      hasExecuted = true;
      clearTimers();
      clearVisuals();
      consoleEl.innerHTML = "";
      const vi = isVi();

      scheduleStep(0, () => {
        setNodeState("s3", "is-active");
        appendLog(
          vi
            ? "[00ms] S3 PutObject: olist/raw/poison_empty_orders.csv (0 dòng dữ liệu)."
            : "[00ms] S3 PutObject: olist/raw/poison_empty_orders.csv (0 data rows)."
        );
      });
      scheduleStep(260, () => {
        setNodeState("s3", "is-success");
        setEdgeState("s3-sqs", "is-active");
        setNodeState("sqs", "is-active");
        appendLog(
          vi
            ? "[260ms] SQS -> Airflow: Nhận message, chạy Task 1 CSV Header & Empty-Stage Guard."
            : "[260ms] SQS -> Airflow: Dequeued message, running Task 1 CSV Header & Empty-Stage Guard."
        );
      });
      scheduleStep(560, () => {
        setEdgeState("s3-sqs", null);
        setNodeState("sqs", "is-fault");
        setNodeState("airflow", "is-fault");
        appendLog(
          vi
            ? "[560ms] [LỖI] ensure_non_empty_stage() báo ValueError (0 dòng)! Đã rollback Redshift; bảng đích nguyên vẹn."
            : "[560ms] [ERROR] ensure_non_empty_stage() raised ValueError (0 rows)! Redshift rolled back; target tables untouched.",
          "err"
        );
      });
      scheduleStep(900, () => {
        setEdgeState("sqs-airflow", "is-fault");
        appendLog(
          vi
            ? "[900ms] SQS Redelivery: Giữ nguyên ACK -> thử lại 3/3 lần (maxReceiveCount=3) -> chuyển file lỗi sang SQS DLQ."
            : "[900ms] SQS Redelivery: ACK withheld -> retried 3/3 times (maxReceiveCount=3) -> routing poison batch to SQS DLQ.",
          "warn"
        );
      });
      scheduleStep(1220, () => {
        dlqCount += 1;
        inAlarm = true;
        setNodeState("dlq", "is-fault");
        updateBadges();
        appendLog(
          vi
            ? `[1220ms] SQS DLQ: Đã cô lập batch lỗi an toàn (Số tin trong DLQ = ${dlqCount}).`
            : `[1220ms] SQS DLQ: Poison batch isolated safely (DLQ depth = ${dlqCount}).`,
          "err"
        );
      });
      scheduleStep(1520, () => {
        setEdgeState("dlq-cw", "is-fault");
        setNodeState("cw", "is-fault");
        appendLog(
          vi
            ? "[1520ms] CloudWatch Alarm: ApproximateNumberOfMessagesVisible >= 1 -> Chuyển trạng thái OK -> ALARM."
            : "[1520ms] CloudWatch Alarm: ApproximateNumberOfMessagesVisible >= 1 -> State changed OK -> ALARM.",
          "err"
        );
      });
      scheduleStep(1820, () => {
        setEdgeState("cw-sns", "is-fault");
        setNodeState("sns", "is-fault");
        appendLog(
          vi
            ? '[1820ms] SNS Topic: Đã gửi email cảnh báo sự cố tới Gmail. Bấm "Khôi phục DLQ" để chạy lại.'
            : '[1820ms] SNS Topic: Dispatched real-time incident email alert. Click "Redrive DLQ" to recover.',
          "warn"
        );
      });

      trackEvent("simulator_run", { mode: "inject_corrupt", page: "aws-data-pipeline" });
    });

    btnRedrive.addEventListener("click", () => {
      if (dlqCount === 0) return;
      hasExecuted = true;
      clearTimers();
      clearVisuals();
      consoleEl.innerHTML = "";
      const vi = isVi();

      scheduleStep(0, () => {
        setNodeState("dlq", "is-active");
        appendLog(
          vi
            ? "[00ms] Thao tác vận hành: Đã thay file CSV chuẩn lên S3; kích hoạt SQS DLQ Redrive -> Main Queue."
            : "[00ms] Operator Action: Replaced bad CSV on S3; initiated SQS DLQ Redrive -> Main Queue.",
          "warn"
        );
      });
      scheduleStep(350, () => {
        dlqCount = 0;
        updateBadges();
        setNodeState("dlq", "is-success");
        setNodeState("sqs", "is-active");
        appendLog(
          vi
            ? "[350ms] SQS Main Queue: Nạp lại message khôi phục và ánh xạ idempotent vào cùng audit_id."
            : "[350ms] SQS Main Queue: Re-ingested recovered message deterministically mapped to original audit_id."
        );
      });
      scheduleStep(700, () => {
        setNodeState("sqs", "is-success");
        setEdgeState("sqs-airflow", "is-active");
        setNodeState("airflow", "is-active");
        appendLog(
          vi
            ? "[700ms] Airflow 3: Task 1 + verify_safe_to_ack_when_raw_missing() vượt qua kiểm tra an toàn."
            : "[700ms] Airflow 3: Task 1 + verify_safe_to_ack_when_raw_missing() safety gate passed."
        );
      });
      scheduleStep(1050, () => {
        setNodeState("airflow", "is-success");
        setEdgeState("airflow-redshift", "is-active");
        setNodeState("redshift", "is-success");
        appendLog(
          vi
            ? "[1050ms] Redshift & Sổ Audit: Trạng thái chuyển FAILED -> SWAPPED -> ARCHIVED -> COMPLETED."
            : "[1050ms] Redshift & Audit Ledger: State transitioned FAILED -> SWAPPED -> ARCHIVED -> COMPLETED.",
          "ok"
        );
      });
      scheduleStep(1380, () => {
        inAlarm = false;
        setEdgeState("redshift-dbt", "is-active");
        setNodeState("dbt", "is-success");
        setNodeState("cw", "is-success");
        updateBadges();
        appendLog(
          vi
            ? "[1380ms] Khôi phục hoàn tất: CloudWatch về OK | DLQ = 0 | Compute nhàn rỗi: $0.00."
            : "[1380ms] Recovery Complete: CloudWatch Alarms back to OK | DLQ = 0 | Idle Compute: $0.00.",
          "ok"
        );
      });

      trackEvent("simulator_run", { mode: "redrive_dlq", page: "aws-data-pipeline" });
    });

    updateBadges();
    refreshSimLang = () => {
      updateBadges();
      if (!hasExecuted) renderIdlePrompt();
    };
  })();

  // 17b. Interactive dbt-Style Data Lineage Explorer
  let refreshLineage = null;
  (function initDbtLineageExplorer() {
    const root = document.getElementById("dbtLineageExplorer");
    const stageEl = document.getElementById("lineageStage");
    const colsEl = stageEl ? stageEl.querySelector(".lineage-cols") : null;
    const svgEl = document.getElementById("lineageSvg");
    const infoEl = document.getElementById("lineageInfo");
    if (!root || !stageEl || !colsEl || !svgEl || !infoEl) return;

    const EDGES = [
      ["raw_orders", "stg_orders"],
      ["raw_items", "stg_items"],
      ["raw_payments", "stg_payments"],
      ["raw_reviews", "stg_reviews"],
      ["raw_customers", "stg_customers"],
      ["stg_orders", "fct_orders"],
      ["stg_items", "fct_orders"],
      ["stg_payments", "fct_orders"],
      ["stg_reviews", "fct_orders"],
      ["stg_customers", "dim_customers"],
      ["stg_orders", "dim_customers"],
      ["stg_items", "mart_products"],
    ];

    const NODE_INFO = {
      raw_orders: {
        en: "<strong>Bronze <code>raw_orders</code></strong> &rarr; Order timestamps & status &rarr; feeds <code>fct_orders</code> & <code>dim_customers</code>.",
        vi: "<strong>Bronze <code>raw_orders</code></strong> &rarr; Mốc thời gian & trạng thái đơn &rarr; cấp dữ liệu cho <code>fct_orders</code> & <code>dim_customers</code>.",
      },
      raw_items: {
        en: "<strong>Bronze <code>raw_order_items</code></strong> &rarr; Line-item price & freight &rarr; feeds <code>fct_orders</code> & <code>mart_product_sales</code>.",
        vi: "<strong>Bronze <code>raw_order_items</code></strong> &rarr; Giá sản phẩm & phí vận chuyển từng dòng &rarr; nuôi <code>fct_orders</code> & <code>mart_product_sales</code>.",
      },
      raw_payments: {
        en: "<strong>Bronze <code>raw_payments</code></strong> &rarr; Multi-installment payment value &rarr; reconciled into <code>fct_orders</code>.",
        vi: "<strong>Bronze <code>raw_payments</code></strong> &rarr; Giá trị thanh toán nhiều kỳ &rarr; đối soát vào <code>fct_orders</code>.",
      },
      raw_reviews: {
        en: "<strong>Bronze <code>raw_reviews</code></strong> &rarr; Customer 1–5 review scores &rarr; linked to delivery SLA in <code>fct_orders</code>.",
        vi: "<strong>Bronze <code>raw_reviews</code></strong> &rarr; Điểm đánh giá 1–5 sao &rarr; gắn với SLA giao hàng tại <code>fct_orders</code>.",
      },
      raw_customers: {
        en: "<strong>Bronze <code>raw_customers</code></strong> &rarr; Zip/state geo & surrogate IDs &rarr; feeds <code>dim_customers</code>.",
        vi: "<strong>Bronze <code>raw_customers</code></strong> &rarr; Mã vùng & ID thay thế &rarr; cấp dữ liệu cho <code>dim_customers</code>.",
      },
      stg_orders: {
        en: "<strong>Silver <code>stg_orders</code></strong> &rarr; Cleaned status & delivery SLA timestamps &rarr; used by <code>fct_orders</code> & <code>dim_customers</code>.",
        vi: "<strong>Silver <code>stg_orders</code></strong> &rarr; Chuẩn hóa trạng thái & mốc giao hàng &rarr; dùng bởi <code>fct_orders</code> & <code>dim_customers</code>.",
      },
      stg_items: {
        en: "<strong>Silver <code>stg_order_items</code></strong> &rarr; Order-level GMV & unit aggregates &rarr; shared by <code>fct_orders</code> & <code>mart_product_sales</code>.",
        vi: "<strong>Silver <code>stg_order_items</code></strong> &rarr; Tổng hợp GMV & số lượng theo đơn &rarr; dùng chung cho <code>fct_orders</code> & <code>mart_product_sales</code>.",
      },
      stg_payments: {
        en: "<strong>Silver <code>stg_payments</code></strong> &rarr; Summed installments per <code>order_id</code> &rarr; <code>fct_orders</code>.",
        vi: "<strong>Silver <code>stg_payments</code></strong> &rarr; Cộng gộp các kỳ thanh toán theo <code>order_id</code> &rarr; <code>fct_orders</code>.",
      },
      stg_reviews: {
        en: "<strong>Silver <code>stg_reviews</code></strong> &rarr; Deduplicated latest score per order &rarr; <code>fct_orders</code>.",
        vi: "<strong>Silver <code>stg_reviews</code></strong> &rarr; Lọc trùng lấy điểm đánh giá mới nhất mỗi đơn &rarr; <code>fct_orders</code>.",
      },
      stg_customers: {
        en: "<strong>Silver <code>stg_customers</code></strong> &rarr; Preserves <code>customer_id</code> + maps true <code>customer_unique_id</code> &rarr; <code>dim_customers</code>.",
        vi: "<strong>Silver <code>stg_customers</code></strong> &rarr; Giữ <code>customer_id</code> & ánh xạ <code>customer_unique_id</code> &rarr; <code>dim_customers</code>.",
      },
      fct_orders: {
        en: "<strong>Gold <code>fct_orders</code></strong> (<code>delete+insert</code>) &larr; Traces <code>affected_order_ids</code> across all 4 upstream tables to capture late order updates (&gt;3 days).",
        vi: "<strong>Gold <code>fct_orders</code></strong> (<code>delete+insert</code>) &larr; Quét <code>affected_order_ids</code> trên cả 4 bảng nguồn để bắt kịp cập nhật đơn muộn (&gt;3 ngày).",
      },
      dim_customers: {
        en: "<strong>Gold <code>dim_customers</code></strong> (99,441 rows) &larr; Keeps 1:1 <code>customer_id</code> Star Schema join while window-aggregating cohort LTV by <code>customer_unique_id</code>.",
        vi: "<strong>Gold <code>dim_customers</code></strong> (99.441 dòng) &larr; Giữ join Star Schema 1:1 theo <code>customer_id</code> và cộng dồn LTV theo <code>customer_unique_id</code>.",
      },
      mart_products: {
        en: "<strong>Gold <code>mart_product_sales</code></strong> &larr; Downstream category, SKU velocity & order item revenue mix built from <code>stg_order_items</code>.",
        vi: "<strong>Gold <code>mart_product_sales</code></strong> &larr; Bảng mart danh mục, tốc độ bán SKU và cơ cấu doanh thu sản phẩm từ <code>stg_order_items</code>.",
      },
    };

    const upAdj = new Map();
    const downAdj = new Map();
    EDGES.forEach(([u, v]) => {
      if (!downAdj.has(u)) downAdj.set(u, []);
      if (!upAdj.has(v)) upAdj.set(v, []);
      downAdj.get(u).push(v);
      upAdj.get(v).push(u);
    });

    function collectReachable(startId) {
      const nodes = new Set([startId]);
      const upQ = [startId];
      while (upQ.length) {
        const cur = upQ.shift();
        (upAdj.get(cur) || []).forEach((prev) => {
          if (!nodes.has(prev)) {
            nodes.add(prev);
            upQ.push(prev);
          }
        });
      }
      const downQ = [startId];
      while (downQ.length) {
        const cur = downQ.shift();
        (downAdj.get(cur) || []).forEach((next) => {
          if (!nodes.has(next)) {
            nodes.add(next);
            downQ.push(next);
          }
        });
      }
      return nodes;
    }

    const nodeEls = Array.from(root.querySelectorAll("[data-lineage-id]"));
    let pinnedId = null;
    let activeId = null;

    function drawEdges() {
      const colsRect = colsEl.getBoundingClientRect();
      if (!colsRect.width || !colsRect.height) return;

      svgEl.style.left = `${colsEl.offsetLeft}px`;
      svgEl.style.top = `${colsEl.offsetTop}px`;
      svgEl.style.width = `${colsRect.width}px`;
      svgEl.style.height = `${colsRect.height}px`;
      svgEl.setAttribute("viewBox", `0 0 ${colsRect.width} ${colsRect.height}`);
      svgEl.innerHTML = "";

      const ns = "http://www.w3.org/2000/svg";
      EDGES.forEach(([fromId, toId]) => {
        const fromEl = root.querySelector(`[data-lineage-id="${fromId}"]`);
        const toEl = root.querySelector(`[data-lineage-id="${toId}"]`);
        if (!fromEl || !toEl) return;

        const r1 = fromEl.getBoundingClientRect();
        const r2 = toEl.getBoundingClientRect();
        const x1 = r1.right - colsRect.left;
        const y1 = r1.top - colsRect.top + r1.height / 2;
        const x2 = r2.left - colsRect.left;
        const y2 = r2.top - colsRect.top + r2.height / 2;
        const dx = Math.max(24, (x2 - x1) * 0.5);

        const path = document.createElementNS(ns, "path");
        path.setAttribute("class", "lineage-path");
        path.setAttribute("data-from", fromId);
        path.setAttribute("data-to", toId);
        path.setAttribute("d", `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
        svgEl.appendChild(path);
      });

      if (activeId) applyHighlight(activeId);
    }

    function updateInfoBar(id) {
      const vi = isVi();
      if (!id || !NODE_INFO[id]) {
        infoEl.innerHTML = vi
          ? "Chọn hoặc rê chuột vào bảng Gold (ví dụ: <code>fct_orders</code>) để truy vết đầy đủ từ Bronze &rarr; Silver."
          : "Select or hover a Gold mart (e.g. <code>fct_orders</code>) to trace its exact Bronze &rarr; Silver lineage.";
        return;
      }
      infoEl.innerHTML = vi ? NODE_INFO[id].vi : NODE_INFO[id].en;
    }

    function applyHighlight(id) {
      activeId = id;
      const paths = svgEl.querySelectorAll(".lineage-path");
      if (!id) {
        nodeEls.forEach((n) => n.classList.remove("is-highlighted", "is-dimmed"));
        paths.forEach((p) => p.classList.remove("is-highlighted", "is-dimmed"));
        updateInfoBar(null);
        return;
      }

      const reachable = collectReachable(id);
      nodeEls.forEach((el) => {
        const nid = el.getAttribute("data-lineage-id");
        const on = reachable.has(nid);
        el.classList.toggle("is-highlighted", on);
        el.classList.toggle("is-dimmed", !on);
      });

      paths.forEach((p) => {
        const u = p.getAttribute("data-from");
        const v = p.getAttribute("data-to");
        const on = reachable.has(u) && reachable.has(v);
        p.classList.toggle("is-highlighted", on);
        p.classList.toggle("is-dimmed", !on);
      });

      updateInfoBar(id);
    }

    nodeEls.forEach((el) => {
      const id = el.getAttribute("data-lineage-id");
      el.addEventListener("mouseenter", () => applyHighlight(id));
      el.addEventListener("focus", () => applyHighlight(id));
      el.addEventListener("click", () => {
        pinnedId = pinnedId === id ? null : id;
        applyHighlight(pinnedId);
        trackEvent("lineage_explore", { node: id, page: "aws-data-pipeline" });
      });
    });

    stageEl.addEventListener("mouseleave", () => {
      applyHighlight(pinnedId);
    });

    drawEdges();
    window.addEventListener("resize", drawEdges);
    window.addEventListener("load", drawEdges);
    refreshLineage = () => {
      requestAnimationFrame(() => {
        drawEdges();
        updateInfoBar(activeId);
      });
    };
  })();

  // 17c. Before / After Comparison Slider
  (function initBeforeAfterSlider() {
    const stage = document.getElementById("compareStage");
    const range = document.getElementById("compareRange");
    const pctLabel = document.getElementById("comparePctLabel");
    if (!stage || !range || !pctLabel) return;

    function syncSplit(val) {
      const parsed = Number(val);
      const n = Math.round(Math.min(100, Math.max(0, Number.isFinite(parsed) ? parsed : 50)));
      range.value = String(n);
      stage.style.setProperty("--split", `${n}%`);
      pctLabel.textContent = `${n}% / ${100 - n}%`;
    }

    function updateFromPointer(clientX) {
      const rect = stage.getBoundingClientRect();
      if (!rect.width) return;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      syncSplit(pct);
    }

    let dragging = false;
    range.addEventListener("pointerdown", (e) => {
      dragging = true;
      if (typeof range.setPointerCapture === "function") {
        try {
          range.setPointerCapture(e.pointerId);
        } catch (_) {
          // ignore if synthetic event
        }
      }
      updateFromPointer(e.clientX);
    });
    range.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      updateFromPointer(e.clientX);
    });
    const stopDrag = () => {
      dragging = false;
    };
    range.addEventListener("pointerup", stopDrag);
    range.addEventListener("pointercancel", stopDrag);
    range.addEventListener("input", () => syncSplit(range.value));
    syncSplit(range.value);
  })();

  // 17d. Interactive FinOps & Scale Cost Estimator
  let refreshFinops = null;
  (function initFinopsEstimator() {
    const root = document.getElementById("finopsEstimator");
    const range = document.getElementById("finopsRange");
    const scaleBadge = document.getElementById("finopsScaleBadge");
    const srvCost = document.getElementById("finopsServerlessCost");
    const clsCost = document.getElementById("finopsClusterCost");
    const srvBar = document.getElementById("finopsServerlessBar");
    const clsBar = document.getElementById("finopsClusterBar");
    const summaryEl = document.getElementById("finopsSummary");
    const alertEl = document.getElementById("finopsArchAlert");
    if (!root || !range || !scaleBadge || !srvCost || !clsCost || !srvBar || !clsBar || !summaryEl || !alertEl) {
      return;
    }

    const TIERS = [
      {
        enBadge: "Scale: 100K orders/mo",
        viBadge: "Quy mô: 100K đơn/tháng",
        srvCost: "~$1.80",
        clsCost: "~$180",
        srvWidth: 3,
        clsWidth: 25,
        alert: false,
        enSummary:
          "Baseline Olist volume (~99.4K orders): Event-driven AssetWatcher triggers <strong>0 empty runs</strong> and Redshift pauses to <strong>$0 idle compute</strong> (~99% modeled savings vs. 24/7 cluster).",
        viSummary:
          "Quy mô Olist hiện tại (~99.4K đơn): AssetWatcher hướng sự kiện tạo <strong>0 lượt chạy rỗng</strong> và Redshift tự nghỉ ở mức <strong>$0 compute nhàn rỗi</strong> (tiết kiệm ~99% theo mô hình ước tính so với cluster 24/7).",
      },
      {
        enBadge: "Scale: 1M orders/mo",
        viBadge: "Quy mô: 1M đơn/tháng",
        srvCost: "~$14",
        clsCost: "~$180",
        srvWidth: 6,
        clsWidth: 25,
        alert: false,
        enSummary:
          "10x Olist scale (1M orders/mo): Redshift Serverless scales for batch bursts then pauses to zero; SQS stays comfortably inside the AWS Free Tier (~92% modeled savings).",
        viSummary:
          "Quy mô gấp 10 lần (1M đơn/tháng): Redshift Serverless chỉ tính giây RPU lúc xử lý lô rồi tự ngắt về $0; SQS vẫn nằm gọn trong AWS Free Tier (tiết kiệm ~92% theo ước tính).",
      },
      {
        enBadge: "Scale: 10M orders/mo",
        viBadge: "Quy mô: 10M đơn/tháng",
        srvCost: "~$95",
        clsCost: "~$360",
        srvWidth: 15,
        clsWidth: 50,
        alert: false,
        enSummary:
          "100x growth (10M orders/mo): Longer incremental <code>delete+insert</code> runs raise active RPU-seconds, yet still outperform a 24/7 multi-node provisioned warehouse (~74% modeled savings).",
        viSummary:
          "Tăng trưởng gấp 100 lần (10M đơn/tháng): Các nhịp incremental <code>delete+insert</code> kéo dài thời gian chạy RPU nhưng vẫn rẻ hơn nhiều so với warehouse chạy liên tục 24/7 (tiết kiệm ~74%).",
      },
      {
        enBadge: "Scale: 50M+ orders/mo",
        viBadge: "Quy mô: 50M+ đơn/tháng",
        srvCost: "~$410",
        clsCost: "~$720",
        srvWidth: 57,
        clsWidth: 100,
        alert: true,
        enSummary:
          "500x+ hyper-scale (50M+ orders/mo): Monolithic Python CSV checks saturate single-worker RAM before Redshift COPY starts — triggers the architectural split below.",
        viSummary:
          "Siêu quy mô 500x+ (50M+ đơn/tháng): Kiểm tra CSV đơn luồng bằng Python bắt đầu chạm ngưỡng RAM trước khi vào Redshift COPY — kích hoạt cảnh báo tách tầng kiến trúc bên dưới.",
      },
    ];

    const presetBtns = Array.from(root.querySelectorAll(".finops-preset[data-finops-idx]"));

    function renderTier(idx, fromUser) {
      const i = Math.min(TIERS.length - 1, Math.max(0, Number(idx) || 0));
      const t = TIERS[i];
      const vi = isVi();
      range.value = String(i);
      presetBtns.forEach((b) => {
        b.classList.toggle("is-active", Number(b.dataset.finopsIdx) === i);
      });
      scaleBadge.textContent = vi ? t.viBadge : t.enBadge;
      scaleBadge.classList.toggle("sim-pill--alarm", t.alert);
      scaleBadge.classList.toggle("sim-pill--ok", !t.alert);
      const unit = vi ? "/ tháng" : "/ mo";
      srvCost.textContent = `${t.srvCost} ${unit}`;
      clsCost.textContent = `${t.clsCost} ${unit}`;
      srvBar.style.width = `${t.srvWidth}%`;
      clsBar.style.width = `${t.clsWidth}%`;
      summaryEl.innerHTML = vi ? t.viSummary : t.enSummary;
      alertEl.hidden = !t.alert;
      if (fromUser) {
        trackEvent("finops_scale_select", { tier_index: i, label: t.enBadge });
      }
    }

    range.addEventListener("input", () => renderTier(range.value, true));
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => renderTier(btn.dataset.finopsIdx, true));
    });

    renderTier(range.value, false);
    refreshFinops = () => renderTier(range.value, false);
  })();

  window.__refreshAwsWidgets = function () {
    if (typeof refreshSimLang === "function") refreshSimLang();
    if (typeof refreshLineage === "function") refreshLineage();
    if (typeof refreshFinops === "function") refreshFinops();
  };
})();

// --- 18. DEVTOOLS CONSOLE EGG, LIVE TELEMETRY BAR & SCHEMA X-RAY OVERLAY ---
(function initEngineerPolish() {
  const isVi = () => document.documentElement.lang === "vi";
  const inProjectsDir = /\/projects\/[^/]+\.html$/i.test((window.location.pathname || "").replace(/\\/g, "/"));
  const resumeHref = inProjectsDir ? "../assets/Ao-Minh-Tam-Resume.pdf" : "assets/Ao-Minh-Tam-Resume.pdf";

  // 18a. DevTools Console Banner & window.hireTam()
  (function initDevToolsEgg() {
    const profile = {
      candidate: "Ao Minh Tam",
      role: "Data Engineering / Data Analytics Intern",
      university: "HCMUNRE (IT Year 3)",
      flagship: "AWS Event-Driven ELT V5.0.1 (S3 -> SQS/DLQ -> Airflow 3 -> Redshift -> dbt)",
      email: "aominhtam@gmail.com",
      github: "https://github.com/AOMINHTAM",
      quickAction: "Run window.hireTam() in this console to copy email & open CV PDF",
    };

    try {
      console.log(
        "%c AO MINH TAM // CYBER AMBER DATA PORTFOLIO %c  Tip: type hireTam() or press Shift + X for Schema Overlay",
        "background:#f59e0b;color:#140c00;font-weight:800;padding:4px 8px;border-radius:4px;",
        "color:#fbbf24;font-weight:600;font-family:monospace;"
      );
      console.log("%cProfile Telemetry:", "color:#9ca3af;font-weight:700;", profile);
    } catch (_) {
      // Ignore consoles without styling support
    }

    window.hireTam = function () {
      const email = "aominhtam@gmail.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).catch(() => {});
      }
      window.open(resumeHref, "_blank", "noopener,noreferrer");
      if (typeof showToast === "function") {
        showToast(
          isVi()
            ? "Đã mở CV PDF & sao chép aominhtam@gmail.com!"
            : "Opened CV PDF & copied aominhtam@gmail.com!"
        );
      }
      return {
        status: "ready_for_interview",
        copiedEmail: email,
        cvOpened: resumeHref,
      };
    };
  })();

  // 18b. Schema X-Ray Overlay (Shift + X)
  (function initSchemaXRay() {
    // Assign semantic dbt/DWH labels cleanly without crowding DOM
    const schemaPairs = [
      [".hero", "[MART: fct_candidate_profile]"],
      ["#about", "[DIM: dim_summary]"],
      ["#experience", "[DIM: dim_education_activities]"],
      ["#architecture", "[STG: stg_tech_stack]"],
      ["#projects", "[MART: fct_project_case_studies]"],
      ["#certifications", "[DIM: dim_credentials]"],
      ["#roadmap", "[SCD2: dim_career_roadmap]"],
      ["#contact", "[EVENT: contact_cta_stream]"],
      [".detail-header", "[MART: case_study_metadata]"],
      [".scope-box", "[SRC: raw_dataset_scope]"],
      ["#awsPipelineSimulator", "[STREAM: sqs_dlq_simulator]"],
      ["#dbtLineageExplorer", "[DAG: dbt_lineage_graph]"],
      ["#beforeAfterSlider", "[DIFF: bronze_vs_gold]"],
      ["#finopsEstimator", "[FINOPS: rpu_scale_estimator]"],
      [".case-nav", "[NAV: dim_case_study_links]"],
    ];
    schemaPairs.forEach(([sel, label]) => {
      const el = document.querySelector(sel);
      if (el && !el.hasAttribute("data-schema-label")) {
        el.setAttribute("data-schema-label", label);
      }
    });
    document.querySelectorAll(".detail-block").forEach((el, idx) => {
      if (!el.hasAttribute("data-schema-label")) {
        el.setAttribute("data-schema-label", `[MDL: section_${idx + 1}]`);
      }
    });

    function toggleXRay() {
      const enabled = document.body.classList.toggle("is-xray-mode");
      if (typeof showToast === "function") {
        showToast(
          isVi()
            ? enabled
              ? "Chế độ Schema X-Ray: BẬT (Shift + X)"
              : "Chế độ Schema X-Ray: TẮT"
            : enabled
              ? "Schema X-Ray Overlay: ON (Shift + X)"
              : "Schema X-Ray Overlay: OFF"
        );
      }
      trackEvent("toggle_schema_xray", { enabled });
    }

    document.addEventListener("keydown", (e) => {
      if (!e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key !== "X" && e.key !== "x") return;
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || document.activeElement?.isContentEditable) {
        return;
      }
      e.preventDefault();
      toggleXRay();
    });
  })();

  window.__refreshGlobalWidgets = function () {
    if (typeof window.__refreshSkillCrossFilter === "function") window.__refreshSkillCrossFilter();
    if (typeof window.__refreshCheatSheet === "function") window.__refreshCheatSheet();
  };
})();

// --- 19. HERO SPARKLINES, SKILL CROSS-FILTER, DA FUNNEL WHAT-IF & VIM NAVIGATION ---
(function initCraftAndDaInteractive() {
  const isVi = () => document.documentElement.lang === "vi";

  // 19a. Mini Grafana-style SVG Sparklines on Hero Snapshot Cards
  (function initHeroSparklines() {
    const cards = document.querySelectorAll(".snapshot-stat");
    if (!cards.length) return;

    const SERIES = [
      [18, 16, 14, 11, 8, 5],
      [17, 15, 13, 10, 7, 4],
      [19, 15, 13, 14, 9, 3],
      [18, 15, 12, 9, 6, 4],
    ];

    cards.forEach((card, idx) => {
      if (card.querySelector(".stat-sparkline")) return;
      const pts = SERIES[idx % SERIES.length];
      const w = 88;
      const step = w / (pts.length - 1);
      const coords = pts.map((y, i) => [Number((i * step).toFixed(1)), y]);
      const polyStr = coords.map(([x, y]) => `${x},${y}`).join(" ");
      const areaStr = `0,22 ${polyStr} ${w},22`;
      const dots = coords
        .map(([x, y]) => `<circle class="stat-spark-dot" cx="${x}" cy="${y}" r="1.9" />`)
        .join("");

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "stat-sparkline");
      svg.setAttribute("viewBox", "0 0 88 22");
      svg.setAttribute("aria-hidden", "true");
      svg.innerHTML = `<polygon class="stat-spark-area" points="${areaStr}" /><polyline class="stat-spark-line" points="${polyStr}" />${dots}`;
      card.appendChild(svg);
    });
  })();

  // 19b. Skill -> Project Cross-Filter on Homepage
  (function initSkillProjectCrossFilter() {
    const skillTags = document.querySelectorAll(".skill-card .tech-tags span");
    const projectsList = document.querySelector(".projects-list");
    const cards = Array.from(document.querySelectorAll(".project-card"));
    if (!skillTags.length || !projectsList || !cards.length) return;

    const banner = document.createElement("div");
    banner.id = "skillFilterBanner";
    banner.className = "skill-filter-banner";
    banner.hidden = true;
    projectsList.parentNode.insertBefore(banner, projectsList);

    const SKILL_MATCHERS = [
      { test: "python", tokens: ["python"] },
      { test: "sql", tokens: ["sql", "redshift", "snowflake", "dbt"] },
      { test: "plotly", tokens: ["plotly", "seaborn", "matplotlib"] },
      { test: "power bi", tokens: ["bi csvs", "star schema", "self-serve bi"] },
      { test: "apriori", tokens: ["apriori", "mlxtend"] },
      { test: "s3", tokens: ["s3"] },
      { test: "sqs", tokens: ["sqs"] },
      { test: "redshift", tokens: ["redshift"] },
      { test: "cloudformation", tokens: ["cloudformation"] },
      { test: "cloudwatch", tokens: ["cloudwatch", "sns"] },
      { test: "snowflake", tokens: ["snowflake"] },
      { test: "airflow", tokens: ["airflow"] },
      { test: "dbt", tokens: ["dbt"] },
      { test: "star schema", tokens: ["star schema", "fct_orders"] },
      { test: "docker", tokens: ["docker"] },
      { test: "github actions", tokens: ["21/21 unit tests", "cloudformation"] },
      { test: "unit testing", tokens: ["21/21 unit tests"] },
    ];

    let activeTagEl = null;
    let activeTagLabel = "";
    let lastMatchCount = 0;

    function resolveTokens(labelLower) {
      const hit = SKILL_MATCHERS.find((m) => labelLower.includes(m.test));
      return hit ? hit.tokens : [labelLower];
    }

    function renderBanner() {
      if (!activeTagEl) {
        banner.hidden = true;
        banner.innerHTML = "";
        return;
      }
      const vi = isVi();
      banner.hidden = false;
      banner.innerHTML = vi
        ? `<span>Đang làm nổi bật theo kỹ năng: <strong>${activeTagLabel}</strong> (${lastMatchCount} dự án)</span><button type="button" class="skill-clear-btn" id="clearSkillFilterBtn">Xóa lọc &times;</button>`
        : `<span>Cross-filtering by skill: <strong>${activeTagLabel}</strong> (${lastMatchCount} matches)</span><button type="button" class="skill-clear-btn" id="clearSkillFilterBtn">Clear &times;</button>`;
      const clearBtn = document.getElementById("clearSkillFilterBtn");
      if (clearBtn) {
        clearBtn.addEventListener("click", clearCrossFilter);
      }
    }

    function clearCrossFilter() {
      activeTagEl = null;
      activeTagLabel = "";
      lastMatchCount = 0;
      skillTags.forEach((s) => s.classList.remove("is-skill-selected"));
      cards.forEach((c) => c.classList.remove("is-skill-match", "is-skill-dimmed"));
      renderBanner();
    }

    window.__clearSkillCrossFilter = clearCrossFilter;
    window.__refreshSkillCrossFilter = renderBanner;

    function handleTagActivate(tagEl) {
      if (activeTagEl === tagEl) {
        clearCrossFilter();
        return;
      }

      const label = tagEl.textContent.trim();
      const tokens = resolveTokens(label.toLowerCase());
      const matched = cards.filter((card) => {
        const hay = card.textContent.toLowerCase();
        return tokens.some((tk) => hay.includes(tk));
      });

      if (!matched.length) {
        if (typeof showToast === "function") {
          showToast(
            isVi()
              ? `${label}: Đã áp dụng trong thực hành phân tích dữ liệu (repo hiện tại tập trung SQL/Python).`
              : `${label}: Working knowledge applied in tabular audits (repos showcase SQL/Python/dbt).`
          );
        }
        return;
      }

      activeTagEl = tagEl;
      activeTagLabel = label;
      lastMatchCount = matched.length;
      skillTags.forEach((s) => s.classList.toggle("is-skill-selected", s === tagEl));

      const needsAllShown = matched.some((c) => c.getAttribute("data-featured") !== "true");
      if (currentFilter !== "all" || (needsAllShown && !showAllProjects)) {
        currentFilter = "all";
        if (needsAllShown) showAllProjects = true;
        renderProjectsVisibility(false);
      }

      const matchedSet = new Set(matched);
      cards.forEach((card) => {
        const isHit = matchedSet.has(card);
        card.classList.toggle("is-skill-match", isHit);
        card.classList.toggle("is-skill-dimmed", !isHit);
      });

      renderBanner();
      const target = document.getElementById("projects");
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 78;
        window.scrollTo({ top, behavior: "smooth" });
      }
      trackEvent("skill_cross_filter", { skill: label, matches: matched.length });
    }

    skillTags.forEach((tagEl) => {
      tagEl.setAttribute("role", "button");
      tagEl.setAttribute("tabindex", "0");
      tagEl.addEventListener("click", () => handleTagActivate(tagEl));
      tagEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleTagActivate(tagEl);
        }
      });
    });
  })();

  // 19c. Interactive DA Funnel What-If Simulator (projects/product-funnel.html)
  (function initFunnelWhatIfSimulator() {
    const root = document.getElementById("funnelWhatIfSimulator");
    const dropRange = document.getElementById("funnelDropoffRange");
    const loveRange = document.getElementById("funnelLoveRange");
    if (!root || !dropRange || !loveRange) return;

    const CATALOG_SESSIONS = 261231;
    const FUZZY_PDP = 162525;
    const FUZZY_CART = 69957;
    const FUZZY_CART_TO_ORDER = 23861 / 69957;
    const LOVE_BASE_SHARE = 26033 / CATALOG_SESSIONS;
    const LOVE_PDP_TO_CART = 14485 / 26033;
    const LOVE_CART_TO_ORDER = 4803 / 14485;
    const BASE_TOTAL_ORDERS = 23861 + 4803;

    let assumedAov = 50;
    const aovBtns = Array.from(root.querySelectorAll("[data-funnel-aov]"));

    const dropValEl = document.getElementById("funnelDropoffVal");
    const loveValEl = document.getElementById("funnelLoveVal");
    const deltaBadge = document.getElementById("funnelDeltaBadge");
    const fuzzyPdpText = document.getElementById("fuzzyPdpText");
    const fuzzyCartText = document.getElementById("fuzzyCartText");
    const fuzzyOrderText = document.getElementById("fuzzyOrderText");
    const fuzzyOrderBar = document.getElementById("fuzzyOrderBar");
    const lovePdpText = document.getElementById("lovePdpText");
    const lovePdpBar = document.getElementById("lovePdpBar");
    const loveCartText = document.getElementById("loveCartText");
    const loveCartBar = document.getElementById("loveCartBar");
    const loveOrderText = document.getElementById("loveOrderText");
    const loveOrderBar = document.getElementById("loveOrderBar");
    const totalEl = document.getElementById("funnelTotalOrders");
    const incEl = document.getElementById("funnelIncOrders");
    const revEl = document.getElementById("funnelRevLift");

    function fmtNum(n) {
      return Number(n).toLocaleString("en-US");
    }

    function updateSimulation() {
      const dropoff = Number(dropRange.value);
      const loveLiftPts = Number(loveRange.value);
      const vi = isVi();

      const dropRecovery = Math.max(0, 66 - dropoff) / 100;
      const fuzzyRate = FUZZY_CART_TO_ORDER + dropRecovery;
      const fuzzyOrders = Math.round(FUZZY_CART * fuzzyRate);

      const loveShare = LOVE_BASE_SHARE + loveLiftPts / 100;
      const lovePdp = Math.round(CATALOG_SESSIONS * loveShare);
      const loveCart = Math.round(lovePdp * LOVE_PDP_TO_CART);
      const loveRate = LOVE_CART_TO_ORDER + dropRecovery;
      const loveOrders = Math.round(loveCart * loveRate);

      const simTotal = fuzzyOrders + loveOrders;
      const incOrders = Math.max(0, simTotal - BASE_TOTAL_ORDERS);
      const revLift = incOrders * assumedAov;

      if (dropValEl) {
        dropValEl.textContent =
          dropoff === 66
            ? vi ? "66% (Gốc)" : "66% (Baseline)"
            : `${dropoff}%`;
      }
      if (loveValEl) {
        loveValEl.textContent = `+${loveLiftPts}% pts (${(loveShare * 100).toFixed(1)}%)`;
      }
      if (deltaBadge) {
        deltaBadge.textContent = vi ? `Tăng thêm: +${fmtNum(incOrders)} đơn` : `Delta: +${fmtNum(incOrders)} orders`;
      }

      if (fuzzyPdpText) fuzzyPdpText.textContent = `${fmtNum(FUZZY_PDP)} (62.2%)`;
      if (fuzzyCartText) fuzzyCartText.textContent = `${fmtNum(FUZZY_CART)} (43.0%)`;
      if (fuzzyOrderText) fuzzyOrderText.textContent = `${fmtNum(fuzzyOrders)} (${(fuzzyRate * 100).toFixed(1)}%)`;
      if (fuzzyOrderBar) fuzzyOrderBar.style.width = `${Math.min(100, (fuzzyOrders / FUZZY_PDP) * 100).toFixed(1)}%`;

      if (lovePdpText) lovePdpText.textContent = `${fmtNum(lovePdp)} (${(loveShare * 100).toFixed(1)}%)`;
      if (lovePdpBar) lovePdpBar.style.width = `${Math.min(100, (lovePdp / FUZZY_PDP) * 100).toFixed(1)}%`;
      if (loveCartText) loveCartText.textContent = `${fmtNum(loveCart)} (55.6%)`;
      if (loveCartBar) loveCartBar.style.width = `${Math.min(100, (loveCart / FUZZY_PDP) * 100).toFixed(1)}%`;
      if (loveOrderText) loveOrderText.textContent = `${fmtNum(loveOrders)} (${(loveRate * 100).toFixed(1)}%)`;
      if (loveOrderBar) loveOrderBar.style.width = `${Math.min(100, (loveOrders / FUZZY_PDP) * 100).toFixed(1)}%`;

      if (totalEl) totalEl.textContent = fmtNum(simTotal);
      if (incEl) incEl.textContent = `+${fmtNum(incOrders)}`;
      if (revEl) revEl.textContent = `+$${fmtNum(revLift)}`;
    }

    dropRange.addEventListener("input", updateSimulation);
    loveRange.addEventListener("input", updateSimulation);
    aovBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        assumedAov = Number(btn.getAttribute("data-funnel-aov")) || 50;
        aovBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
        updateSimulation();
        trackEvent("funnel_aov_select", { aov: assumedAov });
      });
    });

    updateSimulation();
    window.__refreshFunnelWidget = updateSimulation;
  })();

  // 19d. Vim-Style Section Navigation (j / k / gg / G) & ? Cheat Sheet Modal
  (function initVimNavigation() {
    let modal = null;

    function buildCheatModal() {
      if (modal) return modal;
      modal = document.createElement("div");
      modal.id = "shortcutCheatModal";
      modal.className = "cheat-backdrop";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "cheatModalTitle");
      modal.innerHTML = '<div class="cheat-dialog"><div class="cheat-head"><h3 id="cheatModalTitle">Keyboard Shortcuts</h3><button type="button" class="cheat-close" id="cheatCloseBtn">&times;</button></div><div class="cheat-list" id="cheatModalList"></div></div>';
      document.body.appendChild(modal);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeCheat();
      });
      const closeBtn = document.getElementById("cheatCloseBtn");
      if (closeBtn) closeBtn.addEventListener("click", closeCheat);
      renderCheatContent();
      return modal;
    }

    function renderCheatContent() {
      if (!modal) return;
      const vi = isVi();
      const titleEl = document.getElementById("cheatModalTitle");
      const listEl = document.getElementById("cheatModalList");
      if (titleEl) titleEl.textContent = vi ? "Phím tắt Điều hướng (Vim & Dev)" : "Keyboard Shortcuts (Vim & Dev)";
      if (!listEl) return;

      const rows = vi
        ? [
            [["j", "k"], "Nhảy xuống / lên từng mục trang"],
            [["g", "g"], "Cuộn nhanh lên đầu trang"],
            [["Shift", "G"], "Cuộn nhanh xuống cuối trang"],
            [["Shift", "X"], "Bật / tắt chế độ Schema X-Ray Overlay"],
            [["&larr;", "&rarr;"], "Chuyển ảnh khi đang mở Lightbox"],
            [["?"], "Mở / đóng bảng hướng dẫn phím tắt"],
            [["Esc"], "Đóng hộp thoại hoặc ảnh đang phóng to"],
          ]
        : [
            [["j", "k"], "Jump to next / previous page section"],
            [["g", "g"], "Scroll to top of page"],
            [["Shift", "G"], "Jump to bottom of page"],
            [["Shift", "X"], "Toggle Schema X-Ray blueprint overlay"],
            [["&larr;", "&rarr;"], "Previous / Next image in Lightbox"],
            [["?"], "Toggle this shortcuts cheat sheet"],
            [["Esc"], "Close modal or enlarged diagram"],
          ];

      listEl.innerHTML = rows
        .map(
          ([keys, desc]) =>
            `<div class="cheat-row"><span>${desc}</span><span class="cheat-keys">${keys
              .map((k) => `<kbd>${k}</kbd>`)
              .join("")}</span></div>`
        )
        .join("");
    }

    function openCheat() {
      buildCheatModal();
      renderCheatContent();
      modal.classList.add("is-open");
    }

    function closeCheat() {
      if (modal) modal.classList.remove("is-open");
    }

    window.__openCheatSheet = openCheat;
    window.__refreshCheatSheet = renderCheatContent;

    function getStops() {
      const els = Array.from(document.querySelectorAll("header.hero, section[id], .detail-header, .detail-block, footer"));
      return els.filter((el) => el.offsetParent !== null && !el.closest(".is-hidden"));
    }

    function jumpSection(dir) {
      const stops = getStops();
      if (!stops.length) return;
      const navOffset = 86;
      const curY = window.scrollY + navOffset + 8;

      if (dir > 0) {
        const next = stops.find((el) => el.getBoundingClientRect().top + window.scrollY > curY);
        if (next) {
          window.scrollTo({ top: next.getBoundingClientRect().top + window.scrollY - navOffset, behavior: "smooth" });
        }
      } else {
        const prev = [...stops].reverse().find((el) => el.getBoundingClientRect().top + window.scrollY < curY - 24);
        if (prev) {
          window.scrollTo({ top: Math.max(0, prev.getBoundingClientRect().top + window.scrollY - navOffset), behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }

    let lastGTime = 0;
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const active = document.activeElement;
      const tag = (active && active.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || active?.isContentEditable) return;

      if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
        e.preventDefault();
        closeCheat();
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        if (modal && modal.classList.contains("is-open")) closeCheat();
        else openCheat();
        return;
      }

      if (document.querySelector(".lightbox-backdrop.is-open")) return;

      if (e.key === "j" && !e.shiftKey) {
        e.preventDefault();
        jumpSection(1);
      } else if (e.key === "k" && !e.shiftKey) {
        e.preventDefault();
        jumpSection(-1);
      } else if (e.key === "g" && !e.shiftKey) {
        const now = Date.now();
        if (now - lastGTime < 650) {
          e.preventDefault();
          lastGTime = 0;
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          lastGTime = now;
        }
      } else if (e.key === "G" && e.shiftKey) {
        e.preventDefault();
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      }
    });
  })();
})();
