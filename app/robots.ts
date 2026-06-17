import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/admin", "/onboarding", "/login", "/register", "/forgot-password"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
