import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/components/SEO";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: seo({
      title: "About",
      description: "Who we are and what OpenBox is building toward.",
    }),
  }),
  component: About,
});

const team = [
  { name: "Owner", role: "Founder" },
  { name: "Admins", role: "Super Moderators" },
  { name: "Community Managers", role: "Moderators" },
  { name: "Bots", role: "Server Helper" },
];

const values = [
  { num: "01", title: "Open", desc: "Public by default. Conversations, decisions, and code." },
  { num: "02", title: "Builder-first", desc: "If you're shipping, you belong here. Tools over titles." },
  { num: "03", title: "No gatekeeping", desc: "Beginners welcome. Questions welcome. Bad code welcome." },
  { num: "04", title: "Community-driven", desc: "Owned by the people who show up. Not a brand." },
];

function About() {
  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__crumb fade-up">// ABOUT</div>
          <h1 className="display h1 page-header__title fade-up fade-up--1">A SPACE<br />FOR BUILDERS.</h1>
          <p className="page-header__sub fade-up fade-up--2">
            OpenBox is a community for developers, engineers, and creators in tech.
            We're building the place we always wanted to find — open, raw, technical, and built around shipping work.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="section__num">// 01 — VISION</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>WHAT WE'RE BUILDING.</h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <p style={{ fontSize: 16, color: "var(--text)" }}>
              A dedicated space for builders, makers, and curious humans — without the noise of generic dev forums or the gatekeeping of closed networks.
              Channels for learning, shipping, hiring, and meeting other people who create.
            </p>
            <p style={{ fontSize: 16, color: "var(--muted)" }}>
              Most communities optimize for engagement metrics. We optimize for real connections between people making things.
              Whether you shipped something, learned something new, found collaborators, or found a job through someone you wouldn't have met otherwise.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="section__num">// 02 — WHO BELONGS HERE</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>WHO IS OPENBOX FOR.</h2>
            </div>
          </div>
          <div className="values">
            <div className="value">
              <h3 className="value__title">Developers</h3>
              <p className="value__desc">Frontend, backend, full-stack — anyone who writes code and likes shipping.</p>
            </div>
            <div className="value">
              <h3 className="value__title">Indie Hackers</h3>
              <p className="value__desc">Solo founders building products that solve real problems.</p>
            </div>
            <div className="value">
              <h3 className="value__title">Makers</h3>
              <p className="value__desc">Designers, no-code builders, weekend tinkerers — if you create, you belong.</p>
            </div>
            <div className="value">
              <h3 className="value__title">Students</h3>
              <p className="value__desc">Learning to code? You'll find mentors and project partners here.</p>
            </div>
            <div className="value">
              <h3 className="value__title">Open-Source Contributors</h3>
              <p className="value__desc">Maintainers and contributors looking for collaborators and feedback.</p>
            </div>
            <div className="value">
              <h3 className="value__title">Curious Humans</h3>
              <p className="value__desc">You don't need to be technical. You just need to be excited.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="section__num">// 03 — VALUES</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>HOW WE OPERATE.</h2>
            </div>
          </div>
          <div className="values">
            {values.map((v) => (
              <div key={v.num} className="value">
                <div className="value__num">{v.num}</div>
                <h3 className="value__title">{v.title}</h3>
                <p className="value__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="section__num">// 04 — TEAM</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>CORE TEAM.</h2>
            </div>
          </div>
          <div className="team">
            {team.map((t) => (
              <div key={t.name} className="team__card">
                {/* <div className="team__avatar"> {t.avathar}</div> */}
                <div className="team__name">{t.name}</div>
                <div className="team__role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <div className="section__num">// 05 — ORIGIN</div>
              <h2 className="display h2" style={{ marginTop: 12 }}>HOW IT STARTED.</h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <p style={{ fontSize: 16, color: "var(--text)" }}>
              OpenBox started in a tiny Discord in 2024. Two friends wanted a place to share their weekend projects — no algorithm, no metrics, just real makers helping real makers.
            </p>
            <p style={{ fontSize: 16, color: "var(--muted)" }}>
              Word spread. Today it's a growing community of developers, makers, and builders — all united by the belief that shipping, learning, and creating together beats doing it alone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
