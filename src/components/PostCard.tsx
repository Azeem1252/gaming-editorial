import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/posts";
import ArtPlate from "./ArtPlate";
import ScoreBadge from "./ScoreBadge";

interface Props {
  post: Post;
  feature?: boolean;
}

const RED_KINDS = new Set(["News", "Guide", "Review"]);

export default function PostCard({ post }: Props) {
  return (
    <article className="card">
      <Link href={`/posts/${post.slug}`} className="card-link">
        <div className="card-art" style={{ position: "relative", overflow: "hidden" }}>
          {post.hero_image_url ? (
            <img
              src={post.hero_image_url}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <ArtPlate art={post.art} label={post.game} />
          )}
          <span className={`card-kind kind-pill${RED_KINDS.has(post.kind) ? "" : " kind-pill-dark"}`}>
            {post.kind}
          </span>
        </div>

        <div className="card-body">
          <div className="card-meta">
            <span className="k-red">{post.kind}</span>
            <span aria-hidden="true">·</span>
            <span>{post.dateFull}</span>
            {post.score !== null && (
              <span className="card-score">
                <ScoreBadge score={post.score} />
              </span>
            )}
          </div>

          <h3 className="card-title">{post.title}</h3>
          <p className="card-dek">{post.dek}</p>

          <span className="card-more">
            Read More <ArrowRight size={14} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
