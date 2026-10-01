import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_METADATA.url}/`, changeFrequency: "monthly", priority: 1 }];
}
