import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="wrap nf-wrap">
        <span className="mono" style={{ color: "var(--accent)", letterSpacing: "0.16em" }}>
          404 — GAME OVER?
        </span>
        <h1 className="display">Page not found</h1>
        <p className="dim" style={{ maxWidth: "46ch", margin: "0 auto 30px" }}>
          This page respawned somewhere else. Head back to the front page and
          try another route.
        </p>
        <Link href="/" className="btn-accent">
          Back to the front page
        </Link>
      </div>
    </main>
  );
}
