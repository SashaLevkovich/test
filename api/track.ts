import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const event = req.body || {};
    const forwardedFor = req.headers["x-forwarded-for"] || "";
    const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;

    const record = {
      ...event,
      receivedAt: new Date().toISOString(),
      ip: ip || null,
      host: req.headers.host || null,
    };

    console.log("TRACK EVENT:", JSON.stringify(record));

    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      try {
        await fetch(`${process.env.SUPABASE_URL}/rest/v1/events`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            name: event.name,
            payload: event.payload,
            anon_id: event.anonId,
            ts: event.ts,
            ua: event.ua,
            locale: event.locale,
            received_at: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("Supabase insert error", err);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("track handler error", err);
    return res.status(500).json({ ok: false });
  }
}
