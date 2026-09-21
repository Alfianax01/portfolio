/**
 * HIGH-CRAFT DEVELOPER PORTFOLIO JAVASCRIPT ENGINE
 * Powered by PORTFOLIO_DATA (js/portfolio.data.js)
 * Clean, maintainable, modular, and zero external dependency bloat.
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA || {};

  /* ==========================================================
     1. THEME TOGGLE (Obsidian Dark <-> Ceramic Light)
     ========================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("devcraft-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("devcraft-theme", next);

    // Micro interaction scale pada tombol toggle tema
    if (themeToggle) {
      themeToggle.style.transform = "scale(0.85)";
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
      card.className = "skill-feature-card tilt-card";
      card.setAttribute("data-tilt", "true");

      const iconPath = icons[idx % icons.length];
      const tagsHtml = skill.tags.map((t) => `<span>${t}</span>`).join("");

      card.innerHTML = `
        <div class="skill-icon-wrap">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconPath}</svg>
        </div>
        <h3>${skill.title}</h3>
        <p>${skill.desc}</p>
        <div class="skill-badge-cloud">${tagsHtml}</div>
      `;
      skillsContainer.appendChild(card);
    });
  }

  // C. Render Projects Showcase (GitHub Projects API + Live Telemetry)
  const projectGrid = document.getElementById("project-grid");
  const filterBar = document.getElementById("filter-bar");
  let fetchedRepos = [];
  let activeCategory = "semua";

  function createProjectCardElement(proj) {
    const article = document.createElement("article");
    const isFeatured = !!proj.featured;
    article.className = `project-showcase-card ${isFeatured ? "border-beam-container" : "tilt-card"}`;
    article.setAttribute("data-category", proj.category || "fullstack");
    if (!isFeatured) article.setAttribute("data-tilt", "true");

    let screenContent = "";
    if (proj.mockupType === "dashboard") {
      screenContent = `
        <div class="browser-screen-content mockup-dashboard">
          <div class="mockup-dash-nav">
            <span class="mockup-dash-badge">${proj.title.split(" ")[0]} • Active</span>
            <span class="mockup-dash-uptime">Production Ready</span>
          </div>
          <div class="mockup-stat-row">
            <div class="mockup-mini-card">
              <small>Stars &amp; Forks</small>
              <strong>⭐ ${proj.stars || 0} • 🍴 ${proj.forks || 0}</strong>
              <span class="growth-pos">GitHub Verified</span>
            </div>
            <div class="mockup-mini-card">
              <small>Bahasa</small>
              <strong>${proj.language || "TypeScript"}</strong>
              <span class="growth-pos">Clean Code</span>
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
          <div class="cli-row"><span class="c-kw">RUN</span> ${proj.id || "tool"} scan --target enterprise.domain</div>
          <div class="cli-row"><span class="c-str">[MODULES]:</span> ThreatIntel, SSL/TLS, DNS, Operator GEO</div>
          <div class="cli-row"><span class="c-comment">[AUDIT]:</span> SSL A+ Valid | DNSSEC Active | Zero Leak</div>
          <div class="cli-row"><span class="c-var">[RESULT]:</span> Target infrastructure clean &amp; compliant (18ms)</div>
        </div>
      `;
    } else if (proj.mockupType === "streaming") {
      screenContent = `
        <div class="browser-screen-content mockup-dashboard" style="background:#090b10">
          <div class="mockup-dash-nav">
            <span class="mockup-dash-badge" style="background:rgba(239,68,68,0.2);color:#f87171">60 FPS Ultra HD</span>
            <span class="mockup-dash-uptime">TMDb Sync Active</span>
          </div>
          <div class="mockup-stat-row">
            <div class="mockup-mini-card">
              <small>Katalog &amp; Media</small>
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
    } else if (proj.mockupType === "islamic") {
      screenContent = `
        <div class="browser-screen-content mockup-dashboard" style="background:#091410">
          <div class="mockup-dash-nav">
            <span class="mockup-dash-badge" style="background:rgba(16,185,129,0.2);color:#34d399">Al-Waqt • Geodesic</span>
            <span class="mockup-dash-uptime">Kemenag RI API</span>
          </div>
          <div class="mockup-stat-row">
            <div class="mockup-mini-card">
              <small>Arah Kiblat</small>
              <strong>295.1° Presisi</strong>
              <span class="growth-pos">Magnetometer</span>
            </div>
            <div class="mockup-mini-card">
              <small>Waktu Sholat</small>
              <strong>Jadwal Akurat</strong>
              <span class="growth-pos">Auto Adzan Audio</span>
            </div>
          </div>
        </div>
      `;
    } else if (proj.mockupType === "portal") {
      screenContent = `
        <div class="browser-screen-content mockup-dashboard">
          <div class="mockup-dash-nav">
            <span class="mockup-dash-badge" style="background:rgba(6,182,212,0.2);color:#38bdf8">Portal Akademik</span>
            <span class="mockup-dash-uptime">Multi-Role CRUD</span>
          </div>
          <div class="mockup-stat-row">
            <div class="mockup-mini-card">
              <small>Roles Sistem</small>
              <strong>Admin • Guru • Siswa</strong>
              <span class="growth-pos">Session Hardened</span>
            </div>
            <div class="mockup-mini-card">
              <small>Dukungan Bahasa</small>
              <strong>ID / EN / JP / KR</strong>
              <span class="growth-pos">Multi-Language</span>
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
              <strong>${(proj.category || "Fullstack").toUpperCase()}</strong>
            </div>
            <div class="mockup-mini-card">
              <small>Bahasa</small>
              <strong>${proj.language || "Code"}</strong>
            </div>
          </div>
        </div>
      `;
    }

    const tagsHtml = (proj.tags || []).map((t) => `<span class="tech-tag">${t}</span>`).join("");

    article.innerHTML = `
      ${isFeatured ? '<div class="border-beam" aria-hidden="true"></div>' : ""}
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
                <span>https://${proj.mockupUrl || "github.com/Alfianax01"}</span>
              </div>
            </div>
            ${screenContent}
          </div>
        </div>

        <div class="project-details-wrapper">
          ${isFeatured ? `
            <div class="project-featured-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
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
              <p class="project-description">${proj.tabs?.overview || proj.description || ""}</p>
            </div>
            <div class="tab-panel" data-panel="architecture">
              <p class="project-description">${proj.tabs?.architecture || "Dibangun dengan standar kode bersih dan arsitektur modular."}</p>
            </div>
            <div class="tab-panel" data-panel="impact">
              <p class="project-description">${proj.tabs?.impact || "Terbuka di GitHub dengan kode sumber terverifikasi."}</p>
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

    return article;
  }

  function applyProjectFilterAndRender(showFallbackNotice = false) {
    if (!projectGrid) return;

    // Pastikan repository dari akun GitHub benar-benar diterima sebelum proses filtering
    if (!Array.isArray(fetchedRepos) || fetchedRepos.length === 0) {
      console.warn("Belum ada repositori yang diterima sebelum proses filtering.");
      return;
    }

    // Category filtering
    let filteredRepos = fetchedRepos.filter((proj) => {
      if (activeCategory === "semua") return true;
      return proj.category === activeCategory;
    });

    // Jika filtering menghasilkan array kosong:
    // - tampilkan fallback semua repository
    // - jangan tampilkan section kosong
    let isFallbackToAll = false;
    if (filteredRepos.length === 0 && fetchedRepos.length > 0) {
      console.warn(`Filtering kategori "${activeCategory}" menghasilkan array kosong. Melakukan fallback ke semua repositori.`);
      filteredRepos = [...fetchedRepos];
      isFallbackToAll = true;
    }

    // Debugging sementara (wajib sesuai instruksi):
    console.log("Fetched repositories:", fetchedRepos);
    console.log("Filtered repositories:", filteredRepos);
    console.log("Active category:", activeCategory);

    // Render ke DOM
    projectGrid.innerHTML = "";

    if (showFallbackNotice) {
      const banner = document.createElement("div");
      banner.className = "projects-fallback-banner";
      banner.innerHTML = `
        <span>ℹ️ Menampilkan data lokal terkurasi (Mode Offline / GitHub API Rate Limit).</span>
        <a href="https://github.com/Alfianax01" target="_blank" rel="noopener" class="text-link" style="color:inherit;font-weight:600">Lihat Profil GitHub @Alfianax01 ↗</a>
      `;
      projectGrid.appendChild(banner);
    } else if (isFallbackToAll && activeCategory !== "semua") {
      const notice = document.createElement("div");
      notice.className = "projects-fallback-banner";
      notice.innerHTML = `
        <span>Kategori "${activeCategory}" belum memiliki repositori terpisah. Menampilkan seluruh repositori aktif.</span>
      `;
      projectGrid.appendChild(notice);
    }

    filteredRepos.forEach((proj) => {
      const card = createProjectCardElement(proj);
      projectGrid.appendChild(card);
    });

    // Re-attach 3D tilt
    attachTiltEffects();
  }

  // Delegasi event switcher tabs pada projectGrid
  if (projectGrid) {
    projectGrid.addEventListener("click", (e) => {
      const btn = e.target.closest(".proj-tab-btn");
      if (!btn) return;
      const tabGroup = btn.closest(".project-tabs-control");
      const card = btn.closest(".project-details-wrapper");
      if (!tabGroup || !card) return;

      tabGroup.querySelectorAll(".proj-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedTab = btn.getAttribute("data-tab");
      card.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.getAttribute("data-panel") === selectedTab);
      });
    });
  }

  // Event listener filter capsule bar
  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-capsule-btn");
      if (!btn) return;

      filterBar.querySelectorAll(".filter-capsule-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      activeCategory = btn.getAttribute("data-filter") || "semua";
      applyProjectFilterAndRender();
    });
  }

  async function loadGitHubRepositories() {
    if (!projectGrid) return;

    // 4. Loading state
    projectGrid.innerHTML = `
      <div class="projects-status-card loading-state">
        <div class="projects-status-spinner"></div>
        <h4 class="projects-status-title">Menghubungkan ke GitHub API...</h4>
        <p class="projects-status-desc">Mengambil repositori publik dan telemetri kode terkini dari @Alfianax01.</p>
      </div>
    `;

    try {
      // 1. GitHub API fetch
      const username = data.profile?.handle || "Alfianax01";
      const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

      const response = await fetch(apiUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API HTTP ${response.status}: ${response.statusText}`);
      }

      const rawRepos = await response.json();
      if (!Array.isArray(rawRepos)) {
        throw new Error("Format respon GitHub API tidak berupa daftar repositori.");
      }

      // 2. Data mapping
      const curatedList = Array.isArray(data.projects) ? data.projects : [];

      fetchedRepos = rawRepos
        .filter((r) => !r.fork && r.name.toLowerCase() !== "alfianax01")
        .map((r) => {
          const curated = curatedList.find((p) => {
            const pRepoName = (p.repoUrl || "").split("/").filter(Boolean).pop()?.toLowerCase();
            const pId = (p.id || "").toLowerCase();
            const rName = r.name.toLowerCase();
            return pRepoName === rName || pId === rName || pId.includes(rName) || rName.includes(pId);
          });

          if (curated) {
            return {
              ...curated,
              stars: r.stargazers_count,
              forks: r.forks_count,
              language: r.language || (curated.tags ? curated.tags[0] : "TypeScript"),
              updatedAt: r.updated_at,
              repoUrl: r.html_url || curated.repoUrl,
              demoUrl: r.homepage || curated.demoUrl || r.html_url,
            };
          }

          // Auto-categorization repositori tambahan
          let cat = "fullstack";
          const lowerName = r.name.toLowerCase();
          const lowerLang = (r.language || "").toLowerCase();

          if (
            lowerName.includes("stream") ||
            lowerName.includes("cinema") ||
            lowerName.includes("web") ||
            lowerName.includes("front") ||
            lowerLang === "html" ||
            lowerLang === "css"
          ) {
            cat = "frontend";
          } else if (
            lowerName.includes("tool") ||
            lowerName.includes("sec") ||
            lowerName.includes("recon") ||
            lowerName.includes("cli") ||
            lowerLang === "c++" ||
            lowerLang === "shell"
          ) {
            cat = "tool";
          } else {
            cat = "fullstack";
          }

          const tags = [r.language || "Open Source"].concat(r.topics || []);
          if (tags.length < 3) tags.push("GitHub Repo");

          return {
            id: r.name.toLowerCase(),
            title: r.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            category: cat,
            featured: false,
            mockupType: "dashboard",
            mockupUrl: (r.html_url || "").replace("https://", ""),
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language || "Code",
            tags: tags.slice(0, 4),
            tabs: {
              overview: r.description || "Repositori publik resmi dari akun GitHub @Alfianax01.",
              architecture: `Dibangun menggunakan ${r.language || "arsitektur modular"}, terintegrasi dengan Git workflow.`,
              impact: `Dikelola secara terbuka di GitHub dengan ${r.stargazers_count} stars dan ${r.forks_count} forks.`,
            },
            repoUrl: r.html_url,
            demoUrl: r.homepage || r.html_url,
          };
        });

      // Urutkan: Featured di atas, lalu repositori dengan stars/aktivitas
      fetchedRepos.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.stars || 0) - (a.stars || 0);
      });

      // 3. Category filtering & rendering
      applyProjectFilterAndRender();

    } catch (err) {
      // 5. Error state (JANGAN SWALLOW ERROR)
      console.error("GitHub API Fetch Error:", err);

      if (Array.isArray(data.projects) && data.projects.length > 0) {
        console.warn("Menggunakan data fallback lokal dari portfolio.data.js karena GitHub API gagal.");
        fetchedRepos = [...data.projects];
        applyProjectFilterAndRender(true);
      } else {
        projectGrid.innerHTML = `
          <div class="projects-status-card error-state">
            <div class="projects-status-icon icon-error">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h4 class="projects-status-title">Gagal Memuat Repositori GitHub</h4>
            <p class="projects-status-desc">Terjadi kendala saat menghubungi GitHub API: ${err.message}. Silakan kunjungi profil langsung.</p>
            <div class="projects-status-actions">
              <a href="https://github.com/Alfianax01" target="_blank" rel="noopener" class="btn btn-primary magnetic-btn">
                <span>View GitHub Profile</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <button id="btn-retry-github" class="btn btn-secondary">
                <span>Coba Lagi</span>
              </button>
            </div>
          </div>
        `;

        const retryBtn = document.getElementById("btn-retry-github");
        if (retryBtn) {
          retryBtn.addEventListener("click", () => {
            loadGitHubRepositories();
          });
        }
      }
    }
  }

  // Inisialisasi pemanggilan GitHub Repositories
  loadGitHubRepositories();

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
     4. AMBIENT CURSOR GLOW
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
    const particleCount = 55;
    const maxDistance = 120;
    const pointer = { x: -1000, y: -1000, radius: 150 };

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
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          radius: Math.random() * 1.8 + 1,
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
      const particleColor = isDark ? "rgba(16, 185, 129, " : "rgba(5, 150, 105, ";
      const lineColor = isDark ? "rgba(6, 182, 212, " : "rgba(8, 145, 178, ";

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
          p.x -= Math.cos(angle) * force * 2.5;
          p.y -= Math.sin(angle) * force * 2.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}0.65)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < maxDistance) {
            const alpha = (1 - distBetween / maxDistance) * (isDark ? 0.22 : 0.14);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 0.9;
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
      }, 500);

      setTimeout(() => {
        consoleText.innerHTML = `<span style="color:#10b981">✔ [Runtime Output]: "Alfian: Building resilient, high-performance software ⚡" [Done in 12ms]</span>`;
        btnRunCode.style.opacity = "1";
        isRunning = false;
        showToast("Runtime simulasi berhasil dieksekusi! ⚡");
      }, 1100);
    });
  }

  /* ==========================================================
     8. 3D TILT & SPOTLIGHT CARDS
     ========================================================== */
  function attachTiltEffects() {
    const tiltCards = document.querySelectorAll('[data-tilt="true"]');
    tiltCards.forEach((card) => {
      const glare = card.querySelector(".spotlight-glare");

      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;

        if (glare) {
          glare.style.left = `${x}px`;
          glare.style.top = `${y}px`;
          glare.style.opacity = "1";
        }
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
        if (glare) glare.style.opacity = "0";
      });
    });
  }
  attachTiltEffects();

  /* ==========================================================
     9. GITHUB STYLE CONTRIBUTION HEATMAP GENERATOR
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
     10. FLOATING SPRING TOAST NOTIFICATION SYSTEM
     ========================================================== */
  const toastContainer = document.getElementById("toast-container");
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast-item";
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px) scale(0.95)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  /* ==========================================================
     13. ONE-CLICK EMAIL COPY
     ========================================================== */
  function copyEmailToClipboard(emailAddress = data.contact?.email || "alfian.devcraft@gmail.com") {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailAddress).then(() => {
        showToast(`Email disalin ke clipboard! 📋 (${emailAddress})`);
      }).catch(() => fallbackCopyText(emailAddress));
    } else {
      fallbackCopyText(emailAddress);
    }
  }

  function fallbackCopyText(text) {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    showToast(`Email disalin ke clipboard! 📋 (${text})`);
  }

  document.querySelectorAll(".copy-email-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email") || data.contact?.email;
      copyEmailToClipboard(email);
    });
  });

  /* ==========================================================
     14. COMMAND PALETTE (CTRL+K / CMD+K)
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
      copyEmailToClipboard();
    } else if (action === "open-github") {
      window.open(data.contact?.github || "https://github.com/Alfianax01", "_blank", "noopener");
    }
  }

  /* ==========================================================
     15. TACTILE CONTACT FORM
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
        showToast("Pesan berhasil dikirim ke Alfian! Terima kasih. 🎉");
        contactForm.reset();

        setTimeout(() => {
          btnSubmit.classList.remove("success");
          btnSubmit.disabled = false;
        }, 3500);
      }, 1200);
    });
  }

  /* ==========================================================
     16. MAGNETIC BUTTON PHYSICS
     ========================================================== */
  const magneticButtons = document.querySelectorAll('[data-magnetic="true"]');
  magneticButtons.forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });
});