import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/acts", label: "Acts" },
  { href: "/over", label: "Over mij" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rand/60 bg-zwart/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center"><Image src="/logo.png" alt="Bryan de Zwart Bookings" width={420} height={120} priority className="h-10 w-auto" /></Link>
        <div className="flex items-center gap-7 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-dim transition hover:text-tekst">{l.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
