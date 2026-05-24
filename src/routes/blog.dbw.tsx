import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DBW_POSTS } from "@/data/dbw_blog";
import { seo } from "@/components/SEO";

export const Route = createFileRoute("/blog/dbw")({
  head: () => ({
    meta: seo({
      title: "Blog - DBW",
      description: "Day Before Weekend updates from OpenBox.",
    }),
  }),
  component: BlogDBW,
});

function BlogDBW() {
  return <DBWBlogContent />;
}

export function DBWBlogContent() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Sync state with URL query parameter
  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const postId = params.get("post");
      if (postId) {
        const found = DBW_POSTS.find((p) => p.id === postId);
        if (found) {
          setSelectedPost(found);
          window.scrollTo(0, 0);
          return;
        }
      }
      setSelectedPost(null);
    };

    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?post=${post.id}`;
      window.history.pushState({ post: post.id }, "", newUrl);
      window.scrollTo(0, 0);
    }
  };

  const closePost = () => {
    setSelectedPost(null);
    if (typeof window !== "undefined") {
      const newUrl = window.location.pathname;
      window.history.pushState({}, "", newUrl);
    }
  };

  const handleCopy = (code: string, idx: number) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  if (selectedPost) {
    return (
      <div className="page">
        <article className="container fade-up" style={{ maxWidth: "800px", paddingBottom: "100px" }}>
          {/* Post Header Control */}
          <div style={{ padding: "32px 0 24px" }}>
            <button
              onClick={closePost}
              className="btn btn--ghost"
              style={{
                fontSize: "11px",
                padding: "8px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              ← BACK TO DBW
            </button>
          </div>

          {/* Metadata Block */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
            <span className="tag">{selectedPost.tag}</span>
            <span className="label">{selectedPost.date}</span>
            <span className="label" style={{ color: "var(--muted)" }}>•</span>
            <span className="label" style={{ color: "var(--muted)" }}>{selectedPost.readingTime}</span>
          </div>

          {/* Big Title */}
          <h1 className="display h2" style={{ marginBottom: "32px", lineHeight: "1.1", textTransform: "uppercase" }}>
            {selectedPost.title}
          </h1>

          {/* Author info card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              padding: "16px 0",
              marginBottom: "40px"
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "var(--green)",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              {selectedPost.author.avatar}
            </div>
            <div>
              <div className="label" style={{ color: "var(--text)" }}>{selectedPost.author.name}</div>
              <div className="label" style={{ fontSize: "9px", color: "var(--muted)" }}>{selectedPost.author.role}</div>
            </div>
          </div>

          {/* Rich Content Renderer */}
          <div className="post-content" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {selectedPost.content.map((item, idx) => {
              switch (item.type) {
                case "paragraph":
                  return (
                    <p
                      key={idx}
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.75",
                        color: "var(--text)",
                        margin: 0
                      }}
                    >
                      {item.text}
                    </p>
                  );
                case "heading":
                  return (
                    <h3
                      key={idx}
                      className="display h3"
                      style={{
                        color: "var(--green)",
                        marginTop: "24px",
                        marginBottom: "8px",
                        textTransform: "uppercase"
                      }}
                    >
                      {item.text}
                    </h3>
                  );
                case "list":
                  return (
                    <ul
                      key={idx}
                      style={{
                        paddingLeft: "20px",
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                      }}
                    >
                      {item.items.map((li, lidx) => (
                        <li
                          key={lidx}
                          style={{
                            fontSize: "15px",
                            lineHeight: "1.6",
                            color: "var(--text)",
                            listStyleType: "square"
                          }}
                        >
                          {li}
                        </li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={idx}
                      style={{
                        borderLeft: "3px solid var(--green)",
                        background: "var(--bg-2)",
                        padding: "20px 24px",
                        margin: "12px 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                      }}
                    >
                      <p style={{ fontStyle: "italic", fontSize: "16px", margin: 0, color: "var(--text)" }}>
                        "{item.text}"
                      </p>
                      {item.author && (
                        <span className="label" style={{ fontSize: "10px", color: "var(--green)" }}>
                          — {item.author}
                        </span>
                      )}
                    </blockquote>
                  );
                case "code":
                  return (
                    <div
                      key={idx}
                      style={{
                        border: "1px solid var(--border)",
                        background: "#050805",
                        margin: "12px 0",
                        position: "relative"
                      }}
                    >
                      {/* Code Block Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "var(--bg-2)",
                          padding: "8px 16px",
                          borderBottom: "1px solid var(--border)"
                        }}
                      >
                        <span className="label" style={{ fontSize: "10px" }}>{item.language.toUpperCase()}</span>
                        <button
                          onClick={() => handleCopy(item.code, idx)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--green)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            cursor: "pointer",
                            padding: "4px 8px"
                          }}
                        >
                          {copiedIdx === idx ? "COPIED" : "COPY"}
                        </button>
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          padding: "20px",
                          overflowX: "auto",
                          fontFamily: "var(--font-mono)",
                          fontSize: "13px",
                          lineHeight: "1.5",
                          color: "#a4e8a9"
                        }}
                      >
                        <code>{item.code}</code>
                      </pre>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <div className="container">
          <div className="page-header__crumb fade-up">// DBW</div>
          <h1 className="display h1 page-header__title fade-up fade-up--1">DAY BEFORE<br/>WEEKEND.</h1>
          <p className="page-header__sub fade-up fade-up--2">
            Weekly updates from the OpenBox team. Every Friday.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="filters">
            <Link to="/blog" className={`filter`}>← BACK TO BLOG</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {DBW_POSTS.length === 0 ? (
            <div className="empty">
              <h3>NO POSTS YET.</h3>
              <p>Follow our socials for the first updates.</p>
            </div>
          ) : (
            <div className="card-grid">
              {DBW_POSTS.map((p) => (
                <article
                  key={p.id}
                  className="card"
                  onClick={() => openPost(p)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card__meta">
                    <span className="tag">{p.tag}</span>
                    <span className="label">{p.date}</span>
                  </div>
                  <h3 className="card__title">{p.title}</h3>
                  <p className="card__desc">{p.desc}</p>
                  <div className="card__more" style={{ marginTop: "auto", paddingTop: "16px" }}>
                    Read more →
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
