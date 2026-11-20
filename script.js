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
function copyEmail() {
  const email = "aominhtam@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    alert("Email address copied to clipboard: " + email);
  }).catch(() => {
    alert("Failed to copy automatically. Email: " + email);
  });
}

// --- 3. SCROLLSPY: TỰ ĐỘNG SÁNG ĐÈN MENU KHI CUỘN ĐẾN TỪNG SECTION ---
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// --- 4. PROJECT CATEGORY FILTER TABS & HERO TRACK SHORTCUTS ---
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const heroFilterTriggers = document.querySelectorAll("[data-hero-filter]");

function applyProjectFilter(selectedFilter) {
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    const isMatch = btn.getAttribute("data-filter") === selectedFilter;
    btn.classList.toggle("active", isMatch);
    btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
  });

  projectCards.forEach((card) => {
    const categories = (card.getAttribute("data-categories") || "").split(/\s+/);
    const shouldShow = selectedFilter === "all" || categories.includes(selectedFilter);
    card.classList.toggle("is-hidden", !shouldShow);
  });
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
}