import type { Metadata } from "next";
import { posts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Esports",
  description: "Tournaments, rosters and the competitive scene.",
};

export default function EsportsPage() {
  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="kicker">The circuit</span>
          <h1>Esports</h1>
          <p className="dek">
            Tournaments, roster moves and the meta — coverage of the
            competitive scene.
          </p>
        </header>

        <div className="page-list">
          <div className="article-grid">
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
