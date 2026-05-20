export function seo({
  title,
  description,
  keywords,
  image,
}: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
} = {}) {
  const defaultTitle = "OpenBox Community | Where Developers & Builders Meet";
  const defaultDesc =
    "Join the OpenBox Community, a dedicated space for developers, software engineers, and builders in tech to collaborate, share projects, and find career opportunities.";
  const defaultKeywords =
    "OpenBox community, developer community, tech community, software engineers, builders, coding, programming, OpenBox, developer recruitment, tech jobs";

  const metaTags = [
    { title: title ? `${title} | OpenBox Community` : defaultTitle },
    { name: "description", content: description || defaultDesc },
    { name: "keywords", content: keywords || defaultKeywords },
    { property: "og:title", content: title || defaultTitle },
    { property: "og:description", content: description || defaultDesc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.openboxcomm.in" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title || defaultTitle },
    { name: "twitter:description", content: description || defaultDesc },
  ];

  if (image) {
    metaTags.push({ property: "og:image", content: image });
    metaTags.push({ name: "twitter:image", content: image });
  }

  return metaTags;
}
