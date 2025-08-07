import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dream Properties | Premium Real Estate & Airbnb Management",
  description: "Transform your real estate investments with Dream Properties. Expert property acquisition, Airbnb setup, guest management, and maintenance services in Florida.",
  keywords: "Florida real estate, Airbnb management, property investment, short-term rentals, property acquisition, guest management, Dream Properties",
  authors: [{ name: "Dream Properties" }],
  viewport: "width=device-width, initial-scale=1",
  metadataBase: new URL("https://getdreamproperties.com"),
  openGraph: {
    title: "Dream Properties | Premium Real Estate & Airbnb Management",
    description: "Transform your real estate investments with expert property acquisition, Airbnb management, and comprehensive rental services.",
    url: "https://getdreamproperties.com",
    siteName: "Dream Properties",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dream Properties - Premium Real Estate & Airbnb Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Properties | Premium Real Estate & Airbnb Management",
    description: "Transform your real estate investments with expert property acquisition, Airbnb management, and comprehensive rental services.",
    images: ["/og-image.jpg"],
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

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
