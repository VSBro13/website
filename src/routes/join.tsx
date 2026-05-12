import { createFileRoute, Link } from "@tanstack/react-router";
import { socials, tiers } from "@/data/socials";
import { Ticker } from "@/components/Ticker";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join — OpenBox" },
      { name: "description", content: "Come build with us. Discord, socials, and Patreon support." },
      { property: "og:title", content: "Join OpenBox" },
      { property: "og:description", content: "Come build with us. Discord, socials, and Patreon support." },
    ],
  }),
  component: Join,
});

function Join() {
  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__crumb fade-up">// JOIN</div>
          <h1 className="display h1 page-header__title fade-up fade-up--1 glitch" data-text="COME BUILD WITH US.">COME BUILD<br/>WITH US.</h1>
          <p className="page-header__sub fade-up fade-up--2">
            Free to join. Show up. Build something. Meet people who do the same.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="discord-card">
            <div>
              <div className="label" style={{ color: "var(--green)" }}>// PRIMARY</div>
              <h2>DISCORD.</h2>
              <p>discord.gg/openbox — the main community space.</p>
            </div>
            <a className="btn" href="https://discord.gg/openbox" target="_blank" rel="noreferrer">
              Join Now →
            </a>
          </div>

          <div className="section__head">
            <div>
              <div className="section__num">// SOCIALS</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>EVERYWHERE ELSE.</h2>
            </div>
          </div>

          <div className="socials reveal-from-left">
            {socials.map((s) => (
              <a key={s.name} className="social" href={s.url} target="_blank" rel="noreferrer">
                <div className="label">// {s.name.toUpperCase()}</div>
                <div className="social__name">{s.name}</div>
                <div className="social__handle">{s.handle}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="section__num">// SUPPORT</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>SUPPORT VIA PATREON.</h2>
            </div>
            <Link to="/tiers" className="btn btn--ghost">Full Tier Details →</Link>
          </div>

          <div className="tiers">
            {tiers.map((t) => (
              <div key={t.name} className={`tier ${"featured" in t && t.featured ? "tier--featured" : ""}`}>
                <div className="label">// {t.name.toUpperCase()}</div>
                <div className="tier__name">{t.name}</div>
                <div className="tier__price">${t.price}</div>
                <div className="tier__per">/ month</div>
                <ul className="tier__perks">
                  {t.perks.slice(0, 3).map((p) => <li key={p}>{p}</li>)}
                </ul>
                <a className="btn btn--ghost btn--block" href="https://patreon.com/openbox" target="_blank" rel="noreferrer">
                  Pledge →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
