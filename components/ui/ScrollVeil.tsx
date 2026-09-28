"use client";

/**
 * ScrollVeil — versi scroll-driven dari PageEnterVeil.
 * Ditaruh DI ANTARA dua section. Selagi user scroll melewati elemen ini,
 * gold veil + dark veil "mekar" dari tengah nutupin layar penuh (persis
 * transisi awal PageEnterVeil), lalu terbuka dari bawah (trik clip-path
 * circle -> inset yang sama biar gak ada lompatan visual) buat nampakin
 * section berikutnya yang udah nunggu di bawahnya.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollVeil({ distancePx = 600 }: { distancePx?: number }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    const gold = goldRef.current;
    const dark = darkRef.current;
    if (!spacer || !gold || !dark) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const fullCircle = () => {
      const R = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 80;
      return `circle(${R}px at 50% 50%)`;
    };

    gsap.set([gold, dark], { clipPath: "circle(0px at 50% 50%)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spacer,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.4,
      },
    });

    tl.to(gold, { clipPath: fullCircle, duration: 0.32, ease: "power2.inOut" })
      .to(dark, { clipPath: fullCircle, duration: 0.32, ease: "power2.inOut" }, "-=0.14")
      .to({}, { duration: 0.16 }) // ditahan sebentar dalam kondisi full cover, biar About/CaseStudies sempat "berganti" di baliknya
      .set([gold, dark], { clipPath: "inset(0% 0% 0% 0%)" }) // ganti tipe shape tanpa lompat visual (sama-sama full cover)
      .to(dark, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.3, ease: "power3.inOut" })
      .to(gold, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.3, ease: "power3.inOut" }, "-=0.18");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={spacerRef} className="relative" style={{ height: distancePx }}>
      <div className="pointer-events-none fixed inset-0 z-40">
        <div
          ref={goldRef}
          className="absolute inset-0"
          style={{ background: "linear-gradient(120deg,#B08D46,#E6C36A 45%,#F1DA9B 60%,#C9A24B)" }}
        />
        <div
          ref={darkRef}
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 100% at 50% 40%,#2A1F0F,#0D0803)" }}
        />
      </div>
    </div>
  );
}