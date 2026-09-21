/**
 * HIGH-CRAFT DEVELOPER PORTFOLIO JAVASCRIPT ENGINE
 * Powered by PORTFOLIO_DATA (js/portfolio.data.js)
 * Clean, production-ready, minimalist, and zero unnecessary alerts/toast bloat.
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA || {};

  /* ==========================================================
     1. SILENT THEME TOGGLE (GitHub / Vercel / Linear style)
     ==========================================================
     - No toasts, no popups, no alerts.
     - Direct CSS variable switch with smooth 250ms transition.
     ========================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("devcraft-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("devcraft-theme", next);

    // Subtle micro-interaction feedback on the button itself
    if (themeToggle) {
      themeToggle.style.transform = "scale(0.88)";
      setTimeout(() => {
        themeToggle.style.transform = "";
      }, 180);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  /* ==========================================================
     2. DYNAMIC CONTENT RENDERING (From portfolio.data.js)
     ========================================================== */
  // A. Render Infinite Tech Marquee
  const marqueeTrack = document.getElementById("marquee-track");
  if (marqueeTrack && data.techStack) {
    const renderGroup = () => {
      const group = document.createElement("div");
      group.className = "marquee-group";
      data.techStack.forEach((tech) => {
        const pill = document.createElement("div");
        pill.className = "tech-pill";
        pill.innerHTML = `<span class="tech-icon">${tech.icon}</span>${tech.name}`;
        group.appendChild(pill);
      });
      return group;
    };

    const g1 = renderGroup();
    const g2 = renderGroup();
    g2.setAttribute("aria-hidden", "true");
    marqueeTrack.appendChild(g1);
    marqueeTrack.appendChild(g2);
  }

  // B. Render Skills Matrix
  const skillsContainer = document.getElementById("skills-container");
  if (skillsContainer && data.skills) {
    const icons = [
      `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
      `<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>`,
      `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
      `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
    ];

    data.skills.forEach((skill, idx) => {
      const card = document.createElement("div");
      card.className = "skill-feature-card";

      const iconPath = icons[idx % icons.length];
      const tagsHtml = skill.tags.map((t) => `<span>${t}</span>`).join("");

      card.innerHTML = `
        <div class="skill-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconPath}</svg>
        </div>
        <h3>${skill.title}</h3>
        <p>${skill.desc}</p>
        <div class="skill-badge-cloud">${tagsHtml}</div>
      `;
      skillsContainer.appendChild(card);
    });
  }

  // C. Render Projects Showcase (GitHub Projects)
  const projectGrid = document.getElementById("project-grid");
  if (projectGrid && data.projects) {
    data.projects.forEach((proj) => {
      const article = document.createElement("article");
      const isFeatured = proj.featured;
      article.className = `project-showcase-card ${isFeatured ? "featured" : ""}`;
      article.setAttribute("data-category", proj.category);

      let screenContent = "";
      if (proj.mockupType === "dashboard") {
        screenContent = `
          <div class="browser-screen-content mockup-dashboard">
            <div class="mockup-dash-nav">
              <span class="mockup-dash-badge">RAPIM TNI • Check-In Active</span>
              <span class="mockup-dash-uptime">E-Ticket QR Live</span>
            </div>
            <div class="mockup-stat-row">
              <div class="mockup-mini-card">
                <small>Delegasi Terverifikasi</small>
                <strong>1,248 / 1,250</strong>
                <span class="growth-pos">99.8% Check-in</span>
              </div>
              <div class="mockup-mini-card">
                <small>Waktu Verifikasi</small>
                <strong>1.4 detik</strong>
                <span class="growth-pos">Presisi QR</span>
              </div>
            </div>
            <div class="mockup-chart-visual">
              <div class="chart-bar" style="--bar-h: 30%"></div>
              <div class="chart-bar" style="--bar-h: 55%"></div>
              <div class="chart-bar" style="--bar-h: 75%"></div>
              <div class="chart-bar highlight" style="--bar-h: 98%"></div>
              <div class="chart-bar" style="--bar-h: 88%"></div>
              <div class="chart-bar" style="--bar-h: 92%"></div>
            </div>
          </div>
        `;
      } else if (proj.mockupType === "cli") {
        screenContent = `
          <div class="browser-screen-content mockup-terminal-ui">
            <div class="cli-row"><span class="c-kw">RUN</span> secintel-toolkit scan --target enterprise.domain</div>
            <div class="cli-row"><span class="c-str">[MODULES]:</span> ThreatIntel, SSL/TLS, DNS, Operator GEO</div>
            <div class="cli-row"><span class="c-comment">[AUDIT]:</span> SSL A+ Valid | DNSSEC Active | Zero Leak</div>
            <div class="cli-row"><span class="c-var">[RESULT]:</span> Target infrastructure clean &amp; compliant (18ms)</div>
          </div>
        `;
      } else if (proj.mockupType === "streaming") {
        screenContent = `
          <div class="browser-screen-content mockup-dashboard" style="background:#090b10">
            <div class="mockup-dash-nav">
              <span class="mockup-dash-badge" style="background:rgba(239,68,68,0.15);color:#f87171">60 FPS Ultra HD</span>
              <span class="mockup-dash-uptime">TMDb Sync Active</span>
            </div>
            <div class="mockup-stat-row">
              <div class="mockup-mini-card">
                <small>Katalog Film &amp; Serial</small>
                <strong>12,500+ Judul</strong>
                <span class="growth-pos">Sub Indo Mulus</span>
              </div>
              <div class="mockup-mini-card">
                <small>Multi-Server Latency</small>
                <strong>12ms CDN</strong>
                <span class="growth-pos">Zero Buffering</span>
              </div>
            </div>
          </div>
        `;
      } else {
        screenContent = `
          <div class="browser-screen-content mockup-dashboard">
            <div class="mockup-dash-nav">
              <span class="mockup-dash-badge">${proj.title}</span>
              <span class="mockup-dash-uptime">Active Build</span>
            </div>
            <div class="mockup-stat-row">
              <div class="mockup-mini-card">
                <small>Kategori</small>
                <strong>${proj.category.toUpperCase()}</strong>
              </div>
              <div class="mockup-mini-card">
                <small>Status</small>
                <strong>Production Ready</strong>
              </div>
            </div>
          </div>
        `;
      }

      const tagsHtml = proj.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("");

      article.innerHTML = `
        <div class="project-card-grid">
          <div class="project-mockup-wrapper">
            <div class="browser-window">
              <div class="browser-topbar">
                <div class="browser-traffic-lights">
                  <span class="light red"></span>
                  <span class="light yellow"></span>
                  <span class="light green"></span>
                </div>
                <div class="browser-address-bar">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span>https://${proj.mockupUrl}</span>
                </div>
              </div>
              ${screenContent}
            </div>
          </div>

          <div class="project-details-wrapper">
            ${isFeatured ? `
              <div class="project-featured-tag">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>Featured Project</span>
              </div>
            ` : ""}
            <h3 class="project-title">${proj.title}</h3>

            <div class="project-tabs-control" data-project="${proj.id}">
              <button class="proj-tab-btn active" data-tab="overview">Overview</button>
              <button class="proj-tab-btn" data-tab="architecture">Tech Stack</button>
              <button class="proj-tab-btn" data-tab="impact">Key Impact</button>
            </div>

            <div class="project-tab-panels">
              <div class="tab-panel active" data-panel="overview">
                <p class="project-description">${proj.tabs.overview}</p>
              </div>
              <div class="tab-panel" data-panel="architecture">
                <p class="project-description">${proj.tabs.architecture}</p>
              </div>
              <div class="tab-panel" data-panel="impact">
                <p class="project-description">${proj.tabs.impact}</p>
              </div>
            </div>

            <div class="project-tags">${tagsHtml}</div>

            <div class="project-action-links">
              <a href="${proj.repoUrl}" class="btn-link-action" target="_blank" rel="noopener">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.19-.02-2.16-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39s1.97.13 2.89.39c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .3.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
                <span>Lihat Repositori</span>
              </a>
            </div>
          </div>
        </div>
      `;

      projectGrid.appendChild(article);
    });
  }

  /* ==========================================================
     3. SCROLL PROGRESS BAR & SLIDING NAV PILL
     ========================================================== */
  const scrollProgressBar = document.getElementById("scroll-progress");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const slidingPill = document.getElementById("sliding-pill");
  const navMenu = document.getElementById("nav-menu");

  function updateScrollState() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    const scrollPos = scrollTop + 160;
    let currentId = sections[0] ? sections[0].id : "";

    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    });

    let activeLink = null;
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) activeLink = link;
    });

    if (activeLink && slidingPill && navMenu) {
      const navRect = navMenu.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const offsetLeft = linkRect.left - navRect.left;
      slidingPill.style.width = `${linkRect.width}px`;
      slidingPill.style.transform = `translateX(${offsetLeft - 4}px)`;
      slidingPill.style.opacity = "1";
    }
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
  setTimeout(updateScrollState, 150);

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ==========================================================
     4. AMBIENT CURSOR GLOW (Subtle Background Lighting)
     ========================================================== */
  const cursorGlow = document.getElementById("cursor-glow");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderCursorGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    if (cursorGlow) {
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
    }
    requestAnimationFrame(renderCursorGlow);
  }
  renderCursorGlow();

  /* ==========================================================
     5. LIVE JAKARTA CLOCK (WIB, UTC+7)
     ========================================================== */
  const liveClockEl = document.getElementById("live-clock");
  function updateJakartaClock() {
    if (!liveClockEl) return;
    const clockText = liveClockEl.querySelector(".clock-text");
    if (!clockText) return;

    const now = new Date();
    const options = {
      timeZone: "Asia/Jakarta",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const timeStr = new Intl.DateTimeFormat("id-ID", options).format(now);
    clockText.textContent = `Jakarta • ${timeStr} WIB`;
  }
  setInterval(updateJakartaClock, 1000);
  updateJakartaClock();

  /* ==========================================================
     6. INTERACTIVE CONSTELLATION PARTICLES HERO CANVAS
     ========================================================== */
  const canvas = document.getElementById("hero-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    const particleCount = 45;
    const maxDistance = 110;
    const pointer = { x: -1000, y: -1000, radius: 140 };

    function resizeCanvas() {
      const heroSec = canvas.closest(".hero-section");
      width = canvas.width = heroSec ? heroSec.clientWidth : window.innerWidth;
      height = canvas.height = heroSec ? heroSec.clientHeight : window.innerHeight;
      initParticles();
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.6 + 1,
        });
      }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    window.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }, { passive: true });

    window.addEventListener("pointerleave", () => {
      pointer.x = -1000;
      pointer.y = -1000;
    });

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      const particleColor = isDark ? "rgba(16, 185, 129, " : "rgba(15, 23, 42, ";
      const lineColor = isDark ? "rgba(16, 185, 129, " : "rgba(15, 23, 42, ";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < pointer.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (pointer.radius - dist) / pointer.radius;
          p.x -= Math.cos(angle) * force * 2;
          p.y -= Math.sin(angle) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}0.5)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < maxDistance) {
            const alpha = (1 - distBetween / maxDistance) * (isDark ? 0.12 : 0.08);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  /* ==========================================================
     7. INTERACTIVE DEVELOPER TERMINAL (Tabs & Compiler Run)
     ========================================================== */
  const terminalTabs = document.querySelectorAll(".terminal-tab");
  const tabDev = document.getElementById("tab-dev");
  const tabConfig = document.getElementById("tab-config");
  const btnRunCode = document.getElementById("btn-run-code");
  const consoleText = document.getElementById("console-text");

  terminalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      terminalTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      if (target === "dev") {
        if (tabDev) tabDev.classList.add("active");
        if (tabConfig) tabConfig.classList.remove("active");
      } else {
        if (tabDev) tabDev.classList.remove("active");
        if (tabConfig) tabConfig.classList.add("active");
      }
    });
  });

  if (btnRunCode && consoleText) {
    let isRunning = false;
    btnRunCode.addEventListener("click", () => {
      if (isRunning) return;
      isRunning = true;
      btnRunCode.style.opacity = "0.7";
      consoleText.innerHTML = `<span style="color:#f59e0b">⚡ [tsc] Compiling alfian.ts (target: ESNext)...</span>`;

      setTimeout(() => {
        consoleText.innerHTML = `<span style="color:#38bdf8">📦 [github:Alfianax01] 9 repositories verified &amp; connected...</span>`;
      }, 400);

      setTimeout(() => {
        consoleText.innerHTML = `<span style="color:#10b981">✔ [Runtime Output]: "Alfian: Building resilient, battle-tested software 🚀" [Done in 12ms]</span>`;
        btnRunCode.style.opacity = "1";
        isRunning = false;
      }, 950);
    });
  }

  /* ==========================================================
     8. GITHUB STYLE CONTRIBUTION HEATMAP GENERATOR
     ========================================================== */
  const heatmapGrid = document.getElementById("heatmap-grid");
  if (heatmapGrid) {
    const totalCells = 28 * 5;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "heatmap-cell";
      const rand = Math.random();
      let level = 0;
      let commitCount = 0;

      if (rand > 0.85) {
        level = 4;
        commitCount = Math.floor(Math.random() * 6) + 12;
      } else if (rand > 0.65) {
        level = 3;
        commitCount = Math.floor(Math.random() * 5) + 7;
      } else if (rand > 0.4) {
        level = 2;
        commitCount = Math.floor(Math.random() * 4) + 3;
      } else if (rand > 0.18) {
        level = 1;
        commitCount = Math.floor(Math.random() * 2) + 1;
      }

      cell.classList.add(`lvl-${level}`);
      cell.setAttribute("title", `${commitCount} commits pada hari ini`);
      fragment.appendChild(cell);
    }
    heatmapGrid.appendChild(fragment);
  }

  /* ==========================================================
     9. PROJECT MULTI-TAB SWITCHER (Overview, Tech, Impact)
     ========================================================== */
  document.querySelectorAll(".project-tabs-control").forEach((tabGroup) => {
    const buttons = tabGroup.querySelectorAll(".proj-tab-btn");
    const container = tabGroup.closest(".project-details-wrapper");
    if (!container) return;
    const panels = container.querySelectorAll(".tab-panel");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const selectedTab = btn.getAttribute("data-tab");
        panels.forEach((panel) => {
          panel.classList.toggle("active", panel.getAttribute("data-panel") === selectedTab);
        });
      });
    });
  });

  /* ==========================================================
     10. DYNAMIC PROJECT CATEGORY FILTER
     ========================================================== */
  const filterBar = document.getElementById("filter-bar");
  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-capsule-btn");
      if (!btn) return;

      filterBar.querySelectorAll(".filter-capsule-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");
      const projectCards = document.querySelectorAll(".project-showcase-card");
      projectCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        const show = category === "semua" || cardCat === category;
        card.classList.toggle("hidden", !show);
      });
    });
  }

  /* ==========================================================
     11. SILENT ONE-CLICK EMAIL COPY (In-Button Micro Interaction)
     ==========================================================
     - No spam toasts.
     - Button text transitions temporarily to "Tersalin ✓"
     ========================================================== */
  function copyEmailToClipboard(btn, emailAddress = data.contact?.email || "alfian.devcraft@gmail.com") {
    const performCopy = () => {
      if (btn) {
        const originalHtml = btn.innerHTML;
        btn.classList.add("copied");
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Tersalin</span>
        `;
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove("copied");
        }, 1800);
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailAddress).then(performCopy).catch(() => {
        fallbackCopyText(emailAddress);
        performCopy();
      });
    } else {
      fallbackCopyText(emailAddress);
      performCopy();
    }
  }

  function fallbackCopyText(text) {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }

  document.querySelectorAll(".copy-email-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email") || data.contact?.email;
      copyEmailToClipboard(btn, email);
    });
  });

  /* ==========================================================
     12. COMMAND PALETTE (CTRL+K / CMD+K)
     ========================================================== */
  const cmdPalette = document.getElementById("cmd-palette");
  const cmdTriggerBtn = document.getElementById("cmd-trigger-btn");
  const cmdCloseBtn = document.getElementById("cmd-close-btn");
  const cmdSearchInput = document.getElementById("cmd-search-input");
  const cmdResults = document.getElementById("cmd-results");

  function openCommandPalette() {
    if (!cmdPalette) return;
    cmdPalette.hidden = false;
    if (cmdSearchInput) {
      cmdSearchInput.value = "";
      cmdSearchInput.focus();
    }
    filterCommandItems("");
  }

  function closeCommandPalette() {
    if (!cmdPalette) return;
    cmdPalette.hidden = true;
  }

  if (cmdTriggerBtn) cmdTriggerBtn.addEventListener("click", openCommandPalette);
  if (cmdCloseBtn) cmdCloseBtn.addEventListener("click", closeCommandPalette);

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdPalette && cmdPalette.hidden) {
        openCommandPalette();
      } else {
        closeCommandPalette();
      }
    } else if (e.key === "Escape" && cmdPalette && !cmdPalette.hidden) {
      closeCommandPalette();
    }
  });

  if (cmdPalette) {
    cmdPalette.addEventListener("click", (e) => {
      if (e.target === cmdPalette) closeCommandPalette();
    });
  }

  function filterCommandItems(query) {
    if (!cmdResults) return;
    const items = cmdResults.querySelectorAll(".cmd-item");
    const q = query.toLowerCase().trim();

    items.forEach((item) => {
      const label = item.querySelector(".cmd-item-label")?.textContent.toLowerCase() || "";
      const match = label.includes(q);
      item.style.display = match ? "flex" : "none";
    });
  }

  if (cmdSearchInput) {
    cmdSearchInput.addEventListener("input", (e) => {
      filterCommandItems(e.target.value);
    });
  }

  if (cmdResults) {
    cmdResults.addEventListener("click", (e) => {
      const item = e.target.closest(".cmd-item");
      if (!item) return;
      executeCommand(item);
    });
  }

  function executeCommand(item) {
    const action = item.getAttribute("data-action");
    closeCommandPalette();

    if (action === "navigate") {
      const target = item.getAttribute("data-target");
      const targetEl = document.querySelector(target);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    } else if (action === "toggle-theme") {
      toggleTheme();
    } else if (action === "copy-email") {
      const directBtn = document.querySelector(".copy-email-btn");
      copyEmailToClipboard(directBtn, data.contact?.email);
    } else if (action === "open-github") {
      window.open(data.contact?.github || "https://github.com/Alfianax01", "_blank", "noopener");
    }
  }

  /* ==========================================================
     13. CONTACT FORM (Minimal & Clean UX)
     ========================================================== */
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const btnSubmit = document.getElementById("btn-submit-form");

  if (contactForm && btnSubmit) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("form-nama");
      const email = document.getElementById("form-email");
      const pesan = document.getElementById("form-pesan");

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      const isValid = nama.value.trim().length > 1 && emailValid && pesan.value.trim().length > 3;

      if (!isValid) {
        if (formFeedback) {
          formFeedback.hidden = false;
          formFeedback.className = "form-feedback-message error";
          formFeedback.textContent = "Mohon lengkapi formulir dengan alamat email yang valid dan pesan singkat.";
        }
        return;
      }

      if (formFeedback) formFeedback.hidden = true;

      btnSubmit.classList.add("loading");
      btnSubmit.disabled = true;

      setTimeout(() => {
        btnSubmit.classList.remove("loading");
        btnSubmit.classList.add("success");
        contactForm.reset();

        if (formFeedback) {
          formFeedback.hidden = false;
          formFeedback.className = "form-feedback-message success";
          formFeedback.textContent = "Pesan Anda berhasil dikirim. Terima kasih!";
        }

        setTimeout(() => {
          btnSubmit.classList.remove("success");
          btnSubmit.disabled = false;
          if (formFeedback) formFeedback.hidden = true;
        }, 4000);
      }, 900);
    });
  }
});