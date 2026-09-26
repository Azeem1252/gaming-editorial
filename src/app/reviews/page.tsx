import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Every verdict, scored and summarized.",
};

export default function ReviewsPage() {
  const reviews = getAllPosts().filter((p) => p.kind === "Review");

  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="kicker">The verdicts</span>
          <h1>Reviews</h1>
          <p className="dek">
            Long-form criticism, scored. No aggregator math — one critic, one
            game, one number with a face on it.
          </p>
        </header>

        <div className="page-list">
          <div className="article-grid">
            {reviews.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
