export * from "./content.types";
export { content as contentEn } from "./content.en";
export { content as contentKo } from "./content.ko";

// // Semua konten portfolio dipusatkan di sini. Sumber: CV_Rizki_Maulana.pdf,
// // Portfolio_Rizki_Maulana.pdf, dan brief langsung dari Rizki (link live + aset Doeun/TRULEK/Dasotbap).

// export const profile = {
//   name: "Rizki Maulana",
//   roles: ["Fullstack Developer", "Software Engineer", "Web & System Analyst"],
//   location: "Bekasi, Harapan Indah — Indonesia",
//   email: "dokumentasirizki1@gmail.com",
//   phone: "+62 858-1729-8071",
//   github: "github.com/jixokiki",
//   linkedin: "linkedin.com/in/rizky-maulana-920343218",
//   agency: { name: "Ikicode", url: "https://ikicode.com/" },
//   summary:
//     "Data Analyst dan Fullstack Programmer dengan latar belakang Informatics Engineering, terbiasa mengelola kanal digital (website, landing page, media digital), menganalisis performa produk digital, serta mengolah data leads, traffic, dan campaign jadi insight bisnis. Terbiasa bekerja dengan data operasional, pelaporan berbasis Excel, integrasi backend/API, dan transformasi sistem digital.",
//   intro:
//     "Diawali sebagai graphic designer lepas, lalu berkembang ke pengembangan aplikasi, integrasi sistem, dan solusi digital penuh — dari mobile, web, 3D, sampai infrastruktur deployment. Sebagian besar karya di bawah ini dikerjakan lewat brand sendiri, Ikicode, untuk klien resto, brand ritel, hingga game promo.",
// };

// export const brandStrip = [
//   "DOEUN",
//   "JUAL EMAS INDONESIA",
//   "LOVECOUPLEGAMES",
//   "DASOTBAP RICE LAB",
//   "TRULEK",
//   "KEMAS KAYU INDONESIA",
//   "SOHIB KERJA",
//   "EMR LAB UEU",
// ];

// export type Media = { src: string; alt: string; kind?: "image" | "video"; poster?: string };

// export type CaseStudy = {
//   index: string;
//   slug: string;
//   title: string;
//   subtitle: string;
//   period: string;
//   role: string;
//   tags: string[];
//   description: string[];
//   link?: string;
//   linkLabel?: string;
//   note?: string;
//   media: Media[];
// };

// export const caseStudies: CaseStudy[] = [
//   {
//     index: "01",
//     slug: "doeun",
//     title: "Doeun",
//     subtitle: "Korean BBQ Restaurant — Menteng, Jakarta",
//     period: "2026 — sedang berjalan",
//     role: "Web Developer, Brand & 3D Asset",
//     tags: ["Next.js", "Brand Identity", "3D Character", "Food Photography Direction"],
//     description: [
//       "Website resmi Doeun, resto Korean BBQ di Menteng — masih versi beta, foto menu final menyusul, tapi struktur, sistem pemesanan, dan brand system-nya sudah jalan.",
//       "Selain build web, saya juga menggarap identitas visual: logo lambang emas, karakter maskot 3D (chef dengan pisau khas), sampai materi promosi bergaya majalah kuliner untuk kebutuhan sosial media dan cetak.",
//     ],
//     link: "https://doeunresto-zvnv.vercel.app/",
//     linkLabel: "Buka situs beta",
//     note: "Versi beta — sebagian gambar menu belum HD, aset final menyusul.",
//     media: [
//       { src: "/video/doeun-reel.mp4", alt: "Cuplikan promosi Doeun", kind: "video", poster: "/images/doeun-reel-poster.jpg" },
//       { src: "/images/doeun-logo.webp", alt: "Logo Doeun" },
//       { src: "/images/doeun-3d-model.webp", alt: "Karakter 3D chef Doeun — render tekstur, wireframe, clay" },
//       { src: "/images/doeun-3d-model-alt.webp", alt: "Karakter 3D chef Doeun — varian angle" },
//       { src: "/images/doeun-figurine-knife.webp", alt: "Turnaround figurine chef memegang pisau" },
//       { src: "/images/doeun-figurine-meat.webp", alt: "Turnaround figurine chef memegang daging" },
//       { src: "/images/doeun-figurine-expressions.webp", alt: "Sheet ekspresi wajah karakter" },
//       { src: "/images/doeun-figurine-peace.webp", alt: "Sheet pose karakter" },
//       { src: "/images/doeun-magazine-cover.webp", alt: "Cover materi promosi bergaya majalah Korean BBQ" },
//       { src: "/images/doeun-magazine-poster.webp", alt: "Poster kolase menu Korean BBQ" },
//       { src: "/images/doeun-bibimbap.webp", alt: "Foto produk bibimbap" },
//       { src: "/images/doeun-bbq.webp", alt: "Foto produk BBQ di atas panggangan" },
//       { src: "/images/doeun-flatlay.webp", alt: "Flat-lay bahan & menu Korean BBQ" },
//     ],
//   },
//   {
//     index: "02",
//     slug: "jual-emas-indonesia",
//     title: "Jual Emas Indonesia",
//     subtitle: "Redesain landing page jual-beli emas",
//     period: "2026",
//     role: "Fullstack Developer",
//     tags: ["Next.js", "Three.js / R3F", "GSAP", "SEO"],
//     description: [
//       "Redesain menyeluruh landing page Jual Emas Indonesia: hero cincin emas 3D interaktif (React Three Fiber), section \"Keramaian\" bertenaga GSAP, glyph portal transisi antar halaman, dan halaman panduan harga emas harian.",
//       "Fokus ke performa — animasi berat tetap dijaga agar Largest Contentful Paint rendah, plus SEO terstruktur untuk tiap cabang & artikel panduan.",
//     ],
//     link: "https://portfolio-redesain-jual-emas-indone.vercel.app/",
//     linkLabel: "Kunjungi redesain",
//     media: [],
//   },
//   {
//     index: "03",
//     slug: "lovecouplegames",
//     title: "LoveCoupleGames",
//     subtitle: "Website promosi game interaktif",
//     period: "2026 · PT Kalanara Group Indonesia",
//     role: "Frontend Developer (Next.js + Three.js)",
//     tags: ["Next.js", "Three.js", "Animate.js", "AI-assisted UI (Claude)"],
//     description: [
//       "Rebuild total website promosi game dengan Next.js, visual 3D interaktif via Three.js, dan scroll animation Animate.js.",
//       "UI/animasi ditingkatkan lewat riset library modern (Framer Motion, Aceternity UI, Magic UI, shadcn/ui) yang diimplementasikan dengan bantuan Claude — tanpa mengorbankan performa LCP. QA menyeluruh dengan Playwright & Cypress.",
//     ],
//     link: "https://lovecouplegames.com/",
//     linkLabel: "Kunjungi situs",
//     media: [],
//   },
//   {
//     index: "04",
//     slug: "trulek",
//     title: "TRULEK",
//     subtitle: "Identitas brand clothing",
//     period: "2026",
//     role: "Brand & Apparel Graphic Design",
//     tags: ["Brand Identity", "Apparel Graphic", "Mockup"],
//     description: [
//       "Desain wordmark dan grafis produksi untuk brand clothing TRULEK — ilustrasi burung tengkorak bergaya folk-tattoo dengan dua burung kolibri, dicetak di atas sleeveless tee hitam.",
//     ],
//     media: [
//       { src: "/images/trulek-tee.webp", alt: "Mockup kaos TRULEK — depan & belakang" },
//       { src: "/images/trulek-skull-angel.webp", alt: "Ilustrasi malaikat bersayap hitam untuk desain grafis TRULEK" },
//     ],
//   },
//     {
//     index: "05",
//     slug: "digital-office",
//     title: "Digital Office",
//     subtitle: "Aplikasi presensi Kemenhub (Kementerian Perhubungan)",
//     period: "2026 · PT Kalanara Group Indonesia",
//     role: "React Native Developer",
//     tags: ["React Native", "Face Recognition (ML Kit)", "GPS / Radius Validation", "REST API"],
//     description: [
//       "Aplikasi presensi (check-in/check-out) untuk pegawai Kemenhub — deteksi wajah dengan ML Kit & VisionCamera, validasi lokasi berbasis radius GPS, serta logika Work From Home / Work From Office.",
//       "Ikut menangani debugging lintas kondisi nyata: swafoto gagal di berbagai device, validasi crop wajah, sinkronisasi status kehadiran, sanggahan atasan/pegawai, sampai dashboard rekap kehadiran.",
//     ],
//     note: "Aplikasi internal instansi pemerintah — tangkapan layar di bawah dari proses pengembangan & debugging, bukan rilis publik.",
//     media: [
//       { src: "/images/digital-office-beranda.webp", alt: "Beranda aplikasi dengan status presensi belum absen" },
//       { src: "/images/digital-office-absen-masuk.webp", alt: "Peringatan di luar radius lokasi kerja saat absen masuk" },
//       { src: "/images/digital-office-beranda-terlambat.webp", alt: "Beranda dengan status presensi terlambat" },
//       { src: "/images/digital-office-absen-masuk-alt.webp", alt: "Validasi absen masuk di luar radius kantor" },
//       { src: "/images/digital-office-absen-pulang.webp", alt: "Peta absen pulang dengan radius kantor" },
//       { src: "/images/digital-office-wfh-radius.webp", alt: "Validasi lokasi rumah untuk Work From Home" },
//       { src: "/images/digital-office-dialog-terlambat.webp", alt: "Dialog konfirmasi keterlambatan absen" },
//       { src: "/images/digital-office-detail-kehadiran.webp", alt: "Detail kehadiran dengan riwayat sanggahan atasan & pegawai" },
//       { src: "/images/digital-office-beranda-berita.webp", alt: "Varian beranda dengan carousel berita internal" },
//       { src: "/images/digital-office-daftar-hadir-tim.webp", alt: "Daftar hadir tim dengan status WFH/WFO/DL/Alpha" },
//       { src: "/images/digital-office-daftar-hadir-saya.webp", alt: "Riwayat kehadiran pribadi per hari" },
//       { src: "/images/digital-office-penugasan-fleksibel.webp", alt: "Form penugasan fleksibel dengan validasi atasan langsung" },
//       { src: "/images/digital-office-debug-crop-1.webp", alt: "Debugging error crop wajah pada fitur swafoto" },
//       { src: "/images/digital-office-debug-overlay.webp", alt: "Overlay debug deteksi oklusi wajah" },
//       { src: "/images/digital-office-debug-crop-2.webp", alt: "Debugging error crop pada device berbeda" },
//       { src: "/images/digital-office-debug-orientasi.webp", alt: "Debugging orientasi kamera saat swafoto" },
//       { src: "/images/digital-office-dashboard.webp", alt: "Dashboard rekap aktivitas dan status kehadiran" },
//     ],
//   },
// ];

// export type Experience = {
//   org: string;
//   role: string;
//   period: string;
//   points: string[];
// };

// export const experience: Experience[] = [
//   {
//     org: "PT Kalanara Group Indonesia",
//     role: "Fullstack Programmer (Contract)",
//     period: "Mar 2026 – Jul 2026",
//     points: [
//       "React Native (Android & iOS) — fitur face recognition attendance, redesign UI/UX 3 aplikasi mobile.",
//       "Integrasi mobile ke backend API existing, validasi endpoint bareng backend team, build release via Gradle & TestFlight/Play Console.",
//       "Rebuild website promosi game LoveCoupleGames.com dengan Next.js + Three.js (visual 3D) dan Animate.js (scroll animation).",
//       "AI-assisted frontend development bareng Claude — riset library UI/animasi (Framer Motion, 21st.dev, Aceternity UI, Magic UI, shadcn/ui) lalu diterapkan tanpa mengorbankan performa (LCP).",
//       "QA menyeluruh: Playwright & Cypress untuk automated E2E + manual testing lintas browser, termasuk diagnosa & perbaikan in-app purchase (IAP) di proyek React Native Expo terpisah.",
//     ],
//   },
//   {
//     org: "PT Wae Mandiri Karya",
//     role: "Web Programmer (Contract, WFH)",
//     period: "May 2025 – Mar 2026",
//     points: [
//       "Validasi data produk & order di sistem website terhadap catatan internal untuk menangkap inkonsistensi lebih awal.",
//       "Cross-check data lintas sistem (website, katalog produk, database) secara berkala dengan mindset testing untuk alur data non-kode.",
//       "Koordinasi remote dengan owner, produksi, dan admin untuk update data real-time; menyusun laporan progres kerja terstruktur.",
//     ],
//   },
//   {
//     org: "PT Kemas Kayu Indonesia",
//     role: "Web Mobile & App Developer & IT Support (Contract)",
//     period: "Mar 2025 – Mar 2026",
//     points: [
//       "Company website & landing page untuk PT Kemas Kayu Indonesia dan PT Menara Bekasi Lestari, backend Node.js/Express terhubung ke POS dan database terpusat.",
//       "SEO strategy, kelola sosial media dari nol (Instagram, Facebook, TikTok, YouTube, WhatsApp Business), Ads campaign hingga menghasilkan PO ekspor.",
//       "3D modeling pallet dengan SketchUp — dimensi otomatis menghasilkan file PO.",
//       "Bangun & maintain aplikasi POS untuk transaksi penjualan harian.",
//       "IT support: instalasi Windows, printer, hardware, remote server via Tailscale, riset leads bisnis dengan Hunter.io & Apollo.io.",
//     ],
//   },
//   {
//     org: "CV Desainerimnco",
//     role: "Fullstack Developer (Contract)",
//     period: "Jun 2023 – Aug 2024",
//     points: [
//       "Company profile & business website untuk PT Bangunciptanusakarya, FONAMS, dan DIAMN.",
//       "Untuk FONAMS: aplikasi mobile booking/reservasi rental + website promosi sesuai standar SEO Google.",
//     ],
//   },
//   {
//     org: "Spin The Radio FM",
//     role: "Web Developer (Contract)",
//     period: "Jan 2020 – Jan 2021",
//     points: [
//       "Deploy & riset security, performance, dan SEO untuk website radio kampus.",
//       "Meningkatkan engagement pendengar sekitar 80% saat masa peluncuran.",
//     ],
//   },
// ];

// export const education = [
//   {
//     school: "Universitas Esa Unggul",
//     detail: "S1 Informatics Engineering — IPK 3.72/4.00",
//     period: "Sep 2020 – Aug 2024",
//   },
//   {
//     school: "SMA Taman Harapan 1",
//     detail: "Natural Science — Staff OSIS (2018–2019), Juara 4 Lomba Desain Poster",
//     period: "Jul 2017 – Jun 2020",
//   },
// ];

// export const skills = [
//   {
//     label: "Fullstack Development",
//     items: ["Next.js", "React", "React Native / Expo", "Node.js / Express", "NestJS", "Prisma", "PHP / Laravel", "MongoDB", "MySQL"],
//   },
//   {
//     label: "3D, Motion & Game",
//     items: ["Three.js / R3F", "GSAP", "Framer Motion", "SketchUp", "Blender", "Construct", "Unity (C#)", "Phaser (JS)"],
//   },
//   {
//     label: "Mobile & Deployment",
//     items: ["Gradle (Android)", "App Store Connect / TestFlight", "Google Play Console", "Tailscale remote server", "Firebase", "Vercel"],
//   },
//   {
//     label: "Testing & QA",
//     items: ["Playwright", "Cypress", "Manual cross-browser QA", "Regression testing (IAP)"],
//   },
//   {
//     label: "Brand & Visual Design",
//     items: ["Illustrator", "Photoshop", "Canva", "Logo & identity", "Apparel graphic"],
//   },
//   {
//     label: "Marketing & Ops Tooling",
//     items: ["Google Ads / Meta Ads", "GA4 & Meta Pixel", "Hunter.io / Apollo.io", "Midtrans"],
//   },
// ];

// export type Project = {
//   title: string;
//   period: string;
//   tag: string;
//   description: string;
//   link?: string;
// };

// export const moreWork: Project[] = [
//   {
//     title: "Sohib Kerja",
//     period: "Jun 2024 – sekarang",
//     tag: "Job Portal",
//     description:
//       "Registrasi & auth, dashboard employer, verifikasi kandidat otomatis, penjadwalan interview. Hosting VPS Hostinger + backend Railway.",
//     link: "https://www.sohibkerja.com/",
//   },
//   {
//     title: "EMR Lab — Universitas Esa Unggul",
//     period: "Nov 2024 – sekarang",
//     tag: "Healthcare System",
//     description:
//       "Rekam medis elektronik: registrasi pasien, manajemen rekam medis, input hasil lab, tanda tangan digital, dashboard berbasis peran.",
//   },
//   {
//     title: "PT Wae Mandiri Karya",
//     period: "May 2025 – Mar 2026",
//     tag: "Landing + RO/PO System",
//     description:
//       "Landing page marketing dengan sistem RO & PO terintegrasi — generate PDF request order otomatis, redirect langsung ke WhatsApp marketing.",
//     link: "https://wmk.co.id",
//   },
//   {
//     title: "PT Kemas Kayu Indonesia & Menara Bekasi Lestari",
//     period: "2025 – sekarang",
//     tag: "Corporate + Marketing + IT",
//     description:
//       "Company profile, landing page ads-ready, integrasi Google/Meta Ads, 3D pallet modeling ke PO otomatis, plus IT support & infrastruktur kantor.",
//   },
//   {
//     title: "FONAMS",
//     period: "Jan – Aug 2024",
//     tag: "React Native + Next.js",
//     description: "Aplikasi rental mobil (React Native) dan landing page berita (Next.js) dengan live chat.",
//     link: "https://fonams.com/",
//   },
//   {
//     title: "UEU Asset",
//     period: "Feb – Apr 2024",
//     tag: "Asset Management",
//     description: "Sistem manajemen aset dengan Next.js, Firebase, dan integrasi pembayaran Midtrans.",
//     link: "https://ueuasset.com",
//   },
//   {
//     title: "Bangun Cipta Nusakarya",
//     period: "2023 – 2024",
//     tag: "Company Profile",
//     description: "Website company profile firma arsitektur, dibangun dengan React, CSS & Sass.",
//     link: "https://banguciptanusakarya.com/",
//   },
//   {
//     title: "Quiz Web · KBB Web · Be Agency Web",
//     period: "2024",
//     tag: "Next.js + Firebase",
//     description: "Tiga proyek latihan/klien kecil: sistem quiz dengan auth & score tracking, knowledge base, dan platform agency digital.",
//   },
//   {
//     title: "Spin Radio FM",
//     period: "2020 – 2021",
//     tag: "Web Radio",
//     description: "Website radio kampus dengan riset deployment penuh (security, performance, SEO) — engagement naik ~80% saat peluncuran.",
//   },
// ];

// export const graphicHighlights = [
//   "Poster & event branding (Tamhar Eco Sport Challenge, Kolase Vol. 2 Metamorfosa)",
//   "Ilustrasi vector & character portrait",
//   "Konten sosial media (feed, story, daily plan template)",
//   "Asset game 2D untuk Construct, Unity, dan Phaser",
//   "3D generalist — Blender & SketchUp",
// ];
