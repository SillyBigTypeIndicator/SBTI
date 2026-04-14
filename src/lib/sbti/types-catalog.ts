import type { AxisScores } from "./axes";
import { lettersFromAxes } from "./axes";

export type SBTITypeDefinition = {
  code: string;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  chaosLevel: number; // 1–10
  postingStyle: string;
  idealJob: string;
  friendGroupRole: string;
  /** Types that vibe well as collaborators */
  compatibleWith: string[];
};

/** Deterministic: derive catalog key from axis scores */
export function typeCodeFromScores(scores: AxisScores): string {
  return lettersFromAxes(scores);
}

const catalog: Record<string, SBTITypeDefinition> = {
  EOVA: {
    code: "EOVA",
    name: "Main Character Meteor",
    tagline: "You enter rooms like a season finale.",
    description:
      "You narrate your life in real time, keep a mental leaderboard of vibes, and treat group chats like broadcast television. You mean well—loudly.",
    strengths: ["Starts momentum", "Names the vibe", "Turns chaos into plot"],
    weaknesses: ["Forgets to mute", "May steamroll nuance", "Screenshots first, asks later"],
    chaosLevel: 9,
    postingStyle: "Caps lock sincerity with receipts.",
    idealJob: "Head of Hype at a startup that sells feelings.",
    friendGroupRole: "The one who books the table and the drama.",
    compatibleWith: ["ILMP", "IOVP", "ELMP"],
  },
  EOVP: {
    code: "EOVP",
    name: "Friendly Raid Boss",
    tagline: "High damage, low betrayal.",
    description:
      "You’re competitive in the way a golden retriever is competitive: you want everyone to win, but you still want to win slightly more.",
    strengths: ["Builds coalitions", "Keeps energy up", "De-escalates with jokes"],
    weaknesses: ["Overcommits", "Reads tone poorly when tired", "Will ping you at 11pm"],
    chaosLevel: 7,
    postingStyle: "Threads that start wholesome and end in lore.",
    idealJob: "Community lead for a fandom that doesn’t exist yet.",
    friendGroupRole: "The organizer who also starts the inside jokes.",
    compatibleWith: ["ILMP", "IOMA", "ELVP"],
  },
  EOMA: {
    code: "EOMA",
    name: "Drama Documentarian",
    tagline: "If it happened, it’s canon.",
    description:
      "You treat feelings like weather: measurable, memeable, and occasionally hurricane-grade. You’re not messy—you’re thorough.",
    strengths: ["Emotional HD", "Great storyteller", "Protective of friends"],
    weaknesses: ["Can spiral on subtweets", "Needs closure like oxygen", "Archive anxiety"],
    chaosLevel: 8,
    postingStyle: "Voice notes that should be podcasts.",
    idealJob: "Investigator of vibes (freelance).",
    friendGroupRole: "The one who remembers what everyone said in 2019.",
    compatibleWith: ["ILVP", "IOVA", "ELVA"],
  },
  EOMP: {
    code: "EOMP",
    name: "Hype Librarian",
    tagline: "Chaos, but alphabetized.",
    description:
      "You’re loud about boundaries and soft about people. You want the group chat organized, but you also want fireworks.",
    strengths: ["Explains things clearly", "Hosts well", "Balances fun and care"],
    weaknesses: ["Overplans spontaneity", "Takes minutes in the group chat", "Folder guilt"],
    chaosLevel: 6,
    postingStyle: "Beautifully formatted opinions.",
    idealJob: "Creative ops for a meme agency.",
    friendGroupRole: "The one who brings snacks and a spreadsheet.",
    compatibleWith: ["ILMA", "IOVP", "ELMP"],
  },
  ELVA: {
    code: "ELVA",
    name: "Chaos Goblin CEO",
    tagline: "You run on spite and Wi‑Fi.",
    description:
      "Structure is a suggestion, sleep is negotiable, and your notifications are a lifestyle. You’re magnetic because nobody knows what you’ll do next.",
    strengths: ["Improvises brilliantly", "Fearless energy", "Invents new problems to solve"],
    weaknesses: ["Deadlines are vibes", "May vanish mid-project", "Inbox is a museum"],
    chaosLevel: 10,
    postingStyle: "Unhinged drafts folder energy.",
    idealJob: "Founder of a company that pivots weekly (on purpose).",
    friendGroupRole: "The one who starts the chaos and somehow finishes it.",
    compatibleWith: ["IOMA", "ILVP", "EOMA"],
  },
  ELVP: {
    code: "ELVP",
    name: "Meme Syndicate Intern",
    tagline: "You’re here to uplift and mildly derail.",
    description:
      "You’re the comic relief with a heart. You’ll roast the plan, then execute it better than anyone expected—mostly because you’re avoiding boredom.",
    strengths: ["Quick wit", "Reads the room", "Makes hard days lighter"],
    weaknesses: ["Avoids serious emails", "Procrastinates until inspiration hits", "Too many tabs"],
    chaosLevel: 8,
    postingStyle: "Reaction memes with surprising empathy.",
    idealJob: "Creative strategist for extremely online brands.",
    friendGroupRole: "The one who turns venting into a bit (kindly).",
    compatibleWith: ["IOVP", "ILMP", "EOVP"],
  },
  ELMA: {
    code: "ELMA",
    name: "Speedrun Poster",
    tagline: "You feel everything at 2× speed.",
    description:
      "You’re loopcore with feelings: spontaneous, intense, and allergic to empty calendars. If life is a game, you’re trying any% completion.",
    strengths: ["High output", "Bold honesty", "Infectious enthusiasm"],
    weaknesses: ["Burnout cycles", "Impulse purchases of hobbies", "Notification debt"],
    chaosLevel: 9,
    postingStyle: "Late-night essays disguised as jokes.",
    idealJob: "Producer for chaotic-good content.",
    friendGroupRole: "The one who says what everyone’s thinking—fast.",
    compatibleWith: ["ILMP", "IOVA", "EOVA"],
  },
  ELMP: {
    code: "ELMP",
    name: "Tab Hoarder Supreme",
    tagline: "You contain multitudes (and 400 tabs).",
    description:
      "You’re online enough to be dangerous, offline enough to be mysterious. You collect ideas like stickers and occasionally apply one.",
    strengths: ["Deep dives", "Surprising takes", "Loyal in small groups"],
    weaknesses: ["Decision fatigue", "May ghost a plan but not a person", "Bookmark black hole"],
    chaosLevel: 7,
    postingStyle: "Screenshots and half-finished drafts.",
    idealJob: "Research lead for vibes-based decisions.",
    friendGroupRole: "The one who knows the lore but won’t explain until asked.",
    compatibleWith: ["EOVP", "IOMA", "ILVP"],
  },
  IOVA: {
    code: "IOVA",
    name: "Soft Launch Strategist",
    tagline: "Quiet power, loud results.",
    description:
      "You’re selective with your energy, but when you commit, you commit like a patch note: precise, thoughtful, and a little scary.",
    strengths: ["Strategic", "Consistent", "Protects focus"],
    weaknesses: ["Hard to read at first", "Perfection loops", "Under-shares until it’s big"],
    chaosLevel: 5,
    postingStyle: "Minimal captions, maximum implication.",
    idealJob: "Product lead for something tasteful and terrifying.",
    friendGroupRole: "The one who fixes the plan without taking credit.",
    compatibleWith: ["ELMA", "EOMA", "ILVP"],
  },
  IOVP: {
    code: "IOVP",
    name: "Quiet Brand Evangelist",
    tagline: "You stan responsibly.",
    description:
      "You’re warm without being loud. You build trust slowly, then suddenly everyone is quoting you. You’re basically a human testimonial.",
    strengths: ["Great listener", "Steady support", "Writes thoughtful replies"],
    weaknesses: ["Avoids conflict until it’s spicy", "Overthinks DMs", "Says “I’m fine” too often"],
    chaosLevel: 4,
    postingStyle: "Thoughtful replies that go viral anyway.",
    idealJob: "Customer love lead who actually means it.",
    friendGroupRole: "The one who remembers birthdays and boundaries.",
    compatibleWith: ["ELVP", "EOVP", "ILMA"],
  },
  IOMA: {
    code: "IOMA",
    name: "Cryptic Hint Machine",
    tagline: "You speak in Easter eggs.",
    description:
      "You keep your intensity behind a velvet rope. People think you’re calm; your drafts folder says otherwise.",
    strengths: ["Subtle influence", "Creative depth", "Loyalty once earned"],
    weaknesses: ["Assumes people can read minds", "Rumination loops", "Spicy passive-aggression when stressed"],
    chaosLevel: 6,
    postingStyle: "One sentence that ruins someone’s week (politely).",
    idealJob: "Narrative designer for emotional puzzle games.",
    friendGroupRole: "The one who notices everything and says 10% of it.",
    compatibleWith: ["ELVA", "EOMA", "ILMP"],
  },
  IOMP: {
    code: "IOMP",
    name: "Offline Sage",
    tagline: "Peace is a practice, not a personality.",
    description:
      "You’re not antisocial—you’re conserving bandwidth for what matters. You prefer depth over noise, and you’re scary-good at both.",
    strengths: ["Calm under pressure", "Wise counsel", "Low drama"],
    weaknesses: ["Hard to reach", "May disappear to recharge", "Underestimates your impact"],
    chaosLevel: 3,
    postingStyle: "Rare posts, eternal relevance.",
    idealJob: "Advisor to people who should’ve slept.",
    friendGroupRole: "The one people go to for real talk.",
    compatibleWith: ["EOVA", "ELMP", "ILVP"],
  },
  ILVA: {
    code: "ILVA",
    name: "Precision Troll",
    tagline: "Chaos with citations.",
    description:
      "You’re quiet until you’re not—then it’s surgical. You enjoy breaking bad ideas gently, like a cat pushing a glass toward the edge.",
    strengths: ["Sharp analysis", "Independent thinking", "Meme-grade timing"],
    weaknesses: ["Can be blunt", "Enjoys being right too much", "Resting skeptic face"],
    chaosLevel: 7,
    postingStyle: "Dry quote tweets that end debates.",
    idealJob: "Editor-in-chief of the group chat’s reality.",
    friendGroupRole: "The one who asks the question that changes the night.",
    compatibleWith: ["EOMA", "ELVA", "IOMA"],
  },
  ILVP: {
    code: "ILVP",
    name: "Lurker With Opinions",
    tagline: "You observe, you annotate, you ascend.",
    description:
      "You’re not absent—you’re buffering. You prefer small circles, big ideas, and the moral high ground of never starting drama (often).",
    strengths: ["Insightful", "Low noise", "Surprisingly funny in private"],
    weaknesses: ["Hard to coax out", "Overthinks posting", "May stew in silence"],
    chaosLevel: 4,
    postingStyle: "Likes and bookmarks as communication.",
    idealJob: "Research ghostwriter for people who talk too much.",
    friendGroupRole: "The one who knows everything and shares on a need-to-know basis.",
    compatibleWith: ["EOMA", "ELVA", "IOMP"],
  },
  ILMA: {
    code: "ILMA",
    name: "Minimalist Menace",
    tagline: "Small footprint, big fallout.",
    description:
      "You keep your life tidy and your feelings complicated. You’re not trying to be intense—it just happens in high resolution.",
    strengths: ["Self-aware", "Focused", "Emotionally articulate in private"],
    weaknesses: ["All-or-nothing moods", "Isolation spirals", "Over-cleaning as coping"],
    chaosLevel: 6,
    postingStyle: "A single emoji that means a novel.",
    idealJob: "Creative director for melancholic aesthetics.",
    friendGroupRole: "The one who checks in quietly and deeply.",
    compatibleWith: ["EOMP", "IOVP", "ILMP"],
  },
  ILMP: {
    code: "ILMP",
    name: "Void Enjoyer",
    tagline: "You thrive in the quiet between notifications.",
    description:
      "You’re the chill cryptid: gentle, self-contained, and surprisingly stubborn about your peace. You’re not boring—you’re curated.",
    strengths: ["Stable", "Independent", "Thoughtful boundaries"],
    weaknesses: ["Hard to read", "Avoids the spotlight", "May under-share needs"],
    chaosLevel: 2,
    postingStyle: "Annual post that goes hard.",
    idealJob: "Head of Nothing (it’s a real department).",
    friendGroupRole: "The one who keeps the group grounded.",
    compatibleWith: ["EOVA", "ELMA", "IOMA"],
  },
};

export function getSBTITypeDefinition(code: string): SBTITypeDefinition {
  const def = catalog[code];
  if (!def) {
    return {
      code,
      name: "Unlabeled Vibe Packet",
      tagline: "Even chaos needs a name—yours is loading.",
      description:
        "This code isn’t in the catalog yet, which either means you broke math or you’re early. Try a retake after coffee.",
      strengths: ["Mysterious", "Original", "Unbothered by labels"],
      weaknesses: ["Uncatalogued", "May need a refresh", "Suspiciously unique"],
      chaosLevel: 5,
      postingStyle: "Experimental formatting.",
      idealJob: "Beta tester of reality.",
      friendGroupRole: "Wildcard.",
      compatibleWith: ["EOVP", "ILMP", "IOVP"],
    };
  }
  return def;
}

export function allTypeCodes(): string[] {
  return Object.keys(catalog);
}
