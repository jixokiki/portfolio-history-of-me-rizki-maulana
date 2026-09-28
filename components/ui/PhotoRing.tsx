"use client";

import { useEffect, useRef, useState } from "react";

const N = 96; // jumlah garis
const C = 100; // pusat viewBox 200x200
const R_BASE = 72; // radius dalam dasar
const CLIP_ID = "photoring-clip";

function coords(i: number, t: number) {
  const a = (i / N) * Math.PI * 2;
  const cos = Math.cos(a);
  const sin = Math.sin(a);

  // gelombang untuk panjang garis
  const wave =
    Math.sin(a * 3 + t * 1.2) * 0.5 +
    Math.sin(a * 5 - t * 0.9) * 0.3 +
    Math.sin(a * 2 + t * 0.6) * 0.2;
  const len = 14 + wave * 10;

  // gelombang untuk lingkaran dalam (0 di titik paling bawah -> foto menempel natural)
  const env = (1 - Math.cos(a - Math.PI / 2)) / 2;
  const inner =
    Math.sin(a * 2 - t * 0.8) * 0.6 + Math.sin(a * 4 + t * 1.1) * 0.4;
  const r1 = R_BASE + env * (inner + 1) * 3; // 72 - 78
  const r2 = r1 + len;

  return {
    x1: C + cos * r1,
    y1: C + sin * r1,
    x2: C + cos * r2,
    y2: C + sin * r2,
  };
}

function cutout(img: HTMLImageElement) {
  const scale = Math.min(1, 900 / img.naturalWidth);
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);

  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;

  // warna acuan: HANYA dari 6 baris teratas (pasti background)
  let br = 0, bg = 0, bb = 0, n = 0;
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < w; x += 4) {
      const i = (y * w + x) * 4;
      br += px[i]; bg += px[i + 1]; bb += px[i + 2]; n++;
    }
  }
  br /= n; bg /= n; bb /= n;

  const HARD = 80; // toleransi kemiripan warna
  const isBg = (p: number) => {
    const i = p * 4;
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const dr = r - br, dg = g - bg, db = b - bb;
    const close = Math.sqrt(dr * dr + dg * dg + db * db) < HARD;
    const blueish = b - Math.max(r, g) > 45; // dominan biru
    return close || blueish;
  };

  const mask = new Uint8Array(w * h);
  const stack: number[] = [];
  const push = (x: number, y: number) => {
    const p = y * w + x;
    if (!mask[p] && isBg(p)) {
      mask[p] = 1;
      stack.push(p);
    }
  };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const p = stack.pop()!;
    const x = p % w, y = (p - x) / w;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }

  for (let p = 0; p < w * h; p++) {
    const i = p * 4;
    if (mask[p]) {
      px[i + 3] = 0;
    } else {
      const x = p % w, y = (p - x) / w;
      const edge =
        (x > 0 && mask[p - 1]) || (x < w - 1 && mask[p + 1]) ||
        (y > 0 && mask[p - w]) || (y < h - 1 && mask[p + w]);
      if (edge) {
        px[i + 3] = 130;
        const m = Math.max(px[i], px[i + 1]);
        if (px[i + 2] > m) px[i + 2] = m; // buang sisa biru di tepi
      }
    }
  }
    // hapus sisa biru terkurung (yang tidak terjangkau flood fill)
  for (let p = 0; p < w * h; p++) {
    const i = p * 4;
    if (px[i + 3] === 0) continue;
    const r = px[i], g = px[i + 1], b = px[i + 2];
    if (b - Math.max(r, g) > 40) px[i + 3] = 0;
  }
  ctx.putImageData(data, 0, 0);
  return { url: canvas.toDataURL("image/png"), ratio: h / w };
}

export default function PhotoRing({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const [photo, setPhoto] = useState<{ url: string; ratio: number } | null>(null);

  // proses foto
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      try {
        setPhoto(cutout(img));
      } catch (e) {
        console.error("PhotoRing: gagal memproses foto", e);
        setPhoto({ url: src, ratio: img.naturalHeight / img.naturalWidth });
      }
    };
    img.onerror = () => console.error("PhotoRing: foto tidak ditemukan ->", src);
    img.src = src;
  }, [src]);

  // animasi garis
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      for (let i = 0; i < N; i++) {
        const el = linesRef.current[i];
        if (!el) continue;
        const c = coords(i, t);
        el.setAttribute("x1", c.x1.toFixed(2));
        el.setAttribute("y1", c.y1.toFixed(2));
        el.setAttribute("x2", c.x2.toFixed(2));
        el.setAttribute("y2", c.y2.toFixed(2));
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  // foto: lebar 136, dasar tepat di titik bawah lingkaran dalam
  const PW = 2 * R_BASE + 10; // sedikit lebih lebar dari lingkaran (154)
  const bottom = C + R_BASE;
  const PH = photo ? PW * photo.ratio : 0;

  return (
    <div className={`relative aspect-square ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full overflow-visible text-ink-deep"
        role="img"
        aria-label={alt}
      >
        <defs>
  <clipPath id={CLIP_ID}>
    <circle cx={C} cy={C} r={R_BASE} />
    <rect x={C - R_BASE} y={-100} width={R_BASE * 2} height={C + 100} />
  </clipPath>
  <clipPath id="photoring-hole">
    <circle cx={C} cy={C} r={R_BASE} />
  </clipPath>
  <radialGradient id="photoring-well" cx="50%" cy="45%" r="60%">
    <stop offset="0%" stopColor="#efe6d2" />
    <stop offset="100%" stopColor="#d9ccb0" />
  </radialGradient>
  <filter id="photoring-inner" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="5" />
  </filter>
  <filter id="photoring-pop" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0d0803" floodOpacity="0.45" />
  </filter>
</defs>

        {Array.from({ length: N }).map((_, i) => {
          const c = coords(i, 0);
          return (
            <line
              key={i}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.85}
            />
          );
        })}

        {/* lubang cekung: dasar + bayangan masuk ke dalam */}
<circle cx={C} cy={C} r={R_BASE} fill="url(#photoring-well)" />
<g clipPath="url(#photoring-hole)">
  <circle
    cx={C}
    cy={C + 3}
    r={R_BASE + 3}
    fill="none"
    stroke="#0d0803"
    strokeOpacity="0.55"
    strokeWidth="9"
    filter="url(#photoring-inner)"
  />
</g>

        {photo && (
  <g clipPath={`url(#${CLIP_ID})`}>
    <image
      href={photo.url}
      x={C - PW / 2}
      y={bottom - PH}
      width={PW}
      height={PH}
      preserveAspectRatio="xMidYMax meet"
      filter="url(#photoring-pop)"
      style={{ animation: "photoring-in 1s ease-out both" }}
    />
  </g>
)}
      </svg>

      <style>{`@keyframes photoring-in{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}