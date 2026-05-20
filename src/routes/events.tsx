import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { seo } from "@/components/SEO";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: seo({
      title: "Events",
      description: "Upcoming and past community events: hackathons, workshops, competitions, seminars.",
    }),
  }),
  component: Events,
});

const FILTERS = ["All", "Hackathon", "Workshop", "Competition", "Seminar"] as const;
type Filter = typeof FILTERS[number];

const EVENTS: { name: string; date: string; time: string; location: string; type: Exclude<Filter, "All">; desc: string; details: string; capacity: number; link: string }[] = [
  // { 
  //   name: "Build Night #01", 
  //   date: "2026-06-14", 
  //   time: "7:00 PM - 10:00 PM UTC",
  //   location: "Online (Discord + Stream)",
  //   type: "Workshop", 
  //   desc: "Live build session — ship a small project end-to-end in 3 hours.",
  //   details: "Join us for an interactive 3-hour live build session where you'll ship a complete small project from idea to deployment. We'll have mentors available on Discord to help you along the way. Beginner-friendly. No experience necessary.",
  //   capacity: 200,
  //   link: "https://discord.gg/openbox",
  // },
  // { 
  //   name: "OpenBox Hack", 
  //   date: "2026-07-20", 
  //   time: "Fri 6 PM - Sun 6 PM UTC",
  //   location: "Online + IRL (TBD)",
  //   type: "Hackathon", 
  //   desc: "48 hours. Open theme. Solo or teams. Real prizes.",
  //   details: "A 48-hour hackathon with no restrictions on theme or tech stack. Build solo or with a team. Prizes for best project, most creative, and best use of APIs. Pizza and energy drinks will be provided virtually. All skill levels welcome.",
  //   capacity: 500,
  //   link: "https://discord.gg/openbox",
  // },
  // { 
  //   name: "Algo Royale", 
  //   date: "2026-08-02", 
  //   time: "9:00 AM - 1:00 PM UTC",
  //   location: "Online (Virtual Arena)",
  //   type: "Competition", 
  //   desc: "Weekly competitive programming face-off. Bring your stack.",
  //   details: "Weekly competitive programming tournament. Solve 5 algorithmic problems in 4 hours. Compete against other builders. Leaderboard tracks monthly champions. Great for sharpening your skills and networking with other problem-solvers.",
  //   capacity: 150,
  //   link: "https://discord.gg/openbox",
  // },
  // { 
  //   name: "System Design AMA", 
  //   date: "2026-05-30", 
  //   time: "3:00 PM UTC",
  //   location: "Online (Discord Audio)",
  //   type: "Seminar", 
  //   desc: "Open Q&A with engineers on building at scale.",
  //   details: "Open Q&A session with senior engineers from major tech companies. Ask anything about system design, scaling, architecture decisions, and real-world engineering challenges. No question is too basic or too complex. Recording will be available for members.",
  //   capacity: 300,
  //   link: "https://discord.gg/openbox",
  // },
];

function Events() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[number] | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, boolean>>({});

  const filtered = filter === "All" ? EVENTS : EVENTS.filter((e) => e.type === filter);

  const handleRsvp = (eventName: string) => {
    setRsvpStatus((prev) => ({
      ...prev,
      [eventName]: !prev[eventName],
    }));
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selectedEvent]);

  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__crumb fade-up">// EVENTS</div>
          <h1 className="display h1 page-header__title fade-up fade-up--1">SHOW UP.<br/> Get inspried .</h1>
          <p className="page-header__sub fade-up fade-up--2">
            Hackathons, workshops, competitions, seminars. Online and IRL. All free for members.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter ${filter === f ? "filter--active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <h3>COMING SOON.</h3>
              <p>More events on the way. Stay tuned.</p>
            </div>
          ) : (
            <div className="card-grid">
              {filtered.map((e) => (
                <article key={e.name} className="card" style={{ cursor: "pointer" }} onClick={() => setSelectedEvent(e)}>
                  <div className="card__meta">
                    <span className="tag">{e.type}</span>
                    <span className="label">{e.date}</span>
                  </div>
                  <h3 className="card__title">{e.name}</h3>
                  <p className="card__desc">{e.desc}</p>
                  <div className="card__more">Details →</div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelectedEvent(null)}>✕</button>
            <div className="modal__content">
              <div className="modal__meta">
                <span className="tag">{selectedEvent.type}</span>
              </div>
              <h2 className="display h2" style={{ marginTop: 16, marginBottom: 24 }}>{selectedEvent.name}</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div className="label" style={{ marginBottom: 8 }}>Date & Time</div>
                  <p style={{ fontSize: 14, color: "var(--text)", margin: 0 }}>{selectedEvent.date}</p>
                  <p style={{ fontSize: 14, color: "var(--muted)", margin: "4px 0 0 0" }}>{selectedEvent.time}</p>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 8 }}>Location</div>
                  <p style={{ fontSize: 14, color: "var(--text)", margin: 0 }}>{selectedEvent.location}</p>
                  <p style={{ fontSize: 14, color: "var(--muted)", margin: "4px 0 0 0" }}>Capacity: {selectedEvent.capacity} attendees</p>
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <div className="label" style={{ marginBottom: 8 }}>About</div>
                <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7, margin: 0 }}>
                  {selectedEvent.details}
                </p>
              </div>

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn ${rsvpStatus[selectedEvent.name] ? "" : "btn--ghost"} btn--block`}
                  style={{ display: "inline-flex", width: "100%", textDecoration: "none" }}
                  onClick={() => handleRsvp(selectedEvent.name)}
                >
                  {rsvpStatus[selectedEvent.name] ? "✓ RSVP'D" : "RSVP →"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
