import { createFileRoute, Link } from "@tanstack/react-router";
import { Ticker } from "@/components/Ticker";
import { Typewriter } from "@/components/Typewriter";
import { seo } from "@/components/SEO";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo(),
  }),
  component: Home,
});

const features = [
  { num: "01", title: "Dev & Projects", desc: "Ship real work. Open source collaboration, build channels, code review, and project showcases." },
  { num: "02", title: "Knowledge Base", desc: "Curated resources, technical deep dives, and answers from people." },
  { num: "03", title: "Career", desc: "Job leads, referrals, Connections. The unfiltered version." },
  { num: "04", title: "Community Events", desc: "Hackathons, workshops, build nights, competitions. Online and IRL." },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero__meta">
            <span className="label fade-up">// OPENBOX / V1.0</span>
            <span className="label fade-up">STATUS: <span style={{ color: "var(--green)" }}>ONLINE</span></span>
          </div>
          <h1 className="display h1 hero__title">
            <Typewriter lines={["WHERE", "BUILDERS", "MEET."]} speed={55} />
          </h1>
          <p className="hero__sub hero__sub--delayed">
            A dedicated space for developers, engineers, and creators in tech. Open. Builder-first. No gatekeeping.
          </p>
          <div className="hero__ctas fade-up fade-up--3">
            <a className="btn" href="https://discord.gg/openbox" target="_blank" rel="noreferrer">
              Join Discord →
            </a>
            <Link className="btn btn--ghost" to="/tiers">View Tiers</Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="container" style={{ padding: 0 }}>
        <div className="stats">
          <div className="stat">
            <div className="stat__label">Community Type</div>
            <div className="stat__value">OPEN</div>
          </div>
          <div className="stat">
            <div className="stat__label">Domain</div>
            <div className="stat__value">TECH</div>
          </div>
          <div className="stat">
            <div className="stat__label">Status</div>
            <div className="stat__value">LIVE</div>
          </div>
          <div className="stat">
            <div className="stat__label">Access</div>
            <div className="stat__value">FREE</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="section__num">// 01 — WHAT'S INSIDE</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>MULTIPLE CHANNELS.<br />ONE COMMUNITY.</h2>
            </div>
            <p style={{ color: "var(--muted)", maxWidth: 360 }}>
              Built around how builders actually work — not how marketing departments think they do.
            </p>
          </div>

          <div className="features">
            {features.map((f) => (
              <div key={f.num} className="feature">
                <div className="feature__num">{f.num}</div>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="label">// JOIN US</div>
          <h2 className="display h2" style={{ marginTop: 16 }}>JOIN THE BUILDERS.</h2>
          <p>Free to join. No applications. Just show up and build.</p>
          <a className="btn" href="https://discord.gg/nE2pyegR5y" target="_blank" rel="noreferrer">
            discord.gg/openbox
          </a>
        </div>
      </section>
    </div>
  );
}
