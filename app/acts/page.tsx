import fs from "fs";
import path from "path";
import Image from "next/image";
import { createPublicClient } from "@/lib/supabase";
import ActFilter from "@/components/ActFilter";

export const revalidate = 300;

export const metadata = {
  title: "Acts boeken | Bryan de Zwart Bookings",
  description: "Bekijk alle dj's, artiesten en bands. Zoek op genre, tijdperk of type act en vraag vrijblijvend de beschikbaarheid op.",
};

function sfeerfoto() {
  try {
    const f = fs.readdirSync(path.join(process.cwd(), "public/sfeer"))
      .filter((n) => /\.(jpe?g|png|webp|avif)$/i.test(n)).sort();
    return f[f.length - 1] ?? null;
  } catch {
    return null;
  }
}

export default async function ActsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const foto = sfeerfoto();

  const supabase = createPublicClient();
  const { data: acts } = await supabase
    .from("bdzbookings_acts")
    .select("slug, name, type, genres, tijdperken")
    .eq("publiek_zichtbaar", true)
    .order("name");

  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[46vh] items-center justify-center overflow-hidden px-6 pb-28 pt-20">
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
