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

  // Official GitHub Language Colors
  const GITHUB_LANG_COLORS = {
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    Dart: "#00b4ab",
    PHP: "#4f5d95",
    "C++": "#f34b7d",
    C: "#555555",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Vue: "#41b883",
    default: "#8b949e",
  };

  const CATEGORY_LABELS = {
    fullstack: "Full-Stack",
    frontend: "Frontend",
    tool: "Security & Tooling",
    default: "Repository",
  };

  function createProjectCardElement(proj) {
    const article = document.createElement("article");
    const isFeatured = !!proj.featured;
    article.className = `project-showcase-card ${isFeatured ? "featured-project-card border-beam-container" : ""} tilt-card`;
    article.setAttribute("data-category", proj.category || "fullstack");
    article.setAttribute("data-tilt", "true");

    const lang = proj.language || "TypeScript";
    const langColor = GITHUB_LANG_COLORS[lang] || GITHUB_LANG_COLORS.default;
    const catLabel = CATEGORY_LABELS[proj.category] || CATEGORY_LABELS.default;

    const tagsHtml = (proj.tags || [])
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");

    const highlightsHtml = (proj.highlights || [])
      .map(
        (h) => `
        <li class="project-highlight-item">
          <svg class="highlight-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${h}</span>
        </li>
      `
      )
      .join("");

    const fileIconSvg =
      proj.specType === "cli"
        ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`
        : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;

    article.innerHTML = `
      ${isFeatured ? '<div class="border-beam" aria-hidden="true"></div>' : ""}
      <div class="project-card-grid">
        <div class="project-details-wrapper">
          <div class="project-meta-header">
            <div class="project-lang-indicator" title="Bahasa Utama">
              <span class="lang-dot" style="background-color: ${langColor}"></span>
              <span class="lang-label">${lang}</span>
            </div>
            <span class="project-cat-chip">${catLabel}</span>
            ${isFeatured ? '<span class="featured-indicator">★ Unggulan</span>' : ""}
            <div class="project-telemetry">
              <span class="telemetry-pill" title="GitHub Stars">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>${proj.stars || 0}</span>
              </span>
              <span class="telemetry-pill" title="GitHub Forks">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>
                <span>${proj.forks || 0}</span>
              </span>
            </div>
          </div>

          <h3 class="project-title">${proj.title}</h3>
          <p class="project-summary">${proj.summary || proj.description || ""}</p>

          <div class="project-spec-points">
            <h4 class="spec-points-title">Spesifikasi Arsitektur:</h4>
            <ul class="project-highlights-list">
              ${highlightsHtml}
            </ul>
          </div>

          <div class="project-tags">${tagsHtml}</div>

          <div class="project-action-links">
            <a href="${proj.repoUrl}" class="btn-action-primary" target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.19-.02-2.16-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39s1.97.13 2.89.39c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .3.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
              <span>Kode Sumber</span>
            </a>
            ${
              proj.demoUrl && proj.demoUrl !== proj.repoUrl
                ? `
              <a href="${proj.demoUrl}" class="btn-action-secondary" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <span>Demo Langsung</span>
              </a>
            `
                : ""
            }
          </div>
        </div>

        <div class="project-spec-panel" aria-label="Snapshot Arsitektur Kode">
          <div class="spec-panel-header">
            <div class="spec-file-info">
              ${fileIconSvg}
              <span class="spec-file-path">${proj.specFile || "src/index.ts"}</span>
            </div>
            <span class="spec-runtime-chip">${proj.specRuntime || "Architecture Spec"}</span>
          </div>
          <div class="spec-code-wrapper">
            <pre class="spec-code-block"><code>${proj.specSnippet || ""}</code></pre>
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
              demoUrl: curated.demoUrl || r.homepage || r.html_url,
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

          const updatedYear = r.updated_at ? new Date(r.updated_at).getFullYear() : 2026;
          const displayLang = r.language || "Code";

          return {
            id: r.name.toLowerCase(),
            title: r.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            category: cat,
            featured: false,
            repoUrl: r.html_url,
            demoUrl: r.homepage || r.html_url,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: displayLang,
            specFile: "metadata.json",
            specRuntime: `${displayLang} / Git`,
            tags: tags.slice(0, 4),
            summary: r.description || "Repositori kode publik dari profil GitHub resmi @Alfianax01.",
            highlights: [
              `Cabang aktif: ${r.default_branch || "main"} (${r.visibility || "public"})`,
              `Aktivitas sinkronisasi repositori tahun ${updatedYear}`,
              `Kode sumber terbuka tersedia di GitHub`,
            ],
            specType: "code",
            specSnippet: `<span class="c-comment">// Repositori Publik GitHub @Alfianax01</span>
{
  <span class="c-prop">"name"</span>: <span class="c-str">"${r.name}"</span>,
  <span class="c-prop">"language"</span>: <span class="c-str">"${displayLang}"</span>,
  <span class="c-prop">"default_branch"</span>: <span class="c-str">"${r.default_branch || "main"}"</span>,
  <span class="c-prop">"stars"</span>: <span class="c-var">${r.stargazers_count || 0}</span>,
  <span class="c-prop">"forks"</span>: <span class="c-var">${r.forks_count || 0}</span>,
  <span class="c-prop">"open_issues"</span>: <span class="c-var">${r.open_issues_count || 0}</span>
}`,
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
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
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
        if (e.pointerType === "touch") return;
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

  /* ==========================================================
     17. UPSCAYL-INSPIRED FLUID CHOREOGRAPHY (GSAP & SCROLLTRIGGER)
     High-Craft, anti-slop, 60fps physics timeline system
     ========================================================== */
  function initUpscaylAnimations() {
    if (typeof gsap === "undefined") return;

    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 1. Hero Entrance Timeline (Upscayl power4.out cascade)
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    const heroTitle = document.getElementById("hero-title");
    const heroSubtext = document.getElementById("hero-subtext");
    const heroAnnouncement = document.getElementById("hero-announcement");
    const heroButtons = document.getElementById("hero-buttons");
    const heroStats = document.getElementById("hero-stats");
    const heroTerminal = document.getElementById("hero-terminal");

    if (heroTitle) {
      heroTl.from(heroTitle, { y: 60, opacity: 0, duration: 1.1 });
    }
    if (heroSubtext) {
      heroTl.from(heroSubtext, { y: 40, opacity: 0, duration: 1 }, "-=0.7");
    }
    if (heroAnnouncement) {
      heroTl.from(heroAnnouncement, { scale: 0.8, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.6");
    }
    if (heroButtons) {
      heroTl.from(heroButtons, { y: 30, opacity: 0, duration: 0.85 }, "-=0.6");
    }
    if (heroStats) {
      heroTl.from(heroStats, { y: 20, opacity: 0, duration: 0.85 }, "-=0.6");
    }
    if (heroTerminal) {
      heroTl.from(heroTerminal, { y: 45, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");
    }

    // 2. Chromatic Keyword Text Cycle (Upscayl #text-linux, #text-macos, #text-windows loop)
    const textWeb = document.getElementById("text-web");
    const textMobile = document.getElementById("text-mobile");
    const textSecurity = document.getElementById("text-security");

    if (textWeb && textMobile && textSecurity) {
      const chromaTl = gsap.timeline({ repeat: -1 });
      chromaTl
        .to(textWeb, {
          duration: 1.1,
          color: "#10b981",
          textShadow: "0 0 16px rgba(16, 185, 129, 0.45)",
          ease: "power4.inOut",
        })
        .to(textWeb, {
          duration: 1.1,
          color: "",
          textShadow: "none",
          ease: "power4.inOut",
        })
        .to(textMobile, {
          duration: 1.1,
          color: "#06b6d4",
          textShadow: "0 0 16px rgba(6, 182, 212, 0.45)",
          ease: "power4.inOut",
        })
        .to(textMobile, {
          duration: 1.1,
          color: "",
          textShadow: "none",
          ease: "power4.inOut",
        })
        .to(textSecurity, {
          duration: 1.1,
          color: "#f59e0b",
          textShadow: "0 0 16px rgba(245, 158, 11, 0.45)",
          ease: "power4.inOut",
        })
        .to(textSecurity, {
          duration: 1.1,
          color: "",
          textShadow: "none",
          ease: "power4.inOut",
        });
    }

    // 3. ScrollTrigger Section Header Revelations
    if (typeof ScrollTrigger !== "undefined") {
      document.querySelectorAll(".section-header").forEach((header) => {
        gsap.from(header.children, {
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          stagger: 0.15,
          scaleY: 1.05,
          opacity: 0,
          y: 35,
          duration: 0.9,
          ease: "power4.out",
        });
      });

      // Bento cards staggered cascade
      const bentoGrid = document.querySelector(".bento-grid");
      if (bentoGrid) {
        gsap.from(".bento-card", {
          scrollTrigger: {
            trigger: bentoGrid,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          stagger: 0.12,
          opacity: 0,
          y: 40,
          duration: 0.85,
          ease: "power4.out",
        });
      }

      // Skill cards staggered cascade
      const skillsContainer = document.getElementById("skills-container");
      if (skillsContainer) {
        gsap.from(".skill-feature-card", {
          scrollTrigger: {
            trigger: skillsContainer,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          stagger: 0.1,
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: "power4.out",
        });
      }

      // Contact layout reveal
      const contactLayout = document.querySelector(".contact-tactile-layout");
      if (contactLayout) {
        gsap.from(contactLayout.children, {
          scrollTrigger: {
            trigger: contactLayout,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          stagger: 0.2,
          opacity: 0,
          y: 35,
          duration: 0.85,
          ease: "power4.out",
        });
      }
    }
  }

  // Initialize Upscayl-style animation engine
  initUpscaylAnimations();
});