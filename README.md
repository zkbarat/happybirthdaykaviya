# 🎂 Birthday Surprise Website ❤️

A cute, interactive, pink-themed birthday website built as a little surprise for your best friend. It has an animated welcome page full of birthday wishes, floating hearts, sparkles, balloons and confetti, and a playful gift page with a "No Gift Needed" button that runs away from her finger. When she submits a gift, a notification is sent straight to **you** (via WhatsApp, Telegram, or email).

Built with **React + TypeScript + Tailwind CSS + Framer Motion** on the frontend and **Node.js + Express** on the backend.

---

## ✨ What's inside

```
birthday-website/
├── client/                 # React + Vite + Tailwind + Framer Motion frontend
│   ├── src/
│   │   ├── config.ts       # 💖 EDIT THIS: her name, music, wishes
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   └── components/
│   │       ├── BirthdayHome.tsx      # Page 1
│   │       ├── BirthdayWishes.tsx
│   │       ├── GiftPage.tsx          # Page 2
│   │       ├── GiftInput.tsx
│   │       ├── GiftSubmitButton.tsx
│   │       ├── MovingNoGiftButton.tsx  # the escaping button 😂
│   │       ├── FloatingHearts.tsx
│   │       ├── Sparkles.tsx
│   │       ├── Balloons.tsx
│   │       ├── MusicButton.tsx
│   │       └── confetti.ts
│   └── ...
├── server/                 # Express notification backend
│   ├── src/
│   │   ├── index.js        # /api/gift-request + serves the built frontend
│   │   └── notifiers.js    # WhatsApp / Telegram / Email logic
│   └── .env.example        # 🔐 copy to .env and add your secrets
├── render.yaml             # one-click Render deploy config
└── package.json            # root convenience scripts
```

---

## 🚀 Quick start (local)

You need **Node.js 18+**.

### 1. Personalize it

Open `client/src/config.ts` and change:

```ts
bestFriendName: "Bestie",   // 👈 her name
musicFile: "",              // 👈 optional, see "Music" below
```

You can also edit the list of `wishes` there.

### 2. Install everything

```bash
cd birthday-website
npm run install:all
```

### 3. Set up notifications (so YOU get the gift request)

```bash
cd server
cp .env.example .env
```

Then open `server/.env` and configure **any one** channel (Telegram is the easiest — see below). If you skip this step, the website still works perfectly; the gift request just won't be delivered anywhere (it logs to the server console instead).

### 4. Run it (two terminals)

```bash
# Terminal 1 — backend
npm run dev:server

# Terminal 2 — frontend
npm run dev:client
```

Open **http://localhost:5173**. The frontend proxies `/api/*` to the backend on port 4000 automatically.

---

## 🔔 Notification setup

The backend tries channels in this order and uses the first one that's configured: **WhatsApp → Telegram → Email**. You only need **one**.

### Option A — Telegram (easiest, 100% free) ✅ recommended

1. Open Telegram, message **@BotFather**, send `/newbot`, follow the prompts, and copy the **bot token**.
2. Send any message (e.g. "hi") to your new bot.
3. Visit `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser and find `"chat":{"id":<NUMBER>...}`. That number is your chat id.
4. In `server/.env`:

```env
TELEGRAM_BOT_TOKEN=123456:ABC-your-token
TELEGRAM_CHAT_ID=987654321
```

### Option B — WhatsApp Cloud API (preferred, a bit more setup)

1. Go to <https://developers.facebook.com>, create an app, and add the **WhatsApp** product.
2. From the WhatsApp → API Setup page, copy the **temporary access token** and the **Phone number ID**.
3. Add **your own** phone number as a recipient (required while the app is in test mode).
4. In `server/.env`:

```env
WHATSAPP_ACCESS_TOKEN=EAAG...your-token
WHATSAPP_PHONE_NUMBER_ID=1234567890
MY_WHATSAPP_NUMBER=919812345678   # your number, full intl format, no "+" or spaces
```

> ⚠️ The temporary token expires in ~24h. For a permanent setup, create a **System User** with a permanent token in Meta Business Settings.

### Option C — Email via Resend (free tier)

1. Sign up at <https://resend.com>, create an **API key**.
2. Use the built-in sender `onboarding@resend.dev` (or verify your own domain).
3. In `server/.env`:

```env
RESEND_API_KEY=re_your_key
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=you@example.com
```

You'll receive a message that looks like:

```
🎂 Birthday Gift Request 🎁

She wants:
[whatever she typed]

Sent from the birthday website.
```

---

## 🎵 Music (optional)

Background audio **never autoplays** (mobile browsers block that anyway) — a floating 🔇/🔊 button lets her turn it on.

1. Put an `.mp3` file in `client/public/`, e.g. `client/public/birthday-song.mp3`.
2. Set it in `client/src/config.ts`:

```ts
musicFile: "birthday-song.mp3",
```

Leave it as `""` to hide the music button entirely. Use a song you have the rights to.

---

## 📱 Mobile

The whole thing is built mobile-first and tuned for iPhone/Android, Safari and Chrome:

- Large touch-friendly buttons and `100dvh` full-screen layouts.
- The "No Gift Needed" button dodges on `pointerdown` / `touchstart`, so it escapes **before** a tap can land.
- It always stays inside the viewport and never covers the input.
- Just send her the link — nothing to install.

---

## 🌍 Deploy & share

### Easiest: one service on Render (frontend + backend together)

The Express server can serve the built React app, so you can deploy everything as a **single** service.

1. Push this folder to a GitHub repo.
2. On <https://render.com> → **New → Blueprint**, point it at your repo (it reads `render.yaml`).
3. After it deploys, open the service → **Environment** and add your notification secrets (e.g. `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`).
4. Share the Render URL with her. 🎉

Manual Render settings (if not using the blueprint):
- **Build command:** `npm run build && npm --prefix server install`
- **Start command:** `npm --prefix server start`

The same commands work on **Railway**, **Fly.io**, or any Node host.

### Alternative: split deploy (frontend on Vercel/Netlify, backend on Render)

1. Deploy `server/` to Render/Railway. Set `CLIENT_ORIGIN` to your frontend URL and add your notification secrets.
2. Deploy `client/` to Vercel/Netlify (build command `npm run build`, output dir `dist`).
3. Point the frontend at the backend: in `client/src/config.ts` change `giftApiEndpoint` to your backend's full URL, e.g. `https://your-api.onrender.com/api/gift-request`.

---

## 🔐 Security

- All secrets live in `server/.env` (or your host's env settings) — **never** in frontend code. `.env` is git-ignored.
- The gift endpoint is **rate limited** to 5 requests / 10 minutes per IP to prevent spam.
- Input is validated and length-capped (500 chars) and is **not stored** anywhere — it's forwarded and forgotten.
- Set `CLIENT_ORIGIN` in production to lock CORS to your own frontend.

---

## 🧪 API reference

`POST /api/gift-request`

```json
{ "gift": "AirPods Pro 🎧" }
```

Response:

```json
{ "ok": true, "channel": "telegram", "message": "Gift request received successfully! 🎁❤️" }
```

`GET /api/health` → `{ "ok": true, "status": "alive 🎂" }`

---

Made with 💖 — go make her day.
