// ==========================================
// 1. DARK / LIGHT THEME TOGGLE
// ==========================================
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');

// Khởi tạo theme từ bộ nhớ trình duyệt
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

    // GA4 Custom Event: Theo dõi hành vi đổi giao diện
    if (typeof gtag === 'function') {
      gtag('event', 'toggle_theme', {
        theme_mode: isLight ? 'light' : 'dark'
      });
    }
  });
}

// ==========================================
// 2. COPY EMAIL & GA4 ENGAGEMENT EVENT
// ==========================================
function copyEmail() {
  const email = "aominhtam@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    alert("Email address copied to clipboard: " + email);

    // GA4 Custom Event: Theo dõi khi HR bấm Copy Email
    if (typeof gtag === 'function') {
      gtag('event', 'copy_email_click', {
        event_category: 'Contact',
        event_label: 'Copied Contact Email'
      });
    }
  }).catch(() => {
    alert("Failed to copy automatically. Email: " + email);
  });
}

// ==========================================
// 3. SCROLLSPY (SÁNG ĐÈN NAVBAR THEO SECTION)
// ==========================================
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

// ==========================================
// 4. GA4 CUSTOM EVENTS (TRACKING DỰ ÁN & REPO)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      const linkText = e.target.textContent.trim();
      const targetHref = e.target.getAttribute('href');

      if (typeof gtag === 'function') {
        gtag('event', 'project_interaction', {
          action_type: linkText.includes('GitHub') ? 'view_github_repo' : 'read_case_study',
          project_url: targetHref
        });
      }
    });
  });
});