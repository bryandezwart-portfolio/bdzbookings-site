import Link from "next/link";
import Image from "next/image";

const socials = [
  { naam: "Facebook", url: "https://facebook.com/", actief: true },
  { naam: "Instagram", url: "https://instagram.com/", actief: true },
  { naam: "YouTube", url: "https://youtube.com/", actief: true },
  { naam: "TikTok", url: "https://tiktok.com/", actief: false },
];

const juridisch = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Statement", href: "/privacy" },
  { label: "Algemene voorwaarden", href: "/voorwaarden" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const jaar = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-goud/25 bg-diep">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-[1fr_auto]">
          <div>
            <Image src="/logo.png" alt="Bryan de Zwart Bookings" width={420} height={120} className="h-11 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-dim">Dj&apos;s, artiesten en bands voor bruiloften, bedrijfsfeesten en dorpsfeesten. Persoonlijk geregeld vanuit Cuijk, in heel Noord-Brabant en Gelderland.</p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-goud">Volg mij</p>
            <div className="mt-4 flex gap-5 sm:justify-end">
              {socials.filter((s) => s.actief).map((s) => (
                <a key={s.naam} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-dim transition hover:text-goud">{s.naam}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-goud/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {juridisch.map((l) => (
              <Link key={l.href} href={l.href} className="text-dim transition hover:text-goud">{l.label}</Link>
            ))}
          </div>
          <p className="text-sm text-dim/70">&copy; {jaar} BDZ Ventures | Bryan de Zwart Bookings</p>
        </div>
      </div>
    </footer>
  );
}
