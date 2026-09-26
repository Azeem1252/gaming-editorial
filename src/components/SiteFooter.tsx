import Link from "next/link";
import { Mail } from "lucide-react";

const explore = [
  { href: "/", label: "Home" },
  { href: "/essays", label: "News" },
  { href: "/reviews", label: "Reviews" },
  { href: "/frames", label: "Guides" },
  { href: "/esports", label: "Esports" },
];

const platforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"];

const more = [
  { href: "/hardware", label: "Hardware" },
  { href: "/games", label: "Upcoming Games" },
  { href: "/reviews", label: "Game Deals" },
  { href: "/about", label: "Contribute" },
  { href: "/about", label: "Contact" },
];

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.2h3.7l-8.2 9.3L24 22.8h-7.6l-5.9-7.7-6.8 7.7H0l8.7-10L-.4 1.2H7.4l5.3 7 6.2-7Zm-1.3 19.5h2L6.3 3.3H4.1l13.5 17.4Z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12c0 2 .2 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.8.5-5.8s-.2-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.9 3l-.6 1.2a18.3 18.3 0 0 0-6.6 0L8.1 3a19.8 19.8 0 0 0-4.4 1.4C.9 8.6.2 12.7.5 16.7a20 20 0 0 0 6 3l1.3-2.1c-.7-.3-1.4-.6-2-1l.5-.4a14.2 14.2 0 0 0 11.4 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a20 20 0 0 0 6-3c.4-4.6-.7-8.6-3.2-12.3ZM8.7 14.2c-1 0-1.9-.9-1.9-2.1 0-1.1.8-2.1 1.9-2.1s1.9 1 1.9 2.1c0 1.2-.9 2.1-1.9 2.1Zm6.6 0c-1 0-1.9-.9-1.9-2.1 0-1.1.8-2.1 1.9-2.1s1.9 1 1.9 2.1c0 1.2-.8 2.1-1.9 2.1Z" />
    </svg>
  );
}

function TwitchIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.3 1 1.5 5.8v16h5.8V24h3.3l2.3-2.3h4.4l5.8-5.7V1H4.3Zm16.9 14.1-3.4 3.4h-5.3l-2.3 2.3v-2.3H5.6V2.9h15.6v12.2ZM17.9 6.9v6.3h-1.9V6.9h1.9Zm-5.2 0v6.3h-1.9V6.9h1.9Z" />
    </svg>
  );
}

const socials = [
  { label: "YouTube", icon: <YoutubeIcon /> },
  { label: "X", icon: <XIcon /> },
  { label: "Instagram", icon: <InstagramIcon /> },
  { label: "Discord", icon: <DiscordIcon /> },
  { label: "Twitch", icon: <TwitchIcon /> },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="GameSphere home">
              Game<span className="accent">Sphere</span>
            </Link>
            <p className="footer-tag">
              News. Reviews. Guides. The world of gaming, all in one place.
            </p>
            <div className="footer-social">
              {socials.map((s) => (
                <a key={s.label} href="#" className="social-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Explore</h4>
            {explore.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Platforms</h4>
            {platforms.map((p) => (
              <a key={p} href="#">
                {p}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">More</h4>
            {more.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="footer-news">
            <h4 className="footer-col-title">
              <Mail size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} aria-hidden="true" />
              Join 50,000+ Gamers
            </h4>
            <p>
              Get the latest news, guides and exclusive content directly in
              your inbox.
            </p>
            <form className="nl-form" action="#">
              <input
                type="email"
                className="news-input news-input-dark"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button className="btn-accent" type="submit" aria-label="Subscribe">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="footer-base">
          <span>© 2026 GameSphere. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
