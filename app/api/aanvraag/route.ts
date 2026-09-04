import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (body.website) return NextResponse.json({ ok: true });

  const { naam, email, telefoon, datum, tijdstip, plaats, artiesten, bericht } = body;
  if (!naam || !email || !telefoon || !plaats || !bericht) {
    return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("bdzbookings_aanvragen").insert({
    naam, email, telefoon,
    datum: datum || null,
    tijdstip: tijdstip || null,
    plaats,
    artiesten: artiesten || null,
    bericht,
    status: "nieuw",
  });

  if (error) {
    console.error("Aanvraag opslaan mislukt:", error.message);
    return NextResponse.json({ error: "Er ging iets mis. Probeer het opnieuw of bel me." }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "BDZBookings <bookings@artiestenportaal.nl>",
      to: "info@bdzmusic.nl",
      replyTo: email,
      subject: `Nieuwe aanvraag van ${naam}`,
      text: [
        `Naam: ${naam}`,
        `E-mail: ${email}`,
        `Telefoon: ${telefoon}`,
        `Datum: ${datum || "-"}`,
        `Tijdstip: ${tijdstip || "-"}`,
        `Plaats: ${plaats}`,
        `Act: ${artiesten || "-"}`,
        "",
        bericht,
      ].join("\n"),
    });
  } catch (e) {
    console.error("Mail versturen mislukt:", e);
  }

  return NextResponse.json({ ok: true });
}
