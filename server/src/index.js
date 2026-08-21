import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { notify } from "./notifiers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.set("trust proxy", 1); // needed for correct IPs behind Render/Railway/etc.
app.use(express.json({ limit: "16kb" }));

// CORS: allow your deployed frontend origin (set CLIENT_ORIGIN), or all in dev.
const clientOrigin = process.env.CLIENT_ORIGIN;
app.use(
  cors({
    origin: clientOrigin ? clientOrigin.split(",").map((s) => s.trim()) : true,
  })
);

// Rate limit the gift endpoint to prevent spam: 5 requests / 10 min / IP.
const giftLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Too many requests, please wait a little while 🥺",
  },
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, status: "alive 🎂" });
});

app.post("/api/gift-request", giftLimiter, async (req, res) => {
  const raw = req.body?.gift;

  // Basic validation.
  if (typeof raw !== "string" || !raw.trim()) {
    return res.status(400).json({
      ok: false,
      message: "Come on... you can't say you don't want anything 😏",
    });
  }
  const gift = raw.trim().slice(0, 500); // cap length, don't persist anywhere.

  try {
    const result = await notify(gift);
    return res.json({
      ok: true,
      channel: result.channel,
      message: "Gift request received successfully! 🎁❤️",
    });
  } catch (err) {
    if (err.code === "NO_CHANNEL_CONFIGURED") {
      console.warn(
        "\n⚠️  No notification channel configured. Gift request received but NOT sent:\n" +
          `   → "${gift}"\n` +
          "   Add WhatsApp / Telegram / email credentials to server/.env\n"
      );
      // Still return success so the birthday experience isn't broken.
      return res.json({
        ok: true,
        channel: "none",
        message: "Gift request received successfully! 🎁❤️",
      });
    }
    console.error("[gift-request] failed:", err);
    return res.status(502).json({
      ok: false,
      message: "Could not send the request right now. Please try again 🥲",
    });
  }
});

// ---------------------------------------------------------------------
// Optionally serve the built frontend from this same server.
// Run `npm run build` in /client, then start the server — it will serve
// client/dist so you can deploy frontend + backend as ONE service.
// ---------------------------------------------------------------------
const distPath = path.resolve(__dirname, "../../client/dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  console.log("📦 Serving built frontend from client/dist");
}

app.listen(PORT, () => {
  console.log(`🎂 Birthday server running on http://localhost:${PORT}`);
});
