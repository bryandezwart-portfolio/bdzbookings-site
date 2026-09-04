"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Act = {
  slug: string;
  name: string;
  type: string;
  genres: string[] | null;
  tijdperken: string[] | null;
};

const LABELS: Record<string, string> = {
  dj: "Dj", artiest: "Artiest", band: "Band",
  special: "Act", act: "Act", overig: "Overig",
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
      const hooi = [a.name, ...(a.genres ?? []), ...(a.tijdperken ?? [])].join(" ").toLowerCase();
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {zichtbaar.map((a) => (
            <Link key={a.slug} href={`/acts/${a.slug}`} className="rounded-2xl border border-rand bg-kaart p-6 transition hover:border-oranje/60">
              <p className="text-xs font-bold uppercase tracking-widest text-oranje">{LABELS[a.type] ?? a.type}</p>
              <h2 className="mt-2 text-xl font-medium">{a.name}</h2>
              {a.genres && a.genres.length > 0 && <p className="mt-2 text-sm text-dim">{a.genres.join(" · ")}</p>}
            </Link>
          ))}
        </div>

        {zichtbaar.length === 0 && <p className="mt-10 text-dim">Geen acts gevonden. Probeer een andere zoekterm of bel me &mdash; ik denk graag mee.</p>}
      </div>
    </>
  );
}
