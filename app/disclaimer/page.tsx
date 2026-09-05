export const metadata = {
  title: "Disclaimer | Bryan de Zwart Bookings",
  description: "Disclaimer voor het gebruik van de website van Bryan de Zwart Bookings.",
};

const blokken: { kop?: string; tekst: string }[] = [
  { tekst: "Deze website is van BDZ Ventures, handelend onder de naam Bryan de Zwart Bookings, De Nieuwe Erven 3 unit 13617, 5431 NV Cuijk, KvK 98283731. Hieronder leest u wat u van de informatie op deze site mag verwachten en wat niet." },
  { kop: "Informatie op deze website", tekst: "Ik doe mijn best om de informatie op deze website juist en actueel te houden. Toch kan het voorkomen dat iets niet meer klopt of onvolledig is. Aan de informatie op deze website kunt u daarom geen rechten ontlenen. Twijfelt u ergens over, bel of mail mij dan even \u2014 dan weet u het zeker." },
  { kop: "Prijzen en beschikbaarheid", tekst: "De prijzen die bij de acts staan zijn richtprijzen, bedoeld om u een idee te geven van de orde van grootte. Ze zijn geen aanbod. Wat u uiteindelijk betaalt hangt af van de datum, de speelduur, de reisafstand en wat u verder wenst, en staat pas vast in de offerte of boekingsbevestiging. Dat een act op deze website staat, betekent niet dat die op uw datum beschikbaar is. Beschikbaarheid bevestig ik altijd persoonlijk." },
  { kop: "Informatie over de artiesten", tekst: "Foto's, video's, omschrijvingen en genre-aanduidingen van artiesten krijg ik veelal van de artiest zelf of van het bureau dat de artiest vertegenwoordigt. Ik ga ervan uit dat die informatie klopt, maar kan daar niet voor instaan. Klopt er iets niet, laat het mij dan weten, dan pas ik het aan." },
  { kop: "Externe links", tekst: "Op deze website staan links naar andere websites, zoals YouTube, Spotify en sociale media. Die sites zijn niet van mij en ik heb geen invloed op hun inhoud of werkwijze. Klikt u door, dan gelden daar hun eigen voorwaarden en privacybeleid." },
  { kop: "Auteursrecht", tekst: "De teksten, vormgeving, foto's en video's op deze website zijn beschermd. U mag ze niet overnemen, kopi\u00EBren of hergebruiken zonder mijn schriftelijke toestemming. Wilt u beeldmateriaal gebruiken om een optreden aan te kondigen dat u bij mij heeft geboekt, dan mag dat; zie daarvoor de algemene voorwaarden." },
  { kop: "Aansprakelijkheid", tekst: "Ik ben niet aansprakelijk voor schade die ontstaat doordat u afgaat op informatie op deze website, of doordat de site tijdelijk niet bereikbaar is. Deze beperking geldt niet bij opzet of bewuste roekeloosheid van mijn kant, en evenmin voor zover de wet dat bij particulieren niet toestaat. Voor boekingen gelden daarnaast mijn algemene voorwaarden; die gaan v\u00F3\u00F3r wat hier staat." },
  { kop: "Wijzigingen", tekst: "Ik kan deze disclaimer aanpassen wanneer daar aanleiding voor is. De actuele versie staat altijd op deze pagina, met onderaan de datum van de laatste wijziging." },
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
          <p className="mt-4 text-sm text-dim/70">BDZ Ventures h.o.d.n. Bryan de Zwart Bookings &middot; KvK 98283731 &middot; Laatst bijgewerkt: 6 september 2026</p>
        </div>
      </div>
    </main>
  );
}
