import AanvraagForm from "./AanvraagForm";

export const metadata = {
  title: "Aanvraag doen | Bryan de Zwart Bookings",
  description: "Vraag vrijblijvend de beschikbaarheid op voor een dj, artiest of band. Persoonlijk contact, geen verplichtingen.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ act?: string }> }) {
  const { act } = await searchParams;

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold sm:text-5xl">Aanvraag doen</h1>
        <p className="mt-4 max-w-xl text-lg text-dim">Vertel me wat voor feest je hebt, dan zoek ik uit wie er past en beschikbaar is. Je zit nergens aan vast.</p>

        <div className="mt-12"><AanvraagForm act={act} /></div>
      </div>
    </main>
  );
}
