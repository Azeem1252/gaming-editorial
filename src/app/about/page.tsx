import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "What GameSphere is, who writes it, and how games are scored.",
};

export default function AboutPage() {
  return (
    <main>
      <div className="wrap">
        <header className="page-head">
          <span className="kicker">The crew</span>
          <h1>About</h1>
        </header>

        <div className="about-body">
          <p>
            <strong>GameSphere</strong> covers the world of gaming — news,
            reviews, guides, esports and hardware — all in one place. We take
            games seriously without taking ourselves too seriously.
          </p>
          <p>
            Every review is one critic, one game, and one score. Every guide
            is written by someone who actually finished the game. Every news
            post links its sources, and no verdict is ever sponsored.
          </p>
          <p>
            Want to write for us? We&apos;re always looking for new voices —
            pitch us your feature, guide or hot take.
          </p>

          <div className="credits" style={{ marginTop: 34 }}>
            <div>
              <span className="credits-role">Editor in Chief</span>
              <span className="credits-name">Mara Voss</span>
            </div>
            <div>
              <span className="credits-role">Senior Critic</span>
              <span className="credits-name">Jun Okafor</span>
            </div>
            <div>
              <span className="credits-role">Guides</span>
              <span className="credits-name">Eli Marchetti</span>
            </div>
            <div>
              <span className="credits-role">Pitch us</span>
              <span className="credits-name">desk@gamesphere.gg</span>
            </div>
          </div>

          <p style={{ marginTop: 44 }}>
            <Link href="/" className="btn-accent">
              Back to the front page
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
