import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { seo } from "@/components/SEO";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: seo({
      title: "Documentation",
      description: "Your guide to navigating the OpenBox server structure, roles, rules, bot commands, and support options.",
    }),
  }),
  component: Docs,
});

const BOT_COMMANDS = [
  { cmd: "/social", channel: "Any channel", desc: "View official OpenBox social handles and links." },
  { cmd: "/events", channel: "Any channel", desc: "List all active, upcoming, and past community sessions." },
  { cmd: "/upgrade", channel: "Any channel", desc: "Check or upgrade your supporting status with Patreon." },
  { cmd: "/renew", channel: "Any channel", desc: "Re-verify or renew your supporting roles on the Discord server." },
  { cmd: "/doubt", channel: "Any channel", desc: "Ask the community-managed helper AI or file an assistance ticket." },
  { cmd: "/allcommand", channel: "Any channel", desc: "View the complete list of system utility & profile commands." },
];

const ROLES_LIST = [
  // STAFF
  { category: "STAFF", name: "OWNER", type: "Supreme Leader", unlock: "Full ownership access, server control, permissions management, and final authority over all operations.", acquisition: "Founding owner of the community." },
  { category: "STAFF", name: "Admin", type: "Executive Staff", unlock: "Advanced moderation powers, server management tools, role handling, and administrative controls.", acquisition: "Appointed by the Owner." },
  { category: "STAFF", name: "Community Managers", type: "Moderator", unlock: "Community moderation, engagement management, event coordination, and member support.", acquisition: "Appointed by Admin or Owner." },

  // SYSTEM
  { category: "SYSTEM", name: "MOD-BOT", type: "Automation System", unlock: "Automated moderation, logging, protection systems, and utility commands.", acquisition: "Integrated server bot role." },
  { category: "SYSTEM", name: "APP", type: "Application System", unlock: "Access to bot integrations, automated systems, and platform-linked services.", acquisition: "Assigned automatically to connected applications." },

  // DEFAULT
  { category: "DEFAULT", name: "Citizen.", type: "Verified Member", unlock: "Standard verified community access with participation in public discussions and activities.", acquisition: "Automatically assigned to all members on joining." },

  // LEVEL OF EXPERTISE
  { category: "LEVEL OF EXPERTISE", name: "Explorer, Beginner, Learner, Intermediate, Expert", type: "Level of Expertise Tag", unlock: "A self-selected tag that shows others where you currently stand in your domain. No channel locks or restrictions tied to it.", acquisition: "Via Channels and Roles at the top of the category list." },

  // ACADEMIC YEAR
  { category: "ACADEMIC YEAR", name: "1st year, 2nd year, 3rd year, 4th year, Alumni", type: "Academic Year Tag", unlock: "A self-selected tag that reflects your current academic standing. Helps members find and connect with peers at the same stage.", acquisition: "Via <code>#roles</code> channel." },

  // INTEREST / DOMAIN
  { category: "INTEREST / DOMAIN", name: "Dev & Mobile", type: "Technology Division", subRoles: ["Frontend / Backend / Fullstack", "App Dev / iOS / Android", "SWE / SDE"], unlock: "Developer discussions, coding projects, app development resources, and collaboration channels.", acquisition: "Self-selected interest role via <code>#roles</code> channel" },
  { category: "INTEREST / DOMAIN", name: "AI & Data", type: "Innovation Division", subRoles: ["AI", "Data Scientist / Analyst", "Big Data"], unlock: "Artificial intelligence, machine learning, analytics, and data science focused communities.", acquisition: "Self-selected interest role via <code>#roles</code> channel" },
  { category: "INTEREST / DOMAIN", name: "Cloud & Infra", type: "Infrastructure Division", subRoles: ["Cloud", "DevOps / Site Reliability", "Embedded Systems", "IoT"], unlock: "Cloud computing, DevOps, backend systems, and infrastructure discussions.", acquisition: "Self-selected interest role via <code>#roles</code> channel" },
  { category: "INTEREST / DOMAIN", name: "Security", type: "Cyber Defense Division", subRoles: ["Cyber Security"], unlock: "Cybersecurity resources, ethical hacking discussions, and digital safety communities.", acquisition: "Self-selected interest role via <code>#roles</code> channel" },
  { category: "INTEREST / DOMAIN", name: "Design & UX", type: "Creative Design Division", subRoles: ["Design / Graphics / UI / UX"], unlock: "UI/UX design discussions, branding resources, and creative collaboration spaces.", acquisition: "Self-selected interest role via <code>#roles</code> channel" },
  { category: "INTEREST / DOMAIN", name: "Creative & Marketing", type: "Media Division", subRoles: ["Marketing", "Social Media / Digital / Content", "SEO"], unlock: "Content creation, branding, social media, and marketing strategy communities.", acquisition: "Self-selected interest role via <code>#roles</code> channel" },
  { category: "INTEREST / DOMAIN", name: "Web3 & XR", type: "Future Tech Division", subRoles: ["Blockchain", "AR / VR / XR", "Game Dev / C# / Unity / Unreal"], unlock: "Blockchain, Web3, AR/VR, and emerging technology discussions.", acquisition: "Self-selected interest role via <code>#roles</code> channel." },
  
  // SUPPORTERS
  { category: "SUPPORTERS", name: "Server Booster, Kernel, Compiler, Relay, Funder", type: "Supporter Tier", unlock: "Tiered recognition for members who actively support the community. Higher tiers unlock exclusive spaces, visibility, and community privileges.", acquisition: "Assigned by Patreon Bot" },

  // CLUBS & ORGANIZATIONS
  { category: "CLUBS & ORGANIZATIONS", name: "Club", type: "Campus Organization", unlock: "Club networking, event collaboration, and student organization visibility.", acquisition: "Via onboarding form." },
  { category: "CLUBS & ORGANIZATIONS", name: "Company", type: "Industry Partner", unlock: "Industry collaboration access, hiring visibility, and partnership discussions.", acquisition: "Via onboarding form." },

  // PARTNERS
  { category: "PARTNERS", name: "Partner, Partner +, Partner ++", type: "Partner Tier", unlock: "Tiered access for verified partners. Higher tiers unlock greater visibility, collaboration privileges, and network integration.", acquisition: "Through filing the form in <code>#updrade</code> channel." },
  
  // NOTIFICATIONS
  { category: "NOTIFICATIONS", name: "Content Ping, Events in Server, Events in Offline, DNS, DBW, Poll", type: "Notification & Utility Roles", unlock: "Opt-in roles to receive specific pings and updates. Pick only what is relevant to you.", acquisition: "Via <code>#roles</code> channel." },
];

const FAQS_LIST = [
  { q: "Why was I muted/banned?", a: <>Mutes and bans are applied when community guidelines are breached. You will receive an automated direct message from the bot explaining the policy violated and the specific logs recorded.</> },
  // { q: "How do I appeal a mod action?", a: <>If you feel a decision was made in error, email <code style={{ color: "var(--green)" }}>appeals@openboxcomm.in</code> or use the anonymous ticket appeal form linked in your ban notice DM.</> },
  { q: "How do I change my server nickname?", a: <>Go to your server profile settings on Discord or use <code>/nick</code>. We highly encourage matching your nickname with your GitHub or Twitter builder handles so community members recognize your work!</> },
  { q: "Where do I post my project?", a: <>Use the <code>#show-and-tell</code> forum category! Create a new thread, add tags for your stack, write a summary, and drop the live URL or repository link.</> },
];

function Docs() {
  const [activeTab, setActiveTab] = useState("getting-started");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveTab(hash);
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__crumb fade-up">// DOCUMENTATION</div>
          <h1 className="display h1 page-header__title fade-up fade-up--1">SYSTEM DOCS.</h1>
          <p className="page-header__sub fade-up fade-up--2">
            Everything you need to navigate, configure, and contribute within OpenBox.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="docs-layout">
            {/* STICKY SIDEBAR */}
            <aside className="docs-nav">
              <div className="label" style={{ marginBottom: 12 }}>// CHAPTERS</div>
              <a href="#getting-started" className={activeTab === "getting-started" ? "active" : ""}>01 Getting Started</a>
              <a href="#server-guide" className={activeTab === "server-guide" ? "active" : ""}>02 Server Guide</a>
              <a href="#roles" className={activeTab === "roles" ? "active" : ""}>03 Roles</a>
              <a href="#rules" className={activeTab === "rules" ? "active" : ""}>04 Rules & Guidelines</a>
              <a href="#bot-commands" className={activeTab === "bot-commands" ? "active" : ""}>05 Bot Commands</a>
              <a href="#faqs" className={activeTab === "faqs" ? "active" : ""}>06 FAQs</a>
              <a href="#moderation" className={activeTab === "moderation" ? "active" : ""}>07 Moderation Policy</a>
              <a href="#contributing" className={activeTab === "contributing" ? "active" : ""}>08 Contributing</a>
              <a href="#events" className={activeTab === "events" ? "active" : ""}>09 Community Events</a>
              <a href="#support-tiers" className={activeTab === "support-tiers" ? "active" : ""}>10 Support & Patreon</a>
              {/* <a href="#runway" className={activeTab === "runway" ? "active" : ""}>11 Runway & Calendar</a> */}
            </aside>

            {/* MAIN READING CONTENT */}
            <div className="docs-content">
              {/* SECTION 1 */}
              <section id="getting-started">
                <h2>01 / Getting Started</h2>
                <h3>What is OpenBox?</h3>
                <p>
                  OpenBox is a collective of developers, engineers, and digital makers.
                  We build in public, we support open systems, and we collaborate software design.
                  We foster absolute technical excellence and deep, peer-to-peer building connections.
                </p>
                <h3>Who is it for?</h3>
                <p>
                  OpenBox is engineered specifically for active creators: code writers, hardware engineers, indie hackers,
                  students looking for mentorship, open-source maintainers, and exceptionally curious technical thinkers.
                  If you like writing code, shipping projects, and talking to others who do the same, you belong here.
                </p>
                <h3>How to Join</h3>
                <ol>
                  <li>Navigate to our community server invite: <code style={{ color: "var(--green)" }}>discord.gg/nE2pyegR5y</code>.</li>
                  <li>Set up an account and verify it using your email or phone number along with 2FA.</li>
                  <li>Access the <code>#start-here</code> channel to get started.</li>
                </ol>
                <div className="docs-alert">
                  <div className="docs-alert__title">Onboarding Tip</div>
                  <p>
                    Ensure your Discord connection settings have "Allow direct messages from server members" toggled on,
                    allowing our server bot to sync onboarding guides and verification tokens directly to your client inbox.
                  </p>
                </div>
                <h3>First Things to Do After Joining</h3>
                <ul>
                  <li>Head directly to the <code>#intros</code> channel and drop a brief overview of what you build, what stack you love, and what you're working on.</li>
                  <li>Link your Github or Linkedin account so builders on the server can quickly review your active repositories.</li>
                </ul>
                <h3>How to Pick Your Roles</h3>
                <p>
                  In the <code>Onboarding</code> panel, select custom visual roles corresponding to your specialty (Frontend, Backend, Devops, System Architect, UI/UX, or Indie Founder).
                  Selecting these opens specific server sub-categories dedicated to each field.
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="server-guide">
                <h2>02 / Server Guide</h2>
                <p>
                  The server is structured to be hyper-focused and free of clutter.
                  We utilize clear categories to separate deep work discussions, general chatter, and platform support logs.
                </p>
                <h3>Category Breakdown</h3>
               <ul>
  <li><strong>🔒 Mod Space:</strong> Staff-only category for moderation, internal coordination, and server management.</li>
  <li><strong>🦴 BackBone:</strong> A dedicated lounge for supporters who are backing the community.</li>
  <li><strong>👋 Welcome & Info:</strong> Start here. Server rules, announcements, role selection, and onboarding guides.</li>
  <li><strong>💬 Community Hub:</strong> General chat, introductions, open discussions, and community-wide conversations.</li>
  <li><strong>🎉 Hobbies-n-Fun:</strong> Off-topic and casual spaces. Memes, gaming, music, and everything non-tech.</li>
  <li><strong>⚙️ Dev & Projects:</strong> The core builder space. Share projects, collaborate, post code snippets, and get reviews.</li>
  <li><strong>📚 Knowledge Base:</strong> Curated resources, technical deep dives, tutorials, and community-sourced learning material.</li>
  <li><strong>💼 Career:</strong> Job leads, referrals, resume help, internship discussions, and industry connections.</li>
  <li><strong>🎪 Events:</strong> Hackathons, workshops, build nights, AMAs, and both online and offline community events.</li>
  <li><strong>📝 Feedback:</strong> Share suggestions, report issues, and help shape the direction of the community.</li>
</ul>
                <h3>Channel Types Explained</h3>
                <div className="docs-table-wrapper">
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>Channel Icon</th>
                        <th>Type</th>
                        <th>Functionality & Usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code># text</code></td>
                        <td>Standard Text Channel</td>
                        <td>Written conversations, sharing links, and code snippets.</td>
                      </tr>
                      <tr>
                        <td><code>📢 announcement</code></td>
                        <td>Announcement Channel</td>
                        <td>Broadcast messages from creators. Members can follow this channel to send updates to their own servers.</td>
                      </tr>
                      <tr>
                        <td><code>🔊 voice</code></td>
                        <td>Voice / Video Hub</td>
                        <td>Real-time screen-sharing, pair-programming, and audio syncs.</td>
                      </tr>
                      <tr>
                        <td><code>📌 forum</code></td>
                        <td>Forum Category</td>
                        <td>Structured thread creation for showing off projects, debugging queries, and sharing reviews.</td>
                      </tr>
                      <tr>
                        <td><code>🎙️ stage</code></td>
                        <td>Stage Channel</td>
                        <td>Live scheduled podcast presentations, project demos, and community panels.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3>How to Navigate the Server</h3>
                <p>
                  To keep your sidebar clean, use Discord's built-in <strong>"Hide Muted Channels"</strong> option.
                  Mute category groups you aren't active in, keeping your active dashboard highly focused on the exact subjects you are learning or building.
                </p>
              </section>

              {/* SECTION 3 */}
              <section id="roles">
                <h2>03 / Roles</h2>
                <p>
                  OpenBox uses a hierarchy system to recognize contributions, maintain community safety, and unlock access tiers.
                </p>
                <div className="docs-table-wrapper">
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>Role Name</th>
                        <th>Category</th>
                        <th>What It Unlocks</th>
                        <th>How to Acquire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ROLES_LIST.reduce((acc: React.ReactNode[], role, index) => {
                        const prevRole = index > 0 ? ROLES_LIST[index - 1] : null;
                        if (!prevRole || prevRole.category !== role.category) {
                          acc.push(
                            <tr key={`divider-${role.category}`} className="category-divider">
                              <td colSpan={4} style={{ background: "var(--background-secondary, #1a1a1a)", textAlign: "center", fontWeight: "bold", padding: "16px 0", letterSpacing: "1px", borderTop: "2px solid var(--border)" }}>
                                {role.category}
                              </td>
                            </tr>
                          );
                        }
                        acc.push(
                          <tr key={role.name}>
                            <td>
                              <strong>{role.name}</strong>
                              {role.subRoles && (
                                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                                  {role.subRoles.map(sub => (
                                    <span key={sub} className="tag" style={{ fontSize: 11, padding: "2px 8px", background: "transparent", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 4 }}>{sub}</span>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td><code>{role.type}</code></td>
                            <td dangerouslySetInnerHTML={{ __html: role.unlock }} />
                            <td dangerouslySetInnerHTML={{ __html: role.acquisition }} />
                          </tr>
                        );
                        return acc;
                      }, [])}
                    </tbody>
                  </table>
                </div>
                {/* <h3>Role Hierarchy</h3>
                <p>
                  Authority is structured bottom-up around builders: <strong>Member</strong> → <strong>Contributor</strong> → <strong>Moderator</strong> → <strong>Admin</strong>.
                  Admins manage architecture and systems, while active Contributors handle community codebases and lead server guides.
                </p> */}
              </section>

              {/* SECTION 4 */}
              <section id="rules">
                <h2>04 / Community Rules</h2>
                <p>
                  Our rules are strictly enforced to keep our spaces educational, productive, and comfortable for developers of all backgrounds.
                </p>
                <h3>What is Allowed & Encouraged</h3>
                <ul>
                  <li>Sharing raw, unedited work and seeking constructive criticism.</li>
                  <li>Helping others debug compiler issues, design problems, and architecture bottlenecks.</li>
                  <li>Discussing open-source paradigms, monetization patterns, and engineering ethics.</li>
                  <li>Fostering friendly banter and building positive code-creation partnerships.</li>
                </ul>
                <h3>What is NOT Allowed</h3>
                <ul>
                  <li><strong>Zero Tolerance for Toxicity:</strong> No personal attacks, harassment, sexism, racism, or discriminatory gatekeeping.</li>
                  <li><strong>No Spam/Shill:</strong> Do not DM-spam members to pitch projects, tokens, or products. Unsolicited cold pitches result in immediate bans.</li>
                  <li><strong>No Plagiarism:</strong> Give credit when sharing reference code or showcasing inspired designs.</li>
                  <li><strong>No NSFW Content:</strong> Keep all discussions and media posts clean and professional.</li>
                </ul>
                <h3>Consequences Breakdown</h3>
                <ol>
                  <li><strong>First Warning:</strong> Automated mod warning issued directly via DM.</li>
                  <li><strong>Second Warning:</strong> 24-hour mute restriction from all text and voice channels.</li>
                  <li><strong>Third Infraction:</strong> Permanent ban from the OpenBox community network.</li>
                </ol>
                <h3>How to Appeal a Moderation Action</h3>
                <p>
                  Appeal tickets are evaluated by our community administrators.
                  To appeal a permanent server ban, submit a formal appeal detailing the infraction context and system logs to{" "}
                  <code style={{ color: "var(--green)" }}>appeals@openboxcomm.in</code>.
                </p>
              </section>

              {/* SECTION 5 */}
              <section id="bot-commands">
                <h2>05 / Bot Commands</h2>
                <p>
                  The custom OpenBox utility bot handles server profiles, integration tickets, and automated operations.
                  Use these slash-commands anywhere, or target specific support channels when performing setups. More commands are in <code>#bot-commands</code>
                </p>
                <div className="command-grid">
                  {BOT_COMMANDS.map((cmd) => (
                    <div key={cmd.cmd} className="command-row">
                      <div className="command-info">
                        <span className="command-trigger">{cmd.cmd}</span>
                        <span className="command-desc">{cmd.desc}</span>
                      </div>
                      <span className="command-channel">{cmd.channel}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 6 */}
              <section id="faqs">
                <h2>06 / FAQs</h2>
                <div className="docs-faq">
                  {FAQS_LIST.map((faq) => (
                    <div key={faq.q} className="docs-faq-item">
                      <h4 className="docs-faq-question">{faq.q}</h4>
                      <p className="docs-faq-answer">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 7 */}
              <section id="moderation">
                <h2>07 / Moderation Policy</h2>
                <p>
                  We believe in clear, public-facing moderation policies.
                  Our moderation staff functions as facilitators of high-level discussion rather than arbitrary referees.
                </p>
                <h3>How Reports Are Handled</h3>
                <p>
                  When a report is logged via <code>/report</code>, it initiates a private administrative ticket.
                  Two separate moderators must review the incident logs, record the violation, and authorize the moderation response
                  to ensure unbiased actions.
                </p>
                <h3>What to Do If a Moderator is the Problem</h3>
                <p>
                  If you experience misconduct or unfair treatment from a moderator, do not engage in public disputes.
                  Submit a detailed report directly to the core owners via the secure email:{" "}
                  <code style={{ color: "var(--green)" }}>team@openboxcomm.in</code>.
                  All complaints are reviewed under strict confidentiality.
                </p>
                <h3>Why Can't I See Certain Channels?</h3>
                <p>
                  Some channels (such as developer-core, sponsor hubs, or staff testing) are role-locked.
                  Check your current status under your server profile page to ensure you have verified your onboarding tags
                  or synced your Patreon tiers.
                </p>
              </section>

              {/* SECTION 8 */}
              <section id="contributing">
                <h2>08 / Contributing to OpenBox</h2>
                <p>
                  OpenBox is shaped directly by the builders who make up its community. We welcome all open contributions.
                </p>
                <h3>How to Suggest Features or Channels</h3>
                <p>
                  Have an idea for a new programming language channel, a bot utility, or a structural upgrade?
                  Create a proposal thread in the <code>#suggestions</code> channel.
                  If a proposal garners enough community traction, we integrate it into our active roadmap.
                </p>
                <h3>Applying for Moderation or Contributor Roles</h3>
                <p>
                  Applications for Moderator and official Contributor roles open biannually.
                  Keep an eye on the <code>#announcements</code> channel for application links, or showcase your expertise by regularly
                  assisting others in developer channels to receive an automatic nomination!
                </p>
              </section>

              {/* SECTION 9 */}
              <section id="events">
                <h2>09 / Community Events</h2>
                <p>
                  OpenBox coordinates scheduled events to keep developers connected and motivated.
                </p>
                <h3>How Events Work & How to Participate</h3>
                <p>
                  We run virtual hackathons, scheduled pair-programming workshops, live project build challenges, and fireside chats.
                  View the active calendar using the <code>/events</code> command or check the built-in Events tab on your Discord sidebar.
                </p>
                <h3>Host Your Own Event</h3>
                <p>
                  If you would like to run a workshop, stream a project build, or host a live developer panel,
                  fill out the quick event proposal form in <code>#event-hosts</code>. Our staff will coordinate scheduling,
                  arrange stage setup, and set up automated reminder notifications for you!
                </p>
              </section>

              {/* SECTION 10 */}
              <section id="support-tiers">
                <h2>10 / Support Tiers & Patreon</h2>
                <p>
                  OpenBox is a self-sustaining entity funded solely by our community.
                  Your sponsorships allow us to maintain fast server hosting, build custom bots, and organize events.
                </p>
                <h3>Tier Benefits & Pricing</h3>
                <p>
                  To see a detailed breakdown of all available support tiers, pricing, and their corresponding perks, please visit our dedicated Tiers page.
                </p>
                <Link to="/tiers" className="btn btn--ghost" style={{ marginBottom: 32, display: "inline-flex" }}>View Support Tiers →</Link>
                <h3>How to Upgrade or Renew Your Tier</h3>
                <p>
                  Pledge at our Patreon page: <code style={{ color: "var(--green)" }}>patreon.com/OpenBoxComm</code>.
                  Once subscribed, link your Discord and Patreon profiles in Patreon settings.
                  For monthly renewals, the system syncs automatically; if you experience delays, simply run <code>/renew</code>
                  to refresh your credentials.
                </p>
                <h3>Booster Perks vs Patreon Perks</h3>
                <p>
                  Members who choose to boost the server using Discord Nitro receive a dedicated "Server Booster" role and custom emoji slots.
                  Patreon sponsors receive core structural perks, technical support tokens, beta-testing permissions, and priority tickets.
                  Both paths help fund our infrastructure!
                </p>
              </section>

              {/* SECTION 11 */}
              {/* <section id="runway">
                <h2>11 / Runway & Calendar</h2>
                <p>
                  Curious about what we are shipping next? Check out our official runway and community calendar to see upcoming features, milestones, and events.
                </p>
                <Link to="/runway" className="btn" style={{ marginTop: 16, display: "inline-flex" }}>View Runway & Calendar →</Link>
              </section> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
