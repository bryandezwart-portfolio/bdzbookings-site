import Link from "next/link";
import { createPublicClient } from "@/lib/supabase";

export const revalidate = 300;

const LABELS: Record<string, string> = {
  dj: "Dj",
  artiest: "Artiest",
  band: "Band",
  special: "Act",
  act: "Act",
  overig: "Overig",
};

export default async function ActsPage() {
  const supabase = createPublicClient();
  const { data: acts, error } = await supabase
    .from("bdzbookings_acts")
    .select("slug, name, type, genres, omschrijving")
    .eq("publiek_zichtbaar", true)
    .order("name");

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold sm:text-5xl">Acts</h1>
        <p className="mt-4 max-w-xl text-dim">Dj&apos;s, artiesten en bands voor elk soort feest.</p>

        {error && <p className="mt-10 text-oranje">Kon de acts niet laden: {error.message}</p>}

        {acts && acts.length === 0 && <p className="mt-10 text-dim">Nog geen acts zichtbaar.</p>}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {acts?.map((a) => (
            <Link key={a.slug} href={`/acts/${a.slug}`} className="rounded-2xl border border-rand bg-kaart p-6 transition hover:border-oranje/60">
              <p className="text-xs uppercase tracking-widest text-oranje">{LABELS[a.type] ?? a.type}</p>
              <h2 className="mt-2 text-xl font-medium">{a.name}</h2>
              {a.genres?.length > 0 && <p className="mt-2 text-sm text-dim">{a.genres.join(" · ")}</p>}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
