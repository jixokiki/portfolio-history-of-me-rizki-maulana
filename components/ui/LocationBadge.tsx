"use client";

/**
 * LocationBadge — a small "based in Bekasi" pill that, on click, blooms into
 * a full-screen overlay with a hand-drawn West-Java coastline and a gold pin,
 * plus a live Jakarta clock and an optional "how far are you" distance check.
 *
 * Adapted from the Jual Emas Indonesia remake's location system:
 * - the circle-wipe-from-click-point reveal is from components/ui/LokasiTransition.tsx
 * - the hand-drawn Jabodetabek–Banten–Bandung coastline path is from
 *   components/ui/LokasiOverlay.tsx (that project's real branch-finder map)
 * Trimmed down to a single fixed point (Bekasi) with no branch data or
 * external map dependency — everything here is a self-contained SVG.
 */
import { gsap } from "gsap";
import { MapPin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Same lat/lng bounding box & hand-drawn coastline as the original LokasiOverlay,
// just re-used here to place a single pin instead of ranking branches.
const REGION = { lat: { min: -7.1, max: -5.9 }, lng: { min: 105.9, max: 107.8 } };
const BEKASI = { lat: -6.2383, lng: 107.0 };

const project = (lat: number, lng: number) => ({
  x: ((lng - REGION.lng.min) / (REGION.lng.max - REGION.lng.min)) * 190,
  y: ((REGION.lat.max - lat) / (REGION.lat.max - REGION.lat.min)) * 120,
});

const COAST_D =
  "M0,34 C12,29 18,24 25,26 C35,29 45,23 55,20 C65,17 72,17 80,16 " +
  "C86,15.5 90,18 95,24 C100,29 106,17 115,15 C124,13 132,18 140,22 " +
  "C150,26 158,27 165,30 C173,33 182,35 190,38";
const LAND_D = `${COAST_D} L190,120 L0,120 Z`;
const ROADS_D = ["M65,50 Q95,15 125,32", "M95,30 C92,55 88,75 90,100", "M90,55 C115,60 140,68 168,90"];

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)));
}

function MiniMap() {
  const pin = project(BEKASI.lat, BEKASI.lng);
  return (
    <svg viewBox="0 0 190 120" className="lb-map" aria-hidden="true">
      <path d={LAND_D} fill="rgba(201,162,75,0.14)" />
      <path d={COAST_D} fill="none" stroke="rgba(241,218,155,0.55)" strokeWidth="0.8" />
      {ROADS_D.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(241,218,155,0.25)" strokeWidth="0.5" strokeDasharray="1.5 2" />
      ))}
      <circle cx={pin.x} cy={pin.y} r="7" className="lb-pin-ring" fill="none" stroke="#F1DA9B" strokeWidth="0.6" />
      <circle cx={pin.x} cy={pin.y} r="2.6" fill="#F1DA9B" />
    </svg>
  );
}

export function LocationBadge({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState<number | "denied" | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const lastOrigin = useRef({ x: 0, y: 0 }).current;

  useEffect(() => {
    if (!open) return;
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
        }).format(new Date()) + " WIB",
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    const root = overlayRef.current;
    const veil = veilRef.current;
    if (!open || !root || !veil) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set([root, veil], { clearProps: "all" });
      return;
    }

    const { x: originX, y: originY } = lastOrigin;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const R = Math.hypot(Math.max(originX, vw - originX), Math.max(originY, vh - originY)) + 40;

    gsap.set(root, { display: "grid" });
    gsap.fromTo(
      veil,
      { clipPath: `circle(0px at ${originX}px ${originY}px)` },
      { clipPath: `circle(${R}px at ${originX}px ${originY}px)`, duration: 0.75, ease: "power3.inOut" },
    );
  }, [open]);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    lastOrigin.x = e.clientX;
    lastOrigin.y = e.clientY;
    setOpen(true);
    setDistance(null);
  };

  const checkDistance = () => {
    if (!("geolocation" in navigator)) {
      setDistance("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setDistance(haversineKm(BEKASI, { lat: pos.coords.latitude, lng: pos.coords.longitude })),
      () => setDistance("denied"),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 5 * 60 * 1000 },
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <button type="button" onClick={handleOpen} className={`lb-trigger ${className}`}>
        <MapPin size={13} className="text-gold-deep" />
        Based in Bekasi, ID
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div ref={overlayRef} className="lb-overlay" role="dialog" aria-modal="true" aria-label="Location">
            <div ref={veilRef} className="lb-veil">
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="lb-close">
                <X size={18} />
              </button>

              <div className="lb-panel">
                <MiniMap />
                <p className="lb-eyebrow">Where I work from</p>
                <h3 className="lb-title">Bekasi, Jawa Barat</h3>
                <p className="lb-time">{time || "—"}</p>

                {distance === null && (
                  <button type="button" onClick={checkDistance} className="lb-check">
                    How far are you?
                  </button>
                )}
                {typeof distance === "number" && (
                  <p className="lb-distance">≈ {distance.toLocaleString()} km from here — open to remote work anywhere.</p>
                )}
                {distance === "denied" && (
                  <p className="lb-distance">Couldn&apos;t get your location — that&apos;s alright, remote works too.</p>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

export default LocationBadge;

const css = `
.lb-trigger{display:inline-flex;align-items:center;gap:6px;border-radius:999px;border:1px solid rgba(201,162,75,.45);background:rgba(251,246,234,.6);padding:5px 12px;font-size:11px;font-weight:600;color:#8B6B3D;transition:border-color .2s ease,transform .2s ease}
.lb-trigger:hover{border-color:#C9A24B;transform:translateY(-1px)}
.lb-overlay{position:fixed;inset:0;z-index:200;display:grid;place-items:center}
.lb-veil{position:fixed;inset:0;background:radial-gradient(120% 100% at 50% 40%,#2A1F0F,#0D0803);display:grid;place-items:center;padding:24px}
.lb-panel{position:relative;width:min(92vw,380px);border-radius:16px;border:1px solid rgba(201,162,75,.35);background:rgba(26,18,8,.7);padding:28px 24px 26px;text-align:center;backdrop-filter:blur(6px)}
.lb-close{position:absolute;top:12px;right:12px;color:#F1DA9B;opacity:.7;transition:opacity .2s ease}
.lb-close:hover{opacity:1}
.lb-map{width:100%;height:auto;max-height:150px;margin:0 auto 14px}
.lb-pin-ring{animation:lb-ping 2.4s ease-out infinite}
@keyframes lb-ping{0%{r:2.6;opacity:1}100%{r:11;opacity:0}}
.lb-eyebrow{margin:0;font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:#C9A24B}
.lb-title{margin:.4em 0 0;font-family:var(--font-serif),Georgia,serif;font-style:italic;font-weight:500;font-size:26px;color:#F1DA9B}
.lb-time{margin:.5em 0 1.1em;font-size:13px;letter-spacing:.08em;color:rgba(239,217,166,.75)}
.lb-check{border-radius:999px;border:1px solid rgba(201,162,75,.5);padding:8px 18px;font-size:12px;font-weight:600;color:#F1DA9B;transition:border-color .2s ease,background .2s ease}
.lb-check:hover{border-color:#F1DA9B;background:rgba(201,162,75,.12)}
.lb-distance{margin:0;font-size:13px;line-height:1.5;color:rgba(239,217,166,.85)}
@media (prefers-reduced-motion: reduce){.lb-pin-ring{animation:none}}
`;
