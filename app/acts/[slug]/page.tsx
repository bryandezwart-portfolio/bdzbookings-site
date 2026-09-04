import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPublicClient } from "@/lib/supabase";

export const revalidate = 300;

const LABELS: Record<string, string> = {
  dj: "Dj", artiest: "Artiest", band: "Band",
  special: "Act", act: "Act", overig: "Overig",
};

function youtubeId(url: string | null) {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function spotifyEmbed(url: string | null) {
  if (!url) return null;
  const m = url.match(/spotify\.com\/(playlist|artist|album|track)\/([A-Za-z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}` : null;
}

export default async function ActPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: act } = await supabase
    .from("bdzbookings_acts")
    .select("slug, name, type, genres, tijdperken, bio, omschrijving, specialiteit, aantal_personen, setmaat, speelschema, foto_url, fotos, video_url, spotify_url, publiek_min, publiek_max")
    .eq("slug", slug)
    .eq("publiek_zichtbaar", true)
    .maybeSingle();

  if (!act) notFound();

  const yt = youtubeId(act.video_url);
  const sp = spotifyEmbed(act.spotify_url);
  const feiten: [string, string][] = [];
  if (act.aantal_personen) feiten.push(["Bezetting", `${act.aantal_personen} personen`]);
  if (act.setmaat) feiten.push(["Setduur", act.setmaat]);
  if (act.speelschema) feiten.push(["Speelschema", act.speelschema]);
  if (act.specialiteit) feiten.push(["Specialiteit", act.specialiteit]);
  if (act.publiek_min && act.publiek_max) feiten.push(["Publiek", `${act.publiek_min} tot ${act.publiek_max} personen`]);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Link href="/acts" className="text-sm text-dim transition hover:text-tekst">&larr; Alle acts</Link>

        {act.foto_url && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-rand"><Image src={act.foto_url} alt={act.name} width={1600} height={900} className="h-auto w-full object-cover" /></div>
        )}

        <p className="mt-10 text-sm uppercase tracking-widest text-oranje">{LABELS[act.type] ?? act.type}</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{act.name}</h1>
        {act.genres?.length > 0 && <p className="mt-3 text-dim">{act.genres.join(" · ")}</p>}

        {(act.bio || act.omschrijving) && (
          <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-dim">
            {(act.bio ?? act.omschrijving).split("\n").filter(Boolean).map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>
        )}

        {feiten.length > 0 && (
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-rand bg-rand sm:grid-cols-2">
            {feiten.map(([k, v]) => (
              <div key={k} className="bg-kaart p-5"><p className="text-xs uppercase tracking-widest text-dim">{k}</p><p className="mt-1 font-medium">{v}</p></div>
            ))}
          </div>
        )}

        {act.tijdperken?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {act.tijdperken.map((t: string) => <span key={t} className="rounded-full border border-rand px-4 py-1.5 text-sm text-dim">{t}</span>)}
          </div>
        )}

        {yt && (
          <div className="mt-14 aspect-video overflow-hidden rounded-2xl border border-rand"><iframe src={`https://www.youtube.com/embed/${yt}`} title={act.name} allowFullScreen className="h-full w-full" /></div>
        )}

        {sp && (
          <div className="mt-8 overflow-hidden rounded-2xl"><iframe src={sp} height="352" loading="lazy" allow="encrypted-media" className="w-full" /></div>
        )}

        {act.fotos?.length > 0 && (
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {act.fotos.map((f: string) => <Image key={f} src={f} alt={act.name} width={800} height={600} className="h-full w-full rounded-2xl border border-rand object-cover" />)}
          </div>
        )}

        <div className="mt-16 rounded-3xl border border-rand bg-kaart p-8">
          <h2 className="text-2xl font-medium">{act.name} boeken?</h2>
          <p className="mt-2 text-dim">Vraag vrijblijvend de beschikbaarheid op. Ik neem persoonlijk contact met je op.</p>
          <Link href={`/contact?act=${act.slug}`} className="mt-6 inline-block rounded-full bg-oranje px-7 py-3 font-medium text-zwart transition hover:opacity-90">Aanvraag doen</Link>
        </div>
      </div>
    </main>
  );
}
