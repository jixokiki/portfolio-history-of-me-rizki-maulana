"use client";

/**
 * MagneticButton — 3D tilt + magnetic pull toward the cursor, with a gold
 * spotlight that follows the pointer and a one-time sheen sweep on mount.
 * Extracted from the CTA buttons in the Jual Emas Indonesia remake
 * (components/ui/keramaian.tsx — the `CtaButton` component), stripped of the
 * typewriter/geolocation logic that was specific to that site.
 */
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

type QuickTo = ReturnType<typeof gsap.quickTo>;

export function MagneticButton({
  href,
  children,
  className = "",
  onClick,
  target,
  rel,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const tilt = useRef<{ rx: QuickTo; ry: QuickTo; x: QuickTo; y: QuickTo } | null>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || reduced) return;
    gsap.set(btn, { transformPerspective: 900 });
    const o = { duration: 0.6, ease: "power3.out" };
    tilt.current = {
      rx: gsap.quickTo(btn, "rotationX", o),
      ry: gsap.quickTo(btn, "rotationY", o),
      x: gsap.quickTo(btn, "x", o),
      y: gsap.quickTo(btn, "y", o),
    };

    // One gold sheen sweep once the button has settled on screen.
    const s = { p: -40 };
    const t = gsap.to(s, {
      p: 140,
      duration: 1.4,
      delay: 0.2,
      ease: "power2.inOut",
      onUpdate: () => btn.style.setProperty("--sheen", `${s.p}%`),
    });

    return () => {
      t.kill();
      gsap.killTweensOf(btn);
      gsap.set(btn, { clearProps: "all" });
      tilt.current = null;
    };
  }, [reduced]);

  const setEdge = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty("--fx", `${e.clientX - r.left}px`);
    btn.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn || e.pointerType !== "mouse") return;
    const r = btn.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    btn.style.setProperty("--mx", `${px * 100}%`);
    btn.style.setProperty("--my", `${py * 100}%`);
    const t = tilt.current;
    if (t) {
      t.rx((0.5 - py) * 10);
      t.ry((px - 0.5) * 12);
      t.x((px - 0.5) * 10);
      t.y((py - 0.5) * 8);
    }
  };

  const onLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    setEdge(e);
    const t = tilt.current;
    if (t) {
      t.rx(0);
      t.ry(0);
      t.x(0);
      t.y(0);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <a
        ref={btnRef}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        onPointerEnter={setEdge}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`mag-btn ${className}`}
      >
        <span className="mag-spot" aria-hidden="true" />
        <span className="mag-sheen" aria-hidden="true" />
        <span className="mag-content">{children}</span>
      </a>
    </>
  );
}

export default MagneticButton;

const css = `
.mag-btn{--mx:50%;--my:50%;--fx:50%;--fy:50%;--sheen:-40%;position:relative;isolation:isolate;overflow:hidden;transform-style:preserve-3d;will-change:transform}
.mag-spot{position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(120px circle at var(--mx) var(--my), rgba(241,218,155,.55), transparent 65%);opacity:0;transition:opacity .3s ease}
.mag-btn:hover .mag-spot{opacity:1}
.mag-sheen{position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(105deg, transparent calc(var(--sheen) - 18%), rgba(255,250,228,.55) var(--sheen), transparent calc(var(--sheen) + 18%))}
.mag-content{position:relative;z-index:1;display:inline-flex;align-items:center;gap:.5em}
@media (prefers-reduced-motion: reduce){.mag-btn{transform:none !important}}
`;
