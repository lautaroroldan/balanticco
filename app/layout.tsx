import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login - Balanticco",
  description: "Página de inicio de sesión",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} antialiased px-5 bg-custom-white min-h-screen relative`}
      >
        {children}
      </body>
    </html>
  );
}
