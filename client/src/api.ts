import { config } from "./config";

export type GiftResponse = {
  ok: boolean;
  message?: string;
  channel?: string;
};

/**
 * Sends the birthday girl's gift request to the backend, which then
 * forwards it to you (WhatsApp / Telegram / email).
 */
export async function sendGiftRequest(gift: string): Promise<GiftResponse> {
  const res = await fetch(config.giftApiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gift }),
  });

  let data: GiftResponse = { ok: res.ok };
  try {
    data = (await res.json()) as GiftResponse;
  } catch {
    // Non-JSON response; fall back to status-based ok flag.
  }

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}
