import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shamil Rahman | Full-Stack Developer & AI/ML Engineer",
  description: "Premium frontend engineering with clean interfaces, performant delivery, and AI/ML integration. Specializing in Next.js, TypeScript, GraphQL, and scalable model-driven products.",
  keywords: [
    "Shamil Rahman",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Next.js",
    "TypeScript",
    "GraphQL",
    "Kerala",
    "India",
    "Machine Learning",
    "Deep Learning",
  ],
  authors: [{ name: "Shamil Rahman" }],
  openGraph: {
    title: "Shamil Rahman | Full-Stack Developer & AI/ML Engineer",
    description: "Premium frontend engineering with clean interfaces, performant delivery, and AI/ML integration.",
    url: "https://shamilrahman.dev",
    siteName: "Shamil Rahman Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamil Rahman | Full-Stack Developer & AI/ML Engineer",
    description: "Premium frontend engineering with clean interfaces, performant delivery, and AI/ML integration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-full font-sans antialiased selection:bg-accent selection:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
