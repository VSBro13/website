// Global scroll-reveal + heading word-splitting + tag pulse.
// Idempotent — safe to call many times.

const REVEAL_SELECTORS = [
  ".feature",
  ".tier",
  ".card",
  ".value",
  ".team__card",
  ".social",
  ".stat",
  ".faq-item",
  ".command-list li",
  ".discord-card",
  ".tag",
  ".section__head",
  ".docs-content > section",
  ".docs-content > section > *",
  "footer.footer",
];

function markIndex(parent: Element, childSel: string) {
  const kids = parent.querySelectorAll<HTMLElement>(childSel);
  kids.forEach((el, i) => el.style.setProperty("--i", String(i)));
}

let io: IntersectionObserver | null = null;

function ensureObserver() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io!.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  return io;
}

function splitWords(el: HTMLElement) {
  if (el.dataset.wordsDone) return;
  // Skip if contains line breaks or other element children
  if (el.querySelector("br, span, a, code")) { el.dataset.wordsDone = "1"; return; }
  const text = el.textContent || "";
  if (!text.trim()) return;
  const words = text.split(/(\s+)/);
  el.textContent = "";
  words.forEach((w, i) => {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
    } else {
      const s = document.createElement("span");
      s.className = "word";
      s.style.setProperty("--wi", String(i));
      s.textContent = w;
      el.appendChild(s);
    }
  });
  el.classList.add("words-split");
  el.dataset.wordsDone = "1";
}

export function applyReveal() {
  if (typeof window === "undefined") return;
  const obs = ensureObserver();

  // Tag stagger indexes
  document.querySelectorAll<HTMLElement>(".features, .tiers, .card-grid, .values, .team, .socials, .stats")
    .forEach((p) => markIndex(p, ":scope > *"));

  // Docs sections internal stagger
  document.querySelectorAll<HTMLElement>(".docs-content > section").forEach((s) => {
    markIndex(s, ":scope > *");
  });

  // Reveal targets
  REVEAL_SELECTORS.forEach((sel) => {
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      if (!el.classList.contains("reveal-bound")) {
        el.classList.add("reveal-bound");
        obs.observe(el);
      }
    });
  });

  // Word-split headings (skip ones already animated by other means)
  document.querySelectorAll<HTMLElement>("h2.display, h3.display").forEach(splitWords);
  document.querySelectorAll<HTMLElement>(".words-split").forEach((el) => {
    if (!el.classList.contains("reveal-bound")) {
      el.classList.add("reveal-bound");
      obs.observe(el);
    }
  });
}
