import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import TypeTekst from "@/components/TypeTekst";
import ActCarrousel from "@/components/ActCarrousel";
import { createPublicClient } from "@/lib/supabase";

function sfeerfotos() {
  try {
    return fs.readdirSync(path.join(process.cwd(), "public/sfeer"))
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort();
  } catch {
    return [];
  }
}

export const revalidate = 300;

export default async function Home() {
  const fotos = sfeerfotos();

  const supabase = createPublicClient();
  const { data: acts } = await supabase
    .from("bdzbookings_acts_publiek")
    .select("slug, name, type, genres, kaart_foto, foto_url")
    .order("name");

  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pb-24 pt-40">
        {fotos.length > 0 && <HeroSlider fotos={fotos.filter((f) => f !== "BDZBooking_07.jpg")} />}

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-oranje">E&eacute;n telefoontje, en het is geregeld</p>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-7xl">
            <span className="sr-only">Dj, artiest of band boeken voor jouw bruiloft, bedrijfsfeest of dorpsfeest in Noord-Brabant en Gelderland</span>
            <span aria-hidden="true">De juiste act voor<br /><TypeTekst /></span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-balance text-tekst/80">Dj&apos;s, artiesten en bands voor bruiloften, bedrijfsfeesten en dorpsfeesten. Ik regel het van eerste telefoontje tot laatste nummer.</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/acts" className="rounded-full bg-oranje px-7 py-3 font-medium text-zwart transition hover:opacity-90">Bekijk alle acts</Link>
            <Link href="/contact" className="rounded-full border border-tekst/30 px-7 py-3 font-medium backdrop-blur-sm transition hover:border-tekst">Vraag vrijblijvend aan</Link>
          </div>
        </div>
      </section>

      <ActCarrousel acts={acts ?? []} />

      <section className="relative overflow-hidden px-6 py-32">
        <Image src="/sfeer/BDZBooking_07.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-zwart/80" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-tekst/90 sm:text-xl">Bryan de Zwart Bookings is het boekingsbureau van Bryan de Zwart uit Cuijk. Als artiestenbureau voor Noord-Brabant en Gelderland regel ik dj&apos;s, artiesten en bands voor bruiloften, bedrijfsfeesten, dorpsfeesten en tentfeesten. Zelf al dj sinds mijn vijftiende, dus ik weet wat een avond nodig heeft: ik denk mee, adviseer eerlijk en zoek de act die bij jouw publiek past. Korte lijnen, persoonlijk contact en op de avond zelf gewoon bereikbaar.</p>
          <Link href="/contact" className="mt-10 inline-block rounded-full bg-oranje px-8 py-3.5 font-medium text-zwart transition hover:opacity-90">Neem contact met me op</Link>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            { t: "Dj's", d: "Van feest en allround tot dance en hard", href: "/acts?type=dj" },
            { t: "Artiesten", d: "Zangers, zangeressen en volksmuziek", href: "/acts?type=artiest" },
            { t: "Bands", d: "Coverbands en live muziek voor elk publiek", href: "/acts?type=band" },
          ].map((k) => (
            <Link key={k.t} href={k.href} className="rounded-2xl border border-rand bg-kaart p-7 transition hover:border-oranje/60">
              <h2 className="text-xl font-medium">{k.t}</h2>
              <p className="mt-2 text-sm text-dim">{k.d}</p>
              <p className="mt-6 text-sm text-oranje">Bekijk het aanbod &rarr;</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
