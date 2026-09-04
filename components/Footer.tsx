import Link from "next/link";
import Image from "next/image";

const socials = [
  { naam: "Facebook", url: "https://facebook.com/", actief: true, pad: "M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.1-1.3H18V0h-3.6C10.8 0 9 1.6 9 4.6V8Z" },
  { naam: "Instagram", url: "https://instagram.com/", actief: true, pad: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.2-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2Zm0 5.2a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-7.8a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z" },
  { naam: "YouTube", url: "https://youtube.com/", actief: true, pad: "M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" },
  { naam: "TikTok", url: "https://tiktok.com/", actief: false, pad: "M16.6 5.8a4.8 4.8 0 0 1-1-1.8h-3v12.1a2.9 2.9 0 1 1-2-2.8v-3a5.9 5.9 0 1 0 5 5.8V9.7a7.8 7.8 0 0 0 4.4 1.4V8.1a4.8 4.8 0 0 1-3.4-2.3Z" },
];

const juridisch = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Statement", href: "/privacy" },
  { label: "Algemene voorwaarden", href: "/voorwaarden" },
];

export default function Footer() {
  const jaar = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-goud/25 bg-diep">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <Image src="/logo.png" alt="Bryan de Zwart Bookings" width={420} height={120} className="h-11 w-auto" />
            <p className="mt-5 text-sm leading-relaxed text-dim">Dj&apos;s, artiesten en bands voor bruiloften, bedrijfsfeesten en dorpsfeesten. Persoonlijk geregeld, van eerste telefoontje tot laatste nummer.</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-goud">Direct contact</p>
            <div className="mt-4 space-y-2 text-sm">
              <p><a href="tel:+31850606460" className="text-tekst transition hover:text-goud">085 060 6460</a></p>
              <p><a href="mailto:info@bdzbookings.nl" className="text-tekst transition hover:text-goud">info@bdzbookings.nl</a></p>
              <div className="pt-3 leading-relaxed text-dim">
                <p>BDZ Ventures</p>
                <p>De Nieuwe Erven 3, unit 13617</p>
                <p>5431 NV Cuijk</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-goud">Snel naar</p>
            <div className="mt-4 space-y-2 text-sm">
              <p><Link href="/acts" className="text-dim transition hover:text-goud">Alle acts</Link></p>
              <p><Link href="/over" className="text-dim transition hover:text-goud">Over mij</Link></p>
              <p><Link href="/contact" className="text-dim transition hover:text-goud">Aanvraag doen</Link></p>
            </div>

            <div className="mt-5 flex gap-2.5">
              {socials.filter((s) => s.actief).map((s) => (
                <a key={s.naam} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.naam} className="flex h-11 w-11 items-center justify-center rounded-full border border-goud/30 text-dim transition hover:border-goud hover:text-goud">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d={s.pad} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-goud/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {juridisch.map((l) => (
              <Link key={l.href} href={l.href} className="text-dim/80 transition hover:text-goud">{l.label}</Link>
            ))}
          </div>
          <p className="text-sm text-dim/60">&copy; {jaar} BDZ Ventures | Bryan de Zwart Bookings</p>
        </div>
      </div>
    </footer>
  );
}
