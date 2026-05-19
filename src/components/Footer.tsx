import { Link } from "@tanstack/react-router";
import { socials } from "@/data/socials";
import { SocialIcon, OpenBoxLogo } from "@/components/SocialIcon";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <Link to="/" className="logo">
              <OpenBoxLogo size={28} />
              <span className="logo__text">OPENBOX</span>
            </Link>
            <p style={{ color: "var(--muted)", marginTop: 16, fontSize: 13, maxWidth: 320 }}>
              A community for developers, engineers, and builders in tech. Built by builders, for builders.
            </p>
          </div>

          <div className="footer__col">
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/tiers">Tiers</Link>
            <Link to="/events">Events</Link>
          </div>

          <div className="footer__col">
            <h4>More</h4>
            <Link to="/blog">Blog</Link>
            <Link to="/join">Join</Link>
            <Link to="/docs">Docs</Link>
          </div>

          <div className="footer__col">
            <h4>Socials</h4>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}>
                  <SocialIcon name={s.name} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} OPENBOX</span>
          <span>BUILT BY MAHI</span>
        </div>
      </div>
    </footer>
  );
}
