# Find Your Next Read — Planning Proposal

Tiffany Noelle Chacon author site · pre-implementation plan, presented for approval. **No code has been written.** Every claim below is labeled `[VERIFIED]` (read directly from the current, approved `catalog.js`) or `[PROPOSED]` (a new UX/design/taxonomy decision I'm recommending, not existing data). Where I found a gap, it's called out under Section 10 rather than filled in.

Scope confirmed from your brief: catalog-only (no other authors), lives at `/find-your-next-read/`, separate from the future Clean Romance Reading Room, no code yet.

---

## 1. Page structure, top to bottom

1. **Intro band** — short headline + one line framing this as a mood-based way to find your next book, not a spreadsheet filter. No form fields yet.
2. **"New here? Start with a free read"** — a small curated row of the 4 `freeRead: true` books (`[VERIFIED]`), shown before any selection is made. This doubles as the default/no-selection state (Section 7).
3. **The chooser** — the interactive selection area (Section 2), organized as a few short, named groups rather than one long form. Selections update results live.
4. **Results** — "Your Best Match" (single spotlighted card) + "You Might Also Like" (a short row of runners-up), per your requested pattern. Empty/zero-match state included.
5. **Newsletter** — reuse the existing `<Newsletter />` component, same as every other page. `[VERIFIED pattern]`

No sidebar, no multi-step quiz/progress bar, no gamification — single scrolling page, consistent with your "avoid" list.

## 2. Reader-facing filter/choice groups

Four groups, each optional (nothing required to see results):

1. **"What kind of story?"** — trope/vibe chips, multi-select.
2. **"Where should it take you?"** — setting/world, multi-select.
3. **"Any sport on the page?"** — sport, multi-select (only shown if the reader wants it — see note below).
4. **"How do you want to start?"** — practical toggles: Free to read right now / Standalone, no series commitment / Complete series only.

I'm proposing 4 named groups instead of your 5 example dimensions (mood, tropes, sport, setting, ways-to-start) because **"mood" isn't yet independently supported by the data** (see Section 10) — I've folded a mood-flavored framing into the trope group's labels instead of inventing a separate mood field. They stay conceptually distinct in the underlying code (separate arrays/keys), even though the UI presents them as one friendly group. Details below.

## 3. Exact choices per group, from the current verified catalog

**Group 1 — "What kind of story?"**
This is a `[PROPOSED]` grouping of your **exact existing `tropes` values** `[VERIFIED]` into 8 friendlier buckets — no new facts, just new labels bundling values that already exist verbatim on the books. Every bucket maps 1:1 to real trope strings already rendered as pills elsewhere on the site:

| Bucket (proposed label) | Exact `tropes` values it contains | Books it matches |
|---|---|---|
| Enemies to Lovers | Enemies to lovers | Fall, Soar, Pucks & Pranks |
| Slow Burn & Grumpy-Sunshine | Grumpy/sunshine, Reverse grumpy/sunshine, Slow Burn, Opposites attract | Cowboy Christmas Distraction, Soar, Shoot the Moon, Off the Bench |
| Second Chance & Comebacks | Second chance, Comeback story, Redemption arc | Pucks & Pranks, The Comeback Play |
| Marriage & "It Was Always You" | Marriage of convenience, It's Always Been You, Protective hero | Promise You the Moon |
| Workplace & Forced Proximity | Workplace rom-com, Workplace romance, Off-limits love, Forced proximity | Cowboy Christmas Distraction, Off the Bench, A Holly Jolly Christmas Cubicle |
| Holiday Reads | Christmas romance, Christmas in the city, Home for the holidays | Cowboy Christmas Distraction, A Christmas Court(ship), A Holly Jolly Christmas Cubicle |
| Family & Found Family | Sisterhood, Found family, Meddling grandma, Best friend's brother | Fall, Cowboy Christmas Distraction, Shoot the Moon, A Christmas Court(ship) |
| Friends & Slow Realizations | Friends to more, Unrequited love, Love triangle | Off Course, Jump |

**Two trope values I've deliberately left out of this UI** — `PTSD/mental health rep` (Jump) and `Wheelchair user rep` (Fall) `[VERIFIED, present in catalog.js]`. These read as representation notes, not a "pick your vibe" filter, and turning them into a casual checkbox felt like it could flatten something more meaningful. They're already visible on the books' own detail pages. Flagging this as a judgment call for you to weigh in on — happy to add a "Representation & Rep" filter group if you want one exposed here too.

**Group 2 — "Where should it take you?"**
`[PROPOSED]` grouping of the exact `setting` strings `[VERIFIED]`, since the raw field has inconsistent granularity ("Equestrian world" vs. "Equestrian world in Florida/Wellington") that isn't meant to be shown to a reader as-is:

| Bucket (proposed label) | Source `setting` values | Books |
|---|---|---|
| Equestrian World (Florida) | "Equestrian world in Florida", "Equestrian world in Florida/Wellington", "Equestrian world", "Equestrian/cowboy setting" | Off Course, Jump, Fall, Soar, Cowboy Christmas Distraction |
| Starlight Valley (Blue Ridge Mountains) | "Starlight Valley, Blue Ridge Mountains", "...(small-town romance)" | Shoot the Moon, Promise You the Moon |
| Florida Sports World (Tampa/Miami) | "Tampa, FL", "Miami, Florida" | Pucks & Pranks, Off the Bench, The Comeback Play |
| Small-Town Carolina | "Cypress City, North Carolina" | A Christmas Court(ship) |
| Big-City Christmas (NYC) | "New York City" | A Holly Jolly Christmas Cubicle |

**Group 3 — "Any sport on the page?"**
Direct from the `sport` field `[VERIFIED]`, no grouping needed — values are already clean: Equestrian show jumping (Off Course, Jump, Fall, Soar), Bull riding (Cowboy Christmas Distraction), Football (Off the Bench, The Comeback Play), Hockey (Pucks & Pranks), Pickleball (A Christmas Court(ship)). Three books have `sport: null` (Shoot the Moon, Promise You the Moon, A Holly Jolly Christmas Cubicle) — I'd suggest this group only appears once a reader has engaged with the tool at all, so "no sport" books aren't implicitly penalized by an ignored filter.

**Group 4 — "How do you want to start?"** — all `[VERIFIED]` booleans, no grouping:
- Free to read right now → `freeRead === true` (4 books: Off Course, Shoot the Moon, Pucks & Pranks, A Holly Jolly Christmas Cubicle)
- Standalone, no series commitment → `series === null` (3 books: The Comeback Play, A Christmas Court(ship), A Holly Jolly Christmas Cubicle)
- Complete series only → `series.complete === true` (Equestrian Dreams only; the other two series are ongoing)

## 4. Which catalog.js fields drive each choice

- Group 1 (story type) → `book.tropes` (the exact visible-pill array, not `keywordTropes` — keeping the SEO superset out of the matching logic per the existing field-distinction convention)
- Group 2 (setting) → `book.setting`, mapped through the static bucket table in Section 3 (defined in the feature's own code, not a new catalog field — see Section 11)
- Group 3 (sport) → `book.sport`
- Group 4 (ways to start) → `book.freeRead`, `book.series` (null check), `series.complete` (via `getSeriesBySlug`)
- Series-order safeguard (Section 6) → `book.series.position.order`, `getBooksInSeries()`
- Result card tagline → `book.microHook` (currently stored but never rendered anywhere — this would be its first real use)
- Result card free/format note → `book.freeRead`, `book.retail[].access`

## 5. Proposed ranking/matching algorithm

Not strict AND — every book gets a score, and the top scorers surface. `[PROPOSED]`

```
score(book) =
    (# selected Group-1 buckets the book matches) × 3
  + (# selected Group-2 buckets the book matches) × 2
  + (1 if selected sport matches, else 0)            × 2
  + (1 if "Free to read" selected and book.freeRead)  × 2
  + (1 if "Standalone" selected and series === null)  × 1
  + (1 if "Complete series" selected and matches)     × 1
```

Books with `score === 0` (no overlap with anything selected) are excluded from results rather than shown as false "matches." The single highest-scoring book becomes "Your Best Match"; the next 2–3 (score > 0, ties broken by `release.year` descending so newer work surfaces first when otherwise equal) become "You Might Also Like." No hidden weighting beyond what's shown above, and match explanations are generated by literally listing which selected chips a book satisfied — never freeform or AI-generated text, per your instruction.

Book Three is excluded from the candidate pool entirely (no blurb/cover/tropes to match against) `[VERIFIED gap, confirmed still true]`.

## 6. How series order affects recommendations

Every recommended book that isn't its series' starting point gets a small, factual note on its result card: *"Book 3 of 4 in Equestrian Dreams — Off Course is where this series begins."* `[PROPOSED]`, generated from real data: `getBooksInSeries(book.series.slug)` sorted by `position.order`, taking the lowest-order entry as "start here." This directly answers your requirement that the tool not encourage starting mid-series without context. Prequel/Start-Here books (`position.isPrequel: true`) instead get a small "Start Here" note, consistent with the badge language already used on the Books page and book cards.

Standalone collaborations have no series, so this note is simply omitted for them.

## 7. Default / no-selection experience

Before any chip is tapped, the page shows the curated free-reads row from Section 1 (item 2) — the 4 `freeRead: true` books, labeled factually as "Free to read" `[VERIFIED]`, not as "Most Popular" or "Bestseller." This reuses data you've already approved (the same 4 books also happen to be exactly the series/standalone entry points, which is a nice property of the real data, not something I'm asserting). No results section is shown until at least one chip is selected — the free-reads row is not itself "results," so it needs no match explanation.

For "surprise me," per your requirement that it be deterministic and not imply ranking: I'd propose picking uniformly at random among the same 4 free-read books (or, if you'd rather it work off no fixed pool, among all 12 usable books) each time the button is pressed — clearly labeled "Surprise Me" with no claim of relevance or popularity. `[PROPOSED]` — flagging for your call on the candidate pool.

## 8. What a result card contains

- Cover (`book.cover`) or existing placeholder pattern if missing `[VERIFIED component: Cover.astro]`
- Title + series/collaboration eyebrow (matches `BookCard.astro`'s existing `kicker` pattern)
- `book.microHook` as the card's short tagline — first real use of this stored-but-unrendered field `[VERIFIED data exists]`
- Match tags: literal names of the selected chips this book satisfied (e.g. "Matches: Enemies to Lovers, Free to read")
- Series-order note when applicable (Section 6)
- Free-read badge when `freeRead === true`
- Primary CTA: "Learn More" through to the book's existing detail page (reusing the `href` pattern already in `BookCard.astro`) — not a duplicate `RetailCTA` on the card itself, to keep the card light and keep purchase/read decisions on the book's own page where the full content promise and disclosures already live.

Deliberately **not** on the card: tropes as a long pill list (already implied by the match tags), star ratings, "X readers loved this," or any other unverified social-proof language.

## 9. Mobile interaction

Chip groups wrap naturally (same `.chip`/flex-wrap pattern already used sitewide); each group's chips scroll within their own row on narrow viewports rather than the whole page, similar to the existing `.catalog-filter` horizontal-scroll pattern on `/books/`. Results update live as chips are toggled (cheap client-side filter over 12 books, no debounce needed) rather than requiring a separate "Show results" tap — but once at least one chip is selected, a small sticky "See my matches ↓" affordance appears at the bottom of the viewport so results aren't missed below the fold, then disappears once the results section scrolls into view. All tap targets ≥44px, consistent with the existing `.btn`/`.catalog-filter__btn` minimum. `[PROPOSED]`

## 10. Missing metadata discovered

- **No dedicated "mood" field.** `discovery.vibe` and `discovery.filters` exist in the schema but are `null`/`[]` for all 13 books `[VERIFIED]` — this is why Group 1 is built from a proposed grouping of existing `tropes` rather than a true mood tag.
- **`setting` is free text with inconsistent granularity** across books, not a normalized value — handled via the code-level bucket table in Section 3/11 rather than a schema change, but flagging that this is a UI grouping I've authored, not a fact from your source material.
- **Representation tags exist but aren't a filter dimension in this plan** (Section 3) — open question for you, not a data gap.
- **No reading-time/length field** — if you ever want a "quick read" filter, nothing currently supports it.
- Book Three remains fully unusable (no cover, blurb, or tropes) `[VERIFIED, unchanged from R3]` — correctly excluded, not a new finding.

## 11. Additive catalog/schema changes recommended

I'm recommending **zero new fields in `catalog.js` for launch** — every dimension above is either a direct existing field or a static lookup table that lives inside the new feature's own code (not the shared catalog), so nothing about the approved R3 data model changes. Specifically:
- The Group 1 trope-bucket table and Group 2 setting-bucket table (Section 3) would be defined as plain config objects in the new feature's files, mapping *existing* `tropes`/`setting` values to display buckets — reversible, additive, and never overwrites or duplicates data already in `catalog.js`.
- If you'd rather these buckets be true first-class data (e.g. so a future card elsewhere on the site could reuse "Holiday Reads" as a tag), the natural home is finally populating `discovery.filters` per book — but I'd treat that as a follow-up decision once you've seen whether the code-level table works well enough, not a prerequisite to shipping this feature.

## 12. Files to create or modify

**New:**
- `src/pages/find-your-next-read/index.astro` — the page itself (using `index.astro` inside a folder, matching the `/books/` convention, so the canonical URL is `/find-your-next-read/` with a trailing slash like every other route on the site)
- `src/components/discovery/FindYourNextRead*.astro` (working name — likely split into a couple of small components: the chooser groups and the result card) — exact breakdown TBD at implementation time, kept in a new `src/components/discovery/` folder so it's clearly scoped to this feature
- A small client-side script (vanilla JS, inline or a co-located `.js` file) implementing the scoring/filtering logic from Section 5 — no new dependency, no external quiz service

**Modified:**
- `src/components/layout/SiteFooter.astro` — no change needed; it already links to `/find-your-next-read/` under "Explore" `[VERIFIED, already present]`
- Possibly `src/pages/books/index.astro` — I'd suggest (not required) adding one small link from the existing "Where should I start?" module to the new tool for readers who want more than 5 fixed prompts, but this is optional polish, not part of this feature's build

**Not modified:** `catalog.js` (per Section 11), any existing book detail pages, `RetailCTA.astro`, `BookCard.astro` (reused as-is via its existing `href`/`kicker` props, no prop changes needed).

---

Waiting for your review before writing any code — in particular your call on: the Group 1/2 bucket labels and groupings (Section 3), whether representation tags get their own filter group, the "Surprise Me" candidate pool (Section 7), and whether the setting/trope buckets should stay code-only or eventually become real `discovery` data (Section 11).
