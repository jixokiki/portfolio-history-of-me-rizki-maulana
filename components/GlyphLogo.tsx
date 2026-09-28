export default function GlyphLogo({ className = "", tone = "gold" }: { className?: string; tone?: "gold" | "cream" }) {
  const stroke = tone === "gold" ? "#C9A24B" : "#FBF6EA";
  return (
    <svg viewBox="0 0 64 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="20" r="18" stroke={stroke} strokeWidth="1.4" />
      <circle cx="42" cy="20" r="18" stroke={stroke} strokeWidth="1.4" />
      <path d="M22 2v36M4 20h36M8 9c9 6 9 16 0 22M36 9c9 6 9 16 0 22" stroke={stroke} strokeWidth="0.9" opacity="0.6" />
      <path d="M28 9c9 6 9 16 0 22M56 9c9 6 9 16 0 22" stroke={stroke} strokeWidth="0.9" opacity="0.6" />
    </svg>
  );
}
