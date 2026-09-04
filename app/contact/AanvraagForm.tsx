"use client";

import { useState } from "react";

const veldStijl = "w-full rounded-xl border border-rand bg-kaart px-4 py-3 text-tekst outline-none transition focus:border-oranje";

export default function AanvraagForm({ act }: { act?: string }) {
  const [status, setStatus] = useState<"leeg" | "bezig" | "klaar" | "fout">("leeg");
  const [melding, setMelding] = useState("");

  async function verstuur(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("bezig");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/aanvraag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) { setStatus("klaar"); }
    else { setStatus("fout"); setMelding(data.error ?? "Er ging iets mis."); }
  }

  if (status === "klaar") {
    return (
      <div className="rounded-3xl border border-oranje/40 bg-kaart p-8">
        <h2 className="text-2xl font-medium">Aanvraag ontvangen</h2>
        <p className="mt-3 text-dim">Ik neem zo snel mogelijk contact met je op, meestal dezelfde dag nog. Je zit nergens aan vast.</p>
      </div>
    );
  }

  return (
    <form onSubmit={verstuur} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <input name="naam" required placeholder="Je naam *" className={veldStijl} />
        <input name="email" type="email" required placeholder="E-mailadres *" className={veldStijl} />
        <input name="telefoon" required placeholder="Telefoonnummer *" className={veldStijl} />
        <input name="plaats" required placeholder="Plaats van het feest *" className={veldStijl} />
        <input name="datum" type="date" className={veldStijl} />
        <input name="tijdstip" placeholder="Tijdstip (bijv. 21:00 - 01:00)" className={veldStijl} />
      </div>

      <input name="artiesten" defaultValue={act ?? ""} placeholder="Welke act? (mag ook leeg)" className={veldStijl} />
      <textarea name="bericht" required rows={5} placeholder="Wat voor feest is het? Vertel kort wat je zoekt. *" className={veldStijl} />

      {status === "fout" && <p className="text-oranje">{melding}</p>}

      <button type="submit" disabled={status === "bezig"} className="rounded-full bg-oranje px-8 py-3 font-medium text-zwart transition hover:opacity-90 disabled:opacity-50">{status === "bezig" ? "Versturen..." : "Aanvraag versturen"}</button>

      <p className="text-sm text-dim">Vrijblijvend. Ik neem eerst persoonlijk contact met je op voordat er iets vastligt.</p>
    </form>
  );
}
