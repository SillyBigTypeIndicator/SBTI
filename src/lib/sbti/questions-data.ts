import { z } from "zod";

export const optionWeightsSchema = z.object({
  e: z.number(),
  o: z.number(),
  v: z.number(),
  a: z.number(),
});

export type OptionWeights = z.infer<typeof optionWeightsSchema>;

export type SBTIQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string; weights: OptionWeights }[];
};

/** 28 questions — original parody prompts (not affiliated with any external test) */
export const SBTI_QUESTIONS: SBTIQuestion[] = [
  {
    id: "q1",
    prompt: "Your group chat is blowing up at midnight. You…",
    options: [
      { id: "a", label: "Arrive with takes and a snack tier list", weights: { e: 2, o: 1, v: 2, a: 1 } },
      { id: "b", label: "Read everything and respond with one perfect emoji", weights: { e: -1, o: 2, v: -1, a: -1 } },
      { id: "c", label: "Mute until morning, then send a thesis", weights: { e: -2, o: 2, v: 1, a: 0 } },
      { id: "d", label: "Start a poll to restore order", weights: { e: 1, o: 2, v: 0, a: 2 } },
    ],
  },
  {
    id: "q2",
    prompt: "A new app drops and everyone pretends they always knew about it. You…",
    options: [
      { id: "a", label: "Install immediately and become the tutorial person", weights: { e: 2, o: 1, v: 1, a: 1 } },
      { id: "b", label: "Wait a week for the patch notes of society", weights: { e: -2, o: 2, v: -1, a: -1 } },
      { id: "c", label: "Post a joke review before reading the terms", weights: { e: 1, o: -2, v: 2, a: 0 } },
      { id: "d", label: "Research quietly, then drop a link like a bat signal", weights: { e: -1, o: 2, v: 0, a: 1 } },
    ],
  },
  {
    id: "q3",
    prompt: "Your calendar looks like modern art. Your reaction is…",
    options: [
      { id: "a", label: "Color-code until it becomes a personality", weights: { e: 0, o: 2, v: 0, a: 1 } },
      { id: "b", label: "Ignore it and trust vibes (risky)", weights: { e: 0, o: -2, v: 1, a: -1 } },
      { id: "c", label: "Cancel one thing to feel alive", weights: { e: -1, o: -1, v: 2, a: 1 } },
      { id: "d", label: "Add a ‘breathing’ block like you’re a firmware update", weights: { e: 0, o: 2, v: -1, a: -1 } },
    ],
  },
  {
    id: "q4",
    prompt: "Someone is wrong on the internet (again). You…",
    options: [
      { id: "a", label: "Debate with sources and screenshots", weights: { e: 2, o: 1, v: 2, a: 2 } },
      { id: "b", label: "Close the tab and touch grass (metaphorically)", weights: { e: -2, o: 1, v: -2, a: -2 } },
      { id: "c", label: "Quote tweet with a joke that ends careers", weights: { e: 1, o: -1, v: 2, a: 1 } },
      { id: "d", label: "Send a private message like a diplomat", weights: { e: -1, o: 2, v: 0, a: -2 } },
    ],
  },
  {
    id: "q5",
    prompt: "Your ideal weekend is…",
    options: [
      { id: "a", label: "People, plans, and a little planned chaos", weights: { e: 2, o: 1, v: 1, a: 0 } },
      { id: "b", label: "Solo project + playlist + zero obligations", weights: { e: -2, o: 1, v: 0, a: -1 } },
      { id: "c", label: "Spontaneous trip because someone said ‘what if’", weights: { e: 1, o: -2, v: 2, a: 1 } },
      { id: "d", label: "Hosting: you bring the board games and boundaries", weights: { e: 2, o: 2, v: 0, a: 1 } },
    ],
  },
  {
    id: "q6",
    prompt: "Notifications are…",
    options: [
      { id: "a", label: "Dopamine slot machines (I’m fine)", weights: { e: 2, o: -1, v: 2, a: 0 } },
      { id: "b", label: "A tax I pay to exist online", weights: { e: -1, o: 2, v: -1, a: -1 } },
      { id: "c", label: "A to-do list written by gremlins", weights: { e: 0, o: -2, v: 1, a: 1 } },
      { id: "d", label: "Managed like a small government", weights: { e: 0, o: 2, v: -2, a: 1 } },
    ],
  },
  {
    id: "q7",
    prompt: "When you learn something new, you…",
    options: [
      { id: "a", label: "Tell everyone immediately (education is sharing)", weights: { e: 2, o: 0, v: 1, a: 0 } },
      { id: "b", label: "Take notes and forget where you saved them", weights: { e: -1, o: -1, v: 0, a: -1 } },
      { id: "c", label: "Go deep until it’s a personality trait", weights: { e: -1, o: 1, v: 2, a: 1 } },
      { id: "d", label: "Build a system so you never learn it wrong again", weights: { e: 0, o: 2, v: 0, a: 1 } },
    ],
  },
  {
    id: "q8",
    prompt: "Your relationship with deadlines is best described as…",
    options: [
      { id: "a", label: "We’re coworkers who respect each other", weights: { e: 0, o: 2, v: 0, a: 1 } },
      { id: "b", label: "They’re suggestions from a parallel universe", weights: { e: 0, o: -2, v: 2, a: 0 } },
      { id: "c", label: "I finish early to flex emotionally", weights: { e: 1, o: 2, v: 1, a: 2 } },
      { id: "d", label: "I need adrenaline to unlock literacy", weights: { e: 1, o: -2, v: 2, a: 1 } },
    ],
  },
  {
    id: "q9",
    prompt: "A friend vents for 20 minutes. You…",
    options: [
      { id: "a", label: "Match their energy and escalate supportively", weights: { e: 1, o: 0, v: 2, a: 0 } },
      { id: "b", label: "Listen quietly and ask one sharp question", weights: { e: -1, o: 1, v: 0, a: -1 } },
      { id: "c", label: "Offer solutions like a startup founder", weights: { e: 1, o: 2, v: 0, a: 2 } },
      { id: "d", label: "Send memes until the vibe stabilizes", weights: { e: 1, o: -1, v: 2, a: -1 } },
    ],
  },
  {
    id: "q10",
    prompt: "Your shopping cart is…",
    options: [
      { id: "a", label: "A vision board with shipping fees", weights: { e: 1, o: -1, v: 2, a: 0 } },
      { id: "b", label: "Curated, compared, and slightly haunted", weights: { e: -1, o: 2, v: 0, a: 0 } },
      { id: "c", label: "Empty because I’m ‘being good’ (lying)", weights: { e: -1, o: 1, v: 1, a: -1 } },
      { id: "d", label: "One weird item that explains my entire psyche", weights: { e: 0, o: -2, v: 2, a: 1 } },
    ],
  },
  {
    id: "q11",
    prompt: "Conflict in a group project appears. You…",
    options: [
      { id: "a", label: "Take the mic and propose a structure", weights: { e: 2, o: 2, v: 1, a: 2 } },
      { id: "b", label: "Slip helpful notes like a ghost editor", weights: { e: -2, o: 2, v: -1, a: -2 } },
      { id: "c", label: "Make a joke so nobody cries", weights: { e: 1, o: -1, v: 2, a: -1 } },
      { id: "d", label: "Divide tasks like a benevolent warlord", weights: { e: 1, o: 2, v: 0, a: 2 } },
    ],
  },
  {
    id: "q12",
    prompt: "Your aesthetic online is…",
    options: [
      { id: "a", label: "Curated chaos with good lighting", weights: { e: 2, o: -1, v: 2, a: 0 } },
      { id: "b", label: "Minimalist until you’re not", weights: { e: -1, o: 2, v: 0, a: 0 } },
      { id: "c", label: "Lore-heavy and slightly threatening", weights: { e: -1, o: 1, v: 2, a: 1 } },
      { id: "d", label: "Friendly and approachable (weaponized)", weights: { e: 2, o: 1, v: 0, a: -1 } },
    ],
  },
  {
    id: "q13",
    prompt: "When plans change last minute, you feel…",
    options: [
      { id: "a", label: "Thrilled—new timeline unlocked", weights: { e: 1, o: -2, v: 2, a: 0 } },
      { id: "b", label: "Annoyed but adaptable (silently)", weights: { e: -1, o: 1, v: 0, a: -1 } },
      { id: "c", label: "Ready to negotiate like it’s a sport", weights: { e: 1, o: 2, v: 1, a: 2 } },
      { id: "d", label: "Relieved—I wanted an excuse to stay in", weights: { e: -2, o: 1, v: -1, a: -2 } },
    ],
  },
  {
    id: "q14",
    prompt: "You get a compliment in public. You…",
    options: [
      { id: "a", label: "Radiate like a lighthouse", weights: { e: 2, o: 0, v: 2, a: 0 } },
      { id: "b", label: "Nod and evaporate", weights: { e: -2, o: 1, v: -2, a: -2 } },
      { id: "c", label: "Deflect with humor (too fast)", weights: { e: 1, o: -1, v: 1, a: -1 } },
      { id: "d", label: "Say thank you like you practiced in a mirror", weights: { e: 0, o: 2, v: 0, a: 1 } },
    ],
  },
  {
    id: "q15",
    prompt: "Your notes app contains…",
    options: [
      { id: "a", label: "Lists inside lists (inception)", weights: { e: 0, o: 2, v: 0, a: 1 } },
      { id: "b", label: "Poetry and passwords (bad)", weights: { e: -1, o: -2, v: 2, a: 0 } },
      { id: "c", label: "Half-baked ideas labeled ‘later’", weights: { e: 0, o: -1, v: 1, a: -1 } },
      { id: "d", label: "Nothing—I live in the moment (lie)", weights: { e: 1, o: -2, v: 2, a: 1 } },
    ],
  },
  {
    id: "q16",
    prompt: "A trend is annoying but everywhere. You…",
    options: [
      { id: "a", label: "Participate ironically until it’s sincere", weights: { e: 2, o: -1, v: 2, a: 0 } },
      { id: "b", label: "Observe from a distance like a scientist", weights: { e: -2, o: 2, v: -1, a: 0 } },
      { id: "c", label: "Complain creatively", weights: { e: 1, o: 0, v: 2, a: 1 } },
      { id: "d", label: "Ignore it until it dies naturally", weights: { e: -1, o: 1, v: -2, a: -2 } },
    ],
  },
  {
    id: "q17",
    prompt: "Your dream collaboration is with…",
    options: [
      { id: "a", label: "A crowd—more minds, more memes", weights: { e: 2, o: 0, v: 1, a: 0 } },
      { id: "b", label: "One person who gets your weird", weights: { e: -2, o: 1, v: 1, a: 0 } },
      { id: "c", label: "Future you (time travel budget pending)", weights: { e: -1, o: 1, v: 2, a: 1 } },
      { id: "d", label: "A rival—healthy competition", weights: { e: 1, o: 1, v: 1, a: 2 } },
    ],
  },
  {
    id: "q18",
    prompt: "When you’re stressed, you…",
    options: [
      { id: "a", label: "Talk it out until it’s a podcast", weights: { e: 2, o: 0, v: 2, a: 0 } },
      { id: "b", label: "Go quiet and fix things in silence", weights: { e: -2, o: 2, v: 0, a: -1 } },
      { id: "c", label: "Make jokes to avoid feelings (works until it doesn’t)", weights: { e: 1, o: -1, v: 2, a: -1 } },
      { id: "d", label: "Make a plan so aggressive it calms you down", weights: { e: 0, o: 2, v: 1, a: 2 } },
    ],
  },
  {
    id: "q19",
    prompt: "Your relationship with ‘reply all’ is…",
    options: [
      { id: "a", label: "Weaponized joy", weights: { e: 2, o: -1, v: 2, a: 1 } },
      { id: "b", label: "A crime scene I avoid", weights: { e: -2, o: 2, v: -2, a: -2 } },
      { id: "c", label: "Situational comedy", weights: { e: 1, o: -2, v: 2, a: 0 } },
      { id: "d", label: "Only if I’m saving everyone", weights: { e: 1, o: 2, v: 0, a: 2 } },
    ],
  },
  {
    id: "q20",
    prompt: "You discover a new hyperfixation. It lasts…",
    options: [
      { id: "a", label: "Until the next shiny object (beautiful)", weights: { e: 1, o: -2, v: 2, a: 0 } },
      { id: "b", label: "Long enough to become an expert", weights: { e: -1, o: 2, v: 1, a: 1 } },
      { id: "c", label: "Forever, quietly, in the background", weights: { e: -2, o: 1, v: 0, a: 0 } },
      { id: "d", label: "Until I monetize it accidentally", weights: { e: 1, o: 1, v: 2, a: 2 } },
    ],
  },
  {
    id: "q21",
    prompt: "Your ideal internet is…",
    options: [
      { id: "a", label: "A party with good moderation", weights: { e: 2, o: 1, v: 1, a: 0 } },
      { id: "b", label: "A library with jokes in the margins", weights: { e: -2, o: 2, v: 0, a: -1 } },
      { id: "c", label: "An art project that occasionally bites", weights: { e: 0, o: -1, v: 2, a: 1 } },
      { id: "d", label: "A calm feed and a chaotic alt", weights: { e: 1, o: 1, v: 1, a: 0 } },
    ],
  },
  {
    id: "q22",
    prompt: "When you disagree with a friend, you…",
    options: [
      { id: "a", label: "Say it plainly—love is honest", weights: { e: 1, o: 1, v: 1, a: 2 } },
      { id: "b", label: "Soften it until it’s a suggestion", weights: { e: -1, o: 1, v: 0, a: -2 } },
      { id: "c", label: "Debate for sport, hug after", weights: { e: 2, o: -1, v: 2, a: 1 } },
      { id: "d", label: "Write a draft and delete it (classic)", weights: { e: -2, o: 2, v: 1, a: -1 } },
    ],
  },
  {
    id: "q23",
    prompt: "Your vibe at a party is…",
    options: [
      { id: "a", label: "Center of gravity", weights: { e: 2, o: 0, v: 2, a: 1 } },
      { id: "b", label: "Wallpaper that occasionally speaks", weights: { e: -2, o: 1, v: -1, a: -2 } },
      { id: "c", label: "Kitchen hangout philosopher", weights: { e: 0, o: 0, v: 1, a: 0 } },
      { id: "d", label: "Early exit, legendary exit line", weights: { e: -1, o: 2, v: 0, a: 0 } },
    ],
  },
  {
    id: "q24",
    prompt: "You finish a big project. You celebrate by…",
    options: [
      { id: "a", label: "Telling people (they need to know)", weights: { e: 2, o: 0, v: 2, a: 1 } },
      { id: "b", label: "Disappearing into peace", weights: { e: -2, o: 1, v: -1, a: -2 } },
      { id: "c", label: "Immediately starting the next thing (help)", weights: { e: 1, o: 1, v: 2, a: 2 } },
      { id: "d", label: "One nice meal and zero screens", weights: { e: -1, o: 2, v: 0, a: -1 } },
    ],
  },
  {
    id: "q25",
    prompt: "Your toxic trait (affectionate) is…",
    options: [
      { id: "a", label: "Too online to log off", weights: { e: 2, o: -1, v: 2, a: 0 } },
      { id: "b", label: "Too offline to explain", weights: { e: -2, o: 1, v: -1, a: -1 } },
      { id: "c", label: "Too intense for small talk", weights: { e: 0, o: 0, v: 2, a: 1 } },
      { id: "d", label: "Too organized to be spontaneous", weights: { e: 0, o: 2, v: 0, a: 1 } },
    ],
  },
  {
    id: "q26",
    prompt: "If your brain had a UI, it would be…",
    options: [
      { id: "a", label: "Neon and loud sliders", weights: { e: 2, o: -2, v: 2, a: 1 } },
      { id: "b", label: "Clean monospace and secrets", weights: { e: -2, o: 2, v: 0, a: 0 } },
      { id: "c", label: "A wiki that edits itself", weights: { e: -1, o: 1, v: 2, a: 0 } },
      { id: "d", label: "A single button labeled ‘do not’", weights: { e: 0, o: 2, v: 1, a: -1 } },
    ],
  },
  {
    id: "q27",
    prompt: "You want feedback on something personal. You ask…",
    options: [
      { id: "a", label: "The group chat (democracy)", weights: { e: 2, o: 0, v: 1, a: 0 } },
      { id: "b", label: "One trusted human (precision)", weights: { e: -2, o: 1, v: 0, a: -1 } },
      { id: "c", label: "The internet anonymously (bold)", weights: { e: 1, o: -1, v: 2, a: 1 } },
      { id: "d", label: "Nobody—I iterate in silence", weights: { e: -1, o: 2, v: 0, a: 0 } },
    ],
  },
  {
    id: "q28",
    prompt: "Finally: SBTI is basically…",
    options: [
      { id: "a", label: "A mirror with jokes", weights: { e: 1, o: 1, v: 1, a: -1 } },
      { id: "b", label: "A toy for thinking, not a diagnosis", weights: { e: -1, o: 2, v: 0, a: -2 } },
      { id: "c", label: "A way to tag my chaos for science (not science)", weights: { e: 1, o: -1, v: 2, a: 1 } },
      { id: "d", label: "Fun—unless I’m losing, then it’s rigged", weights: { e: 2, o: -2, v: 2, a: 2 } },
    ],
  },
];
