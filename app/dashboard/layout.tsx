import MobileNavbar from "@/components/mobile-navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
    title: "Balanticco",
    description: "Balanticco",
};

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.className} antialiased px-5 bg-custom-white min-h-screen relative`}>
            {children}
            <MobileNavbar />
        </div>
    );
}
