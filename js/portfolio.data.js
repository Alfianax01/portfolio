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
      status: "Ready for high-impact missions",
    },
    quickStats: [
      { num: "9+", label: "Repositori GitHub" },
      { num: "5+", label: "Tech Stacks" },
      { num: "100%", label: "Clean Code Standard" },
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

  // Proyek Nyata dari GitHub Alfianax01
  projects: [
    {
      id: "register-tni",
      title: "RAPIM TNI E-Registrasi & Check-In",
      category: "fullstack",
      featured: true,
      repoUrl: "https://github.com/Alfianax01/register",
      demoUrl: "https://github.com/Alfianax01/register",
      mockupType: "dashboard",
      mockupUrl: "rapim-tni-reg.mil.id/dashboard",
      tags: ["TypeScript", "QR Code Scanner", "Real-Time Telemetry", "PostgreSQL"],
      tabs: {
        overview:
          "Sistem E-Registrasi & Check-In digital resmi untuk RAPIM TNI 2026. Dilengkapi penerbitan e-tiket ber-QR Code, presensi multi-checkpoint berbasis pemindaian kamera instan, manajemen penempatan kursi & wisma terstruktur, serta analitik kuota kehadiran tamu VVIP real-time.",
        architecture:
          "Dibangun dengan TypeScript full-stack, pipeline validasi barcode kamera WebRTC berlatensi rendah, database relasional untuk integritas seat allotment, serta ekspor laporan presensi otomatis.",
        impact:
          "Mengeliminasi antrean fisik registrasi delegasi, mempercepat verifikasi check-in hingga kurang dari 2 detik per delegasi, dan menjamin keakuratan data kursi 100%.",
      },
    },
    {
      id: "secintel-toolkit",
      title: "SecIntel Cyber & OSINT Toolkit",
      category: "tool",
      featured: false,
      repoUrl: "https://github.com/Alfianax01/secintel-toolkit",
      demoUrl: "https://github.com/Alfianax01/secintel-toolkit",
      mockupType: "cli",
      mockupUrl: "secintel.cli.internal/recon",
      tags: ["Node.js", "Threat Intelligence", "OSINT Recon", "DNS/SSL Audit"],
      tabs: {
        overview:
          "Perangkat Cybersecurity & OSINT Reconnaissance modular berbasis Node.js untuk analisis Threat Intel IP, validasi operator nomor telepon, geocoding alamat, audit DNS/SSL/Security Headers, deteksi celah miskonfigurasi, serta kepatuhan standar keamanan AI.",
        architecture:
          "Arsitektur engine modular decoupled, concurrent asynchronous lookup engine, parser sertifikat TLS/SSL, dan integrasi intelligence API feed secara terenkripsi.",
        impact:
          "Memangkas waktu initial reconnaissance infrastruktur target dari 30 menit menjadi beberapa detik dalam format terstruktur dan siap diaudit.",
      },
    },
    {
      id: "ruangsinema",
      title: "RuangSinema Streaming Platform",
      category: "frontend",
      featured: false,
      repoUrl: "https://github.com/Alfianax01/RuangSinema",
      demoUrl: "https://github.com/Alfianax01/RuangSinema",
      mockupType: "streaming",
      mockupUrl: "ruangsinema.stream/explore",
      tags: ["TypeScript", "TMDb API", "HLS Streaming", "Web & Android"],
      tabs: {
        overview:
          "Platform media hiburan modern untuk film bioskop, Drakor, Dracin, & sinema Indonesia dengan multi-server video player 60 FPS, subtitle bahasa Indonesia tersinkronisasi, dan integrasi katalog metadata TMDb API.",
        architecture:
          "TypeScript frontend teroptimasi, adaptive bitrate streaming handling, caching layer dinamis untuk poster/sinopsis, dan layout responsif multi-device (Desktop & Android).",
        impact:
          "Menyajikan pengalaman menonton streaming yang mulus, responsif, dan bebas buffering dengan UI modern bergaya platform streaming kelas atas.",
      },
    },
    {
      id: "jam-sholat",
      title: "Al-Waqt (الْوَقْت) • Jam & Kiblat Presisi",
      category: "fullstack",
      featured: false,
      repoUrl: "https://github.com/Alfianax01/Jam-sholat",
      demoUrl: "https://github.com/Alfianax01/Jam-sholat",
      mockupType: "islamic",
      mockupUrl: "alwaqt.flutter.app/prayer-times",
      tags: ["Flutter", "Dart", "Geodesic Compass", "Kemenag RI API"],
      tabs: {
        overview:
          "Jam Islami mewah lintas platform (Web & Mobile Flutter) dengan kalkulasi jadwal sholat presisi koordinat Kemenag RI, kompas arah kiblat geodesik magnetometrik, serta auto adzan otomatis beranimasi halus.",
        architecture:
          "Kalkulasi algoritma astronomi geodesik spherical trigonometry, state management reaktif di Flutter/Dart, dan audio engine low-latency.",
        impact:
          "Telah membantu ribuan pengguna mendapatkan jadwal ibadah tepat waktu dengan antarmuka estetis berkelas tinggi.",
      },
    },
    {
      id: "web-sekolah",
      title: "Sistem Informasi Akademik Sekolah",
      category: "fullstack",
      featured: false,
      repoUrl: "https://github.com/Alfianax01/web-sekolah",
      demoUrl: "https://github.com/Alfianax01/web-sekolah",
      mockupType: "portal",
      mockupUrl: "portal-akademik.sch.id/admin",
      tags: ["PHP", "MySQL", "Multi-Role CRUD", "Multilanguage"],
      tabs: {
        overview:
          "Sistem Informasi Akademik & Manajemen Sekolah lengkap dengan dashboard multi-role (Admin, Guru, Siswa), manajemen nilai, modal CRUD interaktif, live clock, dan fitur multibahasa (Indonesia, Inggris, Jepang, Korea).",
        architecture:
          "PHP Native / MVC pattern terstruktur, skema database relasional MySQL yang dinormalisasi, session security hardening, serta responsive mobile-friendly dashboard.",
        impact:
          "Digitalisasi penuh sistem administrasi penginputan nilai dan absensi siswa dengan keamanan role terverifikasi.",
      },
    },
  ],
};

// Export to window for global access
window.PORTFOLIO_DATA = PORTFOLIO_DATA;

