import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import ArtPlate from "@/components/ArtPlate";

export const metadata: Metadata = {
  title: "Games",
  description: "Every game we cover, from indie darlings to blockbusters.",
};

const GENRES: Record<string, string> = {
  "Echoes of the Valiant": "Shooter",
  "Nightmarket 77": "Adventure",
  "Gravel & Gold": "Racing",
  "Hollow Body": "Metroidvania",
  "Difficulty Is a Dialect": "Essay",
};

export default function GamesPage() {
  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="kicker">The library</span>
          <h1>Games</h1>
          <p className="dek">
            Every game we cover — news, reviews and guides, one tile each.
          </p>
        </header>

        <div className="page-list">
          <div className="games-grid">
            {posts.map((p) => (
              <Link key={p.slug} href={`/posts/${p.slug}`} className="game-tile">
                <span className="game-art">
                  <ArtPlate art={p.art} label={p.game} />
                </span>
                <span className="game-name">{p.game}</span>
                <span className="game-genre">{GENRES[p.game] ?? p.kind}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
