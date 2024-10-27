import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
export const metadata: Metadata = {
  title: "Balanticco",
  description: "Balanticco",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased px-5 bg-custom-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
