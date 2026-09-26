import Link from "next/link";
import {
  ArrowRight,
  ChartLine,
  Cpu,
  Flame,
  Gamepad2,
  Joystick,
  LayoutGrid,
  Monitor,
  Play,
  Smartphone,
  Swords,
  Trophy,
} from "lucide-react";
import { posts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import ArtPlate from "@/components/ArtPlate";

const FEATURE = posts[0];

const TRENDING = [
  posts[1],
  posts[0],
  posts[2],
  posts[3],
  posts[4],
];

const FILTERS = [
  { label: "All", icon: LayoutGrid },
  { label: "PC", icon: Monitor },
  { label: "PlayStation", icon: Gamepad2 },
  { label: "Xbox", icon: Swords },
  { label: "Nintendo", icon: Joystick },
  { label: "Mobile", icon: Smartphone },
  { label: "Esports", icon: Trophy },
  { label: "Hardware", icon: Cpu },
];

const GENRES: Record<string, string> = {
  "Echoes of the Valiant": "Shooter",
  "Nightmarket 77": "Adventure",
  "Gravel & Gold": "Racing",
  "Hollow Body": "Metroidvania",
  "Difficulty Is a Dialect": "Essay",
};

const VIDEO_DURATIONS = ["12:34", "15:21", "08:45", "11:17"];

export default function HomePage() {
  return (
    <main>
      {/* ============ HERO + TRENDING RAIL ============ */}
      <section className="hero" aria-label="Featured story">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-art">
              <ArtPlate art={FEATURE.art} label={FEATURE.game} />
            </div>
            <div className="hero-scrim" />

            <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
              <div className="hero-content">
                <p className="hero-kicker">
                  <span className="kind-pill">Featured</span>
                  <span className="cat">{FEATURE.game}</span>
                  <span className="divider" aria-hidden="true">|</span>
                  <span className="cat">{FEATURE.kind}</span>
                </p>
                <h1 className="hero-title display">{FEATURE.title}</h1>
                <p className="hero-dek">{FEATURE.dek}</p>
                <div className="hero-cta">
                  <Link href={`/posts/${FEATURE.slug}`} className="btn-accent">
                    Read Full Article <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
                <div className="hero-dots" aria-hidden="true">
                  <span className="on" />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>

          <aside className="hero-aside-wrap" aria-label="Trending stories">
            <div className="hero-aside">
              <div className="hero-aside-list">
                {TRENDING.map((p, i) => (
                  <Link key={p.slug} href={`/posts/${p.slug}`} className="rank-row">
                    <span className="rank-num mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rank-art">
                      <ArtPlate art={p.art} />
                    </span>
                    <span>
                      <span className="rank-title">{p.game}</span>
                      <span className="rank-sub">{p.dek}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ PLATFORM FILTER BAR ============ */}
      <div className="filter-bar">
        <div className="wrap">
          <div className="filter-row" role="tablist" aria-label="Filter by platform">
            {FILTERS.map((f, i) => (
              <button key={f.label} type="button" className={`chip${i === 0 ? " is-active" : ""}`}>
                <f.icon size={15} aria-hidden="true" />
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="wrap home-main">
        <div className="home-columns">
          {/* ---- left column ---- */}
          <div className="home-col">
            {/* Latest Articles */}
            <section className="home-block" aria-label="Latest articles">
              <div className="section-head">
                <h2 className="section-title">
                  <ChartLine size={20} aria-hidden="true" />
                  Latest Articles
                </h2>
                <Link href="/reviews" className="section-more">
                  View All <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              <div className="article-grid">
                {posts.slice(0, 3).map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>

            {/* Popular Games */}
            <section className="home-block" aria-label="Popular games">
              <div className="section-head">
                <h2 className="section-title">
                  <Gamepad2 size={20} aria-hidden="true" />
                  Popular Games
                </h2>
                <Link href="/games" className="section-more">
                  View All <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

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
            </section>

            {/* Latest Videos */}
            <section className="home-block" aria-label="Latest videos">
              <div className="section-head">
                <h2 className="section-title">
                  <Play size={20} aria-hidden="true" />
                  Latest Videos
                </h2>
                <Link href="/frames" className="section-more">
                  View All <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              <div className="video-grid">
                {posts.slice(0, 4).map((p, i) => (
                  <Link key={p.slug} href={`/posts/${p.slug}`} className="video-item">
                    <span className="video-thumb">
                      <ArtPlate art={p.art} />
                      <span className="video-play" aria-hidden="true">
                        <Play size={13} fill="currentColor" />
                      </span>
                      <span className="video-dur">{VIDEO_DURATIONS[i]}</span>
                    </span>
                    <span className="video-title">
                      {p.game} — {p.title}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* ---- sidebar ---- */}
          <aside className="sidebar">
            <div className="side-card">
              <div className="section-head">
                <h2 className="section-title">
                  <Flame size={18} aria-hidden="true" />
                  Trending Now
                </h2>
              </div>
              <div className="trend-list">
                {TRENDING.map((p, i) => (
                  <Link key={p.slug} href={`/posts/${p.slug}`} className="rank-row">
                    <span className="rank-num">{i + 1}</span>
                    <span className="rank-art">
                      <ArtPlate art={p.art} />
                    </span>
                    <span>
                      <span className="rank-title">{p.game}</span>
                      <span className="rank-sub">{p.dek}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="side-card">
              <h2 className="section-title" style={{ fontSize: 17, marginBottom: 8 }}>
                Get Gaming News in Your Inbox
              </h2>
              <p className="nl-text">
                Weekly updates, game releases, reviews and exclusive guides.
              </p>
              <form className="nl-form" action="#">
                <input
                  type="email"
                  className="news-input"
                  placeholder="Enter your email"
                  aria-label="Email address"
                />
                <button className="btn-accent" type="submit">
                  Subscribe
                </button>
              </form>
            </div>

            <Link href="/hardware" className="guide-card">
              <ArtPlate art={[posts[2].art[0], posts[2].art[1]]} />
              <div>
                <span className="kind-pill">Hardware Guide</span>
                <h3 className="guide-title">Build the Perfect Gaming Setup</h3>
                <p className="guide-sub">
                  Monitors, GPUs, accessories and expert recommendations.
                </p>
                <span className="guide-link">
                  Read Guide <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
