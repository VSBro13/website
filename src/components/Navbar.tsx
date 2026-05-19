import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OpenBoxLogo } from "./SocialIcon";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/tiers", label: "Tiers" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/join", label: "Join" },
  { to: "/docs", label: "Docs" },
] as const;

const THEMES = [
  { id: "black", label: "Black", color: "#000000" },
  { id: "deep-blue", label: "Deep Blue", color: "#000814" },
  { id: "violet", label: "Violet", color: "#0A0014" },
  { id: "slate", label: "Slate", color: "#080C10" },
  { id: "teal", label: "Teal", color: "#000E0E" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setThemeState] = useState("black");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Restore theme from localStorage on client load
    const saved = localStorage.getItem("ob-theme") || "black";
    const allowed = ["black", "deep-blue", "violet", "slate", "teal"];
    setThemeState(allowed.includes(saved) ? saved : "black");

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeTheme = (newTheme: typeof THEMES[number]["id"]) => {
    setThemeState(newTheme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("ob-theme", newTheme);
    }
  };

  return (
    <nav className={`nav ${open ? "nav--open" : ""} ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <OpenBoxLogo size={28} />
          <span className="logo__text">OPENBOX</span>
        </Link>

        <div className="nav__links">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav__link"
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
            >
              <span className="nav__link-inner" data-text={l.label}>{l.label}</span>
            </Link>
          ))}

          {/* Desktop Theme Selector Dropdown */}
          <div className="theme-selector-desktop">
            <button 
              className="theme-btn" 
              onClick={() => setDropdownOpen(o => !o)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              aria-label="Select background theme"
            >
              <span className="theme-indicator" style={{ background: THEMES.find(t => t.id === theme)?.color || "#000" }} />
              <span className="theme-label">{THEMES.find(t => t.id === theme)?.label || "Black"}</span>
              <span className="theme-arrow">▼</span>
            </button>
            
            {dropdownOpen && (
              <div className="theme-dropdown">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    className={`theme-dropdown-item ${theme === t.id ? "active" : ""}`}
                    onClick={() => {
                      changeTheme(t.id);
                      setDropdownOpen(false);
                    }}
                  >
                    <span className="theme-indicator" style={{ background: t.color }} />
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            className="btn nav__cta"
            href="https://discord.gg/openbox"
            target="_blank"
            rel="noreferrer"
          >
            Join Discord
          </a>

          {/* Mobile Theme Selector Horizontal Row */}
          <div className="theme-selector-mobile">
            <div className="theme-selector-mobile-title">BG THEME</div>
            <div className="theme-selector-mobile-row">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  className={`theme-mobile-btn ${theme === t.id ? "active" : ""}`}
                  style={{ background: t.color }}
                  onClick={() => changeTheme(t.id)}
                  title={t.label}
                  aria-label={`Switch to ${t.label} theme`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          className="nav__burger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>
    </nav>
  );
}
