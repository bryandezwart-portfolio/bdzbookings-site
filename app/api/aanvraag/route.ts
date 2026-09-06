import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase";
import { Resend } from "resend";

// Straks, zodra bdzbookings.nl in Resend is geverifieerd:
// verander VAN in: "Bryan de Zwart Bookings <bookings@bdzbookings.nl>"
const VAN = "Bryan de Zwart Bookings <bookings@bdzbookings.nl>";
const NAAR_MIJ = "info@bdzbookings.nl";
const SITE = "https://bdzbookings.nl";

const ORANJE = "#f2621f";
const DONKER = "#141110";
const KAART = "#1d1a18";
const DIM = "#a8a29e";

function leesbareDatum(datum?: string | null) {
  if (!datum) return null;
  const d = new Date(datum);
  if (isNaN(d.getTime())) return datum;
  return d.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function esc(s: unknown) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function regel(label: string, waarde?: string | null) {
  if (!waarde) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #2e2a27;color:${DIM};font-size:14px;width:130px;vertical-align:top;">${esc(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #2e2a27;color:#f5f5f4;font-size:15px;">${esc(waarde)}</td>
    </tr>`;
}

function omhulsel(inhoud: string) {
  return `<!doctype html>
<html lang="nl">
<body style="margin:0;padding:0;background:${DONKER};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${DONKER};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${KAART};border-radius:16px;overflow:hidden;border:1px solid #2e2a27;">
        <tr>
          <td style="padding:28px 32px 20px;border-bottom:1px solid #2e2a27;">
            <img src="${SITE}/logo.png" alt="Bryan de Zwart Bookings" width="200" style="display:block;max-width:200px;height:auto;">
          </td>
        </tr>
        <tr><td style="padding:28px 32px 32px;">${inhoud}</td></tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #2e2a27;color:${DIM};font-size:12px;line-height:1.6;">
            Bryan de Zwart Bookings &middot; De Nieuwe Erven 3 unit 13617, 5431 NV Cuijk<br>
            <a href="tel:+31850606460" style="color:${DIM};text-decoration:none;">085 060 6460</a> &middot;
            <a href="mailto:info@bdzbookings.nl" style="color:${DIM};text-decoration:none;">info@bdzbookings.nl</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

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

  const datumTekst = leesbareDatum(datum);
  const gegevens =
    regel("Naam", naam) +
    regel("E-mail", email) +
    regel("Telefoon", telefoon) +
    regel("Datum", datumTekst) +
    regel("Tijdstip", tijdstip) +
    regel("Plaats", plaats) +
    regel("Act", artiesten);

  const resend = new Resend(process.env.RESEND_API_KEY);
  let mailGelukt = true;

  // ---------- Mail naar mij ----------
  try {
    await resend.emails.send({
      from: VAN,
      to: NAAR_MIJ,
      replyTo: email,
      subject: `Nieuwe aanvraag van ${naam}${datumTekst ? ` \u2014 ${datumTekst}` : ""}`,
      html: omhulsel(`
        <p style="margin:0 0 4px;color:${ORANJE};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Nieuwe aanvraag</p>
        <h1 style="margin:0 0 20px;color:#f5f5f4;font-size:24px;font-weight:800;">${esc(naam)}</h1>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${gegevens}</table>
        <p style="margin:24px 0 6px;color:${DIM};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Bericht</p>
        <p style="margin:0;color:#f5f5f4;font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(bericht)}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
          <tr>
            <td style="border-radius:999px;background:${ORANJE};">
              <a href="mailto:${esc(email)}?subject=${encodeURIComponent(`Je aanvraag bij Bryan de Zwart Bookings`)}"
                 style="display:inline-block;padding:13px 28px;color:#141110;font-size:15px;font-weight:700;text-decoration:none;">Reageer op ${esc(naam)}</a>
            </td>
            <td style="padding-left:12px;">
              <a href="tel:${esc(String(telefoon).replace(/\s/g, ""))}" style="display:inline-block;padding:13px 20px;color:${ORANJE};font-size:15px;font-weight:600;text-decoration:none;">Bellen</a>
            </td>
          </tr>
        </table>
      `),
      text: [
        `Nieuwe aanvraag van ${naam}`, "",
        `Naam: ${naam}`,
        `E-mail: ${email}`,
        `Telefoon: ${telefoon}`,
        `Datum: ${datumTekst || "-"}`,
        `Tijdstip: ${tijdstip || "-"}`,
        `Plaats: ${plaats}`,
        `Act: ${artiesten || "-"}`, "",
        bericht,
      ].join("\n"),
    });
  } catch (e) {
    mailGelukt = false;
    console.error("Mail naar mijzelf mislukt:", e);
  }

  // ---------- Bevestiging naar de boeker ----------
  try {
    await resend.emails.send({
      from: VAN,
      to: email,
      replyTo: NAAR_MIJ,
      subject: "Ik heb je aanvraag ontvangen",
      html: omhulsel(`
        <p style="margin:0 0 4px;color:${ORANJE};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Aanvraag ontvangen</p>
        <h1 style="margin:0 0 16px;color:#f5f5f4;font-size:24px;font-weight:800;">Bedankt, ${esc(naam)}!</h1>
        <p style="margin:0 0 24px;color:#f5f5f4;font-size:15px;line-height:1.7;">
          Je aanvraag is goed binnengekomen. Hieronder zie je wat je hebt doorgegeven.
          Ik neem zo spoedig mogelijk contact met je op.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${gegevens}</table>
        <p style="margin:24px 0 6px;color:${DIM};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Jouw bericht</p>
        <p style="margin:0 0 28px;color:${DIM};font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(bericht)}</p>
        <p style="margin:0 0 4px;color:#f5f5f4;font-size:15px;line-height:1.7;">
          Klopt er iets niet, of wil je iets aanvullen? Antwoord dan gewoon op deze mail,
          of bel <a href="tel:+31850606460" style="color:${ORANJE};text-decoration:none;">085 060 6460</a>.
        </p>
        <p style="margin:24px 0 0;color:#f5f5f4;font-size:15px;line-height:1.7;">
          Ik wens je nog een fijne dag.<br><br>
          Met hartelijke groet,<br>
          <strong>Bryan de Zwart</strong>
        </p>
      `),
      text: [
        `Bedankt, ${naam}!`, "",
        "Je aanvraag is goed binnengekomen. Dit heb je doorgegeven:", "",
        `Naam: ${naam}`,
        `E-mail: ${email}`,
        `Telefoon: ${telefoon}`,
        `Datum: ${datumTekst || "-"}`,
        `Tijdstip: ${tijdstip || "-"}`,
        `Plaats: ${plaats}`,
        `Act: ${artiesten || "-"}`, "",
        `Jouw bericht: ${bericht}`, "",
        "Ik neem zo spoedig mogelijk contact met je op.",
        "Ik wens je nog een fijne dag.", "",
        "Met hartelijke groet,",
        "Bryan de Zwart",
        "085 060 6460 | info@bdzbookings.nl",
      ].join("\n"),
    });
  } catch (e) {
    console.error("Bevestiging naar boeker mislukt:", e);
  }

  return NextResponse.json({ ok: true, mail: mailGelukt });
}
