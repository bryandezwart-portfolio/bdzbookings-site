"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Act = { slug: string; name: string; type: string; genres: string[] | null; kaart_foto: string | null; foto_url: string | null };

const LABELS: Record<string, string> = {
  dj: "Dj", artiest: "Artiest", band: "Band",
  special: "Act", act: "Act", overig: "Overig",
};

export default function ActCarrousel({ acts }: { acts: Act[] }) {
  const baan = useRef<HTMLDivElement>(null);
  const [pauze, setPauze] = useState(false);

  function schuif(kant: number) {
    setPauze(true);
    baan.current?.scrollBy({ left: kant * 320, behavior: "smooth" });
    window.setTimeout(() => setPauze(false), 8000);
  }

  useEffect(() => {
    if (pauze || acts.length < 2) return;
    const klok = window.setInterval(() => {
      const el = baan.current;
      if (!el) return;
      const eind = el.scrollWidth - el.clientWidth - 8;
      if (el.scrollLeft >= eind) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: 320, behavior: "smooth" });
    }, 4000);
    return () => window.clearInterval(klok);
  }, [pauze, acts.length]);

  if (acts.length === 0) return null;

  return (
    <section className="py-24">
      <div className="mx-auto mb-10 flex max-w-6xl items-center justify-between gap-4 px-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-oranje">Uit mijn aanbod</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Dj&apos;s, artiesten en bands</h2>
        </div>
        <Link href="/acts" className="hidden shrink-0 rounded-full border border-rand px-6 py-3 text-sm transition hover:border-oranje sm:block">Bekijk alles</Link>
      </div>

      <div ref={baan} onMouseEnter={() => setPauze(true)} onMouseLeave={() => setPauze(false)} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="shrink-0 sm:w-[calc((100vw-72rem)/2)]" />
        {acts.map((a) => (
          <Link key={a.slug} href={`/acts/${a.slug}`} className="group relative aspect-[3/4] w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-rand bg-kaart sm:w-72">
            {(a.kaart_foto ?? a.foto_url) ? (
              <Image src={(a.kaart_foto ?? a.foto_url) as string} alt={a.name} fill sizes="288px" className="object-cover transition duration-700 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-kaart to-zwart" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zwart via-zwart/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-oranje">{LABELS[a.type] ?? a.type}</p>
              <p className="mt-1.5 text-lg font-semibold">{a.name}</p>
              {a.genres && a.genres.length > 0 && <p className="mt-1 truncate text-sm text-dim">{a.genres.join(" · ")}</p>}
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl justify-end gap-3 px-6">
        <button onClick={() => schuif(-1)} aria-label="Vorige" className="flex h-12 w-12 items-center justify-center rounded-full border border-rand text-dim transition hover:border-oranje hover:text-tekst">&larr;</button>
        <button onClick={() => schuif(1)} aria-label="Volgende" className="flex h-12 w-12 items-center justify-center rounded-full border border-rand text-dim transition hover:border-oranje hover:text-tekst">&rarr;</button>
      </div>
    </section>
  );
}
