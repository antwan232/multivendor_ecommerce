// Next.js
import type { Metadata } from "next";
import { DM_Sans, Public_Sans, Urbanist } from "next/font/google";

// Global css
import "./globals.css";

// NextThemes 
import { ThemeProvider } from "next-themes";

// Context
import ClerkProviderClient from "@/components/providers/ClerkProvider";
import ModalProvider from "@/context/modal/modal-provider";
import MotionProvider from "@/components/providers/MotionProvider";

// Sonner
import { Toaster } from "sonner";

const PublicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public_sans",
});

// Reference display fonts (measured from the Sellzy live site).
const UrbanistFont = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

const DMSansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

// Metadata
export const metadata: Metadata = {
  title: "Sellzy",
  description:
    "Welcome to Sellzy, your ultimate destination for seamless online shopping! Discover a vast array of products from trusted sellers, all in one convenient marketplace. With Sellzy, shopping is made easy, fast, and enjoyable. Find everything you need, from fashion and electronics to home essentials, and experience the joy of hassle-free online shopping. Start exploring today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${PublicSans.variable} ${UrbanistFont.variable} ${DMSansFont.variable}`}>
        <ClerkProviderClient>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <MotionProvider>
              <ModalProvider>{children}</ModalProvider>
            </MotionProvider>
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </ClerkProviderClient>
      </body>
    </html>
  );
}
