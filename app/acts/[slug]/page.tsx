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

function euro(n: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}


const TITELS: Record<string, string> = {
  dj: "Dj", artiest: "Artiest", band: "Band",
  special: "Act", act: "Act", overig: "Act",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: a } = await supabase
    .from("bdzbookings_acts_publiek")
    .select("name, type, genres, bio, omschrijving")
    .eq("slug", slug)
    .maybeSingle();

  if (!a) return { title: "Act niet gevonden | Bryan de Zwart Bookings" };

  const soort = TITELS[a.type] ?? "Act";
  const genres = a.genres?.length ? ` ${a.genres.slice(0, 2).join(" en ")}.` : "";
  const kort = (a.bio ?? a.omschrijving ?? "").split("\n")[0]?.slice(0, 130);

  return {
    title: `${a.name} boeken | ${soort} voor bruiloft, bedrijfsfeest of dorpsfeest`,
    description: kort || `Boek ${a.name} via Bryan de Zwart Bookings.${genres} Vrijblijvend de beschikbaarheid opvragen voor Noord-Brabant en Gelderland.`,
  };
}

export default async function ActPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: act } = await supabase
    .from("bdzbookings_acts_publiek")
    .select("slug, name, type, genres, tijdperken, bio, omschrijving, specialiteit, aantal_personen, setmaat, speelschema, foto_url, fotos, video_url, video_url_2, spotify_url, prijs_vanaf, prijs_notitie, publiek_min, publiek_max")
    .eq("slug", slug)
    .maybeSingle();

  if (!act) notFound();

  const videos = [youtubeId(act.video_url), youtubeId(act.video_url_2)].filter(Boolean) as string[];
  const sp = spotifyEmbed(act.spotify_url);
  const tekst = (act.bio ?? act.omschrijving ?? "").split("\n").filter(Boolean);

  const feiten: [string, string][] = [];
  if (act.aantal_personen) feiten.push(["Bezetting", `${act.aantal_personen} ${act.aantal_personen === 1 ? "persoon" : "personen"}`]);
  if (act.setmaat) feiten.push(["Setduur", act.setmaat]);
  if (act.speelschema) feiten.push(["Speelschema", act.speelschema]);
  if (act.specialiteit) feiten.push(["Specialiteit", act.specialiteit]);
  if (act.publiek_min && act.publiek_max) feiten.push(["Publiek", `${act.publiek_min} tot ${act.publiek_max} personen`]);

  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[52vh] items-end overflow-hidden px-6 pb-12 pt-40">
        {act.foto_url && <Image src={act.foto_url} alt={act.name} fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-zwart/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-zwart via-zwart/30 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-oranje">{LABELS[act.type] ?? act.type}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-6xl">{act.name}</h1>
          {act.genres && act.genres.length > 0 && <p className="mt-3 text-tekst/90 drop-shadow">{act.genres.join(" · ")}</p>}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            {tekst.length > 0 && (
              <>
                <h2 className="text-2xl font-bold">Biografie</h2>
                <div className="mt-5 space-y-4 leading-relaxed text-dim">
                  {tekst.map((p: string, i: number) => <p key={i}>{p}</p>)}
                </div>
              </>
            )}

            {act.tijdperken && act.tijdperken.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {act.tijdperken.map((t: string) => <span key={t} className="rounded-full border border-rand px-4 py-1.5 text-sm text-dim">{t}</span>)}
              </div>
            )}

            {act.fotos && act.fotos.length > 0 && (
              <section className="mt-14">
                <h2 className="text-2xl font-bold">Foto&apos;s</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {act.fotos.map((f: string) => <Image key={f} src={f} alt={act.name} width={600} height={800} className="aspect-[3/4] w-full rounded-2xl border border-rand object-cover" />)}
                </div>
              </section>
            )}

            {videos.length > 0 && (
              <section className="mt-14">
                <h2 className="text-2xl font-bold">Video&apos;s</h2>
                <div className={`mt-5 grid gap-4 ${videos.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {videos.map((v) => (
                    <div key={v} className="aspect-video overflow-hidden rounded-2xl border border-rand"><iframe src={`https://www.youtube.com/embed/${v}`} title={act.name} allowFullScreen className="h-full w-full" /></div>
                  ))}
                </div>
              </section>
            )}

            {sp && (
              <section className="mt-14">
                <h2 className="text-2xl font-bold">Spotify</h2>
                <div className="mt-5 overflow-hidden rounded-2xl"><iframe src={sp} height="352" loading="lazy" allow="encrypted-media" className="w-full" /></div>
              </section>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            {act.prijs_vanaf && (
              <div className="rounded-2xl border border-rand bg-kaart p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oranje">Prijsindicatie</p>
                <p className="mt-2 text-xl font-bold">Vanaf {euro(act.prijs_vanaf)}</p>
                <p className="mt-1 text-sm text-dim">{act.prijs_notitie ?? "Inclusief bemiddeling, excl. reiskosten"}</p>
              </div>
            )}

            <div className="rounded-2xl border border-rand bg-kaart p-5">
              <Link href={`/contact?act=${act.slug}`} className="block rounded-full bg-oranje py-3 text-center font-medium text-zwart transition hover:opacity-90">Beschikbaarheid opvragen</Link>
              <p className="mt-3 text-center text-xs text-dim">Vrijblijvend. Ik bel je persoonlijk terug.</p>
              <a href="tel:+31850606460" className="mt-4 block rounded-full border border-rand py-3 text-center text-sm transition hover:border-oranje">Of bel 085 060 6460</a>
            </div>

            {feiten.length > 0 && (
              <div className="rounded-2xl border border-rand bg-kaart p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-oranje">Goed om te weten</p>
                <dl className="mt-4 space-y-3 text-sm">
                  {feiten.map(([k, v]) => (
                    <div key={k}><dt className="text-dim">{k}</dt><dd className="mt-0.5 font-medium">{v}</dd></div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>

        <Link href="/acts" className="mt-16 inline-block text-sm text-dim transition hover:text-oranje">&larr; Alle acts</Link>
      </div>
    </main>
  );
}
