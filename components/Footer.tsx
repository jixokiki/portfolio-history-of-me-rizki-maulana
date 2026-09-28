"use client";

/**
 * Footer — adapted from the Jual Emas Indonesia remake's
 * components/ui/site-footer-static.tsx: the gold rule that draws itself in,
 * a giant text mark that rises and catches a one-time sheen sweep, and a
 * gold spotlight that follows the pointer across the whole footer.
 * Content swapped for this portfolio's own sections, case studies and contact info.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useContent } from "@/lib/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const { t } = useContent();
  const { profile, nav, caseStudies, ui } = t;

  const rootRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const rule = ruleRef.current;
    const mask = maskRef.current;
    const mark = markRef.current;
    if (!root || !rule || !mask || !mark) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = mask.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        mark.style.setProperty("--mx", `${x}%`);
        mark.style.setProperty("--my", `${y}%`);
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(mark, { yPercent: 110 });

      const sheen = { p: -40 };
      const tl = gsap.timeline({ paused: true });
      tl.to(rule, { scaleX: 1, duration: 1.6, ease: "power3.inOut" }, 0)
        .to(mark, { yPercent: 0, duration: 1.5, ease: "power4.out" }, 0.15)
        .to(sheen, { p: 140, duration: 1.9, ease: "power2.inOut", onUpdate: () => mark.style.setProperty("--sheen", `${sheen.p}%`) }, 0.9);

      ScrollTrigger.create({ trigger: root, start: "top 80%", once: true, onEnter: () => tl.play() });

      if (!finePointer) {
        const d = { x: 20 };
        const drift = gsap.to(d, {
          x: 80,
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
          onUpdate: () => mark.style.setProperty("--mx", `${d.x}%`),
        });
        ScrollTrigger.create({ trigger: root, onToggle: (self) => (self.isActive ? drift.play() : drift.pause()) });
      }
    }, root);

    if (finePointer) root.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  const waLink = `https://wa.me/${profile.phone.replace(/[^\d]/g, "")}`;

  return (
    <footer ref={rootRef} className="rm-footer" aria-label="Footer">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <span ref={ruleRef} className="rm-rule" aria-hidden="true" />

      <div className="rm-wrap">
        <div className="rm-top">
          <h2 className="rm-statement">{ui.footer.statement}</h2>
          <a className="rm-cta" href={`mailto:${profile.email}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            {ui.footer.emailCta}
          </a>
        </div>

        <div className="rm-cols">
          <nav className="rm-col" aria-label="Sections">
            <h3 className="rm-h">{ui.footer.sections}</h3>
            <ul className="rm-nav">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a className="rm-link" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="rm-col" aria-label="Selected work">
            <h3 className="rm-h">{ui.footer.selectedWork}</h3>
            <ul className="rm-contact">
              {caseStudies.slice(0, 4).map((cs) =>
                cs.link ? (
                  <li key={cs.slug}>
                    <a className="rm-link" href={cs.link} target="_blank" rel="noreferrer">
                      {cs.title}
                    </a>
                  </li>
                ) : (
                  <li key={cs.slug}>
                    <a className="rm-link" href="#work">
                      {cs.title}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="rm-col">
            <h3 className="rm-h">{ui.footer.contact}</h3>
            <ul className="rm-contact">
              <li>
                <a className="rm-link" href={waLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp {profile.phone}
                </a>
              </li>
              <li>
                <a className="rm-link" href={`https://${profile.github}`} target="_blank" rel="noreferrer">
                  {profile.github}
                </a>
              </li>
              <li>
                <a className="rm-link" href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">
                  {profile.linkedin}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div ref={maskRef} className="rm-mask" aria-hidden="true">
          <div ref={markRef} className="rm-mark">
            {profile.name.split(" ")[0].toUpperCase()}
          </div>
        </div>

        <div className="rm-bottom">
          <a className="rm-link" href={profile.agency.url} target="_blank" rel="noreferrer">
            {profile.name}
          </a>
          <p>
            © {new Date().getFullYear()} {profile.name}. {ui.footer.rights}
          </p>
          <p className="rm-disclaimer">{ui.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}

const css = `
.rm-footer{--rf-bg:#120D07;--rf-ink:#F2E9D8;--rf-muted:#B8AE9B;--rf-gold:#C9A24B;--rf-gold-hi:#EFD9A6;--rf-line:rgba(201,162,75,.22);position:relative;isolation:isolate;overflow:hidden;width:100%;color:var(--rf-ink);background:radial-gradient(70% 55% at 50% 100%,rgba(201,162,75,.14),transparent 70%),var(--rf-bg);font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}
.rm-footer *{box-sizing:border-box}
.rm-footer::before{content:"";position:absolute;inset:0;z-index:-1;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");background-size:140px 140px;opacity:.06;pointer-events:none}
.rm-footer a{color:inherit;text-decoration:none}
.rm-footer a:focus-visible{outline:2px solid var(--rf-gold-hi);outline-offset:5px;border-radius:4px}
.rm-footer ul{list-style:none;margin:0;padding:0}

.rm-rule{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#C9A24B 30%,#F1DA9B 50%,#C9A24B 70%,transparent)}
.rm-wrap{width:min(100% - 48px,1320px);margin-inline:auto}

.rm-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:32px 48px;padding:clamp(56px,9vw,112px) 0 clamp(40px,6vw,72px)}
.rm-statement{margin:0;max-width:14em;font-family:var(--font-serif),Georgia,"Times New Roman",serif;font-weight:500;font-size:clamp(32px,5vw,68px);line-height:1.06;letter-spacing:-.015em}

.rm-cta{display:inline-flex;align-items:center;gap:12px;padding:18px 30px;border-radius:999px;background:linear-gradient(120deg,#B08D46,#E6C36A 50%,#B08D46);color:#1A1208;font-size:16px;font-weight:600;box-shadow:0 12px 40px -14px rgba(230,195,106,.55);transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease}
.rm-cta:hover{transform:translateY(-3px);box-shadow:0 18px 44px -12px rgba(230,195,106,.75)}
.rm-cta svg{width:20px;height:20px;flex:none}

.rm-cols{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:clamp(32px,5vw,80px);padding:clamp(36px,5vw,56px) 0;border-top:1px solid var(--rf-line)}
.rm-h{margin:0 0 20px;font-family:var(--font-serif),Georgia,serif;font-style:italic;font-weight:500;font-size:22px;line-height:1.2;color:var(--rf-gold-hi)}
.rm-nav{columns:2;column-gap:32px}
.rm-nav li,.rm-contact li{break-inside:avoid;margin:0 0 12px}

.rm-link{position:relative;display:inline-block;padding:2px 0;font-size:15px;color:var(--rf-muted);transition:color .25s ease}
.rm-link::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:var(--rf-gold);transform:scaleX(0);transform-origin:right;transition:transform .4s cubic-bezier(.2,.7,.2,1)}
.rm-link:hover{color:var(--rf-ink)}
.rm-link:hover::after{transform:scaleX(1);transform-origin:left}

.rm-mask{overflow:hidden;margin-top:clamp(4px,1.5vw,20px)}
.rm-mark{--mx:30%;--my:45%;--sheen:-40%;display:block;margin:0;padding:.06em .04em .18em;text-align:center;white-space:nowrap;user-select:none;font-family:var(--font-serif),Georgia,"Times New Roman",serif;font-weight:500;font-size:clamp(48px,17vw,280px);line-height:1;letter-spacing:-.02em;background-image:linear-gradient(105deg,transparent calc(var(--sheen) - 14%),rgba(255,250,228,.95) var(--sheen),transparent calc(var(--sheen) + 14%)),radial-gradient(circle 320px at var(--mx) var(--my),rgba(255,247,214,.95),rgba(255,247,214,0) 70%),linear-gradient(100deg,#8B6B3D 0%,#C9A24B 22%,#F1DA9B 48%,#B08D46 74%,#8B6B3D 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}

.rm-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;padding:24px 0 32px;border-top:1px solid var(--rf-line);font-size:13px;line-height:1.5;color:var(--rf-muted)}
.rm-bottom p{margin:0}

@media(max-width:900px){
  .rm-cols{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){
  .rm-wrap{width:min(100% - 40px,1320px)}
  .rm-cols{grid-template-columns:1fr}
  .rm-cta{width:100%;justify-content:center}
}
@media(prefers-reduced-motion:reduce){
  .rm-cta,.rm-link,.rm-link::after{transition:none}
}
`;
