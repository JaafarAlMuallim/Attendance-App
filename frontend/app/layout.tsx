// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/toaster";
import { LangProvider } from "@/store/lang-store";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import Header from "./components/Header/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attendence System",
  description: "Attend Your Students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LangProvider>
        <AuthProvider>
          <body className={`${inter.className} bg-gray-200 text-black`}>
            <Header />
            <main>{children}</main>
            <Toaster />
          </body>
        </AuthProvider>
      </LangProvider>
    </html>
  );
}
