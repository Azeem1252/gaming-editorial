import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getAllPosts, getPostBySlug, getPostBySlugAsync } from "@/lib/posts";
import ArtPlate from "@/components/ArtPlate";
import ScoreBadge from "@/components/ScoreBadge";

export const dynamicParams = true;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPostBySlugAsync(slug)) || getPostBySlug(slug) || posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.dek,
    openGraph: post.hero_image_url ? { images: [post.hero_image_url] } : undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allPosts = getAllPosts();
  const post = (await getPostBySlugAsync(slug)) || getPostBySlug(slug) || posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : undefined;
  const next = idx > 0 ? allPosts[idx - 1] : undefined;

  return (
    <main>
      <article>
        {/* Hero */}
        <header className="article-hero">
          <div className="article-screen">
            {post.hero_image_url ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  zIndex: 0,
                }}
              >
                <img
                  src={post.hero_image_url}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.72) contrast(1.08)",
                  }}
                />
              </div>
            ) : (
              <ArtPlate art={post.art} label={post.game} />
            )}
            <div className="article-hero-scrim" />

            <div className="wrap" style={{ width: "100%" }}>
              <div className="article-card">
                <p className="article-kicker">
                  <span className="kind-pill">{post.kind}</span>
                  <span className="cat">{post.game}</span>
                  <span className="divider" aria-hidden="true">|</span>
                  <span className="cat">{post.dateFull}</span>
                </p>
                <h1 className="article-title display">{post.title}</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Meta bar */}
        <div className="article-bar">
          <div className="wrap">
            <span>{post.game}</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>{post.studio}</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>{post.platform}</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>{post.runtime} READ</span>
            {post.score !== null && (
              <span style={{ marginLeft: "auto" }}>
                <ScoreBadge score={post.score} />
              </span>
            )}
          </div>
        </div>

        {/* Body + rail */}
        <div className="wrap article-body-wrap">
          <div className="article-body">
            {post.html ? (
              <div
                className="article-rich-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            ) : (
              post.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))
            )}

            <div className="credits">
              <div>
                <span className="credits-role">Topic</span>
                <span className="credits-name">{post.game}</span>
              </div>
              <div>
                <span className="credits-role">By / Studio</span>
                <span className="credits-name">{post.author || post.studio}</span>
              </div>
              <div>
                <span className="credits-role">Platform</span>
                <span className="credits-name">{post.platform}</span>
              </div>
              <div>
                <span className="credits-role">Read time</span>
                <span className="credits-name">{post.runtime}</span>
              </div>
            </div>
          </div>

          <aside className="article-rail">
            <div className="rail-block">
              <span className="rail-label">Verdict</span>
              <span className="rail-cert">
                <ScoreBadge score={post.score} size="lg" />
              </span>
              <p className="mono faint" style={{ marginTop: 12 }}>
                {post.score === null ? "NO SCORE · CRITICISM" : "REVIEWED BY THE DESK"}
              </p>
            </div>

            <div className="rail-block">
              <span className="rail-label">Filed under</span>
              <p className="credits-name">{post.kind}</p>
              <p className="credits-name dim">{post.dateFull} · {post.code}</p>
            </div>

            <div className="rail-block">
              <span className="rail-label">Share</span>
              <p className="credits-name dim">Copy the link · Send to a friend</p>
            </div>
          </aside>
        </div>
      </article>

      {/* Prev / next */}
      <nav className="article-nav" aria-label="More stories">
        {prev ? (
          <Link href={`/posts/${prev.slug}`}>
            <span className="dir">← Previous</span>
            <span className="t">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/posts/${next.slug}`}>
            <span className="dir">Next →</span>
            <span className="t">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
