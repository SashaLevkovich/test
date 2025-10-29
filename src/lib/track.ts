// src/lib/track.ts
export type EventPayload = Record<string, unknown>;

const ENDPOINT = "/api/track";

// Генерируем/читаем анонимный id пользователя
const getAnonId = () => {
  const key = "ri:anonId";
  let id = localStorage.getItem(key);
  if (!id) {
    id =
      crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(key, id);
  }
  return id;
};

export async function trackEvent(name: string, payload: EventPayload = {}) {
  try {
    const body = {
      name,
      payload,
      anonId: getAnonId(),
      ts: new Date().toISOString(),
      // клиентские метаданные (не конфиденциальные)
      ua: navigator.userAgent,
      locale: navigator.language,
    };
    // fire-and-forget: не ждём долгих ответов
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true, // помогает отправить при unload
    }).catch(e => {
      // Не ломаем UX
      console.warn("track failed", e);
    });
  } catch (e) {
    // silent
    console.warn("track error", e);
  }
}
