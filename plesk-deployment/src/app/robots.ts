import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/private/",
          "/temp/",
          "/draft/",
          "/unpublished/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/private/",
          "/temp/",
          "/draft/",
          "/unpublished/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/private/",
          "/temp/",
          "/draft/",
          "/unpublished/",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/private/",
          "/temp/",
          "/draft/",
          "/unpublished/",
        ],
        crawlDelay: 2,
      },
    ],
    sitemap: "https://softwarepros.org/sitemap.xml",
    host: "https://softwarepros.org",
  };
}
