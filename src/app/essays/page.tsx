import type { Metadata } from "next";
import { posts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "News & Essays",
  description: "The latest reporting and arguments about the form.",
};

export default function EssaysPage() {
  const essays = posts.filter((p) => p.kind === "Essay");

  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="kicker">Newsroom analysis</span>
          <h1>News &amp; Essays</h1>
          <p className="dek">
            Reporting, features and the questions games raise about
            themselves — no scores, just the argument.
          </p>
        </header>

        <div className="page-list">
          <div className="article-grid">
            {essays.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
