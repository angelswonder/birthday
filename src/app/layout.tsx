import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Birthday Garden for My Lover",
  description: "A dreamy memory lane with glowing cards, fairy kisses, and a cake waiting for your wish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${greatVibes.className}`}>
        {children}
      </body>
    </html>
  );
}