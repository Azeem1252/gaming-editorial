import type { Metadata } from "next";
import { posts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Hardware",
  description: "GPUs, monitors, peripherals and the rigs that run it all.",
};

export default function HardwarePage() {
  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="kicker">The rig</span>
          <h1>Hardware</h1>
          <p className="dek">
            Monitors, GPUs, peripherals and expert recommendations for every
            budget.
          </p>
        </header>

        <div className="page-list">
          <div className="article-grid">
            {posts.slice(1, 4).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
