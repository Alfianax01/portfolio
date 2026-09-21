# Panduan Pengelolaan & Kustomisasi Portofolio (Alfianax01)

File portofolio telah dirapikan ke dalam arsitektur **modular data-driven** agar Anda dapat mengedit teks, proyek, skill, kontak, atau tautan kapan pun dengan sangat mudah **tanpa harus menyentuh kode HTML atau CSS yang rumit**.

---

## 📁 Struktur Berkas

```
portfolio/
├── index.html            # Kerangka tata letak utama (Semantic & Accessible)
├── css/
│   └── style.css         # Desain sistem berkelas tinggi (Dark/Light mode, animations, 3D tilt)
├── js/
│   ├── portfolio.data.js # ⭐ PUSAT DATA UTAMA: Edit semua konten Anda di sini!
│   └── main.js           # Engine interaksi (Canvas partikel, terminal, 3D tilt, filter)
└── assets/
    ├── icons/
    └── img/
```

---

## ⚙️ Cara Mengubah Data & Konten

Cukup buka berkas **[`js/portfolio.data.js`](file:///c:/Users/loq/Documents/portfolio/js/portfolio.data.js)**:

### 1. Mengubah Profil & Bio
```javascript
profile: {
  name: "Alfian",
  handle: "Alfianax01",
  tagline: "Software Engineer & Full-Stack Developer",
  location: "Jakarta, Indonesia (WIB)",
  status: "Available for freelance & full-time roles",
  ...
}
```

### 2. Mengubah Kontak & Email
```javascript
contact: {
  email: "email-anda@gmail.com", // Ubah email Anda di sini
  github: "https://github.com/Alfianax01",
  locationZone: "Indonesia (WIB / UTC+7)",
}
```

### 3. Menambah / Mengubah Proyek GitHub
Di bagian `projects: [ ... ]`, Anda bisa mengubah atau menambahkan kartu proyek baru:
```javascript
{
  id: "nama-proyek",
  title: "Judul Proyek",
  category: "fullstack", // "fullstack" | "frontend" | "tool"
  featured: true,        // true = efek Border Beam neon bercahaya
  repoUrl: "https://github.com/Alfianax01/nama-repo",
  mockupType: "dashboard", // "dashboard" | "cli" | "streaming"
  mockupUrl: "domain-demo.com",
  tags: ["TypeScript", "Next.js", "Docker"],
  tabs: {
    overview: "Ringkasan proyek...",
    architecture: "Detail arsitektur teknis...",
    impact: "Dampak / metrik keberhasilan..."
  }
}
```

### 4. Mengubah Tech Stack (Marquee Logo Berjalan)
Di bagian `techStack: [ ... ]`, cukup tambah atau kurangi teknologi:
```javascript
techStack: [
  { name: "TypeScript", icon: "⚡" },
  { name: "Flutter & Dart", icon: "💙" },
  ...
]
```

---

## 🚀 Repositori Nyata yang Telah Terintegrasi:
1. **register**: *RAPIM TNI 2026 E-Registrasi & Check-In System* (TypeScript, QR Code Checkpoint, Real-Time Telemetry).
2. **secintel-toolkit**: *Modular Cybersecurity & OSINT Reconnaissance Toolkit* (Threat Intel, SSL/DNS Audit).
3. **RuangSinema**: *Streaming Media Platform 60 FPS Sub Indo* (TypeScript, TMDb API, Multi-Server).
4. **Jam-sholat**: *Al-Waqt (الْوَقْت) Jam Islami Mewah & Kompas Geodesik* (Flutter & Dart).
5. **web-sekolah**: *Sistem Informasi Akademik Sekolah* (PHP & MySQL Multi-Role).

