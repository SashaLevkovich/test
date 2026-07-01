import type { InviteState } from "./types";

export async function sendTelegramNotification(data: InviteState) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      keepalive: true,
    });
  } catch (error) {
    console.warn("Failed to notify server", error);
  }
}
