import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Over mij | Bryan de Zwart Bookings",
  description: "Bryan de Zwart boekt dj's, artiesten en bands. Al sinds mijn vijftiende sta ik achter de draaitafel; nu regel ik ook de acts voor jouw feest.",
};

export default function OverPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,320px)_1fr]">
          <Image src="/bryan.png" alt="Bryan de Zwart" width={640} height={800} priority className="h-auto w-full rounded-2xl object-cover" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-oranje">Over mij</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Bryan de Zwart</h1>
            <p className="mt-5 text-lg leading-relaxed text-dim">Dj sinds mijn vijftiende, en inmiddels ook de man die de acts voor jouw feest regelt.</p>
          </div>
        </div>


        <div className="mt-10 space-y-6 text-lg leading-relaxed text-dim">
          <p>Ik ben Bryan de Zwart. Op mijn vijftiende draaide ik mijn eerste feest, en sindsdien ben ik nooit meer gestopt.</p>

          <p>Later werkte ik als conci&euml;rge op een school. Daar organiseerde ik de galafeesten &mdash; en daar begon het echt. Niet alleen draaien, maar het hele feest regelen: wie er speelt, hoe laat, wat er nodig is en wie je belt als er iets misgaat.</p>

          <p>Nu draai ik nog steeds zelf, bij omroep Radio Muziekstad, en ben ik oprichter van internetradiostation BigB21. Ik weet hoe het is om op dat podium te staan. Dat merk je als je met mij werkt: ik snap zowel de kant van de opdrachtgever als die van de artiest.</p>

          <p>Met Bryan de Zwart Bookings breng ik die twee bij elkaar. Ik boek dj&apos;s, artiesten en bands voor bruiloften, bedrijfsfeesten en dorpsfeesten. Geen callcenter, geen formulier dat ergens verdwijnt &mdash; je hebt mij aan de lijn, en op de avond zelf ook.</p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-rand bg-rand sm:grid-cols-3">
          <div className="bg-kaart p-6"><p className="text-xs uppercase tracking-widest text-oranje">Persoonlijk</p><p className="mt-2 text-sm">Ik ben je aanspreekpunt, van eerste telefoontje tot laatste nummer.</p></div>
          <div className="bg-kaart p-6"><p className="text-xs uppercase tracking-widest text-oranje">Vrijblijvend</p><p className="mt-2 text-sm">Een aanvraag verplicht je tot niets. We bellen eerst.</p></div>
          <div className="bg-kaart p-6"><p className="text-xs uppercase tracking-widest text-oranje">Uit de praktijk</p><p className="mt-2 text-sm">Zelf dj, dus ik weet wat er nodig is om een avond te laten lopen.</p></div>
        </div>

        <div className="mt-16 rounded-3xl border border-rand bg-kaart p-8">
          <h2 className="text-2xl font-medium">Een act zoeken voor je feest?</h2>
          <p className="mt-2 text-dim">Vertel me wat je in gedachten hebt. Ik denk mee, ook als je nog niet weet wie je wilt.</p>
          <Link href="/contact" className="mt-6 inline-block rounded-full bg-oranje px-7 py-3 font-medium text-zwart transition hover:opacity-90">Aanvraag doen</Link>
        </div>
      </div>
    </main>
  );
}
