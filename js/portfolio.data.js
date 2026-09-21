/**
 * =========================================================================
 * PORTFOLIO CONFIGURATION DATA (PORTFOLIO DATA SOURCE)
 * =========================================================================
 * Semua teks, profil, repositori GitHub, keahlian, dan tautan sosial dapat
 * diedit dengan mudah melalui berkas ini tanpa harus menyentuh kode HTML.
 * =========================================================================
 */

const PORTFOLIO_DATA = {
  // Informasi Profil & Identitas
  profile: {
    name: "Alfian",
    handle: "Alfianax01",
    tagline: "Software Engineer & Full-Stack Developer",
    location: "Jakarta, Indonesia (WIB)",
    status: "Available for freelance & full-time roles",
    shortBio:
      "Membangun ekosistem aplikasi web, mobile, dan keamanan siber (OSINT & Security Intel) dengan presisi tinggi, arsitektur bersih, dan performa tanpa kompromi.",
    terminalBio: {
      name: "Alfian",
      role: "Full-Stack Developer & Cybersecurity Enthusiast",
      github: "github.com/Alfianax01",
      location: "Indonesia (UTC+7)",
      languages: ["TypeScript", "JavaScript", "Dart (Flutter)", "PHP", "C++", "SQL"],
      passions: ["Fullstack Architecture", "Cybersecurity & OSINT", "Modern UI/UX", "High Performance Systems"],
      status: "Open for software engineering roles & collaboration",
    },
    quickStats: [
      { num: "9+", label: "Repositori GitHub" },
      { num: "5+", label: "Tech Stacks" },
      { num: "100%", label: "Open Source Code" },
    ],
  },

  // Tautan Sosial & Kontak
  contact: {
    email: "alfian.devcraft@gmail.com", // Ganti dengan email asli jika diinginkan
    github: "https://github.com/Alfianax01",
    locationZone: "Indonesia (WIB / UTC+7)",
    discord: "Alfianax01",
  },

  // Tech Stack untuk Infinite Marquee & Skills Matrix
  techStack: [
    { name: "TypeScript", icon: "⚡" },
    { name: "React.js", icon: "⚛" },
    { name: "Next.js", icon: "▲" },
    { name: "Flutter & Dart", icon: "💙" },
    { name: "Node.js", icon: "🟢" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "PHP & MySQL", icon: "🐘" },
    { name: "C++", icon: "⚙" },
    { name: "Docker", icon: "🐳" },
    { name: "Git & GitHub", icon: "🐙" },
  ],

  // 4 Pilar Keahlian Teknis
  skills: [
    {
      title: "Full-Stack & Web Architecture",
      desc: "Pengembangan antarmuka reaktif berbasis Next.js, React, TypeScript, didukung backend Node.js atau PHP & database relasional MySQL / PostgreSQL.",
      tags: ["TypeScript", "Next.js", "React", "PHP", "MySQL"],
    },
    {
      title: "Cross-Platform Mobile (Flutter)",
      desc: "Pembuatan aplikasi mobile Android & iOS mulus dengan Flutter & Dart, integrasi sensor geodesik/kompas, GPS, serta audio playback presisi tinggi.",
      tags: ["Flutter", "Dart", "Clean Architecture", "Mobile API"],
    },
    {
      title: "Cybersecurity & OSINT Tooling",
      desc: "Pengembangan modular reconnaissance toolkit, DNS/SSL audit, threat intelligence IP, geocoding validasi operator, dan deteksi kerentanan miskonfigurasi.",
      tags: ["Threat Intel", "OSINT", "Network Audit", "Node.js Security"],
    },
    {
      title: "High-Performance Systems & UI",
      desc: "Implementasi desain tactile, micro-interactions 60 FPS, barcode/QR Code scanner kamera instan, dan optimalisasi Core Web Vitals.",
      tags: ["60 FPS UI", "QR Scanning", "Web Vitals", "Git CI/CD"],
    },
  ],

  // Proyek Nyata dari GitHub Alfianax01 (Anti-Slop Technical Specifications)
  projects: [
    {
      id: "register-tni",
      title: "RAPIM TNI E-Registrasi & Check-In",
      category: "fullstack",
      featured: true,
      repoUrl: "https://github.com/Alfianax01/register",
      demoUrl: "https://www.e-register.my.id/",
      language: "TypeScript",
      specFile: "src/services/checkin.service.ts",
      specRuntime: "TypeScript / WebRTC",
      tags: ["TypeScript", "QR Scanner", "PostgreSQL", "WebRTC"],
      summary:
        "Sistem registrasi dan presensi digital untuk delegasi RAPIM TNI. Mengintegrasikan pemindaian barcode kamera WebRTC berlatensi rendah, manajemen penempatan kursi terstruktur, dan validasi tiket digital terenkripsi.",
      highlights: [
        "Verifikasi barcode e-tiket via stream kamera WebRTC instan",
        "Penyimpanan relasional terstruktur untuk integritas alokasi kursi delegasi",
        "Rekapitulasi kehadiran real-time siap ekspor laporan resmi"
      ],
      specType: "code",
      specSnippet: `<span class="c-kw">interface</span> <span class="c-var">CheckInPayload</span> {
  <span class="c-prop">ticketHash</span>: <span class="c-str">string</span>;
  <span class="c-prop">checkpointId</span>: <span class="c-str">string</span>;
}

<span class="c-kw">export async function</span> <span class="c-func">verifyDelegation</span>(<span class="c-var">payload</span>: <span class="c-var">CheckInPayload</span>) {
  <span class="c-kw">const</span> <span class="c-var">delegate</span> = <span class="c-kw">await</span> <span class="c-var">db</span>.<span class="c-prop">delegates</span>.<span class="c-func">findByHash</span>(<span class="c-var">payload</span>.<span class="c-prop">ticketHash</span>);
  <span class="c-kw">if</span> (!<span class="c-var">delegate</span> || <span class="c-var">delegate</span>.<span class="c-prop">hasEntered</span>) {
    <span class="c-kw">return</span> { <span class="c-prop">status</span>: <span class="c-str">409</span>, <span class="c-prop">ok</span>: <span class="c-kw">false</span> };
  }
  <span class="c-kw">return await</span> <span class="c-var">db</span>.<span class="c-func">transaction</span>(<span class="c-kw">async</span> (<span class="c-var">tx</span>) =&gt; {
    <span class="c-kw">await</span> <span class="c-var">tx</span>.<span class="c-prop">logs</span>.<span class="c-func">record</span>(<span class="c-var">delegate</span>.<span class="c-prop">id</span>, <span class="c-var">payload</span>.<span class="c-prop">checkpointId</span>);
    <span class="c-kw">return</span> <span class="c-var">tx</span>.<span class="c-prop">delegates</span>.<span class="c-func">markVerified</span>(<span class="c-var">delegate</span>.<span class="c-prop">id</span>, { <span class="c-prop">seat</span>: <span class="c-var">delegate</span>.<span class="c-prop">seatNo</span> });
  });
}`
    },
    {
      id: "secintel-toolkit",
      title: "SecIntel Cyber & OSINT Toolkit",
      category: "tool",
      featured: false,
      repoUrl: "https://github.com/Alfianax01/secintel-toolkit",
      demoUrl: "https://github.com/Alfianax01/secintel-toolkit",
      language: "JavaScript",
      specFile: "cli/recon-scanner.js",
      specRuntime: "Node.js CLI",
      tags: ["Node.js", "Threat Intel", "DNS/SSL Audit", "OSINT Recon"],
      summary:
        "Toolkit investigasi OSINT dan cybersecurity berbasis Node.js untuk audit DNS/SSL, profiling ancaman IP publik, validasi nomor telepon operator, dan deteksi miskonfigurasi keamanan web.",
      highlights: [
        "Lookup concurrent asynchronous untuk DNS, SSL, dan Security Headers",
        "Deteksi reputasi ancaman IP publik via feed Threat Intelligence",
        "Parser sertifikat TLS dan verifikasi konfigurasi cipher suite"
      ],
      specType: "cli",
      specSnippet: `<span class="c-comment"># Menjalankan pemindaian modular target infrastruktur</span>
<span class="c-kw">$</span> secintel scan --target enterprise.domain --modules dns,ssl,headers

<span class="c-str">[+] DNS Recon</span>: 4 NS records ditemukan, DNSSEC aktif
<span class="c-str">[+] TLS Audit</span>: TLSv1.3 ternegosiasi | Cipher AES_256_GCM
<span class="c-str">[+] Cert Check</span>: CN=*.enterprise.domain (Masa berlaku valid)
<span class="c-str">[+] Headers</span>: HSTS Strict, CSP terkonfigurasi, X-Frame DENY
<span class="c-func">[✓] Hasil Audit</span>: 0 miskonfigurasi kritis terdeteksi`
    },
    {
      id: "ruangsinema",
      title: "RuangSinema Streaming Platform",
      category: "frontend",
      featured: false,
      repoUrl: "https://github.com/Alfianax01/RuangSinema",
      demoUrl: "https://github.com/Alfianax01/RuangSinema",
      language: "TypeScript",
      specFile: "src/player/hls-engine.ts",
      specRuntime: "TypeScript / HLS.js",
      tags: ["TypeScript", "HLS Streaming", "TMDb API", "Responsive Web"],
      summary:
        "Platform streaming hiburan responsif dengan pemutar video adaptif HLS (HTTP Live Streaming), integrasi katalog metadata TMDb API, dan kontrol playback multi-resolusi.",
      highlights: [
        "Integrasi pemutar video adaptif HLS dengan seleksi multi-server",
        "Sinkronisasi metadata judul, sinopsis, dan poster via REST API TMDb",
        "Antarmuka responsif tanpa lag untuk peramban desktop dan perangkat mobile"
      ],
      specType: "code",
      specSnippet: `<span class="c-kw">import</span> <span class="c-var">Hls</span> <span class="c-kw">from</span> <span class="c-str">"hls.js"</span>;

<span class="c-kw">export function</span> <span class="c-func">mountStreamPlayer</span>(<span class="c-var">videoEl</span>: <span class="c-var">HTMLVideoElement</span>, <span class="c-var">manifestUrl</span>: <span class="c-str">string</span>) {
  <span class="c-kw">if</span> (<span class="c-var">Hls</span>.<span class="c-func">isSupported</span>()) {
    <span class="c-kw">const</span> <span class="c-var">hls</span> = <span class="c-kw">new</span> <span class="c-var">Hls</span>({ <span class="c-prop">autoStartLoad</span>: <span class="c-kw">true</span>, <span class="c-prop">maxBufferLength</span>: <span class="c-str">30</span> });
    <span class="c-var">hls</span>.<span class="c-func">loadSource</span>(<span class="c-var">manifestUrl</span>);
    <span class="c-var">hls</span>.<span class="c-func">attachMedia</span>(<span class="c-var">videoEl</span>);
    <span class="c-var">hls</span>.<span class="c-func">on</span>(<span class="c-var">Hls</span>.<span class="c-prop">Events</span>.<span class="c-prop">MANIFEST_PARSED</span>, (_, <span class="c-var">data</span>) =&gt; {
      <span class="c-var">console</span>.<span class="c-func">info</span>(<span class="c-str">"Stream siap dengan level bitrate adaptif"</span>);
    });
    <span class="c-kw">return</span> <span class="c-var">hls</span>;
  }
}`
    },
    {
      id: "jam-sholat",
      title: "Al-Waqt (الْوَقْت) • Jam & Kiblat Presisi",
      category: "fullstack",
      featured: false,
      repoUrl: "https://github.com/Alfianax01/Jam-sholat",
      demoUrl: "https://github.com/Alfianax01/Jam-sholat",
      language: "Dart",
      specFile: "lib/services/qibla_calc.dart",
      specRuntime: "Flutter / Dart",
      tags: ["Flutter", "Dart", "Geodesic Compass", "Kemenag RI API"],
      summary:
        "Aplikasi jadwal sholat dan penunjuk arah kiblat lintas platform (Flutter & Web) dengan algoritma trigonometri bola astronomis, sensor magnetometer, dan sinkronisasi data Kemenag RI.",
      highlights: [
        "Kalkulasi astronomis waktu sholat presisi koordinat lokal",
        "Penghitungan azimuth arah kiblat dari koordinat Ka'bah (21.4225° N, 39.8262° E)",
        "Kalibrasi kompas real-time via sensor magnetometer Flutter"
      ],
      specType: "code",
      specSnippet: `<span class="c-kw">import</span> <span class="c-str">'dart:math'</span> <span class="c-kw">as</span> <span class="c-var">math</span>;

<span class="c-var">double</span> <span class="c-func">calculateQiblaAzimuth</span>(<span class="c-var">double</span> <span class="c-var">lat</span>, <span class="c-var">double</span> <span class="c-var">lng</span>) {
  <span class="c-kw">const</span> <span class="c-var">mLat</span> = <span class="c-str">21.4225</span> * <span class="c-var">math</span>.<span class="c-prop">pi</span> / <span class="c-str">180.0</span>;
  <span class="c-kw">const</span> <span class="c-var">mLng</span> = <span class="c-str">39.8262</span> * <span class="c-var">math</span>.<span class="c-prop">pi</span> / <span class="c-str">180.0</span>;
  <span class="c-kw">final</span> <span class="c-var">phi</span> = <span class="c-var">lat</span> * <span class="c-var">math</span>.<span class="c-prop">pi</span> / <span class="c-str">180.0</span>;
  <span class="c-kw">final</span> <span class="c-var">delta</span> = <span class="c-var">mLng</span> - (<span class="c-var">lng</span> * <span class="c-var">math</span>.<span class="c-prop">pi</span> / <span class="c-str">180.0</span>);

  <span class="c-kw">final</span> <span class="c-var">y</span> = <span class="c-var">math</span>.<span class="c-func">sin</span>(<span class="c-var">delta</span>);
  <span class="c-kw">final</span> <span class="c-var">x</span> = <span class="c-var">math</span>.<span class="c-func">cos</span>(<span class="c-var">phi</span>) * <span class="c-var">math</span>.<span class="c-func">tan</span>(<span class="c-var">mLat</span>) - <span class="c-var">math</span>.<span class="c-func">sin</span>(<span class="c-var">phi</span>) * <span class="c-var">math</span>.<span class="c-func">cos</span>(<span class="c-var">delta</span>);
  <span class="c-kw">return</span> (<span class="c-var">math</span>.<span class="c-func">atan2</span>(<span class="c-var">y</span>, <span class="c-var">x</span>) * <span class="c-str">180.0</span> / <span class="c-var">math</span>.<span class="c-prop">pi</span> + <span class="c-str">360.0</span>) % <span class="c-str">360.0</span>;
}`
    },
    {
      id: "web-sekolah",
      title: "Sistem Informasi Akademik Sekolah",
      category: "fullstack",
      featured: false,
      repoUrl: "https://github.com/Alfianax01/web-sekolah",
      demoUrl: "https://github.com/Alfianax01/web-sekolah",
      language: "PHP",
      specFile: "app/Middleware/AuthRoleMiddleware.php",
      specRuntime: "PHP 8.x / MySQL",
      tags: ["PHP", "MySQL", "RBAC Middleware", "Session Hardening"],
      summary:
        "Sistem manajemen akademik dan operasional sekolah dengan manajemen peran multi-level (Admin, Guru, Siswa), pengelolaan nilai terstruktur, dan validasi sesi berkeamanan tinggi.",
      highlights: [
        "Kontrol akses berbasis peran (RBAC) terproteksi session token",
        "Skema relasional ternormalisasi untuk siswa, mata pelajaran, dan nilai",
        "Arsitektur MVC terstruktur dengan validasi dan sanitasi input"
      ],
      specType: "code",
      specSnippet: `<span class="c-kw">namespace</span> <span class="c-var">App\\Middleware</span>;

<span class="c-kw">class</span> <span class="c-var">AuthRoleMiddleware</span> {
    <span class="c-kw">public static function</span> <span class="c-func">enforce</span>(<span class="c-var">array</span> <span class="c-var">$allowedRoles</span>): <span class="c-var">void</span> {
        <span class="c-kw">if</span> (<span class="c-var">session_status</span>() === <span class="c-prop">PHP_SESSION_NONE</span>) <span class="c-var">session_start</span>();
        <span class="c-var">$userRole</span> = <span class="c-var">$_SESSION</span>[<span class="c-str">'user'</span>][<span class="c-str">'role'</span>] ?? <span class="c-kw">null</span>;
        <span class="c-kw">if</span> (!<span class="c-var">$userRole</span> || !<span class="c-var">in_array</span>(<span class="c-var">$userRole</span>, <span class="c-var">$allowedRoles</span>, <span class="c-kw">true</span>)) {
            <span class="c-var">http_response_code</span>(<span class="c-str">403</span>);
            <span class="c-var">header</span>(<span class="c-str">'Location: /login.php?error=forbidden'</span>);
            <span class="c-kw">exit</span>;
        }
    }
}`
    }
  ],
};

// Export to window for global browser access & module.exports for testing
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}

