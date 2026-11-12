import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#081325",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elec-quant.com"),
  title: {
    default: "ElecQuant | Tender-Ready Electrical Material Take-offs (AU & NZ)",
    template: "%s | ElecQuant",
  },
  description:
    "Accurate, tender-ready electrical take-offs for contractors and estimators from Perth to Auckland, built around AS/NZS 3000 standards. Fixed-price quotes in AUD & NZD.",
  keywords: [
    "ElecQuant",
    "elecquant",
    "elec-quant",
    "elec quant",
    "electrical take-offs",
    "electrical material take-off",
    "electrical estimating Australia",
    "electrical estimating New Zealand",
    "AS/NZS 3000 take-offs",
    "electrical tender takeoff",
    "bill of quantities electrical",
    "electrical estimating services",
    "commercial electrical takeoff",
    "residential electrical takeoff",
    "Perth Sydney Melbourne Brisbane Auckland electrical estimator",
  ],
  authors: [{ name: "ElecQuant", url: "https://www.elec-quant.com" }],
  creator: "ElecQuant",
  publisher: "ElecQuant",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    alternateLocale: ["en_NZ"],
    url: "https://www.elec-quant.com",
    title: "ElecQuant | Tender-Ready Electrical Material Take-offs (AU & NZ)",
    description:
      "Accurate, tender-ready electrical take-offs for contractors and estimators from Perth to Auckland, built around AS/NZS standards. Send drawings, get quantities.",
    siteName: "ElecQuant",
  },
  twitter: {
    card: "summary_large_image",
    title: "ElecQuant | Tender-Ready Electrical Material Take-offs (AU & NZ)",
    description:
      "Accurate, tender-ready electrical take-offs for contractors and estimators from Perth to Auckland, built around AS/NZS standards.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Construction & Electrical Estimating",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ElecQuant",
    alternateName: ["elecquant", "elec-quant", "Elec Quant", "ElecQuant Australia", "ElecQuant New Zealand"],
    url: "https://www.elec-quant.com",
    logo: "https://www.elec-quant.com/images/image2.jpg",
    image: "https://www.elec-quant.com/images/image2.jpg",
    description:
      "Accurate, tender-ready electrical take-offs for contractors and estimators from Perth to Auckland, built around AS/NZS 3000 standards.",
    email: "info@elec-quant.com",
    priceRange: "$$",
    areaServed: [
      {
        "@type": "Country",
        name: "Australia",
      },
      {
        "@type": "Country",
        name: "New Zealand",
      },
    ],
    serviceType: [
      "Electrical Material Take-offs",
      "Tender Estimating",
      "Electrical Quantity Surveying",
      "AS/NZS 3000 Scope Review",
    ],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
