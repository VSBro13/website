import { createFileRoute } from "@tanstack/react-router";
import { tiers } from "@/data/socials";
import { CountUp } from "@/components/CountUp";
import { seo } from "@/components/SEO";

export const Route = createFileRoute("/tiers")({
  head: () => ({
    meta: seo({
      title: "Tiers",
      description: "Support OpenBox via Patreon. Four tiers, four levels of access.",
    }),
  }),
  component: Tiers,
});

function Tiers() {
  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__crumb fade-up">// TIERS</div>
          <h1 className="display h1 page-header__title fade-up fade-up--1">SUPPORT<br/>THE BUILD.</h1>
          <p className="page-header__sub fade-up fade-up--2">
            Free to join. Optional support via Patreon unlocks roles, channels, and early access.
            Pick a tier that makes sense — no upsell.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="tiers">
            {tiers.map((t) => (
              <div key={t.name} className={`tier ${"featured" in t && t.featured ? "tier--featured pulse-glow" : ""}`}>
                <div className="label">// {t.name.toUpperCase()}</div>
                <div className="tier__name">{t.name}</div>
                <div className="tier__price"><CountUp to={Number(t.price)} prefix="$" /></div>
                <div className="tier__per">/ month</div>
                <ul className="tier__perks">
                  {t.perks.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <a
                  className={`btn ${"featured" in t && t.featured ? "" : "btn--ghost"} btn--block`}
                  href="https://patreon.com/OpenBoxComm"
                  target="_blank"
                  rel="noreferrer"
                >
                  Become {t.name} →
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, padding: 32, border: "1px solid var(--border)", background: "var(--bg-2)" }}>
            <div className="label">// NOTE</div>
            <p style={{ marginTop: 12, color: "var(--text)" }}>
              All Patreon tiers are recurring monthly. Cancel anytime. Roles are auto-assigned via the Patreon bot once your Patreon is linked to your Discord account.
              See <a style={{ color: "var(--green)" }} href="/docs#support-tiers">/docs</a> for setup.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
