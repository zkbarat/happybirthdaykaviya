import { config } from "./config";

export type GiftResponse = {
  ok: boolean;
  message?: string;
  channel?: string;
};

/**
 * Sends the birthday girl's gift request to you.
 *
 * - If `config.formspreeEndpoint` is set (GitHub Pages / no-server mode), the
 *   request is emailed to you via Formspree — no backend required.
 * - Otherwise it POSTs to the Node backend (`config.giftApiEndpoint`), which
 *   forwards it to WhatsApp / Telegram / email.
 */
export async function sendGiftRequest(gift: string): Promise<GiftResponse> {
  if (config.formspreeEndpoint) {
    return sendViaFormspree(gift);
  }
  return sendViaBackend(gift);
}

async function sendViaFormspree(gift: string): Promise<GiftResponse> {
  const res = await fetch(config.formspreeEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      gift,
      message: `🎂 Birthday gift request 🎁\n\nShe wants: ${gift}`,
      _subject: "🎂 Birthday Gift Request 🎁",
    }),
  });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.errors?.[0]?.message) msg = data.errors[0].message;
    } catch {
      // ignore non-JSON error bodies
    }
    throw new Error(msg);
  }

  return { ok: true, channel: "email" };
}

async function sendViaBackend(gift: string): Promise<GiftResponse> {
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
