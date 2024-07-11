import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Work_Sans } from "next/font/google"; // here we can change to any font of our choice

const font = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Foundations Next Auth",
  description: "Customisable Next auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(cn("bg-[#f7f7f7f7]  box-border"), font.className)}>
        {children}
      </body>
    </html>
  );
}
