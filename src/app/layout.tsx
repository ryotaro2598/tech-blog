import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Blog",
  description: "Qiita & MicroCMS Tech Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-card-border bg-card/80 backdrop-blur-md">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              Tech Blog
            </Link>
            <ul className="flex items-center gap-1">
              <li>
                <Link
                  href="/"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-bg hover:text-accent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-bg hover:text-accent"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/qiita"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-bg hover:text-accent"
                >
                  Qiita
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main */}
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-card-border bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-muted">
            Tech Blog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
