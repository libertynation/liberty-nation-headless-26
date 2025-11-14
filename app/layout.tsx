import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Liberty Nation - Free Thinking. Free Speech.",
  description: "Independent news and commentary for the liberty-minded",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="antialiased overflow-x-hidden">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
