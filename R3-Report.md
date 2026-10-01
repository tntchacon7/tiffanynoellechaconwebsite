# R3 Report — Individual Book Detail Pages

Tiffany Noelle Chacon author site · R3 (11 new book detail pages, live retail links, Amazon affiliate disclosure)

## 1. What was built

- **11 new book detail pages** under `src/pages/books/`: Off Course, Jump, Fall, The Cowboy Christmas Distraction, Soar (Equestrian Dreams); Pucks & Pranks, Off the Bench (Sports in the Sunshine State); Shoot the Moon (Love in Starlight Valley); The Comeback Play, A Christmas Court(ship), A Holly Jolly Christmas Cubicle (standalone collaborations).
- **One new shared component**, `src/components/book/RetailCTA.astro` — renders the correct purchase/read CTA and, where required, the Amazon affiliate disclosure, from a book's `retail` data. Used only by the 11 new pages.
- **Additive-only `catalog.js` changes**: `blurb` populated for all 11 (from your uploaded long-form blurb packet, verbatim); `microHook` added for all 12 books with a supplied value (from "Tiffany's Book Hooks.xlsx"), stored only — confirmed via `dist/` scan to never render anywhere; `retail` populated with every real URL you supplied, including Promise You the Moon's.
- **Promise You the Moon** (already-approved R2 page): narrowly-scoped edit only — its disabled "Preorder Now — link coming soon" placeholder now renders as a live Amazon affiliate link, with `rel="sponsored"` and the required disclosure line beside it. Nothing else on that page changed.
- **Site footer**: one added line, "As an Amazon Associate I earn from qualifying purchases." — exact required wording, no extra copy, styled as small print matching the existing copyright line.
- **Book Three** (Sports in the Sunshine State) remains excluded — no title, no cover, nothing to build. No route exists for it.

Per your instruction, R4-scope items were not touched: Find Your Next Read, Clean Romance Reading Room, legal pages, One Moonlit Night, and no new feature work beyond what was approved.

## 2. Build & route verification

`npm run build` completes cleanly — 18 pages generated (7 from R2 + 11 new), no errors or warnings. All 18 routes checked against a local preview server, all return `200` with the expected `<title>`.

## 3. Retail links wired (all verified against your source packet, byte-for-byte)

| Book | Destination | CTA label |
|---|---|---|
| Promise You the Moon | `amzn.to/4cd97Z3` | Preorder Now *(existing R2 label, unchanged)* |
| Jump | `amzn.to/4q46DC2` | Buy on Amazon |
| Fall | `amzn.to/4hppbKJ` | Buy on Amazon |
| Soar | `amzn.to/4g6NXx7` | Buy on Amazon |
| Off the Bench | `amzn.to/3TIyvzG` | Buy on Amazon |
| The Cowboy Christmas Distraction | `amzn.to/4horpKv` | Buy on Amazon |
| A Christmas Court(ship) | `amzn.to/4xPX5gT` | Buy on Amazon |
| The Comeback Play | `amzn.to/4fOTYj4` | Buy on Amazon |
| Off Course | `dl.bookfunnel.com/m4uzadga09` | Read Free on BookFunnel |
| Shoot the Moon | `dl.bookfunnel.com/nkviqnxhle` | Read Free on BookFunnel |
| Pucks & Pranks | `dl.bookfunnel.com/2lknprbvsq` | Read Free on BookFunnel |
| A Holly Jolly Christmas Cubicle | `buy.bookfunnel.com/bobjudapku` | Get It Free for Subscribers |

Every Amazon link carries `rel="sponsored noopener noreferrer"` and `target="_blank"`, plus the exact disclosure sentence directly beneath the button. No BookFunnel link carries the Amazon disclosure. Jump's page also retains its original R2-recovered audiobook affiliate link inside its `retail` array (not used as the primary CTA, since the new general Amazon link now takes that role — both are preserved in the data).

## 4. Micro Hooks

Stored in `catalog.js` for all 12 books with a supplied value, exactly as given in "Tiffany's Book Hooks.xlsx." Verified via a `dist/` output scan: `microHook` is never referenced by any `.astro` template and never renders on any page. (Shoot the Moon's `microHook` happens to be identical text to its already-displayed `hook` — that's a coincidence of the source data, not a display of the new field; flagged in the code comment where it occurs.)

## 5. Judgment calls made and disclosed (not silent changes)

1. **Two blurbs intentionally trimmed before verification, approved by Tyler 2026-09-11.** The Cowboy Christmas Distraction's and Soar's source files each end with a "Tropes you'll find (and love) in this novel/novella: [list]" line — a colon-terminated header followed by a bare one-item-per-line enumeration, not back-cover prose, and it duplicates the separately-modeled `tropes`/`keywordTropes` fields already rendered as chips on the same page. That line was excluded from `book.blurb` for both titles as an editorial decision made *before* running the QA verification in Section 6 below — it was not caught or removed by that verification. To state precisely what "verified character-for-character" means for these two titles specifically: the approved prose portion of each blurb (everything through its last marketing sentence) was diffed character-for-character against the source file and matched exactly; the separately-formatted trope-list lines were deliberately excluded from the blurb field beforehand, not silently dropped after a full-file comparison. Tyler reviewed the exact raw source text, the exact omitted lines, and the exact resulting stored text for both titles and approved the exclusion.
2. **Hero "genre" line omitted on all 11 new pages.** Promise You the Moon's hero has a short line ("A clean, kisses-only small-town romance.") that was never recovered for any other book. Reusing the full `series.tagline` sentence in that slot would overflow the short-phrase-sized layout it was built for, and no equivalent short phrase exists for these books. Rather than force a mismatched length into that slot or invent new short copy, it's omitted entirely on the new pages. This is a small deviation from my last pre-approval message (which had proposed reusing the tagline there) — flagging it now since I only caught the layout-fit problem once building the actual pages.
3. **Series-context tagline included on 7 of 8 series pages, omitted on one.** Per your decision 1, I used the existing `series.tagline` where it reads naturally: included for Off Course, Jump, Fall, Soar, Pucks & Pranks, Off the Bench, and Shoot the Moon. Omitted for The Cowboy Christmas Distraction — its tagline describes the series as following "the same central couple," which isn't true of this holiday spinoff (its leads, Monica and Matthew, are different characters). That page shows only the plain factual sentence.
4. **New content details, not previously in this catalog**, that arrived via the blurb packet: character names Isabella Castillo and Elliot Adler (Pucks & Pranks), Sadie Hart (A Christmas Court(ship)), and Grayson's middle initial "J." (Soar). None conflict with anything already recorded — they fill in previously-unnamed detail.

## 6. QA performed

- Clean build, all 18 routes verified 200 with correct titles.
- Character-for-character diff of all 11 new `blurb` values and all 12 `microHook` values against your source files — zero mismatches. (For The Cowboy Christmas Distraction and Soar, this diff was run against the intentionally-trimmed prose target described in Section 5, item 1 — not the complete raw file, which also contains a separate trope-enumeration line excluded by design, not by the diff.)
- Character-for-character diff of all 12 retail URLs against the exact strings you supplied — zero mismatches.
- Confirmed via `dist/` grep: Reader Hooks section renders only on Promise You the Moon; the "preceding book" series-context module renders only on Promise You the Moon; Series/Position rows render only on the 8 series pages; the Collaboration row renders only on the 3 standalone pages; the Awards row renders only on Jump and A Christmas Court(ship); the Co-Author row and SeriesCoauthor section render on all 3 actually-co-authored pages (Shoot the Moon, Promise You the Moon, A Holly Jolly Christmas Cubicle) — a missing Co-Author row on Shoot the Moon's details table was caught at this step and fixed before delivery.
- Confirmed no Amazon `rel="sponsored"` link is missing its disclosure, and no BookFunnel link carries one.
- Confirmed the footer disclosure renders on all 18 pages, exact wording only.
- Confirmed `microHook` values never appear in any rendered HTML.
- Confirmed Book Three has no route.
- Desktop (1440×900) and mobile (390×844) screenshots of all 11 new pages: zero horizontal overflow on any page/viewport combination; visual spot-check of representative pages (a series page with an award, a standalone collaboration, and the subscriber-gated CTA on mobile) confirms consistent Quiet Editorial styling with no layout defects.

## 7. Deliverable

Complete source ZIP: `tnc-website-R3-source.zip` (`src/`, `public/`, and project config; `node_modules/`, `dist/`, and `.astro/` excluded — run `npm install` after unzipping).

---

**R3 is complete.** Per your instruction, R4 has not begun — this package is for your review.
