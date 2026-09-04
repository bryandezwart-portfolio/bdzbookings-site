export const metadata = {
  title: "Disclaimer | Bryan de Zwart Bookings",
  description: "Disclaimer voor het gebruik van de website van Bryan de Zwart Bookings.",
};

const blokken: { kop?: string; tekst: string }[] = [
  { tekst: "Deze disclaimer regelt uw gebruik van onze website. Door deze website te bezoeken en te gebruiken, stemt u in met deze disclaimer in zijn geheel. Als u niet akkoord gaat met enige bepaling van deze disclaimer, verzoeken wij u vriendelijk om deze website niet te gebruiken." },
  { kop: "Inhoud van de website", tekst: "De informatie op deze website is bedoeld voor algemene informatiedoeleinden en wordt verstrekt zoals deze is. We streven ernaar om de informatie op deze website actueel en accuraat te houden, maar we garanderen niet de volledigheid, juistheid, betrouwbaarheid of geschiktheid van de informatie voor een specifiek doel. U bent verantwoordelijk voor het gebruik van deze informatie op eigen risico." },
  { kop: "Externe links", tekst: "Deze website kan links bevatten naar externe websites die niet onder onze controle vallen. Wij zijn niet verantwoordelijk voor de inhoud, het privacybeleid, de beveiliging of enige andere aspecten van deze externe websites. Het volgen van dergelijke links is op eigen risico." },
  { kop: "Intellectuele eigendom", tekst: "Alle intellectuele eigendomsrechten met betrekking tot de inhoud op deze website zijn voorbehouden. Het is niet toegestaan om zonder voorafgaande schriftelijke toestemming van de eigenaar de inhoud van deze website te kopi\u00EBren, reproduceren, verspreiden of op enige andere wijze te gebruiken, tenzij expliciet anders vermeld." },
  { kop: "Wijzigingen", tekst: "We behouden ons het recht voor om deze disclaimer op elk moment te wijzigen of bij te werken zonder voorafgaande kennisgeving. Het is uw verantwoordelijkheid om deze disclaimer regelmatig te controleren op eventuele wijzigingen. Door deze website te blijven gebruiken na eventuele wijzigingen, aanvaardt u de gewijzigde disclaimer." },
  { kop: "Beperking van aansprakelijkheid", tekst: "In geen geval zijn wij aansprakelijk voor enige directe, indirecte, incidentele, gevolg- of speciale schade die voortvloeit uit het gebruik van deze website, inclusief maar niet beperkt tot winstderving, bedrijfsonderbrekingen, verlies van programma's of gegevens op uw computersysteem, of enige andere schade, zelfs als wij op de hoogte zijn gesteld van de mogelijkheid van dergelijke schade." },
];

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-oranje">Juridisch</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Disclaimer</h1>

        <div className="mt-12 space-y-8">
          {blokken.map((b, i) => (
            <section key={i}>
              {b.kop && <h2 className="mb-3 text-xl font-bold">{b.kop}</h2>}
              <p className="leading-relaxed text-dim">{b.tekst}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-rand bg-kaart p-6">
          <p className="leading-relaxed text-dim">Heeft u vragen over deze disclaimer? Neem dan contact op via <a href="mailto:info@bdzbookings.nl" className="text-oranje transition hover:opacity-80">info@bdzbookings.nl</a> of bel <a href="tel:+31850606460" className="text-oranje transition hover:opacity-80">085 060 6460</a>.</p>
          <p className="mt-4 text-sm text-dim/70">Laatst bijgewerkt: 5 september 2026</p>
        </div>
      </div>
    </main>
  );
}
