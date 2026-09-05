"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

type Act = {
  slug: string;
  name: string;
  type: string;
  genres: string[] | null;
  tijdperken: string[] | null;
  kaart_foto: string | null;
  foto_url: string | null;
  specialiteit: string | null;
  prijs_vanaf: number | null;
};

const LABELS: Record<string, string> = {
  dj: "Dj", artiest: "Artiest", band: "Band",
  special: "Act", act: "Act", overig: "Overig",
};

const KLEUREN: Record<string, string> = {
  dj: "from-violet-600 to-indigo-800",
  artiest: "from-rose-600 to-pink-800",
  band: "from-amber-600 to-orange-800",
  special: "from-emerald-600 to-teal-800",
  act: "from-emerald-600 to-teal-800",
  overig: "from-sky-600 to-blue-800",
};

const knoppen = [
  { waarde: "alle", label: "Alle" },
  { waarde: "dj", label: "Dj's" },
  { waarde: "artiest", label: "Artiesten" },
  { waarde: "band", label: "Bands" },
  { waarde: "act", label: "Acts" },
];

export default function ActFilter({ acts, start }: { acts: Act[]; start?: string }) {
  const [zoek, setZoek] = useState("");
  const [type, setType] = useState(start && start in LABELS ? start : "alle");

  const zichtbaar = useMemo(() => {
    const q = zoek.trim().toLowerCase();
    return acts.filter((a) => {
      const typeOk = type === "alle" || a.type === type || (type === "act" && a.type === "special");
      if (!typeOk) return false;
      if (!q) return true;
      const hooi = [a.name, a.specialiteit ?? "", ...(a.genres ?? []), ...(a.tijdperken ?? [])].join(" ").toLowerCase();
      return hooi.includes(q);
    });
  }, [acts, zoek, type]);

  return (
    <>
      <div className="relative z-10 -mt-1 border-y border-goud/30 bg-diep/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center">
          <label htmlFor="zoek" className="shrink-0 text-sm font-bold uppercase tracking-[0.2em] text-goud">Waar ben je naar op zoek?</label>
          <input id="zoek" value={zoek} onChange={(e) => setZoek(e.target.value)} placeholder="Naam, genre of tijdperk..." className="w-full rounded-full border border-rand bg-kaart px-6 py-3.5 text-tekst outline-none transition placeholder:text-dim focus:border-goud" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap gap-2">
          {knoppen.map((k) => (
            <button key={k.waarde} onClick={() => setType(k.waarde)} className={`rounded-full border px-5 py-2 text-sm transition ${type === k.waarde ? "border-oranje bg-oranje font-medium text-zwart" : "border-rand text-dim hover:border-oranje/60 hover:text-tekst"}`}>{k.label}</button>
          ))}
        </div>

        <p className="mt-6 text-sm text-dim">{zichtbaar.length} {zichtbaar.length === 1 ? "act" : "acts"} gevonden</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {zichtbaar.map((a) => {
            const foto = a.kaart_foto ?? a.foto_url;
            const kleur = KLEUREN[a.type] ?? KLEUREN.overig;
            return (
              <Link
                key={a.slug}
                href={`/acts/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-rand bg-kaart transition duration-300 hover:-translate-y-1 hover:border-oranje/70 hover:shadow-2xl hover:shadow-oranje/10"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  {foto ? (
                    <Image
                      src={foto}
                      alt={a.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${kleur}`}>
                      <span className="text-6xl font-extrabold text-white/25">{a.name.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-kaart to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-zwart/70 px-3 py-1 text-xs font-bold uppercase tracking-widest text-oranje backdrop-blur-sm">
                    {LABELS[a.type] ?? a.type}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 pt-3">
                  <h2 className="text-xl font-semibold transition group-hover:text-oranje">{a.name}</h2>
                  {a.specialiteit && <p className="mt-1 text-sm text-goud">{a.specialiteit}</p>}
                  {a.genres && a.genres.length > 0 && (
                    <p className="mt-2 text-sm text-dim">{a.genres.slice(0, 3).join(" · ")}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {a.prijs_vanaf ? (
                      <span className="text-sm text-dim">vanaf &euro;{a.prijs_vanaf}</span>
                    ) : (
                      <span />
                    )}
                    <span className="text-sm font-medium text-oranje opacity-0 transition group-hover:opacity-100">Bekijk &rarr;</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {zichtbaar.length === 0 && <p className="mt-10 text-dim">Geen acts gevonden. Probeer een andere zoekterm of bel me &mdash; ik denk graag mee.</p>}
      </div>
    </>
  );
}
