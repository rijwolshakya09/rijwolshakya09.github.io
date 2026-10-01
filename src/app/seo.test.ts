import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import sitemap from "./sitemap";
import robots from "./robots";
import { SITE_METADATA } from "@/lib/constants";

describe("domain + SEO", () => {
  it("uses rijwol.com.np everywhere", () => {
    expect(SITE_METADATA.url).toBe("https://rijwol.com.np");
    expect(readFileSync("public/CNAME", "utf8").trim()).toBe("rijwol.com.np");
  });

  it("lists the home page in the sitemap", () => {
    expect(sitemap().map((e) => e.url)).toEqual(["https://rijwol.com.np/"]);
  });

  it("allows crawling and points at the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://rijwol.com.np/sitemap.xml");
    expect(r.rules).toEqual({ userAgent: "*", allow: "/" });
  });
});
