import type { Metadata } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";
import { Providers } from "@/components/common/Providers";
import "./globals.css";
import { SITE_METADATA } from "@/lib/constants";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "800"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.name}`,
  },
  description: SITE_METADATA.description,
  keywords: [
    "Flutter Developer",
    "Mobile Developer",
    "React Native",
    "Clean Architecture",
    "Riverpod",
    "GetX",
    "Firebase",
    "Nepal",
    "Kathmandu",
    "Cross-Platform",
  ],
  authors: [{ name: SITE_METADATA.name }],
  creator: SITE_METADATA.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_METADATA.url,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: SITE_METADATA.name,
    images: [{ url: SITE_METADATA.ogImage, width: 1200, height: 630, alt: SITE_METADATA.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${schibsted.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
