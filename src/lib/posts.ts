export type Post = {
  slug: string;
  title: string;
  dek: string;
  /** Display date, e.g. "SEP 12" */
  date: string;
  /** Long display date, e.g. "Sep 24, 2026" */
  dateFull: string;
  /** ISO date for sorting, e.g. 2026-09-12 */
  dateISO: string;
  /** Approximate read length, e.g. "14 MIN" */
  runtime: string;
  /** Game + platform line */
  game: string;
  platform: string;
  studio: string;
  /** 0–10, one decimal, or null for essays without a score */
  score: number | null;
  /** Mono section code shown on cards, e.g. "R-02" */
  code: string;
  /** Essay | Review | Frame */
  kind: "Essay" | "Review" | "Frame";
  /** Hex pair for generated poster art */
  art: [string, string];
  /** One-line pull quote */
  quote: string;
  /** Body paragraphs (markdown-lite: paragraphs only) */
  body: string[];
  /** Question of the week answer */
  question?: string;
  /** Full markdown content */
  content?: string;
  /** Rendered HTML */
  html?: string;
  /** Short summary / excerpt */
  excerpt?: string;
  /** Editorial banner image URL */
  hero_image_url?: string;
  /** SEO meta */
  meta_title?: string;
  meta_description?: string;
  /** Author name */
  author?: string;
  /** Topic tags */
  tags?: string[];
};

export const posts: Post[] = [
  {
    slug: "echoes-of-the-valiant",
    title: "The Loadout Is the Character",
    dek: "Echoes of the Valiant lets you tell a story before a single shot is fired — your guns are your dialogue.",
    date: "SEP 22",
    dateFull: "Sep 24, 2026",
    dateISO: "2026-09-22",
    runtime: "14 MIN",
    game: "Echoes of the Valiant",
    platform: "PC · PS5",
    studio: "Hollow Lantern",
    score: 9.2,
    code: "R-24",
    kind: "Review",
    art: ["#1b3a4b", "#f0b429"],
    quote: "A loadout is a monologue you carry into every room.",
    body: [
      "Every game about gear tells you what it thinks a person is. Echoes of the Valiant thinks a person is a set of decisions they can't take back, and it bolts that idea to a third-person shooter with the calm confidence of a studio that has never once rushed a scene.",
      "The loadout screen is the game's best-written character. Six slots, no manufacturers, no rarity colors — just objects with histories. A breaching shotgun you bought off a retiring dock worker. A sidearm engraved with someone else's name, because engraving was cheaper than replacing it. The game never explains these objects. It lets you stand there holding them.",
      "Combat, then, is punctuation. Encounters are short, loud, and over before the orchestra finishes its sentence. What stays with you is the silence after: reloading in a flooded stairwell, listening to your own breathing, deciding you didn't need the second grenade after all.",
      "Hollow Lantern's writers hide their best material in the margins of the game. A note pinned inside a locker. A radio drama that gets one episode darker every act. None of it is required. All of it is load-bearing.",
      "It is tempting to call this the most literary shooter in years, but the comparison undersells the craft: literature tells you what someone was thinking. Echoes of the Valiant hands you the thoughts as objects and asks you to carry them.",
      "The third act stumbles exactly once — a stealth sequence that mistakes darkness for tension — and recovers with a final hour so composed it feels previewed, in the best sense. The credits roll on a choice you made eight hours earlier and had forgotten you made.",
    ],
    question:
      "It weaponizes restraint. The loudest thing in it is a courtyard of paper flags, and it refuses to explain them.",
  },
  {
    slug: "nightmarket-77",
    title: "Neon Is a Language",
    dek: "Nightmarket 77 builds a city that speaks in signage — and a detective story you read by walking.",
    date: "SEP 15",
    dateFull: "Sep 22, 2026",
    dateISO: "2026-09-15",
    runtime: "11 MIN",
    game: "Nightmarket 77",
    platform: "PC",
    studio: "Pale Harbor",
    score: 8.6,
    code: "R-23",
    kind: "Review",
    art: ["#3d1f4e", "#e5484d"],
    quote: "The city is the narrator, and the narrator is lying to you in four languages.",
    body: [
      "There is a moment, about forty minutes in, when Nightmarket 77 stops rendering its city and starts writing it. The streets reorganize. The signs rearrange. You realize the neon has been grammar all along: red for the past, white for the truth, amber — always amber — for the things the city wants from you.",
      "The detective story here is an excuse, and a good one. What you're actually doing is learning to read. Every district has an accent. The harbor district whispers in budget signage, hand-painted, apologetic. The core shouts in holograms. Somewhere between them a pawnshop speaks in a single flickering tube that spells nothing, and means everything.",
      "Pale Harbor built the investigation systems with the same philosophy. You don't collect clues; you collect sentences. Witness statements arrive half-finished, and the game lets you complete them — wrongly, often, gloriously. The truth is one of several coherent essays the city is willing to grade.",
      "It runs out of nerve near the end. The final district explains itself, which is the one thing a city should never do. But the hour before the ending is the best writing the medium has produced this year, and it never uses a single word to do it.",
    ],
  },
  {
    slug: "gravel-and-gold",
    title: "The Racing Game That Hates Speed",
    dek: "Gravel & Gold measures its races in weather. A review of the year's most stubborn driving game.",
    date: "SEP 08",
    dateFull: "Sep 20, 2026",
    dateISO: "2026-09-08",
    runtime: "9 MIN",
    game: "Gravel & Gold",
    platform: "PS5 · XSX",
    studio: "Tessellate",
    score: 7.9,
    code: "R-22",
    kind: "Review",
    art: ["#4a2c17", "#f0b429"],
    quote: "Every race is a negotiation with the sky.",
    body: [
      "The fastest thing in Gravel & Gold is the weather. That is the design document, as far as anyone can tell. Rain arrives like a verdict, gravel roads become arguments, and the game's much-advertised 220 km/h top speed is a theoretical number, like the cost of a spacelift.",
      "Tessellate has made a driving game about patience. Your rivals don't rubber-band; they deliberate. The best overtakes happen on the inside of a long, boring decision the AI went on to make without you. It is infuriating and it is completely involving.",
      "The career mode is a miniseries about a small team with one good engine and bad credit. Between races you sign sponsorship deals that read like plea bargains. It shouldn't work. It works completely.",
      "The soundtrack is two songs and a lot of engine, which is one more song than the game needs. Everything else here is confident, muddy, and slow in exactly the way the sport of it demands.",
    ],
  },
  {
    slug: "the-frame-hollow-body",
    title: "One Frame: The Hanging Gardens",
    dek: "A 4,000-hour screenshot: how Hollow Body composes despair at 24 frames per second.",
    date: "SEP 01",
    dateFull: "Sep 18, 2026",
    dateISO: "2026-09-01",
    runtime: "7 MIN",
    game: "Hollow Body",
    platform: "PC · Switch 2",
    studio: "Studio Ferrous",
    score: null,
    code: "F-11",
    kind: "Frame",
    art: ["#0f2e25", "#9fd8b8"],
    quote: "The garden is the only room in the game where nothing is trying to kill you. That's the horror.",
    body: [
      "The frame is 1:47:12 into Hollow Body, and nothing is happening. That is the point. Studio Ferrous has spent three acts teaching you that stillness is load-bearing, and here is the payment: a garden, rendered in shades of neglect, with a single bench at the exact center of the rule of thirds.",
      "The composition does something cruel. The bench sits in the lower-left power point; the exit is in the upper-right, small, overgrown, barely a doorway. Your eye takes the diagonal every time, and every time it arrives at the door, it comes back to the bench. The game knows you will not leave. It framed you not leaving.",
      "Depth of field is doing the moral work. The foreground flowers are in focus; you, the player character, are not. You are the least important thing in the frame, and for a game about a caretaker who has forgotten who they're caring for, that's not a rendering choice. It's the thesis.",
      "Twenty-four frames per second, held for ninety seconds. Most studios would cut this shot. Studio Ferrous built an entire game to justify it.",
    ],
  },
  {
    slug: "difficulty-is-a-dialect",
    title: "Difficulty Is a Dialect",
    dek: "What 400 hours of tri-lingual boss fights taught me about who games think is listening.",
    date: "AUG 25",
    dateFull: "Sep 12, 2026",
    dateISO: "2026-08-25",
    runtime: "12 MIN",
    game: "Various",
    platform: "—",
    studio: "Essay",
    score: null,
    code: "E-08",
    kind: "Essay",
    art: ["#2b2b2b", "#f2ebdc"],
    quote: "A difficulty slider is a sentence about who is allowed to finish your sentence.",
    body: [
      "Games speak difficulty the way regions speak weather: everyone has some, nobody agrees what it means. This is an essay about the sentence a difficulty setting makes, and about the players it quietly addresses by name.",
      "Easy mode, done well, is not the game with the numbers turned down. It is the game re-translated — same grammar, kinder dialect. The best implementation I've seen this year is a farming sim whose easy mode doesn't make crops grow faster; it makes the drought arrive one week later, so the story's tragedy keeps its shape and its mercy.",
      "Hard modes more often fail in the opposite direction: they don't sharpen the game's sentences, they simply say them louder. A boss with three more health bars isn't a harder conversation. It's the same conversation with someone refusing to listen.",
      "The essay ends where the good implementations begin: with games that treat difficulty not as a faucet but as an accent — adjustable, regional, dignified. Who is allowed to finish the story is the most political sentence a game writes, and most of them write it in the options menu, on page three, under 'gameplay'.",
    ],
    question:
      "By making the default the honest one.Accessibility modes are not a dilution; they are the studio admitting the default was a dialect all along.",
  },
];

function getStoredPosts(): Post[] {
  if (typeof window !== "undefined") return [];
  try {
    const fs = require("fs");
    const path = require("path");
    const contentDir = path.join(process.cwd(), "content", "posts");
    if (!fs.existsSync(contentDir)) return [];

    const files: string[] = fs.readdirSync(contentDir);
    const result: Post[] = [];
    const slugs = new Set<string>();

    for (const file of files) {
      if (file.endsWith(".json")) {
        slugs.add(file.replace(/\.json$/, ""));
      } else if (file.endsWith(".mdx")) {
        slugs.add(file.replace(/\.mdx$/, ""));
      }
    }

    for (const slug of Array.from(slugs)) {
      const jsonPath = path.join(contentDir, `${slug}.json`);
      const mdxPath = path.join(contentDir, `${slug}.mdx`);

      let data: Record<string, any> = {};
      let rawContent = "";

      if (fs.existsSync(jsonPath)) {
        try {
          data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
          rawContent = data.content || "";
        } catch {
          // ignore
        }
      }

      if (fs.existsSync(mdxPath) && (!data.title || !data.content)) {
        try {
          const mdx = fs.readFileSync(mdxPath, "utf-8");
          const fmMatch = mdx.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
          if (fmMatch) {
            rawContent = rawContent || fmMatch[2].trim();
            const lines = fmMatch[1].split("\n");
            for (const line of lines) {
              const colonIdx = line.indexOf(":");
              if (colonIdx > 0) {
                const key = line.slice(0, colonIdx).trim();
                const val = line.slice(colonIdx + 1).trim();
                try {
                  data[key] = data[key] || JSON.parse(val);
                } catch {
                  data[key] = data[key] || val.replace(/^["']|["']$/g, "");
                }
              }
            }
          }
        } catch {
          // ignore
        }
      }

      if (!data.title && !data.slug) continue;

      const dateObj = data.publishedAt ? new Date(data.publishedAt) : new Date();
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const fullMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const displayDate = `${monthNames[dateObj.getMonth()]} ${String(dateObj.getDate()).padStart(2, "0")}`;
      const dateFull = `${fullMonthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
      const dateISO = dateObj.toISOString().split("T")[0];

      const paragraphs = (rawContent || data.html || "")
        .replace(/<[^>]+>/g, "\n\n")
        .split(/\n\n+/)
        .map((p: string) => p.trim())
        .filter(Boolean);

      const wordCount = (rawContent || "").split(/\s+/).filter(Boolean).length;
      const readMin = Math.max(1, Math.ceil(wordCount / 200));

      const palettes: [string, string][] = [
        ["#1b3a4b", "#f0b429"],
        ["#3d1f4e", "#e5484d"],
        ["#4a2c17", "#f0b429"],
        ["#0f2e25", "#9fd8b8"],
        ["#2b2b2b", "#f2ebdc"],
        ["#1a2a3a", "#e07a5f"],
      ];
      let hash = 0;
      for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) | 0;
      const art = palettes[Math.abs(hash) % palettes.length];

      result.push({
        slug: data.slug || slug,
        title: data.title || "Untitled Article",
        dek: data.excerpt || data.meta_description || "",
        date: displayDate,
        dateFull,
        dateISO,
        runtime: `${readMin} MIN`,
        game: (Array.isArray(data.tags) && data.tags[0]) || "Editorial",
        platform: (Array.isArray(data.tags) && data.tags[1]) || "Feature",
        studio: data.author || "Editorial Desk",
        score: null,
        code: `A-${String(Math.abs(hash) % 90 + 10)}`,
        kind: "Essay",
        art,
        quote: data.excerpt || data.title || "",
        body: paragraphs.length > 0 ? paragraphs : ["No content provided."],
        content: data.content,
        html: data.html,
        excerpt: data.excerpt,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        hero_image_url: data.hero_image_url,
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author || "Editorial Desk",
      });
    }

    return result;
  } catch (err) {
    console.error("Error reading stored posts:", err);
    return [];
  }
}

export function getAllPosts(): Post[] {
  const dynamicPosts = getStoredPosts();
  const dynamicSlugs = new Set(dynamicPosts.map((p) => p.slug));
  const basePosts = posts.filter((p) => !dynamicSlugs.has(p.slug));
  return [...dynamicPosts, ...basePosts];
}

export function getPostBySlug(slug: string): Post | undefined {
  const all = getAllPosts();
  return all.find((p) => p.slug === slug);
}

