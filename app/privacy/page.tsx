export const metadata = {
  title: "Privacyverklaring | Bryan de Zwart Bookings",
  description: "Hoe Bryan de Zwart Bookings omgaat met persoonsgegevens die via deze website worden verzameld.",
};

const blokken: { kop?: string; tekst: string }[] = [
  { tekst: "Deze privacyverklaring beschrijft welke persoonsgegevens ik via deze website verzamel, waarom ik dat doe en welke rechten u daarbij heeft." },
  { kop: "Wie is verantwoordelijk", tekst: "BDZ Ventures, handelend onder de naam Bryan de Zwart Bookings, is verantwoordelijk voor de verwerking van uw gegevens. De Nieuwe Erven 3, unit 13617, 5431 NV Cuijk. KvK 98283731, btw-nummer NL005322714B67. Bereikbaar via info@bdzbookings.nl en 085 060 6460." },
  { kop: "Welke gegevens ik verzamel", tekst: "Ik verzamel alleen gegevens die u zelf invult in het aanvraagformulier: uw naam, e-mailadres, telefoonnummer en de gegevens over uw feest, zoals datum, tijdstip, locatie en de act waar uw voorkeur naar uitgaat. Er worden verder geen gegevens over u verzameld." },
  { kop: "Waarom ik die gegevens gebruik", tekst: "Ik gebruik uw gegevens om uw aanvraag te beantwoorden, de beschikbaarheid na te gaan en een eventuele boeking af te handelen. De wettelijke grondslag hiervoor is de uitvoering van een overeenkomst, of de stappen die daaraan voorafgaan op uw verzoek. Voor mijn boekhouding geldt daarnaast een wettelijke verplichting. Ik gebruik uw gegevens niet voor reclame en verstuur geen nieuwsbrieven." },
  { kop: "Hoe lang ik gegevens bewaar", tekst: "Aanvragen die niet tot een boeking leiden bewaar ik maximaal twee jaar na het laatste contact. Gegevens die horen bij een daadwerkelijke boeking bewaar ik zeven jaar, omdat ik daartoe fiscaal verplicht ben. Daarna verwijder ik ze." },
  { kop: "Met wie ik gegevens deel", tekst: "Ik verkoop of verhuur uw gegevens niet. Om uw aanvraag te kunnen behandelen deel ik uw gegevens waar nodig met de artiest of het bureau achter de act waarnaar u vraagt. Voor de website en de verwerking maak ik gebruik van Supabase (opslag van aanvragen, servers binnen de EU), Resend (verzending van e-mail) en Netlify (hosting van de website). Met deze partijen zijn verwerkersafspraken van kracht. Daarnaast deel ik gegevens met mijn boekhouder en, wanneer dat wettelijk verplicht is, met de Belastingdienst of andere instanties." },
  { kop: "Cookies", tekst: "Deze website plaatst geen tracking- of advertentiecookies. Er wordt geen profiel van u opgebouwd en uw surfgedrag wordt niet gevolgd. Mocht ik hier in de toekomst verandering in brengen, dan vraag ik daar vooraf uw toestemming voor." },
  { kop: "Externe links", tekst: "Deze website kan links bevatten naar externe websites die niet onder mijn beheer vallen, zoals YouTube, Spotify of sociale media. Ik ben niet verantwoordelijk voor het privacybeleid van die websites. Ik raad u aan hun privacybeleid te lezen voordat u daar gegevens achterlaat." },
  { kop: "Beveiliging", tekst: "Ik neem passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies of onrechtmatige toegang. Zo verloopt het verkeer met deze website versleuteld en is de toegang tot opgeslagen aanvragen beperkt tot mijzelf." },
  { kop: "Uw rechten", tekst: "U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen. Daarnaast kunt u de verwerking laten beperken, bezwaar maken tegen de verwerking, en vragen om uw gegevens in een gangbaar bestandsformaat te ontvangen. Stuur daarvoor een bericht naar info@bdzbookings.nl. Ik reageer binnen vier weken. Om te voorkomen dat ik gegevens aan de verkeerde persoon verstrek, kan ik u vragen zich te identificeren." },
  { kop: "Klacht indienen", tekst: "Bent u het niet eens met hoe ik met uw gegevens omga, laat het mij dan eerst weten, dan zoeken we samen naar een oplossing. U heeft daarnaast altijd het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens via autoriteitpersoonsgegevens.nl." },
  { kop: "Wijzigingen", tekst: "Ik kan deze privacyverklaring aanpassen wanneer mijn werkwijze of de wetgeving daartoe aanleiding geeft. De actuele versie staat altijd op deze pagina, met onderaan de datum van de laatste wijziging." },
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
          <p className="mt-4 text-sm text-dim/70">Laatst bijgewerkt: 6 september 2026</p>
        </div>
      </div>
    </main>
  );
}
