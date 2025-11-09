import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import ReduxLayout from "./ReduxLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sellaro",
  description: "Smart AI chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geist.variable}  antialiased`}>
        <ReduxLayout>{children}</ReduxLayout>
      </body>
    </html>
  );
}
