import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BootSequence from "@/components/BootSequence";
import FloatingNav from "@/components/FloatingNav";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Samridh Pandey | AI Operating System",
  description: "Portfolio of Samridh Pandey, an AI/ML Engineer building intelligent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-transparent text-primary selection:bg-accent selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <CommandPalette />
          <Background />
          <BootSequence />
          <FloatingNav />
          <main className="flex-grow pt-24 pb-20 relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
