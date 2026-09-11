// =============================================================================
// CATALOG DATA — R2 reconstruction notes
// =============================================================================
// The original catalog.js (built during earlier project phases) was lost when
// the cloud workspace was wiped on 2026-09-09. Nothing in this file is a
// literal recovery of that file — it did not survive. What follows is a
// rebuilt schema and dataset, reconstructed from two sources only:
//
//   [ARTIFACT]     a fact directly observed in one of the 7 surviving
//                   published preview Artifacts (rendered HTML/CSS)
//   [SPREADSHEET]  the re-uploaded "My Books Tropes Setting Language Steam
//                   Level 3.xlsx" (v3)
//   [MEMORY LOG]   Tyler's own prior [stated] project facts, logged across
//                   earlier phases of this project
//   [TYLER]        a direct decision Tyler gave during the recovery pass
//
// The schema below is deliberately broader than what R2 populates. Per
// Tyler's instruction, it must not be a "thin" shape that needs structural
// migration once retail links, awards, or discovery metadata for the future
// Find Your Next Read tool are added later — so those fields exist now, set
// to null/empty where nothing has been recovered or confirmed. NOTHING is
// invented to fill a field. A null retail.url is never a placeholder domain
// or guessed link — it is left null.
//
// Distinctions the schema keeps separate, per Tyler's instruction:
//   - tropes         → VISIBLE trope pills, as rendered on cards/pages
//   - keywordTropes   → fuller SEO/discovery keyword list (superset of tropes)
//   - sport           → the book's sport, where one exists
//   - setting         → the book's real-world/fictional setting
//   - readerHooks     → a distinct "Reader Hooks" list, only where a book's
//                       own detail page uses different wording than its card
//                       trope pills (currently only Promise You the Moon)
//   - microHook       → [R3 ADDITION, TYLER-SUPPLIED] a third, even-shorter
//                       copy variant from "Tiffany's Book Hooks.xlsx" (the
//                       "Micro Hook" column), distinct from both `hook` and
//                       `blurb`. No recovered page slot uses this yet — it is
//                       stored for possible future use (Find Your Next Read,
//                       cards, metadata) and is NOT rendered anywhere in R3.
//                       Set only where the spreadsheet actually supplies a
//                       value; never derived or invented.
//   - series/position → series membership + reading-order position
//   - release/retail  → availability, format, and retailer info. Each
//                       `retail` entry may carry an optional `access` field
//                       ("direct" | "gated") — [R3 ADDITION] distinguishing a
//                       direct BookFunnel download from a subscriber-gated
//                       BookFunnel destination, so CTA copy can tell them apart.
//
// One open terminology tension, flagged rather than resolved: [MEMORY LOG]
// states "all catalog titles are full-length novels except The Cowboy
// Christmas Distraction and The Comeback Play, which are both novellas" —
// but the recovered site copy itself labels Off Course, Shoot the Moon, and
// Pucks & Pranks as "Prequel novella" in their own section headers. Both are
// recorded below (`position.label` reproduces the site's own wording;
// `bookType` reproduces the memory log's bibliographic classification) since
// this may be a marketing label vs. a length classification, not a real
// contradiction — but that reconciliation is not assumed here.

// -----------------------------------------------------------------------------
// PEOPLE
// -----------------------------------------------------------------------------

export const PEOPLE = {
  tiffany: {
    slug: "tiffany-noelle-chacon",
    name: "Tiffany Noelle Chacon",
    role: "author",
    url: null, // this site
  },
  lindsay: {
    slug: "lindsay-rochester",
    name: "Lindsay Rochester",
    role: "co-author",
    url: "https://lindsayrochester.com", // [MEMORY LOG] + [ARTIFACT] (Promise You the Moon page)
  },
  sarah: {
    slug: "sarah-hickner",
    name: "Sarah Hickner",
    role: "co-author / podcast co-host",
    url: null,
    // [ARTIFACT] body copy consistently says "Sarah Hickner"; one image alt
    // attribute (A Holly Jolly Christmas Cubicle cover, homepage artifact)
    // reads "Sarah Ruth Hickner" — flagged, not reconciled.
  },
};

// -----------------------------------------------------------------------------
// SERIES
// -----------------------------------------------------------------------------

export const SERIES = [
  {
    slug: "love-in-starlight-valley",
    title: "Love in Starlight Valley",
    authors: [PEOPLE.tiffany, PEOPLE.lindsay], // [ARTIFACT] "A Series by Tiffany Noelle Chacon & Lindsay Rochester"
    tagline:
      "Small-town charm in the Blue Ridge Mountains — meddling grandmothers, big families, and love that sneaks up on you under a wide mountain sky.", // [ARTIFACT] verbatim, all 3 pages that render it
    setting: "Starlight Valley, Blue Ridge Mountains", // [SPREADSHEET]
    accentColorToken: "--series-starlight-valley",
    readingNote: "co-written series; each book pairs a new couple", // [ARTIFACT] "The World of the Series" copy
    complete: false, // One Moonlit Night confirmed upcoming — see note below
  },
  {
    slug: "sports-in-the-sunshine-state",
    title: "Sports in the Sunshine State",
    authors: [PEOPLE.tiffany],
    tagline:
      "Clean sports rom-coms set in Florida — banter on the field, chemistry in the locker room hallway, and happily-ever-afters with a scoreboard in the background.", // [ARTIFACT] verbatim
    setting: "Tampa, FL", // [SPREADSHEET], confirmed also by [TYLER] for Book Three specifically
    accentColorToken: "--series-sunshine-state",
    readingNote: "each book follows a different couple and a different sport", // [ARTIFACT]
    complete: false, // Book Three still unannounced/coming-soon
  },
  {
    slug: "equestrian-dreams",
    title: "Equestrian Dreams",
    authors: [PEOPLE.tiffany],
    tagline:
      "A continuous, read-in-order series following the same central couple through the highs and falls of competitive show jumping — drawn from Tiffany's own years as a national equestrian champion.", // [ARTIFACT] verbatim
    setting: "Equestrian world in Florida", // [SPREADSHEET] — Off Course/Jump specify Florida (Jump: "...Florida/Wellington");
    // Fall/Soar/Cowboy Christmas Distraction are listed more generically in
    // the spreadsheet ("Equestrian world" / "Equestrian/cowboy setting")
    // without repeating Florida. [MEMORY LOG] confirms this is one
    // continuous, same-cast series, so the setting is very likely constant
    // throughout — but that has not been directly confirmed book-by-book,
    // so this field states the series-level value only; do not assume every
    // book's `setting` field below repeats "Florida" unless recovered there too.
    accentColorToken: "--series-equestrian-dreams",
    readingNote: "continuous, read-in-order series, same central couple throughout", // [ARTIFACT] + [MEMORY LOG]
    complete: true, // [MEMORY LOG] "complete five-book series, no further installments planned"
  },
];

// -----------------------------------------------------------------------------
// BOOKS
// -----------------------------------------------------------------------------
//
// Field reference (see header comment for the full rationale):
//
// slug            route segment → /books/<slug>/
// title
// authors         Person[]
// series          { slug, position: { label, order, isPrequel }, seriesTitle } | null
// collaboration   string | null  — multi-author series this title belongs to
// bookType        "novel" | "novella" | null — see terminology note above
// hook            short one-line card copy, or null
// microHook       [R3, TYLER-SUPPLIED] third-tier short copy variant, stored
//                 only, not displayed anywhere in R3 — see header note above
// blurb           long-form back-cover copy, or null
// tropes          string[] — VISIBLE pills
// keywordTropes   string[] — fuller SEO/discovery list (superset of tropes)
// readerHooks     string[] | null — only set where a detail page uses a
//                 distinct "Reader Hooks" wording (Promise You the Moon)
// sport           string | null
// setting         string | null
// content         { cleanKissesOnly, noProfanity, sensitiveNotes[] }
// cover           { image, alt }
// release         { date, year, status }
// retail          RetailLink[] — see note: null url is not a placeholder
// freeRead        boolean
// awards          { name, year }[]
// formats         string[]
// discovery       { vibe, filters } — reserved for Find Your Next Read; unpopulated in R2

export const BOOKS = [
  // ---------------------------------------------------------------- Equestrian Dreams
  {
    slug: "off-course",
    title: "Off Course",
    authors: [PEOPLE.tiffany],
    series: {
      slug: "equestrian-dreams",
      position: { label: "Prequel novella · Start Here", order: 0.5, isPrequel: true }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: null, // see terminology note in file header
    hook:
      "Mila's life looks flawless from the outside — until the search for her dream horse starts exposing cracks in everything she thought was perfect. As the filters fall away, she'll have to decide what she really wants, both in and out of the saddle.", // [ARTIFACT] verbatim
    microHook:
      "The perfect boyfriend. The perfect life. The perfect horse—if only any of it were that simple.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "Everything in college sophomore Mila Kozak's life is picture perfect. She has an amazing boyfriend, Michael. Her relationship with her sister, Anya, is worthy of envy. Even her sport of choice—show jumping—is Instagram-worthy. All she's missing is Prince Charming. In horse-form, that is.\n\nBut as Mila searches for the ideal horse, the rest of her flawless world begins to unravel. And she's left wondering if it was all that perfect to begin with.\n\nSet in the world of competitive show jumping, this novella peels back the filter of a picture-perfect life.", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet
    tropes: ["Unrequited love", "Love triangle"], // [ARTIFACT]
    keywordTropes: ["Unrequited love", "Love triangle"], // [SPREADSHEET] "Unrequited love/love triangle" — no additional terms
    readerHooks: null,
    sport: "Equestrian show jumping", // [SPREADSHEET]
    setting: "Equestrian world in Florida", // [SPREADSHEET]
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: ["traumatic horse-riding accident"] }, // [MEMORY LOG]
    cover: { image: "/images/covers/off-course.jpg", alt: "Off Course book cover by Tiffany Noelle Chacon" }, // [ARTIFACT]
    release: { date: null, year: "2023", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "bookfunnel", url: "https://dl.bookfunnel.com/m4uzadga09", access: "direct" }], // [TYLER-SUPPLIED, R3] free prequel novella, direct download — confirms the earlier "no Amazon link by design" note
    freeRead: true, // [MEMORY LOG]
    awards: [],
    formats: ["ebook", "paperback"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "jump",
    title: "Jump",
    authors: [PEOPLE.tiffany],
    series: {
      slug: "equestrian-dreams",
      position: { label: "Book One", order: 1, isPrequel: false }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: "novel", // [MEMORY LOG]
    hook:
      "A year after her sister's devastating riding accident, Mila is terrified of the sport she once loved — and desperate to get her old life back. But one unexpected kiss with her friend and barnmate Alex sends her in an entirely new direction, if she's brave enough to take the leap.", // [ARTIFACT]
    microHook:
      "She’s afraid to jump again. Falling for her friend might be the biggest leap of all.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "Fear has held her back for too long. Can she make the ultimate leap?\n\nIt’s been a year since college senior Mila Kozak watched her sister Anya’s tragic accident at a horse show in Wellington, Florida. Since then, nothing has been the same. Her relationship with her sister is as shattered as Anya’s paralyzed body. Her boyfriend of two years dumped her out of the blue and, even though she’s doing everything she can to win him back, he won’t give her the time of day. And her favorite thing in the world—show jumping—is tainted by the crippling fear she’ll end up like Anya.\n\nMila wants nothing more than to be her old life-of-the-party, live-in-the-moment self. But no matter what she does, she’s not that Mila anymore.\n\nWhen Mila rescues her friend and barnmate, Alex, with a kiss, it sets them on a trajectory that’s as surprising as it is electrifying.\n\nBut when everything Mila holds dear is threatened yet again, will she make the jump and land where she’s meant to be?\n\nSet in the world of competitive show jumping, JUMP is a new adult romance about falling in love, facing your fears and building your own happily-ever-after.\n\nThis is the first book in the Equestrian Dreams series, which is a clean romance series set in Florida. You'll find all the sizzling chemistry you love without any smut.", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet
    tropes: ["Friends to more", "PTSD/mental health rep"], // [ARTIFACT]
    keywordTropes: ["Friends to more", "PTSD/mental health rep", "early first kiss"], // [SPREADSHEET] adds "early first kiss"
    readerHooks: null,
    sport: "Equestrian show jumping", // [SPREADSHEET]
    setting: "Equestrian world in Florida/Wellington", // [SPREADSHEET]
    content: {
      cleanKissesOnly: true,
      noProfanity: true,
      sensitiveNotes: ["traumatic horse-riding accident", "ICE raid / immigration struggles", "PTSD/mental health struggles"], // [MEMORY LOG]
    },
    cover: { image: "/images/covers/jump.jpg", alt: "Jump book cover by Tiffany Noelle Chacon" }, // [ARTIFACT]
    release: { date: null, year: "2023", status: "released" }, // [SPREADSHEET]
    retail: [
      { retailer: "audiobook", url: "https://amzn.to/4c7g0eF", affiliate: true }, // [MEMORY LOG] — the one retail link recovered from R2
      { retailer: "amazon", url: "https://amzn.to/4q46DC2", affiliate: true }, // [TYLER-SUPPLIED, R3]
    ],
    freeRead: false,
    awards: [{ name: "2023 EQUUS Film Festival Literary Award for Fiction", year: "2023" }], // [ARTIFACT] + [MEMORY LOG]
    formats: ["ebook", "paperback", "audiobook", "kindle-unlimited"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "fall",
    title: "Fall",
    authors: [PEOPLE.tiffany],
    series: {
      slug: "equestrian-dreams",
      position: { label: "Book Two", order: 2, isPrequel: false }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: "novel", // [MEMORY LOG]
    hook:
      "Anya has finally built herself a safe place to land. The last thing she needs is Luke Craig — a country-music-blasting, cowboy-hat-wearing therapist who challenges every boundary she's built. But sometimes falling for the wrong person is exactly how you find where you belong.", // [ARTIFACT]
    microHook:
      "She built herself a safe new life. Then a cowboy in a therapist’s badge walked straight into it.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "Will they be able to stand after everything falls apart?\n\nAnya\n\nI’m finally feeling safe after my accident—the Center has become my comfort zone, and getting to help other paraplegics has become my life’s work. But then Luke Craig shows up as our new lead therapist, blasting his vile country music and tipping his cowboy hat at me like we’re stuck in some western horror movie.\n\nLuke does NOT fit into my comfort zone—he’s anything but safe.\n\nFrustrating? Yes.\n\nUnprofessional? Yes.\n\nCharming and terribly attractive? Unfortunately, also yes.\n\nI just have to make it a few more weeks until I can fire Luke…unless those gorgeous blue eyes kill me first.\n\nMila\n\nThe Center becoming a reality is a dream come true, and every day I get to work here with my sister and Alex is a blessing. But when Clara’s fall jeopardizes everything we’ve worked for, it feels like someone’s pushed us off a cliff. And I’m not quite sure we’ll all be intact when we land.\n\nAlex\n\nI finally have the girl of my dreams, but I’m still not sure I’m enough for her. And with my immigration court disaster, I’m not sure I’ll be in this country long enough to prove to Mila—or her dad—that I’m worthy of her.\n\nCan Anya let go of her prejudices and fears in order to let herself be loved? Will Mila and Alex be able to stand, even when everything around them is falling apart?\n\nFALL into the second installment of the Equestrian Dreams series, a heartwarming and emotional tale of navigating life’s challenges, falling in love and finding a safe place to land. Follow Anya, Mila and Alex on a journey where hopes are dashed, enemies become something more than you'd ever imagine, and lives are rebuilt after they fall.\n\nThis is the second book in the Equestrian Dreams series, which is a clean romance series set in Florida. You’ll find all the sizzling chemistry you love without any smut.", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet
    // NOTE: the earliest-captured Artifact (My Books) shows only 2 visible
    // pills here (Enemies to lovers, Sisterhood); the later Equestrian
    // Dreams series-page Artifact shows 3 (adds Wheelchair user rep).
    // [SPREADSHEET] independently confirms "wheelchair user visibility" is
    // current, so the later/fuller Artifact is used here per the resolved
    // recovery report (Section 2).
    tropes: ["Enemies to lovers", "Sisterhood", "Wheelchair user rep"], // [ARTIFACT] (later) + [SPREADSHEET] corroboration
    keywordTropes: ["Enemies to lovers", "Reverse grumpy/sunshine", "Sisterhood", "Wheelchair user rep", "90s country music love"], // [SPREADSHEET]
    readerHooks: null,
    sport: "Equestrian show jumping", // [SPREADSHEET]
    setting: "Equestrian world", // [SPREADSHEET] (does not repeat "Florida" here — see series-level note)
    content: {
      cleanKissesOnly: true,
      noProfanity: true,
      sensitiveNotes: ["traumatic horse-riding accident", "past toxic relationships", "disability rep"], // [MEMORY LOG]
    },
    cover: { image: "/images/covers/fall.jpg", alt: "Fall book cover by Tiffany Noelle Chacon" }, // [ARTIFACT]
    release: { date: null, year: "2023", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "amazon", url: "https://amzn.to/4hppbKJ", affiliate: true }], // [TYLER-SUPPLIED, R3]
    freeRead: false,
    awards: [],
    formats: ["ebook", "paperback", "kindle-unlimited"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "the-cowboy-christmas-distraction",
    title: "The Cowboy Christmas Distraction",
    authors: [PEOPLE.tiffany],
    series: {
      slug: "equestrian-dreams",
      position: { label: "Book 2.5", order: 2.5, isPrequel: false }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: "novella", // [MEMORY LOG]
    hook:
      "Freshly fired and unexpectedly alone for Christmas, Monica plans to distract herself from her problems — until her best friend's cowboy pal Matthew becomes her unexpected houseguest. He's nothing like the men she usually dates … and this temporary distraction is starting to feel dangerously permanent.", // [ARTIFACT]
    microHook:
      "She wanted a holiday distraction. She got a cowboy on her doorstep instead.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    // [TYLER-SUPPLIED, R3] blurb trimmed from the source packet: the packet's
    // own text ends with a separate "Tropes you'll find (and love) in this
    // novella: Grumpy/sunshine Forced proximity Christmas in the city Found
    // family" line. That line is a list header + enumeration, not back-cover
    // prose, and it duplicates the already-separately-modeled `tropes` field
    // (rendered as chips elsewhere on this page) — including it verbatim as
    // an unpunctuated run-on sentence in the blurb's paragraph flow would be
    // a formatting defect, not faithful preservation. Flagged here per the
    // packet's own "flag conflicts, don't silently change" rule rather than
    // silently dropped. The prose portion below is preserved exactly.
    blurb:
      "She's looking for a temporary distraction, but will she accidentally find love?\n\nMonica's holiday plans aren't looking so good. She just got fired from her job at Goldman Sachs in New York City and her office nemesis is blacklisting her from finding another job. Her best friend, Mila, is supposed to come in town for Christmas, but when Mila's flight is canceled, Monica's stuck hosting Mila's cowboy friend instead.\n\nWhen bull rider Matthew shows up at Monica's door, he looks like the perfect distraction from her woes.\n\nExcept Matthew isn't like any guy she's ever met before, and all the things that typically work for Monica are falling short. Could he be the catalyst to help Monica face her demons and finally give her heart to someone?\n\nThis sweet Christmas rom-com has all the laughs and chemistry you'd want in a romantic comedy, with none of the smut. And you'll find your favorite characters from the Equestrian Dreams series!",
    // [TYLER]: keep "Christmas in the city" and "Found family" as previously
    // approved, blurb-sourced tropes even though [SPREADSHEET] doesn't list
    // them. [TYLER] also resolved the spreadsheet's "Christian romance/faith
    // themes" wording down to "Faith themes" only, consistent with
    // [MEMORY LOG]'s standing correction that this book is general-market
    // clean romance with light faith elements, not marketed as "Christian
    // romance."
    tropes: ["Grumpy/sunshine", "Forced proximity", "Christmas in the city", "Found family"], // [ARTIFACT] (later) + [TYLER]
    keywordTropes: [
      "Grumpy/sunshine",
      "Forced proximity",
      "Christmas in the city",
      "Found family",
      "Christmas romance", // [SPREADSHEET] + earliest Artifact
      "Cowboy",
      "Opposites attract",
      "Faith themes", // [TYLER] — "Christian romance" wording explicitly not used
    ],
    readerHooks: null,
    sport: "Bull riding", // [SPREADSHEET] — newly confirmed, no prior Artifact rendered a sport pill for this book
    setting: "Equestrian/cowboy setting", // [SPREADSHEET]
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: [] }, // [MEMORY LOG]: light faith elements, no other sensitive-content note logged
    cover: {
      image: "/images/covers/the-cowboy-christmas-distraction.jpg",
      alt: "The Cowboy Christmas Distraction book cover by Tiffany Noelle Chacon",
    }, // [ARTIFACT]
    release: { date: null, year: "2023", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "amazon", url: "https://amzn.to/4horpKv", affiliate: true }], // [TYLER-SUPPLIED, R3]
    freeRead: false,
    awards: [],
    formats: ["ebook", "paperback"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "soar",
    title: "Soar",
    authors: [PEOPLE.tiffany],
    series: {
      slug: "equestrian-dreams",
      position: { label: "Book Three", order: 3, isPrequel: false }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: "novel", // [MEMORY LOG]
    hook:
      "Grand Prix show jumper Trina Powers has sacrificed too much for her Olympic dreams to let another man get in the way. Then infuriating billionaire Grayson Sterling becomes the majority owner of the horse that could finally take her there — and working together becomes their only option.", // [ARTIFACT]
    microHook:
      "She finally found the horse that could take her to the Olympics. Too bad he comes with a billionaire co-owner.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    // [TYLER-SUPPLIED, R3] blurb trimmed the same way as The Cowboy Christmas
    // Distraction above: the source packet appends "Tropes you'll find (and
    // love) in this novel: Enemies to lovers Slow Burn Opposites attract
    // Neurodivergent FMC Billionaire love interest Single dad Age gap" after
    // the prose — a list header/enumeration, not blurb copy, duplicating the
    // `tropes`/`keywordTropes` fields already rendered as chips on this page.
    // Excluded for the same reason, flagged rather than silently dropped.
    blurb:
      "Can they soar in the arena…and beyond?\n\nGrand Prix show jumper Trina Powers has one goal: make it to the Olympics. After nearly a decade of failed attempts, injured horses and broken relationships, she's finally a (very partial) owner of the horse that can take her to the top. And she's learned no man will stand in her way this time.\n\nThat is until Grayson J. Sterling shows up as the new majority owner of her horse. He's brusque and disgustingly rich—the two worst features a man could have, according to Trina—and devastatingly handsome. Can Trina and Grayson learn to work together, or will yet another man sabotage her dreams?\n\nMeanwhile, Mila is trying to be the \"perfect\" wife to Alex—thanks to the help of the Internet—while juggling her responsibilities at the Center and her rigorous competition schedule. Her own pursuit of Olympic success is threatened as she struggles to balance her personal and professional life. Can she find a way to be all that she needs to be, without destroying her bonds with either Alex or Trina?\n\nSOAR is a tale of resilience, passion, and the courage to embrace the unexpected. It's a story of overcoming fears, breaking down walls, and the transformative power of trust and teamwork. As Trina and Mila's paths converge, they discover that the road to the Olympics is about more than just winning; it's about the journey of self-discovery, the bonds we forge, and the choices that define us.",
    // [TYLER]: keep "Opposites attract" (approved-blurb source) even though
    // [SPREADSHEET] omits it; "Billionaire romance" and other spreadsheet
    // terms move to keywordTropes only, per the resolved recovery report.
    tropes: ["Enemies to lovers", "Slow Burn", "Opposites attract"], // [ARTIFACT] (later) + [TYLER]
    keywordTropes: [
      "Enemies to lovers",
      "Slow Burn",
      "Opposites attract",
      "Billionaire romance",
      "Single dad",
      "Neurodivergent FMC",
      "Disability rep",
      "Age gap",
    ], // [SPREADSHEET]
    readerHooks: null,
    sport: "Equestrian show jumping", // [SPREADSHEET]
    setting: "Equestrian world", // [SPREADSHEET] (does not repeat "Florida" — see series-level note)
    content: {
      cleanKissesOnly: true,
      noProfanity: true,
      sensitiveNotes: ["traumatic horse-riding accident"], // [MEMORY LOG]
    },
    cover: { image: "/images/covers/soar.jpg", alt: "Soar book cover by Tiffany Noelle Chacon" }, // [ARTIFACT]
    release: { date: null, year: "2024", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "amazon", url: "https://amzn.to/4g6NXx7", affiliate: true }], // [TYLER-SUPPLIED, R3]
    freeRead: false,
    awards: [],
    formats: ["ebook", "paperback", "kindle-unlimited"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },

  // ---------------------------------------------------------------- Love in Starlight Valley
  {
    slug: "shoot-the-moon",
    title: "Shoot the Moon",
    authors: [PEOPLE.tiffany, PEOPLE.lindsay],
    series: {
      slug: "love-in-starlight-valley",
      position: { label: "Prequel novella · Start Here", order: 0.5, isPrequel: true }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: null, // see terminology note in file header
    hook:
      "She wants to be left alone. Her ridiculously friendly firefighter neighbor has other plans. A playful wager, family meddling, and one persistent ray of human sunshine bring two neighbors together in this heartfelt small-town rom-com.", // [ARTIFACT]
    // [MEMORY LOG] separately preserves plot notes naming the leads —
    // "fifth-grade teacher Raquel Dawson vs. firefighter neighbor Henry
    // Calloway, playful wager, opposites-attract, healing after heartbreak"
    // — but this is a note, not a verbatim blurb, so `blurb` is left null
    // rather than synthesizing back-cover copy from it. The character names
    // (Raquel Dawson, Henry Calloway) are real and confirmed; only the
    // full-paragraph blurb itself is unrecovered.
    microHook:
      "She wants to be left alone. Her ridiculously friendly firefighter neighbor has other plans. A playful wager, family meddling, and one persistent ray of human sunshine bring two neighbors together in this heartfelt small-town rom-com.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — identical to the existing `hook` (the sheet's "Short Website Blurb" cell was blank for this title, so `hook` was sourced from this same Micro Hook cell in R2); stored as supplied, not displayed
    blurb:
      "Raquel Dawson is trying to survive fifth-grade science, difficult students, and the heartbreak her so-called “hero” ex left behind. Henry Calloway is the firefighter next door who never seems to take life too seriously—especially when it comes to teasing the grumpy teacher down the hall.\n\nBut when a playful wager keeps throwing them together, Raquel starts to see Henry for who he really is: kind, dependable, funny, and exactly the sort of man she has been afraid to trust.\n\nShoot the Moon is a clean rom-com set in the Love in Starlight Valley series. It features opposites-attract chemistry, hilarious small-town antics, meddling family, healing after heartbreak, and swoony kisses.", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet
    tropes: ["Reverse grumpy/sunshine", "Teacher + fireman", "Meddling grandma"], // [ARTIFACT]
    keywordTropes: [
      "Reverse grumpy/sunshine",
      "Teacher + fireman",
      "Meddling grandma",
      "He falls first",
      "Quirky small town",
      "Pickleball", // [SPREADSHEET] [TYLER]: confirmed real, kept despite the book's Sport field being blank
      "Opposites attract",
    ],
    readerHooks: null,
    sport: null, // [SPREADSHEET]: blank — see Pickleball note above
    setting: "Starlight Valley, Blue Ridge Mountains", // [SPREADSHEET]
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: [] },
    cover: { image: "/images/covers/shoot-the-moon.jpg", alt: "Shoot the Moon book cover by Tiffany Noelle Chacon and Lindsay Rochester" }, // [ARTIFACT]
    release: { date: null, year: "2026", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "bookfunnel", url: "https://dl.bookfunnel.com/nkviqnxhle", access: "direct" }], // [TYLER-SUPPLIED, R3] free prequel novella, direct download — confirms "no Amazon link by design"; the Kindle Unlimited tension noted below remains unreconciled
    freeRead: true, // [MEMORY LOG] + [ARTIFACT] "Start Free with Shoot the Moon"
    awards: [],
    formats: ["ebook", "paperback", "kindle-unlimited"], // [SPREADSHEET]
    // NOTE: [SPREADSHEET] lists Kindle Unlimited for this title, which is an
    // Amazon-exclusive program — in tension with [MEMORY LOG]'s "no Amazon
    // link by design" note. Flagged in the recovery report; not reconciled here.
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "promise-you-the-moon",
    title: "Promise You the Moon",
    authors: [PEOPLE.tiffany, PEOPLE.lindsay],
    series: {
      slug: "love-in-starlight-valley",
      position: { label: "Book One", order: 1, isPrequel: false }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: "novel", // [MEMORY LOG]
    hook:
      "He left town to get over her. Nearly a decade later, he's back — and marrying her for convenience. A protective Marine, the girl he never stopped loving, and a marriage that's becoming much too real.", // [ARTIFACT]
    microHook:
      "Marrying the girl you never got over is…complicated. When Ellie needs protection from her abusive ex, Hunter offers the one thing guaranteed to keep her close: a marriage of convenience to the man who’s loved her all along.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "Hunter Dawson left town nearly a decade ago with two goals: serve his country and get over Ellie James. He accomplished exactly one of them.\n\nNow he's back in Starlight Valley—and Ellie is the one thing he never managed to leave behind.\n\nEllie James never imagined she'd be back at her parents' house—pregnant, overwhelmed, and recovering from an abusive marriage. The last thing she expects is for Hunter—the boy who always made her feel safe—to walk back into her life.\n\nWhen Ellie is in need of protection, Hunter is willing to do just about anything to provide it. A marriage of convenience seems like the perfect solution.\n\nPublicly, they're the ideal couple. But privately? It's getting harder to remember where the act ends and the truth begins.\n\nPromise You the Moon is a clean marriage-of-convenience romance set in the charming mountain town of Starlight Valley, featuring longtime pining, small-town charm, swoony kisses, and just enough danger to keep things interesting—but not too much to keep you up at night.", // [ARTIFACT] verbatim, from the book's own detail page
    // [TYLER] + [SPREADSHEET]: trope #2/#3 is "It's Always Been You," not
    // "Second chance" (which appeared on 3 of 4 card-style Artifacts and is
    // now understood to be stale).
    tropes: ["Marriage of convenience", "It's Always Been You", "Protective hero"], // [ARTIFACT] (detail page) + [TYLER]
    keywordTropes: [
      "Marriage of convenience",
      "It's Always Been You",
      "Protective hero",
      "Pregnancy",
      "Not his baby",
      "He's a Marine",
      "\"That's my WIFE\"",
      "Suspenseful elements",
      "Big family",
      "Small town romance",
    ], // [SPREADSHEET]
    readerHooks: ["Marriage of convenience", "It's Always Been You", "Protective hero"], // [ARTIFACT] "Reader Hooks / Why You'll Love This Book" — kept as its own field since the detail page names this section distinctly from a generic trope-pill list
    sport: null,
    setting: "Starlight Valley, Blue Ridge Mountains (small-town romance)", // [ARTIFACT] "At a Glance" detail table, verbatim
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: [] }, // [ARTIFACT] "Content Promise: Kisses only, no profanity"
    cover: {
      image: "/images/covers/promise-you-the-moon.jpg",
      alt: "Promise You the Moon book cover by Tiffany Noelle Chacon and Lindsay Rochester",
    }, // [ARTIFACT]; path also independently confirmed by the recovered JSON-LD on this exact page
    release: { date: "2026-09-22", year: "2026", status: "preorder" }, // [ARTIFACT] JSON-LD datePublished + "Preorder · Releases September 22, 2026"
    retail: [{ retailer: "preorder", url: "https://amzn.to/4cd97Z3", affiliate: true }], // [TYLER-SUPPLIED, R3]: real Amazon affiliate preorder link now supplied, replacing the R2 disabled placeholder
    freeRead: false,
    awards: [],
    formats: ["ebook", "paperback", "kindle-unlimited"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  // NOTE — One Moonlit Night (Love in Starlight Valley, with Lindsay
  // Rochester; forced proximity, opposites attract, overcoming fears, he
  // falls first; rock climbing/outdoors; Starlight Valley, Blue Ridge
  // Mountains; release TBD per [SPREADSHEET], corrected to January 2027 per
  // [MEMORY LOG]) is a confirmed real upcoming title. [TYLER] has explicitly
  // instructed it stay OUT of this catalog for now — preserved here only as
  // a comment, not as a BOOKS entry, pending a decision on how "upcoming
  // book" behavior should render once the site is stable.

  // ---------------------------------------------------------------- Sports in the Sunshine State
  {
    slug: "pucks-and-pranks",
    title: "Pucks & Pranks",
    authors: [PEOPLE.tiffany],
    series: {
      slug: "sports-in-the-sunshine-state",
      // [MEMORY LOG]: "confirmed as Book One of Sports in the Sunshine
      // State AND a free prequel-type novella (hybrid role)" — [ARTIFACT]
      // renders it with the same "Prequel novella · Start Here" label used
      // for the other series' free starter reads, so that label is used
      // here; the "hybrid" Book One status is preserved in the comment.
      position: { label: "Prequel novella · Start Here", order: 0.5, isPrequel: true }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: null, // see terminology note in file header
    hook:
      "She follows the rules. He breaks them for fun. When sports journalist Isabella is assigned to profile the hockey star she hasn't spoken to since their prom-night disaster, old wounds — and old sparks — come roaring back.", // [ARTIFACT]
    microHook:
      "A rule-following sports journalist. A prank-loving hockey star. One very overdue second chance.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "A prankster, a planner, and the second chance they never saw coming.\n\nIsabella Castillo follows the rules. Elliot Adler breaks them. She’s an up-and-coming sports journalist; he’s the Lightning’s star center with a reputation for pranks and charm. They haven’t spoken since a prom-night disaster—until she’s assigned to write his profile.\n\nDigging into his story uncovers more than highlight reels and playful banter. Old wounds resurface. Sparks reignite. And suddenly the girl who plans everything is falling for the guy who lives like nothing can hurt him.\n\nNow they’ll have to keep playing it safe… or take a shot at their second chance?\n\nPucks & Pranks is the prequel novella to the Sports in the Sunshine State RomCom series—clean, heart-pounding sports romances with big feelings, high-action moments, and zero cursing or smut. Each book stands alone—but they’re all connected by best friends and Florida sports.", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet — introduces character names (Isabella Castillo, Elliot Adler) not previously recorded in this catalog
    tropes: ["Enemies to lovers", "Second chance"], // [ARTIFACT]
    keywordTropes: [
      "Hockey romance", // [TYLER]: added to keywordTropes only, per resolved decision — not a visible trope
      "Enemies to lovers",
      "He falls first",
      "High school flashbacks",
      "Sports reporter/hockey player",
      "Pranks",
      "She wears his jersey",
      "Second chance",
      "Free starter read",
    ], // [SPREADSHEET] + [TYLER]
    readerHooks: null,
    sport: "Hockey", // [SPREADSHEET]
    setting: "Tampa, FL", // [SPREADSHEET]
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: [] },
    cover: { image: "/images/covers/pucks-pranks.jpg", alt: "Pucks & Pranks book cover by Tiffany Noelle Chacon" }, // [ARTIFACT]
    release: { date: null, year: "2024", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "bookfunnel", url: "https://dl.bookfunnel.com/2lknprbvsq", access: "direct" }], // [TYLER-SUPPLIED, R3] free prequel novella, direct download — matches the noted BookFunnel-routing preference
    freeRead: true, // [MEMORY LOG] + [SPREADSHEET] "Free on BookFunnel and Amazon"
    awards: [],
    formats: ["ebook"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "off-the-bench",
    title: "Off the Bench",
    authors: [PEOPLE.tiffany],
    series: {
      slug: "sports-in-the-sunshine-state",
      position: { label: "Book Two", order: 2, isPrequel: false }, // [ARTIFACT]
    },
    collaboration: null,
    bookType: "novel", // [MEMORY LOG]
    hook:
      "When overlooked quarterback Austin Taylor gets his shot at starting, data analyst Dani Marshall is the only one convinced he can pull it off. Betting on him is easy. Falling for him is a much bigger problem — especially when Dani's one rule is never date an athlete.", // [ARTIFACT]
    microHook:
      "An underdog quarterback. The analyst who believes in him. One very inconvenient no-athletes rule.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "What happens when a football analyst bets her car—and (accidentally) her heart—on the NFL’s most unlikely quarterback?\n\nAustin Taylor expected to spend his NFL career warming the bench, not becoming the Tampa Bay Bucs’ unexpected starting quarterback—or going viral for tripping over his own cleats on national television.\n\nDani Marshall, the Bucs’ data analyst extraordinaire, sees what no one else does: hidden potential. So convinced Austin can succeed, she makes a reckless bet on his performance.\n\nNow her car—and her dignity—is on the line.\n\nKeeping it professional with Austin should be easy. Except the more time Dani spends with the humble yet charming quarterback, the harder it becomes to ignore the chemistry between them.\n\nAnd Austin? He’s falling fast and hard for the brilliant woman who believed in him before anyone else did.\n\nToo bad Dani has one ironclad rule: never date an athlete.\n\nOff the Bench is a clean football rom-com featuring sizzling chemistry, laugh-out-loud moments, and a heartwarming happily ever after. Perfect for fans of closed door romance and underdog love stories.", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet
    // Resolved per recovery report Section 2: [SPREADSHEET] confirms
    // "workplace romcom" is current, so the later/fuller Artifact (3 pills)
    // is used rather than the earliest Artifact's 2-pill version.
    tropes: ["Reverse grumpy/sunshine", "Off-limits love", "Workplace rom-com"], // [ARTIFACT] (later) + [SPREADSHEET] corroboration
    keywordTropes: ["Football romance", "Reverse grumpy/sunshine", "Off-limits love", "Workplace romcom", "Cinnamon roll MMC", "STEM rep"], // [SPREADSHEET]
    readerHooks: null,
    sport: "Football", // [SPREADSHEET]
    setting: "Tampa, FL", // [SPREADSHEET]
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: [] },
    cover: { image: "/images/covers/off-the-bench.jpg", alt: "Off the Bench book cover by Tiffany Noelle Chacon" }, // [ARTIFACT]
    release: { date: null, year: "2024", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "amazon", url: "https://amzn.to/3TIyvzG", affiliate: true }], // [TYLER-SUPPLIED, R3]
    freeRead: false,
    awards: [],
    formats: ["ebook", "paperback", "kindle-unlimited"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "book-three",
    title: "Book Three",
    authors: [PEOPLE.tiffany],
    series: {
      slug: "sports-in-the-sunshine-state",
      position: { label: "Book Three", order: 3, isPrequel: false }, // [ARTIFACT]: this is the kicker eyebrow above the title ("BOOK THREE"); the separate "Coming Soon" badge below is driven by release.status, not this label
    },
    collaboration: null,
    bookType: null,
    hook: "Title and cover not yet announced — currently in progress.", // [ARTIFACT] verbatim
    blurb: null,
    tropes: [], // no visible trope pill beyond the sport keyword — see below
    keywordTropes: ["Baseball romance"], // [TYLER] explicitly confirmed sport/discovery metadata; kept keyword-only, consistent with how Football/Hockey romance are handled elsewhere in this series
    readerHooks: null,
    sport: "Baseball", // [TYLER] + [SPREADSHEET]
    setting: "Tampa, FL", // [TYLER] + [SPREADSHEET]
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: [] },
    cover: { image: null, alt: null }, // no cover exists yet — confirmed gap, not a recovery failure
    release: { date: null, year: null, status: "coming-soon" },
    retail: [],
    freeRead: false,
    awards: [],
    formats: ["ebook", "paperback", "kindle-unlimited"], // [SPREADSHEET] (format plan even though the book itself is TBD)
    discovery: { vibe: null, filters: [] },
    // Still TBD per [TYLER]: title, couple, plot, additional tropes, release date. Do not invent.
  },

  // ---------------------------------------------------------------- Standalone collaborations
  {
    slug: "the-comeback-play",
    title: "The Comeback Play",
    authors: [PEOPLE.tiffany],
    series: null,
    collaboration: "Sweet Sports Kisses — Book Eight (multi-author series)", // [ARTIFACT] + [MEMORY LOG]
    bookType: "novella", // [MEMORY LOG]
    hook:
      "Disgraced quarterback Drake Blythe needs community service to repair his reputation. Lyla Wilder is stuck supervising him — and still remembers the first time they met, even if he doesn't. But the more she discovers the man behind the headlines, the harder it becomes to stay mad at him.", // [ARTIFACT]
    microHook:
      "A disgraced quarterback. The woman he doesn’t remember. A comeback neither saw coming.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "A disgraced quarterback, a forgotten first meeting, and a second chance neither of them saw coming.\n\nDrake\n\nGetting benched was bad. Getting traded to Miami . . . worse.\n\nThe real disaster? Everyone thinking I’m a draft bust who only cares about PR stunts.\n\nTo prove them wrong, I need to clean up my image—starting with community service at Play It Forward.\n\nThe problem? Lyla Wilder, the program’s administrator, clearly hates me. And I have no idea why.\n\nLyla\n\nDrake Blythe is exactly the kind of athlete I can’t stand—cocky, reckless, and completely unaware that we’ve met before.\n\nNow, I’m stuck babysitting him while drowning in work my boss won’t do.\n\nI refuse to fall for his charm. But the more I see of the man behind the headlines, the harder it is to remember why I wanted to stay mad in the first place…\n\nThe Comeback Play, a second chance novella, is book 8 of the Sweet Sports Kisses multi-author series—a sweet/clean romcom sports collection set across the U.S. Each story is connected through the Play It Forward organization, bringing heartwarming romance, humor, and just the right amount of competition. If you’re looking for no-spice, kisses only with the perfect amount of swoon, then this series is for you!", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet
    tropes: ["Second chance", "Comeback story", "Redemption arc"], // recovered in the prior reconciliation pass (before the wipe) and reconfirmed by [SPREADSHEET]'s "comeback story; second chance, redemption"
    keywordTropes: ["Second chance", "Comeback story", "Redemption arc", "Sports romance", "Good girl/bad boy", "Hidden identity"], // [SPREADSHEET]
    readerHooks: null,
    sport: "Football", // [SPREADSHEET]
    setting: "Miami, Florida", // prior reconciliation pass; consistent with [SPREADSHEET] "Miami, FL"
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: ["alcohol/intoxication"] }, // [MEMORY LOG]
    cover: { image: "/images/covers/the-comeback-play.jpg", alt: "The Comeback Play book cover by Tiffany Noelle Chacon" }, // [ARTIFACT]
    release: { date: null, year: "2025", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "amazon", url: "https://amzn.to/4fOTYj4", affiliate: true }], // [TYLER-SUPPLIED, R3]
    freeRead: false,
    awards: [],
    formats: ["ebook", "paperback", "kindle-unlimited"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "a-christmas-courtship", // [MEMORY LOG]: confirmed URL slug /books/a-christmas-courtship/
    title: "A Christmas Court(ship)",
    authors: [PEOPLE.tiffany],
    series: null,
    collaboration: "Letters to Mrs. Claus — Book Three (multi-author series)", // [ARTIFACT] + [MEMORY LOG]
    bookType: null, // not specified as novel/novella in [MEMORY LOG]
    hook:
      "Sadie has crushed on her best friend's older brother for years. When pro pickleball player Beckett needs a partner for their hometown Christmas tournament, she finally gets her chance to make him notice her — if their chemistry doesn't throw them both completely off their game.", // [ARTIFACT]
    microHook:
      "Her longtime crush. Her best friend’s brother. Her new pickleball partner. What could possibly go wrong?", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "Winner of the 2025 Swoony Award for the novellas category\n\nA best friend’s brother, a high-stakes holiday pickleball game, and a spark they can’t ignore.\n\nSadie:\n\nI’ve had a crush on Beckett Dawson forever—my best friend’s older brother, the hometown golden boy turned pro pickleball player. He’s been gone for years, but when he walks into my early-morning practice, I finally have a chance for him to notice me . . . and not just because I can return his serve.\n\nBeckett:\n\nAfter a messy breakup with my doubles partner—on and off the court—I won’t ever mix pickleball with romance again. But when the chance to take on my ex in our hometown Christmas tournament comes up, Sadie Hart is the only partner I want by my side. Trouble is, the more time we spend together, the more I realize the real game I’m playing isn’t on the court—it’s protecting my heart from falling for the girl I was never supposed to want.\n\nA Christmas Court(ship), a best friend’s brother novella, is book 3 of the Letters to Mrs. Claus multi-author series—a kisses-only romantic comedy collection bursting with holiday cheer. Each story is linked through Mrs. Claus’s Operation Mistletoe Match, where she receives a letter from a meddling friend or family member about someone lonely, heartbroken, or closed off to love. With her timeless wisdom, Mrs. Claus pens a tailored message to the subject of the letter, offering an inspiring note that tackles their romantic roadblock. Packed with hilarious mishaps, flustered blushes, and courageous adventures as they chase their happily-ever-after in this no-spice, swoon-worthy series!", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet — introduces the character name Sadie Hart, not previously recorded in this catalog
    // [TYLER]: "Meddling grandma" restored to both visible tropes and keywordTropes.
    tropes: ["Christmas romance", "Best friend's brother", "Meddling grandma", "Home for the holidays"], // [ARTIFACT] + [TYLER]
    keywordTropes: ["Christmas romance", "Best friend's brother", "Meddling grandma", "Home for the holidays", "Small town romance"], // [ARTIFACT] + [TYLER] + [SPREADSHEET]
    readerHooks: null,
    sport: "Pickleball", // prior reconciliation pass; consistent with [SPREADSHEET]
    setting: "Cypress City, North Carolina", // prior reconciliation pass; consistent with [SPREADSHEET] "Cypress City, NC"
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: [] },
    cover: { image: "/images/covers/a-christmas-court-ship.jpg", alt: "A Christmas Court(ship) book cover by Tiffany Noelle Chacon" }, // [ARTIFACT]
    release: { date: null, year: "2025", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "amazon", url: "https://amzn.to/4xPX5gT", affiliate: true }], // [TYLER-SUPPLIED, R3]
    freeRead: false,
    awards: [{ name: "2025 Swoony Award, Novella Category", year: "2025" }], // [ARTIFACT] + [MEMORY LOG]
    formats: ["ebook", "paperback", "kindle-unlimited"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
  {
    slug: "a-holly-jolly-christmas-cubicle",
    title: "A Holly Jolly Christmas Cubicle",
    authors: [PEOPLE.tiffany, PEOPLE.sarah],
    series: null,
    collaboration: "A Clean Romance Podcast novella, co-written with Sarah Hickner", // [ARTIFACT]
    bookType: null,
    hook:
      "Grace moved to New York to escape her past — not to share a cubicle with Christmas-obsessed Wesley. But when a Christmas Eve blizzard leaves them stranded together, his relentless holiday cheer starts breaking through her defenses … and making her wonder if it's finally safe to stop running.", // [ARTIFACT]
    microHook:
      "She’s giving Grinch. He’s giving Buddy the Elf. And now they’re sharing a cubicle.", // [TYLER-SUPPLIED, R3] "Tiffany's Book Hooks.xlsx" — stored only, not displayed
    blurb:
      "Grace moved to New York to escape her past—especially her controlling ex.\n\nWesley is coping with the disappearance of his sister the only way he knows: excessive Christmas decorations.\n\nGrace, who feels more and more like the Grinch, is assigned to share Wesley’s cubicle, leaving them both in shock. When it seems like things couldn’t get worse, a Christmas Eve blizzard shuts down the city, including all flights home. Snowed in with her relentlessly cheerful coworker who channels Buddy the Elf a little too well, Grace can’t escape the lights, the laughter, or the inconvenient way he makes her feel safe again.\n\nAs Christmas magic fills the city and walls start to crumble, Wesley is determined to show Grace that the holidays—and love—aren’t something to fear. But Grace has to decide if she’s ready to stop running…and let Christmas work its magic.\n\nA cozy, clean holiday rom-com filled with forced proximity, office antics, found family, and big-city Christmas charm.", // [TYLER-SUPPLIED, R3] verbatim from the long-form blurb packet — introduces the name Wesley's disappeared sister's absence as his backstory (no name given), and confirms Grace's ex as "controlling" (consistent with, adds detail to, the existing hook)
    // [TYLER]: v3 now agrees with the previously-approved metadata — no conflict.
    tropes: ["Forced proximity", "Workplace romance", "Christmas romance"], // prior reconciliation pass, reconfirmed by [SPREADSHEET]
    keywordTropes: [
      "Forced proximity",
      "Workplace romance",
      "Christmas romance",
      "Opposites attract",
      "Reverse grumpy/sunshine",
      "Faith themes",
      "Found family",
      "Big-city Christmas charm",
    ], // prior reconciliation pass, reconfirmed by [SPREADSHEET]
    readerHooks: null,
    sport: null,
    setting: "New York City", // prior reconciliation pass; consistent with [SPREADSHEET] "NYC"
    content: { cleanKissesOnly: true, noProfanity: true, sensitiveNotes: [] }, // [MEMORY LOG]: light faith elements, not "Christian romance"
    cover: {
      image: "/images/covers/a-holly-jolly-christmas-cubicle.jpg",
      alt: "A Holly Jolly Christmas Cubicle book cover by Tiffany Noelle Chacon and Sarah Ruth Hickner",
    }, // [ARTIFACT] — this image's own alt text is the one place "Sarah Ruth Hickner" (with middle name) appears; see PEOPLE.sarah note
    release: { date: null, year: "2025", status: "released" }, // [SPREADSHEET]
    retail: [{ retailer: "bookfunnel", url: "https://buy.bookfunnel.com/bobjudapku", access: "gated" }], // [TYLER-SUPPLIED, R3]: "free for subscribers" — a buy.bookfunnel.com subscriber-gated destination, not a direct download link like the other 3 free titles; CTA copy distinguishes this
    freeRead: true, // [SPREADSHEET]
    awards: [],
    formats: ["ebook", "paperback"], // [SPREADSHEET]
    discovery: { vibe: null, filters: [] },
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

export function getBookBySlug(slug) {
  return BOOKS.find((b) => b.slug === slug) ?? null;
}

export function getSeriesBySlug(slug) {
  return SERIES.find((s) => s.slug === slug) ?? null;
}

export function getBooksInSeries(seriesSlug) {
  return BOOKS.filter((b) => b.series?.slug === seriesSlug).sort((a, b) => a.series.position.order - b.series.position.order);
}

export function getStandaloneBooks() {
  return BOOKS.filter((b) => b.series === null);
}
