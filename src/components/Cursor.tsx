import { useEffect, useState } from "react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const themeColors: Record<string, string> = {
      black: "#6EE87A",
      "deep-blue": "#38BDF8",
      violet: "#C084FC",
      slate: "#38BDF8",
      teal: "#2DD4BF",
    };

    const updateCursor = () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") || "black";
      const greenColor = themeColors[activeTheme] || "#6EE87A";
      const svg = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'>
          <line x1='10' y1='4' x2='10' y2='16' stroke='${greenColor}' stroke-width='2' stroke-linecap='round'/>
          <line x1='4' y1='10' x2='16' y2='10' stroke='${greenColor}' stroke-width='2' stroke-linecap='round'/>
        </svg>`
      );
      document.documentElement.style.cursor = `url("data:image/svg+xml;utf8,${svg}") 10 10, auto`;
    };

    // Initial update
    updateCursor();

    // Observe changes to the data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          updateCursor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
      document.documentElement.style.cursor = "";
    };
  }, []);

  return null;
}