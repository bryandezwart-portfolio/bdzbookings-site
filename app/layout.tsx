import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bryan de Zwart Bookings | Dj's, artiesten en bands boeken",
  description: "Boek een dj, artiest of band voor je bruiloft, bedrijfsfeest of dorpsfeest. Persoonlijk geregeld, van het eerste telefoontje tot het laatste nummer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${poppins.className} antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
