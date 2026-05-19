import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { BootLoader } from "@/components/BootLoader";
import { Atmosphere } from "@/components/Atmosphere";
import { applyReveal } from "@/lib/reveal";

function NotFoundComponent() {
  return (
    <div className="page">
      <div className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
        <h1 className="display h1" style={{ color: "var(--green)" }}>404</h1>
        <p className="label" style={{ marginTop: 16 }}>PAGE NOT FOUND</p>
        <div style={{ marginTop: 32 }}>
          <Link to="/" className="btn">Return Home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="page">
      <div className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
        <h1 className="display h2">SOMETHING BROKE.</h1>
        <p style={{ color: "var(--muted)", marginTop: 16 }}>{error.message}</p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn" onClick={() => { router.invalidate(); reset(); }}>Retry</button>
          <a href="/" className="btn btn--ghost">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OpenBox — Where Builders Meet" },
      { name: "description", content: "A global community for developers, engineers, and builders in tech." },
      { property: "og:title", content: "OpenBox — Where Builders Meet" },
      { property: "og:description", content: "A global community for developers, engineers, and builders in tech." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('ob-theme') || 'black';
                  const allowed = ['black', 'deep-blue', 'violet', 'slate', 'teal'];
                  const theme = allowed.includes(saved) ? saved : 'black';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouter().state.location.pathname;
  useEffect(() => {
    applyReveal();
    const t1 = setTimeout(applyReveal, 80);
    const t2 = setTimeout(applyReveal, 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [path]);
  return (
    <QueryClientProvider client={queryClient}>
      <Atmosphere />
      <Cursor />
      <BootLoader />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
