// =====================================================================
//  Notification channels. The server tries them in this order:
//    1. WhatsApp Cloud API   (preferred)
//    2. Telegram Bot         (easiest free fallback)
//    3. Email via Resend     (simple HTTP email API)
//  The first one that's fully configured + succeeds wins.
//  All secrets come from environment variables — never hardcode them.
// =====================================================================

/** Build the message text sent to you. */
export function buildMessage(gift) {
  return (
    "🎂 Birthday Gift Request 🎁\n\n" +
    "She wants:\n" +
    `${gift}\n\n` +
    "Sent from the birthday website."
  );
}

// ---------------------------------------------------------------------
// 1) WhatsApp Cloud API
// ---------------------------------------------------------------------
export function whatsappConfigured() {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.MY_WHATSAPP_NUMBER
  );
}

export async function sendWhatsApp(gift) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.MY_WHATSAPP_NUMBER; // e.g. 919812345678 (no +, no spaces)

  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { preview_url: false, body: buildMessage(gift) },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`WhatsApp API error ${res.status}: ${detail}`);
  }
  return { channel: "whatsapp" };
}

// ---------------------------------------------------------------------
// 2) Telegram Bot API
// ---------------------------------------------------------------------
export function telegramConfigured() {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
  );
}

export async function sendTelegram(gift) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: buildMessage(gift) }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Telegram API error ${res.status}: ${detail}`);
  }
  return { channel: "telegram" };
}

// ---------------------------------------------------------------------
// 3) Email via Resend (https://resend.com — free tier, HTTP only)
// ---------------------------------------------------------------------
export function emailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.EMAIL_TO &&
      process.env.EMAIL_FROM
  );
}

export async function sendEmail(gift) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "🎂 Birthday Gift Request 🎁",
      text: buildMessage(gift),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Email API error ${res.status}: ${detail}`);
  }
  return { channel: "email" };
}

/**
 * Try each configured channel in priority order. Returns the channel
 * that succeeded, or throws if none are configured / all fail.
 */
export async function notify(gift) {
  const channels = [];
  if (whatsappConfigured()) channels.push(sendWhatsApp);
  if (telegramConfigured()) channels.push(sendTelegram);
  if (emailConfigured()) channels.push(sendEmail);

  if (channels.length === 0) {
    const err = new Error("NO_CHANNEL_CONFIGURED");
    err.code = "NO_CHANNEL_CONFIGURED";
    throw err;
  }

  let lastError;
  for (const send of channels) {
    try {
      return await send(gift);
    } catch (e) {
      lastError = e;
      console.error("[notify] channel failed:", e.message);
    }
  }
  throw lastError ?? new Error("All notification channels failed");
}
