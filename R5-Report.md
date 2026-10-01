# R5 Report — Clean Romance Reading Room Foundation

Tiffany Noelle Chacon author site · R5 (Reading Room hub + cornerstone guide)

**Status: R5 core scope is complete, QA'd, and packaged for your review.** This phase built the Reading Room hub and its cornerstone article on top of the approved R4 baseline, plus the planning/research documents the brief asked for. Nothing beyond that scope was started — no other Reading Room guide was written or published, and the next site phase was not begun.

---

## 1. Files created

**Pages**
- `src/pages/clean-romance/index.astro` — the Reading Room hub
- `src/pages/clean-romance/what-is-clean-romance/index.astro` — the cornerstone guide

**Layout**
- `src/layouts/GuideLayout.astro` — shared shell for Reading Room guides (breadcrumbs, article header, prose typography scope). Built small on purpose, so the nine roadmap guides in Reading-Room-Content-Roadmap.md can reuse it without new layout work.

**Components** (`src/components/guide/`)
- `Breadcrumbs.astro` — shared breadcrumb nav, visually identical to the pattern already used inline on every book detail page, just extracted since the Reading Room needed it in more than one place
- `EditorialCallout.astro` — bordered/tinted aside for a single set-apart idea (used for the "closed door isn't a full content guide" note)
- `PullQuote.astro` — large editorial pull-quote treatment (used once, for an adapted Tiffany quote — see Section 8)
- `RelatedReading.astro` + `RelatedReadingItem.astro` — the "Continue Reading" link treatment connecting the guide back to the hub and to Find Your Next Read

**Documents**
- `Reading-Room-Content-Roadmap.md` — the next nine planned Reading Room guides, plus the Part 15 recommendation data-model proposal
- `Reading-Room-Research.md` — fact-check sourcing for the cornerstone article, plus preliminary (unverified) research for the next content wave
- `R5-Report.md` — this report

**Deliverable**
- `tnc-website-R5-source.zip`

## 2. Files modified

- **`src/layouts/BaseLayout.astro`** — added optional, backward-compatible props (`canonicalPath`, `ogType`, `ogImage`, `structuredData`) and now renders an automatic canonical link and baseline Open Graph/Twitter Card tags for every page, computed from `astro.config.mjs`'s `site` value and the page's own route. Every existing page's existing props still work unchanged — nothing was required to be passed for a page to keep building exactly as before. This was a deliberate, conservative scope decision: it's a one-file, non-visual, additive change that fulfills Part 11's SEO requirement across the whole site rather than only the two new pages, and it carries effectively no risk since it only adds `<head>` metadata.
- **`src/pages/index.astro`** — the homepage's existing "Reading Room" teaser section had five inert guide-title rows (recovered in R2, explicitly commented as placeholders "before the Reading Room articles are actually written"). One of them — "What Is Clean Romance?" — now links to the real, live guide; its "Coming soon" chip was replaced with a "Read →" treatment. The other four rows are untouched and still inert. This is exactly the small, brief-permitted, explicitly-documented internal-link change described in Part 12 — no other part of the homepage was touched.

No other existing file changed. `catalog.js`, `BookCard.astro`, `DiscoveryResultCard.astro`, `discoveryTaxonomy.js`, the `find-your-next-read` page, and all 18 previously-approved R3/R4 pages are byte-for-byte identical to the R4 baseline — confirmed by checksum diff against the approved `tnc-website-R4-source.zip` tree (see Section 6).

## 3. Content written

The cornerstone guide, "What Is Clean Romance? A Reader's Guide to the Terms," covers: what clean romance means and why there's no single industry-wide definition; how "clean," "closed door," and "fade to black" overlap and differ (including the specific nuance the brief required — that closed door doesn't always mean intimacy happens off-page, since many closed-door books have none at all); what "no spice" means as informal reader shorthand; what a "clean" or "closed door" label doesn't automatically tell you; Tiffany's own promise ("Kisses Only. No explicit scenes. Ever."); and practical guidance for finding clean romance that actually fits a reader's own preferences, bridging naturally to Find Your Next Read. It's ~1,450 words — thorough without padding, no FAQ block, no keyword stuffing.

## 4. SEO / technical changes

- Canonical URLs and baseline Open Graph/Twitter Card tags, site-wide (see Section 2)
- Article JSON-LD structured data on the cornerstone guide only, per Part 11 ("only if it fits cleanly and can be implemented accurately") — `headline`, `description`, `author`, `publisher`, `mainEntityOfPage`, `image`. **`datePublished`/`dateModified` were deliberately omitted** — this site has no existing "published on" convention anywhere, and inventing one would be fabricating metadata, which the brief explicitly prohibits. If you want a real publish date on this article, that's a one-line addition once you tell me what it should be.
- Exactly one `<h1>` per new page, logical `h2` hierarchy with no skipped levels (verified programmatically, see Section 5)
- Both new pages' OG image currently reuses an existing site photo (`headshot-secondary.jpg` for the guide, `homepage-hero-outdoor.jpg` for the hub) rather than dedicated Reading Room art, since none exists yet — a reasonable placeholder, easy to swap later
- No fake ratings, dates, review counts, or popularity claims anywhere on either page

## 5. QA results

- Clean build (`rm -rf dist .astro && npm run build`): **21 pages generated** (the 18 approved R3/R4 pages + `/books/` index + Find Your Next Read = 20 existing, plus the 2 new R5 pages = 21 total; matches expectations exactly)
- **All 21 routes checked against a local preview server: all return 200**, including both new Reading Room routes
- Both new pages: exactly one `h1`, no duplicate `id`s, no `h2`/`h3` level-skipping, `0px` horizontal scroll overflow at both 1440px and 390px
- Canonical URL, OG tags, and (on the guide) Article JSON-LD all verified present and correctly populated via direct DOM inspection, not just visual review
- Keyboard navigation: tabbing through both pages produces a visible focus outline (checked programmatically via computed `outline-style`/`outline-width`, not assumed)
- Internal links on both new pages checked against the real route list — none point to a non-existent page; the "Browse by what you're craving" categories are intentionally non-linked placeholders, not broken links
- The homepage's Reading Room section re-screenshotted after the index.astro change — the live row renders correctly, the four inert rows are unaffected
- **Find Your Next Read regression check:** since no file in that feature was touched (confirmed by checksum diff), this was a smoke test rather than a full re-run of the R4 suite — loaded the page, selected the "Enemies to Lovers" trope, and confirmed it still returns exactly the expected three-way tie (Fall, Soar, Pucks & Pranks) with no console errors
- Newsletter component confirmed intact and unchanged on both new pages (same free-book cover art, same "integration pending" note as everywhere else on the site)

One transient false alarm during QA, worth disclosing rather than hiding: an early QA pass logged a single console 404 on `/clean-romance/`. Re-running the same check twice more with explicit response-status monitoring showed no failed requests at all — it didn't reproduce, and a targeted check confirmed the one image on that page (the Newsletter component's cover art) loads correctly; `complete: false` at evaluate-time was the same lazy-load timing artifact documented during R4 QA, not a real failure. Treated as a one-off preview-server hiccup, not a page bug.

## 6. Regression results

Full checksum diff of the entire working tree (excluding `node_modules`/`dist`/`.astro`) against the approved `tnc-website-R4-source.zip`:

- **5 new files** in `src/components/guide/`
- **1 new file**: `src/layouts/GuideLayout.astro`
- **2 new files**: the two new pages
- **1 modified file**: `src/layouts/BaseLayout.astro` (additive props only, see Section 2)
- **1 modified file**: `src/pages/index.astro` (one row's link, see Section 2)
- **3 new root-level documents**: this report, the roadmap, and the research doc
- **Every other file — including `catalog.js`, `BookCard.astro`, `DiscoveryResultCard.astro`, `discoveryTaxonomy.js`, the Find Your Next Read page, and all 18 previously-approved pages — is byte-for-byte unchanged.**

## 7. Autonomous decisions made

Per the brief's instruction to proceed on conservative, reversible, clearly-in-system decisions without stopping for approval:

1. **Left the podcast transcript's faith framing and its discussion of LGBTQIA+ representation out of the published article entirely.** This is the single most consequential editorial call made in R5, so it gets its own full explanation in Section 8 rather than a one-line summary here.
2. Extended `BaseLayout.astro` site-wide rather than scoping the canonical/OG work to only the two new pages (Section 2) — judged conservative and reversible since it's additive-only `<head>` metadata.
3. Wired one homepage row to a real link, explicitly anticipated by the original R2 dev comment and permitted by Part 12.
4. Chose not to build a `RecommendationCard`-style component in R5, since no recommendation content is being published yet (Part 9's "don't build for theoretical future use" instruction) — only documented the proposed schema (Reading-Room-Content-Roadmap.md, final section).
5. Reused existing site photography for OG images rather than leaving them blank or fabricating placeholder art.
6. Kept the hub's "Browse by what you're craving" section visible but entirely non-linked, matching the homepage's own established "Coming soon" convention rather than inventing a second placeholder pattern.

## 8. Transcript-source note

**Major ideas incorporated from the podcast transcript:** the real, specific distinction Tiffany draws between "closed door" sometimes meaning off-page intimacy and sometimes meaning no intimacy at all (this became the article's central nuance, and matches the brief's own Part 6 guardrail almost exactly); the observation that a "closed door" label doesn't by itself tell a reader about language or other content; the anecdote about a neighbor being confused by the term "closed door romance" (retold in the article's opening, adapted rather than quoted at length); and one adapted line used as a pull quote ("People think 'closed door' means I'm writing something explicit and just cutting away from it. Usually it means the opposite — there's nothing back there to cut away from.") — a compressed, original sentence in Tiffany's voice, not a verbatim transcript excerpt.

**Independently verified:** see Reading-Room-Research.md, Part 1, for the full table — five externally-checkable claims were verified against outside sources (no universal industry definition of "clean romance"; Amazon's real "Clean & Wholesome Romance" category; the closed-door nuance corroborated independently by Book Riot; "no spice" as informal shorthand; and the "clean" vs. "closed door" scope distinction).

**Omitted, and why:** the transcript's discussion of the hosts' faith journeys, several Bible passages, and roughly ten minutes of discussion about why they choose not to feature LGBTQIA+ characters in the books they write or recommend. All three reasons for the omission are documented in full at the top of the article's own source file (`src/pages/clean-romance/what-is-clean-romance/index.astro`), and summarized here: Part 6's approved guardrails define every term this article covers in secular, content-specific language (explicit content, profanity) and never mention faith framing or representation as part of this article's scope; Part 5 explicitly asks for a tone that is "not a sermon" and "not a defensive argument about romance publishing," which is exactly the register that material is in; and the project's own standing instruction from the Find Your Next Read phase — "keep representation out of chooser" — extends naturally to keeping representation out of this article too, for the same reason. This was a judgment call, not a factual question with a knowable right answer, so I'm flagging it clearly rather than treating it as self-evidently correct: if you or Tiffany want that material handled differently — in this article, in a separate one, or not at all — that's a real editorial decision that should be made deliberately, not left as an unstated default from this pass.

## 9. Unresolved issues / open questions for you or Tiffany

- **The romantic-comedy roadmap guide (#6 in Reading-Room-Content-Roadmap.md)** has a genuine open question: only Off the Bench carries an explicit "rom-com" trope tag in `catalog.js`, even though the Sports in the Sunshine State series is described at the series level as "clean sports rom-coms." Whether the rest of that series should be framed as rom-com in a future guide is Tiffany's call, not assumed in R5.
- **Two roadmap guides (hockey, marriage of convenience) currently have only one eligible Tiffany book each** and would need verified outside titles before they could honestly be published as "best of" lists — flagged in the roadmap doc, not resolved.
- **No outside-author book has been verified for any future recommendation article.** Everything in Reading-Room-Research.md Part 2 is landscape research and unverified candidate names only, exactly as the brief required.
- **OG images for both new pages reuse existing author photography** rather than purpose-made Reading Room art. Fine as a placeholder; worth revisiting if/when there's dedicated art for the Reading Room.
- **No `datePublished` on the Article structured data**, by design (Section 4) — easy to add once you have a real date you want used.

## 10. What was intentionally not done

- No other Reading Room guide was written or published (only the cornerstone article, per scope)
- No outside-author books were recommended anywhere on the live site
- No recommendation database or CMS was built — only the schema proposal in Reading-Room-Content-Roadmap.md
- No existing R3/R4 page was redesigned or had its copy rewritten
- `catalog.js` was not touched
- The next site phase after R5 was not started

## 11. Deliverable

Complete source ZIP: `tnc-website-R5-source.zip` (`src/`, `public/`, project config, and all planning/report/roadmap/research documents from every phase; `node_modules/`, `dist/`, `.astro/` excluded — run `npm install` after unzipping).

---

**R5's core scope — the Reading Room hub and the "What Is Clean Romance?" cornerstone guide — is built, QA'd, and ready for your review.** The next content wave (the nine roadmap guides) and any outside-author verification work are documented and ready to start whenever you'd like, but nothing beyond R5's scope was begun, per your instruction.
