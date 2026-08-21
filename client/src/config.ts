// =====================================================================
//  💖  PERSONALIZE YOUR BIRTHDAY WEBSITE HERE  💖
//  Change these values, that's it. No other file needs editing.
// =====================================================================

export const config = {
  // Her name — shows up in the big heading: "Happy Birthday, <NAME> ❤️"
  bestFriendName: "Kaviya",

  // Optional background music.
  // Put an .mp3 file in client/public/ and set the filename here,
  // e.g. "birthday-song.mp3". Leave "" to hide the music button.
  musicFile: "",

  // The API endpoint that sends the gift request to you.
  // Leave as "/api/gift-request" — the frontend proxies to your backend.
  giftApiEndpoint: "/api/gift-request",

  // Birthday wishes shown one-by-one on Page 1.
  wishes: [
    "Happy Birthday to one of the most special people in my life ❤️",
    "May your smile stay this beautiful forever ✨",
    "May this year bring you everything you've been wishing for 💕",
    "You deserve all the happiness, love and success in the world 🌸",
    "Keep smiling, keep annoying me, and keep being the amazing person you are 😂❤️",
    "You are officially one year older... but don't worry, I won't expose your age 😌",
    "Thank you for every laugh, every rant and every 2am talk 🥹",
    "No matter where life takes us, you'll always be my person 💌",
    "Here's to another year of chaos, memories and inside jokes 🎉",
  ],
};

export type AppConfig = typeof config;
