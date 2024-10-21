import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { ScrollObserver } from "@/components/scroll-observer";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body
        data-scroll-direction="false"
        className="group min-h-screen antialiased"
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex w-full flex-col">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
            <Toaster />
            <ScrollObserver />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
