import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B Varun Sai — GTA Portfolio",
  description:
    "AI & Data Engineering Developer Portfolio styled as a GTA V loading screen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="gta-scanlines">{children}</body>
    </html>
  );
}
