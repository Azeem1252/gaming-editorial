import type { Metadata } from "next";
import { posts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Guides",
  description: "Walkthroughs, tips and deep dives.",
};

export default function FramesPage() {
  const frames = posts.filter((p) => p.kind === "Frame");

  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="kicker">Play better</span>
          <h1>Guides</h1>
          <p className="dek">
            Walkthroughs, builds and close readings of the systems behind the
            games you play.
          </p>
        </header>

        <div className="page-list">
          <div className="article-grid">
            {frames.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
