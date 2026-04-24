import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://valetgoohio.com";
const shareImage = `${SITE_URL}/icon.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ValetGo | Premium Event Valet Service",
  description:
    "Luxury event valet service for weddings, private events, and premium guest arrivals across Columbus Ohio.",
  openGraph: {
    title: "ValetGo | Premium Event Valet Service",
    description:
      "Luxury event valet service for weddings, private events, and premium guest arrivals across Columbus Ohio.",
    url: "/",
    siteName: "ValetGo",
    type: "website",
    images: [
      {
        url: shareImage,
        width: 512,
        height: 512,
        alt: "ValetGo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ValetGo | Premium Event Valet Service",
    description:
      "Luxury event valet service for weddings, private events, and premium guest arrivals across Columbus Ohio.",
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#050505]`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f5f5f5]">
        {children}
      </body>
    </html>
  );
}
