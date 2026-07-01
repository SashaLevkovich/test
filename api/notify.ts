import type { VercelRequest, VercelResponse } from "@vercel/node";

interface InviteState {
  date: string | null;
  time: string | null;
  category: string | null;
  details: string | null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const data = req.body as InviteState;

  const BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const CHAT_ID = process.env.TG_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const text = `
🎉 <b>Ура! Она сказала «Да»!</b>

📅 <b>Когда:</b> ${data.date === "surprise" ? "Сюрприз ✨" : data.date}
⏰ <b>Время:</b> ${data.time === "surprise" ? "Сюрприз ✨" : data.time}
🎯 <b>Формат:</b> ${data.category === "food" ? "Ресторан 🍽" : data.category === "activity" ? "Активность 🎳" : "Сюрприз ✨"}
💡 <b>Детали:</b> ${data.details || "На твоё усмотрение"}
  `.trim();

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      },
    );

    if (!tgResponse.ok) {
      throw new Error(`Telegram API error: ${tgResponse.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send telegram message:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}
