import type { Post } from "@/lib/posts";

interface Props {
  /** Game title burned into the art (optional) */
  label?: string;
  /** Hex pair driving the gradient */
  art: [string, string];
  className?: string;
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Generated key art — no external images.
 * Deterministic per label: gradient field + light streaks + vignette + grain,
 * styled like game cover art.
 */
export default function ArtPlate({ label = "", art, className }: Props) {
  const h = hash(label);
  const [a, b] = art;
  const angle = (h % 4) * 30 + 105; // 105..195deg, keeps gradients lively
  const glowX = 20 + (h % 60);
  const glowY = 15 + (h % 40);

  return (
    <div className={`plate ${className ?? ""}`} aria-hidden="true">
      <div
        className="plate-field"
        style={{
          background: `
            radial-gradient(90% 70% at ${glowX}% ${glowY}%, ${b}55 0%, transparent 55%),
            linear-gradient(${angle}deg, ${a} 0%, #101114 82%)
          `,
        }}
      />
      {/* light streaks, like logo flares on a cover */}
      <div
        className="plate-gate"
        style={{
          left: `${10 + (h % 35)}%`,
          background: `repeating-linear-gradient(180deg, ${b} 0 2px, transparent 2px 22px)`,
          opacity: h % 2 === 0 ? 0.5 : 0.28,
        }}
      />
      <span className="plate-stamp">{label}</span>
      <span className="plate-grain" />
    </div>
  );
}
