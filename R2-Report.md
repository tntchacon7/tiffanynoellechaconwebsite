# R2 Report — Astro Source Reconstruction

Tiffany Noelle Chacon author site · R2 (source reconstruction from the 7 surviving Artifacts)

## 1. What was built

- Astro project foundation (`astro.config.mjs`, `package.json`, `tsconfig.json`)
- The recovered design-token system: 57 custom properties in `src/styles/tokens.css`, plus recovered global utility classes in `src/styles/global.css`
- Shared layout: `BaseLayout.astro`, `SiteHeader.astro`, `SiteFooter.astro`, `Wordmark.astro`
- Shared content patterns: `Newsletter.astro`, `Cover.astro`, `BookCard.astro`, `ReadingOrder.astro`, `SeriesHero.astro`, `SeriesSetting.astro`, `SeriesCoauthor.astro`
- All 7 Artifact-backed pages: Homepage, My Books, About, Equestrian Dreams, Love in Starlight Valley, Sports in the Sunshine State, Promise You the Moon
- `src/data/catalog.js` — the extensible catalog schema (Section 5 below)
- All 15 recovered images, placed and verified against every `cover.image` / author-photo path used in the code
- All 5 real fonts (Newsreader normal/italic, Work Sans, IBM Plex Mono 400/500), self-hosted as `.woff2` files — see Section 4

Per Tyler's instruction, the following were **not** built and should not be inferred as started: other individual book detail pages, Find Your Next Read, Clean Romance Reading Room, legal pages, or any new feature.

## 2. Build & route verification

`npm run build` completes cleanly, 7 pages generated, no errors or warnings. All 7 routes were checked against a local preview server and return `200` with the expected `<title>`:

| Route | Status |
|---|---|
| `/` | 200 |
| `/about/` | 200 |
| `/books/` | 200 |
| `/books/promise-you-the-moon/` | 200 |
| `/series/equestrian-dreams/` | 200 |
| `/series/love-in-starlight-valley/` | 200 |
| `/series/sports-in-the-sunshine-state/` | 200 |

## 3. Visual/content comparison against the 7 Artifacts

Each rebuilt page was screenshotted at desktop (1440×900) and mobile (390×844) and compared side-by-side against its own surviving Artifact HTML rendered under the same conditions. This pass caught five real defects, all now fixed in the delivered source (not just described — the ZIP already contains the fixes):

1. **Font substitution was unnecessary and has been reverted.** An earlier recovery pass assumed the recovered `@font-face` rules pointed to missing self-hosted files and substituted a Google Fonts CDN `<link>` as a flagged stand-in. That assumption was wrong: every Artifact embeds the real font binaries directly as base64 `data:` URIs in its own `<style>` block. All 5 fonts (Newsreader normal/italic, Work Sans, IBM Plex Mono 400 & 500) have been extracted byte-for-byte and are now self-hosted from `/fonts/`. The Google Fonts CDN link has been removed from `BaseLayout.astro`. This also fixed a text-wrapping mismatch on the Love in Starlight Valley page (the "Starlight Valley" drop-cap heading was wrapping differently under a fallback font).
2. **My Books page had a Newsletter section that doesn't exist in the Artifact.** Grepping the raw My Books Artifact confirms no "Get a Free Book" content anywhere on that page. Removed.
3. **My Books page's shelf cards for prequel novellas were missing "· Start Here."** A hardcoded `startHere={false}` suppressed the badge for Shoot the Moon and Pucks & Pranks in the My Books shelf listing (the series pages themselves were correct). Fixed to `startHere={b.series.position.isPrequel}`.
4. **Site-wide footer was incorrectly omitting the current page's own series.** An earlier note in this project claimed the footer's "Series" column omits whichever series the current page belongs to. Re-checked directly against the raw markup of all 7 Artifacts: none of them omit anything — every single one lists all 3 series, including on that series' own pages. The filtering logic has been removed from `SiteFooter.astro`; `currentSeries` is still accepted as a prop (unused) so no call sites needed to change.
5. **Award badges were missing from two shelf-card instances.** Jump's "Winner — 2023 EQUUS Film Festival Literary Award for Fiction" badge wasn't wired up in either the My Books catalog shelf or the Equestrian Dreams series-page shelf (only the My Books "Other Books" section had it). Fixed in both places.
6. **My Books catalog-filter tab bar wasn't wrapped in `.wrap`, causing horizontal overflow on mobile.** The recovered markup wraps it in `<div class="wrap wrap--wide">`; without that wrapper the bar's own negative-margin bleed styling pushed the whole page 20px wider than the viewport on narrow screens. Fixed.

Also found and corrected: the Homepage's "Tiffany's Reading Promise" section had a fabricated grid/centered CSS treatment instead of the actual recovered rules (which are — confirmed via cid `data-astro-cid-6byozbff` — identical to the About page's version: a left-aligned flex row with the dot inline before the text, not centered above it).

After these fixes, full-page screenshot heights match within single-digit-to-low-double-digit pixels almost everywhere. Two differences remain and are **not bugs**:

- **About page (desktop −46px / mobile −430px vs. its Artifact):** the About Artifact's raw HTML has a `.preview-banner` dev note ("Design preview — Phase 5 About page, as built...") hardcoded above the real header, unique to that one Artifact. It is tooling metadata, not site content, and is correctly absent from the rebuild.
- Small residual differences (roughly 5–60px) on a few pages are ordinary text-reflow noise (a sentence wrapping one word earlier/later at an identical font size), not structural or content differences.

### Deliberate, previously-approved deviations (not defects)

These are known and intentional, per Tyler's explicit R2 approval and the resolved Recovery Inventory Report — flagged here rather than silently reproduced or silently fixed:

- **Book Three (Sports in the Sunshine State)** shows no visible "Baseball romance" trope chip — moved to `keywordTropes`-only per Tyler, even though one Artifact rendered it as a visible pill.
- **Promise You the Moon's tropes** show "It's Always Been You" rather than "Second chance," which 3 of 4 card-style Artifacts displayed — per Tyler + spreadsheet, "Second chance" is stale.
- **Fall, The Cowboy Christmas Distraction, Soar, and Off the Bench** each show a trope-pill set from the later/fuller Artifact snapshot (or a Tyler-approved blurb-sourced trope) rather than the earliest Artifact snapshot — each individually sourced and commented in `catalog.js`.
- **Every BookCard's "Learn more" action is disabled** ("Learn more — page coming soon") except: the Shoot the Moon card inside the Promise You the Moon page (which links to `/series/love-in-starlight-valley/#start-here`, exactly as recovered) and Promise You the Moon's own card everywhere else, which stays disabled even though a real detail page now exists — every recovered instance of that specific card shows the disabled state, so it's preserved as a genuine pre-existing gap rather than "fixed."
- **Homepage's "Browse Series" cards and My Books' equestrian/sports/starlight shelf "Learn more" links** stay disabled placeholders, matching every Artifact.
- No responsive `<picture>`/`srcset` variants were reconstructed (the Artifacts' recovered `srcset` values pointed to responsive image transforms that weren't independently recovered as separate files); every image ships as a single full-resolution JPEG.

## 4. Fonts

Corrected in this pass (see Section 3.1) — 5 real font files, self-hosted:

| File | Family | Weight | Style |
|---|---|---|---|
| `newsreader-400-600-normal.woff2` | Newsreader | 400–600 | normal |
| `newsreader-400-600-italic.woff2` | Newsreader | 400–600 | italic |
| `work-sans-400-700-normal.woff2` | Work Sans | 400–700 | normal |
| `ibm-plex-mono-400-normal.woff2` | IBM Plex Mono | 400 | normal |
| `ibm-plex-mono-500-normal.woff2` | IBM Plex Mono | 500 | normal |

## 5. `catalog.js` schema

### Top-level exports

- `PEOPLE` — `tiffany`, `lindsay`, `sarah` (3 people: `slug`, `name`, `role`, `url`)
- `SERIES` — 3 series (`slug`, `title`, `authors`, `tagline`, `setting`, `accentColorToken`, `readingNote`, `complete`) — fully populated
- `BOOKS` — 13 books
- Helpers: `getBookBySlug`, `getSeriesBySlug`, `getBooksInSeries`, `getStandaloneBooks`

### Per-book fields and population status (13 books)

| Field | Populated | Status |
|---|---|---|
| `slug`, `title`, `authors`, `series.slug`, `series.position` | 13/13 | Fully populated |
| `collaboration` | 0/13 | Reserved for future collaboration metadata beyond co-authorship; not yet needed by any recovered book |
| `bookType` | 11/13 | 2 unset where no source classified it (see the novella/novel terminology tension noted at the top of `catalog.js`) |
| `hook` | 13/13 | Fully populated (verbatim, Artifact-sourced) |
| `blurb` | 1/13 | Only Promise You the Moon has a recovered verbatim back-cover blurb; every other book's blurb is `null` rather than synthesized from hook/trope/memory-log fragments |
| `tropes` | 12/13 | Book Three intentionally empty (see Section 3, deliberate deviations) |
| `keywordTropes` | 13/13 | Fully populated |
| `readerHooks` | 1/13 | Only Promise You the Moon's detail page has a distinctly-labeled "Reader Hooks" section; `null` elsewhere rather than duplicating `tropes` |
| `sport` | 10/13 | 3 books have no sport (non-sports series entries) |
| `setting` | 13/13 | Fully populated |
| `content` (clean/profanity/sensitive) | 13/13 | Fully populated |
| `cover.image` | 12/13 | Book Three has no cover yet — confirmed gap, not a recovery failure |
| `release.date` | 1/13 | Only Promise You the Moon has a confirmed specific date; others have `year`/`status` only or nothing |
| `retail` | 3/13 have an entry | Of those 3: 1 has a real confirmed URL (Jump's audiobook affiliate link), 2 are explicit placeholders with `url: null` (Promise You the Moon's preorder, and one BookFunnel-routed title) — the remaining 10 books have `retail: []` |
| `freeRead` | — | Boolean, set true/false per book as confirmed (not a "populated vs. pending" field) |
| `awards` | 2/13 | Jump and A Christmas Court(ship) — every other book's array is empty, not because they lack recognition but because none was recovered |
| `formats` | 13/13 | Populated from the spreadsheet |
| `discovery.vibe` / `discovery.filters` | 0/13 | Deliberately reserved, empty for every book — this is the field explicitly held open for the future Find Your Next Read tool per Tyler's instruction; nothing populates it in R2 |

One title — **One Moonlit Night** — is confirmed real and upcoming but is deliberately **not** in `BOOKS` per Tyler's explicit instruction; it exists only as a comment in `catalog.js` pending a decision on how "upcoming, unannounced" books should render.

## 6. Deliverable

Complete source ZIP: `tnc-website-R2-source.zip` (includes `src/`, `public/` with all images and fonts, and project config; `node_modules/`, `dist/`, and `.astro/` excluded — run `npm install` after unzipping).

---

**R2 is complete. Per Tyler's instruction, R3 does not begin automatically — this package is for review.**
