// =====================================================================
//  💖  PERSONALIZE YOUR BIRTHDAY WEBSITE HERE  💖
//  Change these values, that's it. No other file needs editing.
// =====================================================================

export type StoryPage = {
  title: string;
  lines: string[];
  cta?: string;
};

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

  // 📮 GitHub Pages / no-server mode: paste your Formspree form endpoint here
  // (looks like "https://formspree.io/f/abcdwxyz"). When set, the gift request
  // is emailed to you via Formspree and NO backend is needed.
  // Get one free at https://formspree.io (see README → "Host on GitHub Pages").
  // Leave "" to use the Node backend (giftApiEndpoint) instead.
  formspreeEndpoint: "",

  // ---- Home page (Tanglish) ----
  homeKicker: "unakaga oru chinna surprise 🎁",
  homeCta: "Innum niraya irukku ❤️ →",

  // Birthday wishes shown one-by-one on the Home page (Tanglish).
  wishes: [
    "En life la romba special aana oruthiku... Happy Birthday da ❤️",
    "Un smile eppovum ipdiye azhaga irukanum ✨",
    "Indha varusham un ella kanavum nanavaaganum 💕",
    "Ellame santhosham, love, success un kitta thediki varanum 🌸",
    "Ipdiye siriccha, ipdiye enna kalaaicha, ipdiye iru da 😂❤️",
  ],

  // ---- The 8 pages (excluding Home). The 8th page is the Gift page. ----
  // These 7 are the story/message pages; the gift page comes after them.
  storyPages: [
    {
      title: "Vaanga Birthday Girl! 🎉",
      lines: [
        "Inniku unnoda sp..special naal da ❤️",
        "Idhu unakaga naan panna oru chinna surprise 🥳",
        "Ready ah? Adutha page ku vaa 👀",
      ],
      cta: "Vaa da 👉",
    },
    {
      title: "Nee Romba Special 🌸",
      lines: [
        "Un smile ah paakumbodhu ellarukum santhosham 😊",
        "Un kitta iruka andha positive vibe... adhu rare da 💫",
        "Un maadhiri oru friend kedaikardhu periya luck ❤️",
      ],
      cta: "Adutha page 👉",
    },
    {
      title: "Namma Kadhai 📖",
      lines: [
        "Ethana sandai, ethana siripu... ellame nyabagam varudhu 😂",
        "Andha 2AM talks, andha useless photos... epdi marakka mudiyum 🥹",
        "Nee enakku best friend mattum illa, family maadhiri da 💖",
      ],
      cta: "Innum irukku 👉",
    },
    {
      title: "En Vaazhthukkal 🎂",
      lines: [
        "Un ella kanavum nanavaave nadakanum 🙏",
        "Romba santhosama, healthy ah, tension illama iru 🌈",
        "Nee deserve panra ellame un kitta varanum ❤️",
      ],
      cta: "Adutha onnu 👉",
    },
    {
      title: "Konjam Kalaaikalaam 😏",
      lines: [
        "Ippo un age konjam koodiruchu... but kavala padadha 😂",
        "Naan yaar kittayum sollala, secret safe 🤐",
        "Aana cake full ah nee dhaan saapdanum, sharing kidaiyaadhu 🍰",
      ],
      cta: "Hehe adutha page 👉",
    },
    {
      title: "Nandri Da 🥰",
      lines: [
        "Naan kashtapadumbodhu nee dhaan mudhalla therinja 🤗",
        "Ella time la yum en side la irundhadhukku nandri ❤️",
        "Un maadhiri friend kedaicha naan romba lucky 🍀",
      ],
      cta: "Kadaisi ah onnu 👉",
    },
    {
      title: "Oru Chinna Vishayam 🎁",
      lines: [
        "Inniku un birthday, so oru gift kandippa venum 🎉",
        "Adhukku naan ready... aana nee dhaan sollanum enna venumnu 👀",
        "Adutha page la sollu, naan vaangi tharen (try pannuren 😂❤️)",
      ],
      cta: "Gift sollen 🎁",
    },
  ] as StoryPage[],
};

export type AppConfig = typeof config;
