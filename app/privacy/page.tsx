export const metadata = {
  title: "Privacyverklaring | Bryan de Zwart Bookings",
  description: "Hoe Bryan de Zwart Bookings omgaat met persoonsgegevens die via deze website worden verzameld.",
};

const blokken: { kop?: string; tekst: string }[] = [
  { tekst: "Deze privacyverklaring beschrijft hoe ik omga met de persoonlijke gegevens die ik via deze website verzamel en gebruik. Door deze website te bezoeken en te gebruiken, stemt u in met het verzamelen, gebruiken en openbaar maken van uw persoonlijke gegevens zoals hieronder beschreven." },
  { kop: "Verzamelde persoonlijke gegevens", tekst: "Ik verzamel alleen gegevens die u zelf vrijwillig verstrekt, zoals uw naam, e-mailadres, telefoonnummer en de gegevens over uw feest die u invult in het aanvraagformulier." },
  { kop: "Gebruik van persoonlijke gegevens", tekst: "Ik gebruik deze gegevens om contact met u op te nemen over uw aanvraag, om uw vragen te beantwoorden en om een boeking af te handelen. Ik gebruik uw gegevens niet voor reclame en stuur geen nieuwsbrieven zonder dat u daar zelf om vraagt." },
  { kop: "Openbaarmaking van persoonlijke gegevens", tekst: "Ik verkoop, verhuur of deel uw gegevens niet met derden, tenzij dit wettelijk verplicht is of noodzakelijk om uw aanvraag af te handelen \u2014 bijvoorbeeld wanneer ik de beschikbaarheid van een act moet navragen. Voor de opslag en verzending van gegevens maak ik gebruik van dienstverleners die namens mij werken en die gebonden zijn aan hun eigen privacyvoorwaarden." },
  { kop: "Cookies", tekst: "Deze website plaatst geen tracking- of advertentiecookies. Er wordt geen profiel van u opgebouwd en uw surfgedrag wordt niet gevolgd." },
  { kop: "Externe links", tekst: "Deze website kan links bevatten naar externe websites die niet onder mijn controle vallen, zoals YouTube of Spotify. Ik ben niet verantwoordelijk voor het privacybeleid of de werkwijze van die websites. Ik raad u aan hun privacybeleid te lezen voordat u daar gegevens achterlaat." },
  { kop: "Gegevensbeveiliging", tekst: "Ik neem passende maatregelen om uw gegevens te beschermen tegen ongeautoriseerde toegang, wijziging of verlies. Volledige beveiliging kan echter nooit worden gegarandeerd." },
  { kop: "Inzage, correctie en verwijdering", tekst: "U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen. Stuur daarvoor een bericht naar het onderstaande e-mailadres, dan handel ik dat zo snel mogelijk af." },
  { kop: "Wijzigingen in deze verklaring", tekst: "Ik behoud mij het recht voor deze privacyverklaring te wijzigen of bij te werken. De herziene versie geldt vanaf het moment van publicatie op deze website." },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-oranje">Juridisch</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Privacyverklaring</h1>

        <div className="mt-12 space-y-8">
          {blokken.map((b, i) => (
            <section key={i}>
              {b.kop && <h2 className="mb-3 text-xl font-bold">{b.kop}</h2>}
              <p className="leading-relaxed text-dim">{b.tekst}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-rand bg-kaart p-6">
          <p className="leading-relaxed text-dim">Heeft u vragen over deze privacyverklaring? Neem contact op via <a href="mailto:info@bdzbookings.nl" className="text-oranje transition hover:opacity-80">info@bdzbookings.nl</a> of bel <a href="tel:+31850606460" className="text-oranje transition hover:opacity-80">085 060 6460</a>.</p>
          <p className="mt-4 text-sm text-dim/70">Laatst bijgewerkt: 5 september 2026</p>
        </div>
      </div>
    </main>
  );
}
