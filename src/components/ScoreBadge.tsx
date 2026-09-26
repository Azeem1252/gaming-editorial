interface Props {
  score: number | null;
  size?: "sm" | "lg";
}

/** Review score pill — red rounded badge. */
export default function ScoreBadge({ score, size = "sm" }: Props) {
  if (score === null) {
    return (
      <span className={`cert cert-feature ${size === "lg" ? "cert-lg" : ""}`}>
        <span className="cert-value">FEATURE</span>
      </span>
    );
  }

  return (
    <span className={`cert ${size === "lg" ? "cert-lg" : ""}`}>
      <span className="cert-value">{score.toFixed(1)}</span>
      <span className="cert-max">/ 10</span>
    </span>
  );
}
