"use client";

/**
 * PageEnterVeil — the "curtain" reveal played once when the site first loads.
 * Ported from the Jual Emas Indonesia remake (components/ui/PageEnterVeil.tsx):
 * a gold circle blooms from the click origin (or center, on a fresh load),
 * a dark veil follows, the title lifts letter by letter, then everything
 * splits open from the middle to reveal the real page underneath.
 */
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const ORIGIN_KEY = "portfolio-nav-origin";

export default function PageEnterVeil({
  title = "RIZKI MAULANA",
  subtitle = "Fullstack Developer — Bekasi, Indonesia",
}: {
  title?: string;
  subtitle?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const gold = goldRef.current;
    const dark = darkRef.current;
    if (!root || !gold || !dark) return;

    let origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    try {
      const raw = sessionStorage.getItem(ORIGIN_KEY);
      if (raw) {
        origin = JSON.parse(raw);
        sessionStorage.removeItem(ORIGIN_KEY);
      }
    } catch {}

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root, { display: "none" });
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const R = Math.hypot(Math.max(origin.x, vw - origin.x), Math.max(origin.y, vh - origin.y)) + 60;
    const full = `circle(${R}px at ${origin.x}px ${origin.y}px)`;

    const q = gsap.utils.selector(root);
    const veils = [gold, dark];

    gsap.set(root, { clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(veils, { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` });
    gsap.set(q(".pev-ch"), { yPercent: 118 });
    gsap.set(q(".pev-sub"), { autoAlpha: 0, y: 14 });

    const tl = gsap.timeline({
      onComplete: () => gsap.set(root, { display: "none", pointerEvents: "none" }),
    });

    tl.to(gold, { clipPath: full, duration: 1, ease: "power3.inOut" })
      .to(dark, { clipPath: full, duration: 1, ease: "power3.inOut" }, "-=0.82")
      .to(q(".pev-ch"), { yPercent: 0, duration: 0.85, stagger: 0.04, ease: "power4.out" }, "-=0.45")
      .to(q(".pev-sub"), { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.5")
      .to({}, { duration: 0.4 })
      .to(q(".pev-ch"), { yPercent: -118, duration: 0.5, stagger: 0.02, ease: "power3.in" })
      .to(q(".pev-sub"), { autoAlpha: 0, duration: 0.3 }, "<")
      .set(veils, { clipPath: "inset(0% 0% 0% 0%)" })
      .to([root, dark], { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "power4.inOut" })
      .to(gold, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "power4.inOut" }, "-=0.82");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="pev-root" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={goldRef} className="pev-veil pev-veil-gold" />
      <div ref={darkRef} className="pev-veil pev-veil-dark" />
      <div className="pev-title-wrap">
        <div className="pev-line">
          {title.split("").map((c, i) => (
            <span className="pev-ch" key={i}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>
        {subtitle && <p className="pev-sub">{subtitle}</p>}
      </div>
    </div>
  );
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")";

const css = `
.pev-root{position:fixed;inset:0;z-index:9999;pointer-events:auto;overflow:hidden;background:#1A1208}
.pev-root::before{content:"";position:absolute;inset:0;background-image:${GRAIN};background-size:140px 140px;opacity:.2;filter:brightness(1.8) sepia(0.2);pointer-events:none;z-index:0}
.pev-veil{position:absolute;inset:0}
.pev-veil-gold{z-index:2;background:linear-gradient(120deg,#B08D46,#E6C36A 45%,#F1DA9B 60%,#C9A24B)}
.pev-veil-dark{z-index:3;background:radial-gradient(120% 100% at 50% 40%,#2A1F0F,#0D0803)}
.pev-title-wrap{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;pointer-events:none}
.pev-line{display:flex;overflow:hidden;padding:.12em .1em}
.pev-ch{display:inline-block;transform:translateY(118%);font-family:var(--font-serif),Georgia,"Times New Roman",serif;font-style:italic;font-weight:500;font-size:clamp(28px,6.5vw,88px);line-height:1;color:#F1DA9B;will-change:transform}
.pev-sub{margin:0;opacity:0;font-size:clamp(11px,1.4vw,15px);letter-spacing:.1em;text-transform:uppercase;color:rgba(239,217,166,.75)}
`;
