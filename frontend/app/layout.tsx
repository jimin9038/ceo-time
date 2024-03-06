import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Noto_Sans_KR({subsets:[]});

export const metadata: Metadata = {
  title: "CEO TIME - The Magazine for Leaders",
  description: "CEO TIME is a magazine for leaders. We cover the latest news, trends, and insights from the world of business and leadership.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
