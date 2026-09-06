import Image from "next/image";
import { sfeerfotos } from "@/lib/sfeer";
import { createPublicClient } from "@/lib/supabase";
import ActFilter from "@/components/ActFilter";

export const revalidate = 300;

export const metadata = {
  title: "Acts boeken | Bryan de Zwart Bookings",
  description: "Bekijk alle dj's, artiesten en bands. Zoek op genre, tijdperk of type act en vraag vrijblijvend de beschikbaarheid op.",
};

export default async function ActsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const foto = sfeerfotos[sfeerfotos.length - 1] ?? null;

  const supabase = createPublicClient();
  const { data: acts } = await supabase
    .from("bdzbookings_acts_publiek")
    .select("slug, name, type, genres, tijdperken, kaart_foto, foto_url, specialiteit, prijs_vanaf")
    .order("name");

  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[62vh] items-center justify-center overflow-hidden px-6 pb-24 pt-40">
        {foto && <Image src={`/sfeer/${foto}`} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-zwart/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-zwart/60 via-transparent to-zwart" />
        <div className="relative text-center">
          <h1 className="opdoemen text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-6xl">Artiesten, dj&apos;s en bands</h1>
          <p className="omhoog mt-4 text-lg font-semibold text-tekst drop-shadow sm:text-xl">Vind wie er past bij jouw feest</p>
        </div>
      </section>

      <ActFilter acts={acts ?? []} start={type} />
    </main>
  );
}
