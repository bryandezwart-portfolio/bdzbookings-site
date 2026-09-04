import AanvraagForm from "./AanvraagForm";

export const metadata = {
  title: "Contact & aanvraag | Bryan de Zwart Bookings",
  description: "Neem contact op met Bryan de Zwart Bookings in Cuijk. Bel 085 060 6460 of doe vrijblijvend een aanvraag voor een dj, artiest of band.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ act?: string }> }) {
  const { act } = await searchParams;

  return (
    <main className="min-h-screen px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-oranje">Contact</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Kom gerust in contact met Bryan de Zwart Bookings</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dim">Zoek je een dj, artiest of band voor je bruiloft, bedrijfsfeest of dorpsfeest? Ik werk vanuit Cuijk, met een zwaartepunt in Noord-Brabant en Gelderland, maar daarbuiten kom ik net zo goed. Bel of mail me, dan kijk ik wie er past bij jouw avond en wie er vrij is.</p>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="text-2xl font-bold">Doe een vrijblijvende aanvraag</h2>
            <p className="mt-2 text-dim">Vertel me wat voor feest je hebt, dan zoek ik uit wie er past en beschikbaar is.</p>
            <div className="mt-8"><AanvraagForm act={act} /></div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-rand bg-kaart p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-oranje">Liever bellen?</p>
              <a href="tel:+31850606460" className="mt-3 block text-2xl font-bold transition hover:text-oranje">085 060 6460</a>
              <a href="mailto:info@bdzbookings.nl" className="mt-2 block text-dim transition hover:text-oranje">info@bdzbookings.nl</a>
              <p className="mt-4 text-sm leading-relaxed text-dim">Bel voor een direct antwoord over beschikbaarheid en tarieven. Mail je liever? Dan hoor je doorgaans binnen een werkdag van me.</p>
            </div>

            <div className="rounded-2xl border border-rand bg-kaart p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-oranje">Adres</p>
              <address className="mt-3 space-y-1 not-italic leading-relaxed text-dim">
                <p className="font-medium text-tekst">BDZ Ventures</p>
                <p>De Nieuwe Erven 3, unit 13617</p>
                <p>5431 NV Cuijk</p>
              </address>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
