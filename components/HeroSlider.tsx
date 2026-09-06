"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSlider({ fotos }: { fotos: string[] }) {
  const [actief, setActief] = useState(0);

  useEffect(() => {
    if (fotos.length < 2) return;
    const t = setInterval(() => setActief((i) => (i + 1) % fotos.length), 6000);
    return () => clearInterval(t);
  }, [fotos.length]);

  return (
    <div className="absolute inset-0">
      {fotos.map((f, i) => (
        <div
          key={f}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${i === actief ? "opacity-100" : "opacity-0"}`}
          style={{ zIndex: i === actief ? 2 : 1 }}
        >
          <Image src={f} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zwart/70 via-zwart/50 to-zwart" />
    </div>
  );
}
