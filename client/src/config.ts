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

  // Optional background music file (put an .mp3 in client/public/).
  // Leave "" to use the built-in synthesized "Happy Birthday" tune instead.
  musicFile: "",

  // Built-in Happy Birthday music (synthesized, no file needed) + a spoken
  // "Happy Birthday <name>!" the first time it starts.
  birthdayMusic: true,

  // The API endpoint that sends the gift request to you.
  giftApiEndpoint: "/api/gift-request",

  // 📮 GitHub Pages / no-server mode: paste your Formspree form endpoint here
  // (looks like "https://formspree.io/f/abcdwxyz"). When set, the gift request
  // is emailed to you via Formspree and NO backend is needed.
  formspreeEndpoint: "https://formspree.io/f/xvkpldyo",

  // ---- Home page ----
  homeKicker: "unakaga oru chinna surprise 🎁",
  homeCta: "There's more ❤️ →",

  // Birthday wishes shown one-by-one on the Home page (Tanglish).
  wishes: [
    "En life la romba special aana oruthiku... Happy Birthday di ❤️",
    "Un smile eppovum ipdiye azhaga irukanum ✨",
    "Indha varusham un ella kanavum nanavaaganum 💕",
    "Nalla doctor aaganum, nalla manushi ah eppovum iru di 🩺",
    "Ipdiye siriccha, ipdiye enna kalaaicha, ipdiye iru di 😂❤️",
  ],

  // ---- The 8 pages (excluding Home). The 8th page is the Gift page. ----
  // These 7 are the story/message pages; the gift page comes after them.
  storyPages: [
    {
      title: "Best Friend 🌸",
      lines: [
        "Kadaisi 4-5 months la dhan nee enakku nalla friend aana 😊",
        "Aana ipdi oru nalla friend kedaichadhu enakku oru luck dhan di ❤️",
        "Un maadhiri oru per kedaikardhu easy illa di 🌸",
      ],
      cta: "Next →",
    },
    {
      title: "Happy 23! 🎂",
      lines: [
        "Inniku nee 23 aayiten di 🎉",
        "Aana enakku nee innum oru chinna kozhandhai dhan 😜",
        "Innum niraya dooram poganum di... miles more to go 🚀",
      ],
      cta: "Next →",
    },
    {
      title: "Take Care 🩺",
      lines: [
        "Future la nee oru doctor aaga poriya di 👩‍⚕️",
        "Ellarayum health ah paathuka solra nee dhan... 💊",
        "Aana mudhalla un health ah nee nalla paathuko di ❤️",
      ],
      cta: "Next →",
    },
    {
      title: "Move On 💪",
      lines: [
        "Un future la oru nalla paiyan kandippa kedaipan di 🥰",
        "Andha ex ah pathi innum nenichitu irukatha di 🙅‍♀️",
        "Please move on... nee idhukellam periyava di ❤️",
      ],
      cta: "Next →",
    },
    {
      title: "Work Hard 🌟",
      lines: [
        "Un life ah nee nalla vaazhu di 🌟",
        "Appa amma ku nee dhan thaangu, avanga perumai nee di 🩺",
        "So life la kashtapattu, hard work pannu di 💪",
      ],
      cta: "Next →",
    },
    {
      title: "Stay The Same 💖",
      lines: [
        "Ipo nee irukura maadhiri eppovum ipdiye iru di 😊",
        "Konjam kooda maaratha di ❤️",
        "Indha cute-um indha kindal-um ellame ipdiye venum 🥰",
      ],
      cta: "Next →",
    },
    {
      title: "Happy Birthday Again! 🎉",
      lines: [
        "Konjam late... but not the least di 😅",
        "Once again, Happy Birthday Kaviya 🎂❤️",
        "Indha varusham full ah blast pannu di 🥳",
      ],
      cta: "Tell Me Your Gift 🎁",
    },
  ] as StoryPage[],
};

export type AppConfig = typeof config;
