import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bryan de Zwart Bookings | Dj's, artiesten en bands boeken",
  description: "Boek een dj, artiest of band voor je bruiloft, bedrijfsfeest of dorpsfeest. Persoonlijk geregeld, van eerste telefoontje tot laatste nummer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
