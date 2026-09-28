<div align="center">

# Rizki Maulana — Portfolio

**Website portfolio personal dengan estetika parchment & emas, dua bahasa (English / 한국어), dan animasi scroll yang halus.**

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C9A24B.svg)](./LICENSE)

[**Live Demo**](https://GANTI-DENGAN-URL-VERCEL-KAMU.vercel.app) · [**Lihat CV**](./public/cv/CV_Rizki_Maulana.pdf)

</div>

---

## Tentang Proyek

Portfolio ini menampilkan karya, pengalaman, dan keahlian saya sebagai **Fullstack Developer & Software Engineer** (Web, Mobile, dan 3D), termasuk proyek-proyek klien yang dikerjakan di bawah brand **Ikicode**.

> ⏱️ **Dibangun dalam 2 hari.**
> Seluruh proyek ini, mulai dari desain visual, sistem konten dua bahasa, komponen animasi, galeri arsip, sampai deployment ke production, saya kerjakan dalam waktu **dua hari** (27–28 September 2026).

## Fitur

- **Dua bahasa (EN / KO)**: konten dipisah per bahasa dan pilihan bahasa tersimpan di browser.
- **Animasi scroll**: efek *sticky reveal*, *sink*, dan *veil* berbasis GSAP + ScrollTrigger, serta transisi komponen dengan Framer Motion.
- **Cincin emas 3D interaktif** di hero memakai Three.js (React Three Fiber + drei).
- **Case study**: Doeun, Jual Emas Indonesia, LoveCoupleGames, Dasotbap, dan TRULEK.
- **Galeri arsip** dengan filter kategori (proyek, game dev, 3D, desain grafis, tools, personal) dan *lightbox*.
- **Popup & viewer CV**: bisa dilihat langsung di halaman atau diunduh sebagai PDF.
- **Aset ringan**: gambar dalam format WebP dan video MP4 yang sudah dikompres.
- **Responsif** dari layar ponsel sampai desktop.

## Tech Stack

| Kategori    | Teknologi                                                        |
| ----------- | ---------------------------------------------------------------- |
| Framework   | Next.js 14 (App Router), React 18                                |
| Bahasa      | TypeScript 5 (strict mode)                                       |
| Styling     | Tailwind CSS 3, PostCSS, Autoprefixer                            |
| Animasi     | Framer Motion, GSAP (ScrollTrigger)                              |
| 3D          | Three.js, `@react-three/fiber`, `@react-three/drei`              |
| Ikon & font | lucide-react, `next/font` (Archivo Black, Fraunces, Inter)       |
| Hosting     | Vercel                                                           |

## Memulai

### Prasyarat

- **Node.js** 22 atau lebih baru (lihat [`.nvmrc`](./.nvmrc))
- **npm** 10 atau lebih baru

### Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/jixokiki/NAMA-REPO-KAMU.git
cd NAMA-REPO-KAMU

# 2. Pasang dependensi
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Script yang tersedia

| Perintah               | Fungsi                                        |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Menjalankan development server                |
| `npm run build`        | Membuat build production                      |
| `npm start`            | Menjalankan hasil build production            |
| `npx tsc --noEmit`     | Mengecek tipe TypeScript tanpa menghasilkan file |

> Build memakai `next/font/google`, jadi butuh koneksi internet saat `npm run build`.

## Struktur Proyek

```text
.
├── app/                    # App Router: layout, halaman utama, global CSS
├── components/             # Section halaman (Hero, About, CaseStudies, dst.)
│   └── ui/                 # Komponen UI reusable (MagneticButton, ScrollHeading, ...)
├── data/
│   ├── content.types.ts    # Tipe data konten (kontrak untuk semua bahasa)
│   ├── content.en.ts       # Konten English
│   ├── content.ko.ts       # Konten 한국어
│   └── archive-assets.ts   # Daftar aset galeri arsip
├── lib/
│   └── i18n.tsx            # LanguageProvider & hook useContent()
├── public/
│   ├── images/             # Aset case study (WebP)
│   ├── archive/            # Aset galeri arsip per kategori
│   ├── cv/                 # CV (PDF + preview WebP)
│   ├── models/             # Model 3D (.obj)
│   └── video/              # Video reel
├── tailwind.config.ts      # Design tokens (cream, gold, ink)
└── next.config.mjs
```

## Mengubah Konten

Semua teks dipusatkan di folder `data/`:

1. Edit `data/content.en.ts` dan `data/content.ko.ts` untuk mengubah profil, pengalaman, skill, dan case study.
2. Jika menambah field baru, perbarui tipe di `data/content.types.ts` terlebih dulu. TypeScript akan menandai bahasa yang belum diisi.
3. Untuk menambah aset galeri, simpan file di `public/archive/<kategori>/` lalu daftarkan di `data/archive-assets.ts`.

## Deployment

Proyek ini di-deploy ke **Vercel** dan tidak membutuhkan environment variable.

1. Push repositori ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new) lalu **Import** repositori ini.
3. Vercel otomatis mendeteksi **Next.js**. Biarkan pengaturan default:
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. Klik **Deploy**.

Setiap `git push` ke branch `main` akan otomatis men-deploy ke production, dan setiap pull request mendapat preview URL sendiri.

## Linimasa Pengerjaan (2 Hari)

| Hari | Fokus |
| ---- | ----- |
| **Hari 1** | Setup Next.js + TypeScript + Tailwind, design system (palet emas/parchment, tipografi), komponen UI dasar dan animasi, kompresi aset, serta section utama: Hero, About, Experience, Skills, Contact, Footer. |
| **Hari 2** | Sistem konten dua bahasa (EN/KO), case study, galeri arsip dengan lightbox, popup dan viewer CV, penyempurnaan animasi, lalu deployment ke Vercel. |

## Roadmap

- [ ] Favicon dan Open Graph image
- [ ] Screenshot resmi untuk case study Jual Emas Indonesia dan LoveCoupleGames
- [ ] Foto menu Doeun versi final (resolusi tinggi)
- [ ] Konfigurasi ESLint dan Prettier
- [ ] Audit Lighthouse (performa dan aksesibilitas)

## Lisensi

Kode sumber dirilis di bawah [MIT License](./LICENSE).

Konten di folder `public/` (foto, gambar proyek klien, logo brand, video, dan CV) serta teks di folder `data/` adalah milik masing-masing pemilik dan **tidak** termasuk dalam lisensi MIT. Mohon tidak digunakan ulang tanpa izin.

## Kontak

**Rizki Maulana** — Bekasi, Indonesia

- GitHub: [github.com/jixokiki](https://github.com/jixokiki)
- LinkedIn: [linkedin.com/in/rizky-maulana-920343218](https://linkedin.com/in/rizky-maulana-920343218)
- Agency: [Ikicode](https://ikicode.com/)