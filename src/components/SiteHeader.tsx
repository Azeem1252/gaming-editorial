import Link from "next/link";
import { Menu, Moon, Search } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/essays", label: "News" },
  { href: "/reviews", label: "Reviews" },
  { href: "/frames", label: "Guides" },
  { href: "/esports", label: "Esports" },
  { href: "/hardware", label: "Hardware" },
  { href: "/games", label: "Games" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="brand" aria-label="GameSphere home">
          Game<span className="accent">Sphere</span>
        </Link>

        <nav className="site-nav" aria-label="Sections">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link${i === 0 ? " is-active" : ""}`}
            >
              {l.label}
              <span className="nav-underline" aria-hidden="true" />
            </Link>
        ))}
        </nav>

        <div className="header-tools">
          <label className="search-box">
            <Search size={15} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search games, articles, guides…"
              aria-label="Search"
            />
          </label>
          <button className="icon-btn" type="button" aria-label="Toggle dark mode">
            <Moon size={17} />
          </button>
          <button className="icon-btn" type="button" aria-label="Open menu">
            <Menu size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
