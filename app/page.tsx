import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import TypeTekst from "@/components/TypeTekst";

function sfeerfotos() {
  try {
    return fs.readdirSync(path.join(process.cwd(), "public/sfeer"))
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort();
  } catch {
    return [];
  }
}

export default function Home() {
  const fotos = sfeerfotos();

  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-24">
        {fotos.length > 0 && <HeroSlider fotos={fotos} />}

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-oranje">E&eacute;n telefoontje, en het is geregeld</p>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-7xl">De juiste act voor<br /><TypeTekst /></h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-balance text-tekst/80">Dj&apos;s, artiesten en bands voor bruiloften, bedrijfsfeesten en dorpsfeesten. Ik regel het van eerste telefoontje tot laatste nummer.</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/acts" className="rounded-full bg-oranje px-7 py-3 font-medium text-zwart transition hover:opacity-90">Bekijk alle acts</Link>
            <Link href="/contact" className="rounded-full border border-tekst/30 px-7 py-3 font-medium backdrop-blur-sm transition hover:border-tekst">Vraag vrijblijvend aan</Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-rand"><Image src="/bryan.jpg" alt="Bryan de Zwart" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></div>

          <div>
            <p className="text-sm uppercase tracking-widest text-oranje">Persoonlijk geregeld</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Je hebt mij aan de lijn</h2>
            <p className="mt-5 text-lg leading-relaxed text-dim">Al sinds mijn vijftiende sta ik achter de draaitafel. Ik weet wat een avond nodig heeft en wie er past bij jouw publiek. Geen callcenter, geen tussenpersonen &mdash; ik regel het zelf, en op de avond zelf ben ik ook bereikbaar.</p>
            <Link href="/over" className="mt-7 inline-block text-oranje transition hover:opacity-80">Lees mijn verhaal &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
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
