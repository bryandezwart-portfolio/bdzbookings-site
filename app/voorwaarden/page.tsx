export const metadata = {
  title: "Algemene voorwaarden | Bryan de Zwart Bookings",
  description: "De algemene voorwaarden van Bryan de Zwart Bookings voor boekingen van dj's, artiesten en bands.",
};

const artikelen: { kop: string; tekst: string }[] = [
  { kop: "1. Toepasselijkheid", tekst: "Deze voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten van Bryan de Zwart Bookings." },
  { kop: "2. Overeenkomst", tekst: "Een boeking komt tot stand zodra deze schriftelijk is bevestigd door beide partijen, per e-mail of contract. Vanaf dat moment is de boeking bindend. Een aanvraag via de website is vrijblijvend en verplicht tot niets." },
  { kop: "3. Betaling", tekst: "Facturen dienen binnen de afgesproken termijn en uiterlijk v\u00F3\u00F3r het optreden te worden voldaan. Alle genoemde prijzen zijn exclusief btw, tenzij anders vermeld." },
  { kop: "4. Annulering door de opdrachtgever", tekst: "Annuleert u een bevestigde boeking, dan bent u een percentage van het factuurbedrag verschuldigd: bij annulering tot 30 dagen v\u00F3\u00F3r het optreden 25%, tussen 30 en 14 dagen 50%, tussen 14 en 7 dagen 75%, en binnen 7 dagen voor het optreden het volledige bedrag. Bij verplaatsing naar een andere datum zoek ik in overleg naar een oplossing zonder annuleringskosten, mits de artiest op de nieuwe datum beschikbaar is." },
  { kop: "5. BUMA-Stemra", tekst: "De afdracht aan BUMA-Stemra wordt geregeld door de organisator van het evenement, tenzij schriftelijk anders overeengekomen." },
  { kop: "6. Verantwoordelijkheid opdrachtgever", tekst: "De opdrachtgever draagt zorg voor een geschikte locatie, de juiste faciliteiten zoals geluid, licht en stroom, en het naleven van alle geldende wet- en regelgeving." },
  { kop: "7. Overmacht", tekst: "In geval van overmacht, zoals ziekte van de artiest of onvoorziene omstandigheden, wordt in overleg gezocht naar een passende oplossing, zoals vervanging of verplaatsing van de boeking." },
  { kop: "8. Aansprakelijkheid", tekst: "Bryan de Zwart Bookings is niet aansprakelijk voor schade ontstaan tijdens het optreden of door technische storingen buiten haar invloed. De aansprakelijkheid is in alle gevallen beperkt tot het factuurbedrag." },
  { kop: "9. Promotie", tekst: "De opdrachtgever is gerechtigd om naam en beeldmateriaal van de artiest te gebruiken voor promotionele doeleinden rondom het evenement." },
  { kop: "10. Toepasselijk recht", tekst: "Op alle overeenkomsten is Nederlands recht van toepassing." },
];

export default function VoorwaardenPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-oranje">Juridisch</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Algemene voorwaarden</h1>
        <p className="mt-6 leading-relaxed text-dim">Bij Bryan de Zwart Bookings staan kwaliteit, duidelijkheid en een zorgeloze samenwerking centraal. Onderstaande voorwaarden zijn van toepassing op alle boekingen en samenwerkingen.</p>

        <div className="mt-12 space-y-8">
          {artikelen.map((a) => (
            <section key={a.kop}>
              <h2 className="mb-3 text-xl font-bold">{a.kop}</h2>
              <p className="leading-relaxed text-dim">{a.tekst}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-rand bg-kaart p-6">
          <p className="leading-relaxed text-dim">Vragen over deze voorwaarden? Neem contact op via <a href="mailto:info@bdzbookings.nl" className="text-oranje transition hover:opacity-80">info@bdzbookings.nl</a> of bel <a href="tel:+31850606460" className="text-oranje transition hover:opacity-80">085 060 6460</a>.</p>
          <p className="mt-4 text-sm text-dim/70">BDZ Ventures, De Nieuwe Erven 3 unit 13617, 5431 NV Cuijk &middot; Laatst bijgewerkt: 5 september 2026</p>
        </div>
      </div>
    </main>
  );
}
