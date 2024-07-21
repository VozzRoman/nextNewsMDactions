import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TheHeader from "@/components/TheHeader";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News blog",
  description: "Ukraine news page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
			<TheHeader/>
			<Container>
			<div className="pt-[40px] pb-[40px]">
			{children}
			</div>
			</Container>
			</body>
    </html>
  );
}
