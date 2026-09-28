export type ArchiveCategory = "projects" | "graphic" | "game" | "three-d" | "tools" | "personal";

export type ArchiveAsset = {
  id: string;
  src: string;
  w: number; // lebar asli (px) — dipakai supaya grid tidak "loncat" saat gambar loading
  h: number; // tinggi asli (px)
  title: string;
  category: ArchiveCategory;
};

export const archiveCategoryOrder: ArchiveCategory[] = ["projects", "graphic", "game", "three-d", "tools", "personal"];

// 45 aset dari portfolio lama — urutan sudah diselang-seling antar kategori supaya grid "All" terlihat kaya.
export const archiveAssets: ArchiveAsset[] = [
  { id: "a01", src: "/archive/projects/project-bangunciptanusakarya-website.webp", w: 800, h: 747, title: "Bangun Cipta Nusakarya — Company Profile", category: "projects" },
  { id: "a02", src: "/archive/projects/project-beagency-website.webp", w: 800, h: 743, title: "Be Agency — Digital Agency Web", category: "projects" },
  { id: "a03", src: "/archive/graphic-design/graphic-diam-social-grid1.jpg", w: 253, h: 283, title: "DIAM — Social Grid I", category: "graphic" },
  { id: "a04", src: "/archive/projects/project-desainerimnco-website.webp", w: 800, h: 731, title: "Desainer IMN Co — Website", category: "projects" },
  { id: "a05", src: "/archive/game-dev/game-construct-gamelab-study.webp", w: 800, h: 475, title: "Construct — Gamelab Study", category: "game" },
  { id: "a06", src: "/archive/personal/rizki-photo-bakery-education.webp", w: 600, h: 800, title: "Portrait — Bakery", category: "personal" },
  { id: "a07", src: "/archive/projects/project-emrlab-login.webp", w: 755, h: 800, title: "EMR Lab — Login", category: "projects" },
  { id: "a08", src: "/archive/3d-generalist/3d-blender-dice-render.webp", w: 800, h: 430, title: "Blender — Dice Render", category: "three-d" },
  { id: "a09", src: "/archive/projects/project-fonams-website.webp", w: 800, h: 728, title: "FONAMS — News Landing", category: "projects" },
  { id: "a10", src: "/archive/projects/project-kbbweb-website.webp", w: 800, h: 735, title: "KBB Web — Knowledge Base", category: "projects" },
  { id: "a11", src: "/archive/graphic-design/graphic-diam-social-grid2.jpg", w: 278, h: 282, title: "DIAM — Social Grid II", category: "graphic" },
  { id: "a12", src: "/archive/projects/project-kemaskayu-alpine-terminal.webp", w: 450, h: 800, title: "Kemas Kayu — Alpine Terminal", category: "projects" },
  { id: "a13", src: "/archive/tools/tools-code-editor-icons.webp", w: 800, h: 392, title: "Code Editor Icons", category: "tools" },
  { id: "a14", src: "/archive/projects/project-kemaskayu-attendance-device-1.webp", w: 369, h: 800, title: "Kemas Kayu — Attendance Device I", category: "projects" },
  { id: "a15", src: "/archive/game-dev/game-construct-mewarnai.webp", w: 667, h: 800, title: "Construct — Mewarnai", category: "game" },
  { id: "a16", src: "/archive/projects/project-kemaskayu-attendance-device-2.webp", w: 405, h: 720, title: "Kemas Kayu — Attendance Device II", category: "projects" },
  { id: "a17", src: "/archive/projects/project-kemaskayu-company-profile.webp", w: 522, h: 800, title: "Kemas Kayu — Company Profile", category: "projects" },
  { id: "a18", src: "/archive/personal/rizki-photo-couch-intro.webp", w: 539, h: 800, title: "Portrait — Couch I", category: "personal" },
  { id: "a19", src: "/archive/projects/project-kemaskayu-laptop-3d-view.webp", w: 450, h: 800, title: "Kemas Kayu — 3D Pallet on Laptop", category: "projects" },
  { id: "a20", src: "/archive/graphic-design/graphic-diam-social-grid3.jpg", w: 252, h: 252, title: "DIAM — Social Grid III", category: "graphic" },
  { id: "a21", src: "/archive/projects/project-kemaskayu-led-sign.webp", w: 497, h: 800, title: "Kemas Kayu — LED Sign", category: "projects" },
  { id: "a22", src: "/archive/projects/project-kemaskayu-marketing-landing.webp", w: 513, h: 800, title: "Kemas Kayu — Marketing Landing", category: "projects" },
  { id: "a23", src: "/archive/game-dev/game-phaser-ocong.webp", w: 800, h: 448, title: "Phaser — Ocong", category: "game" },
  { id: "a24", src: "/archive/3d-generalist/3d-blender-sketchup-process.jpg", w: 722, h: 420, title: "Blender × SketchUp — Process", category: "three-d" },
  { id: "a25", src: "/archive/projects/project-kemaskayu-pallet-3d-configurator.webp", w: 800, h: 369, title: "Kemas Kayu — Pallet 3D Configurator", category: "projects" },
  { id: "a26", src: "/archive/projects/project-kemaskayu-pallet-drawing-1.webp", w: 449, h: 800, title: "Kemas Kayu — Pallet Drawing I", category: "projects" },
  { id: "a27", src: "/archive/graphic-design/graphic-poster-tamhar-metamorfosa1.jpg", w: 349, h: 462, title: "Tamhar — Metamorfosa Poster I", category: "graphic" },
  { id: "a28", src: "/archive/projects/project-kemaskayu-pallet-drawing-2.webp", w: 720, h: 673, title: "Kemas Kayu — Pallet Drawing II", category: "projects" },
  { id: "a29", src: "/archive/personal/rizki-photo-couch-toc.webp", w: 536, h: 800, title: "Portrait — Couch II", category: "personal" },
  { id: "a30", src: "/archive/projects/project-kemaskayu-pallet-spec-text.webp", w: 287, h: 243, title: "Kemas Kayu — Pallet Spec", category: "projects" },
  { id: "a31", src: "/archive/projects/project-kemaskayu-qr-landing-phone.webp", w: 369, h: 800, title: "Kemas Kayu — QR Landing (Phone)", category: "projects" },
  { id: "a32", src: "/archive/game-dev/game-sketch-characters.webp", w: 800, h: 455, title: "Character Sketches", category: "game" },
  { id: "a33", src: "/archive/projects/project-kemaskayu-tailscale-devices.webp", w: 369, h: 800, title: "Kemas Kayu — Tailscale Devices", category: "projects" },
  { id: "a34", src: "/archive/graphic-design/graphic-poster-tamhar-metamorfosa2.jpg", w: 312, h: 468, title: "Tamhar — Metamorfosa Poster II", category: "graphic" },
  { id: "a35", src: "/archive/projects/project-kemaskayu-workstation-photo.webp", w: 450, h: 800, title: "Kemas Kayu — Workstation", category: "projects" },
  { id: "a36", src: "/archive/tools/tools-icon-grid-reference.webp", w: 800, h: 424, title: "Icon Grid Reference", category: "tools" },
  { id: "a37", src: "/archive/projects/project-quizweb-website.webp", w: 800, h: 729, title: "Quiz Web — Score Tracking", category: "projects" },
  { id: "a38", src: "/archive/projects/project-sohibkerja-dashboard.webp", w: 800, h: 745, title: "Sohib Kerja — Dashboard", category: "projects" },
  { id: "a39", src: "/archive/3d-generalist/3d-sketchup-process.jpg", w: 728, h: 377, title: "SketchUp — Process", category: "three-d" },
  { id: "a40", src: "/archive/projects/project-spinradiofm-website.webp", w: 800, h: 746, title: "Spin Radio FM — Website", category: "projects" },
  { id: "a42", src: "/archive/game-dev/game-unity-ruby-games.webp", w: 800, h: 454, title: "Unity — Ruby Games", category: "game" },
  { id: "a43", src: "/archive/projects/project-ueuasset-website.webp", w: 800, h: 752, title: "UEU Asset — Asset Management", category: "projects" },
  { id: "a44", src: "/archive/graphic-design/graphic-vector-portraits.webp", w: 800, h: 625, title: "Vector Portraits", category: "graphic" },
  { id: "a45", src: "/archive/projects/project-wmk-mobile-landing-1.webp", w: 369, h: 800, title: "WMK — Mobile Landing I", category: "projects" },
  { id: "a46", src: "/archive/projects/project-wmk-mobile-landing-2.webp", w: 370, h: 800, title: "WMK — Mobile Landing II", category: "projects" },
];