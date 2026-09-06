"use client";

import { useEffect, useState } from "react";

const woorden = [
  "jullie bruiloft",
  "je bedrijfsfeest",
  "ons dorpsfeest",
  "jullie personeelsfeest",
  "jullie jubileum",
  "je afscheidsfeest",
];

export default function TypeTekst() {
  const [i, setI] = useState(0);
  const [lengte, setLengte] = useState(0);
  const [wist, setWist] = useState(false);

  useEffect(() => {
    const woord = woorden[i];

    if (!wist && lengte === woord.length) {
      const pauze = setTimeout(() => setWist(true), 2200);
      return () => clearTimeout(pauze);
    }

    if (wist && lengte === 0) {
      setWist(false);
      setI((n) => (n + 1) % woorden.length);
      return;
    }

    const tik = setTimeout(() => setLengte((n) => n + (wist ? -1 : 1)), wist ? 55 : 125);
    return () => clearTimeout(tik);
  }, [lengte, wist, i]);

  return (
    <span className="relative grid w-full text-[0.75em] leading-tight text-oranje [overflow-wrap:anywhere] sm:text-[1em]">
      {woorden.map((woord) => (
        <span key={woord} aria-hidden className="invisible col-start-1 row-start-1">
          {woord}
        </span>
      ))}
      <span className="absolute inset-0">
        {woorden[i].slice(0, lengte)}
        <span className="relative inline-block w-0 align-middle">
          <span
            className="absolute left-[2px] top-1/2 w-[2px] -translate-y-1/2 animate-pulse bg-oranje"
            style={{ height: "0.8em" }}
          />
        </span>
      </span>
    </span>
  );
}
