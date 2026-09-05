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
    <span className="text-oranje">{woorden[i].slice(0, lengte)}<span className="ml-0.5 inline-block w-[2px] animate-pulse bg-oranje align-middle" style={{ height: "0.8em" }} /></span>
  );
}
