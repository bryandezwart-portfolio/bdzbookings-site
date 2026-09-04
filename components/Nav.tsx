"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/acts", label: "Acts" },
  { href: "/over", label: "Over mij" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [gescrold, setGescrold] = useState(false);

  useEffect(() => {
    const kijk = () => setGescrold(window.scrollY > 40);
    kijk();
    window.addEventListener("scroll", kijk, { passive: true });
    return () => window.removeEventListener("scroll", kijk);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${gescrold || open ? "border-b border-rand/60 bg-zwart/80 backdrop-blur-xl" : "bg-gradient-to-b from-zwart/80 to-transparent"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="flex shrink-0 items-center"><Image src="/logo.png" alt="Bryan de Zwart Bookings" width={420} height={120} priority className="h-9 w-auto sm:h-10" /></Link>

        <div className="hidden items-center gap-7 text-sm sm:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap text-dim transition hover:text-tekst">{l.label}</Link>
          ))}
          <Link href="/contact" className="gloed whitespace-nowrap rounded-full bg-oranje px-5 py-2 font-medium text-zwart transition hover:opacity-90">Aanvraag doen</Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] sm:hidden">
          <span className={`block h-[2px] w-6 bg-tekst transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-6 bg-tekst transition ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-tekst transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-rand/60 bg-zwart px-6 pb-6 pt-2 sm:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-rand/40 py-4 text-lg text-dim transition hover:text-tekst">{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="mt-5 block rounded-full bg-oranje py-3 text-center font-medium text-zwart">Aanvraag doen</Link>
        </div>
      )}
    </header>
  );
}
