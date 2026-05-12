import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — OpenBox" },
      { name: "description", content: "How to join, how member tiers work, bot commands, and FAQ." },
      { property: "og:title", content: "OpenBox Docs" },
      { property: "og:description", content: "How to join, how member tiers work, bot commands, and FAQ." },
    ],
  }),
  component: Docs,
});

const COMMANDS = [
  { cmd: "/sync", desc: "Sync your Patreon roles to Discord." },
  { cmd: "/profile", desc: "View your member profile, tier, and badges." },
  { cmd: "/projects", desc: "List your shipped projects in the showcase channel." },
  { cmd: "/events", desc: "Show upcoming events and RSVP." },
  { cmd: "/help", desc: "Show all available commands." },
];

const FAQ = [
  { q: "Is OpenBox free?", a: "Yes. Joining is free. Patreon support is optional and unlocks extra channels and badges." },
  { q: "Who is OpenBox for?", a: "Developers, engineers, designers, founders, students — anyone building in tech." },
  { q: "How do I get a tier role?", a: "Pledge on Patreon, link your Discord to Patreon, then run /sync in the server." },
  { q: "Can I host an event?", a: "Yes. Ping the core team in Discord with your idea." },
];

function Docs() {
  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__crumb fade-up">// DOCS</div>
          <h1 className="display h1 page-header__title fade-up fade-up--1">DOCS.</h1>
          <p className="page-header__sub fade-up fade-up--2">
            Everything you need to plug in and operate inside OpenBox.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="docs-layout">
            <aside className="docs-nav">
              <div className="label" style={{ marginBottom: 12 }}>// CONTENTS</div>
              <a href="#join">01 Join</a>
              <a href="#tiers">02 Tiers</a>
              <a href="#bot">03 Bot</a>
              <a href="#faq">04 FAQ</a>
            </aside>

            <div className="docs-content terminal-out">
              <section id="join">
                <h2>01 / How to join</h2>
                <p>OpenBox runs primarily on Discord. To join:</p>
                <ul>
                  <li>Open <code>discord.gg/openbox</code> in your browser.</li>
                  <li>Accept the invite and read the <code>#start-here</code> channel.</li>
                  <li>Pick your roles in <code>#roles</code> to unlock topic channels.</li>
                  <li>Introduce yourself in <code>#intros</code>. Optional but recommended.</li>
                </ul>
              </section>

              <section id="tiers">
                <h2>02 / Member tiers via Patreon</h2>
                <p>Tiers are managed through Patreon and synced automatically by the OpenBox bot.</p>
                <h3>Setup</h3>
                <ul>
                  <li>Pledge a tier at <code>patreon.com/openbox</code>.</li>
                  <li>In Patreon settings, link your Discord account.</li>
                  <li>Run <code>/sync</code> in any OpenBox channel — your role is assigned within seconds.</li>
                  <li>If your role doesn't appear, ping <code>@mods</code> in <code>#support</code>.</li>
                </ul>
                <h3>Tier perks</h3>
                <p>See the full breakdown on the <a href="/tiers" style={{ color: "var(--green)" }}>tiers page</a>.</p>
              </section>

              <section id="bot">
                <h2>03 / Bot commands</h2>
                <p>The OpenBox bot handles role sync, profiles, events, and showcases.</p>
                <ul className="command-list">
                  {COMMANDS.map((c) => (
                    <li key={c.cmd}>
                      <code style={{ color: "var(--green)", minWidth: 120 }}>{c.cmd}</code>
                      <span style={{ color: "var(--muted)" }}>{c.desc}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="faq">
                <h2>04 / FAQ</h2>
                {FAQ.map((f) => (
                  <div key={f.q} className="faq-item">
                    <h4>{f.q}</h4>
                    <p>{f.a}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
