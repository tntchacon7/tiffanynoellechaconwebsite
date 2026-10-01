# R6 — Launch Readiness & Deployment Preparation

Tiffany Noelle Chacon author site · R6 (+ R6.1 pre-launch blocker pass)

This report covers everything completed across R6 and its R6.1 follow-up pass: a full pre-launch audit of every route, the fixes made as a result, a production build verified against the fixed dist output, deployment configuration, and what's left before the site can go live at tiffanynoellechacon.com. Companion documents: `R6-Redirect-Map.md` (old-site URL research) and `R6-Launch-Checklist.md` (the exact steps for going live).

The current source was treated as authoritative throughout. No new features were built and no approved pages were redesigned; every change here is a launch-blocking bug fix or deployment preparation, documented below and in the code with an `[R6 FIX]` / `[R6 ADDITION]` / `[R6.1 FIX]` comment at the change site.

---

## R6.1 — what changed in this pass

Tyler flagged three specific issues after an independent inspection of the R6 ZIP; a full re-audit turned up one more, larger one. All four are fixed:

1. **Visible legal-page placeholders removed.** `/privacy-policy/` and `/terms/` previously rendered a literal `[ADD BEFORE LAUNCH: ...]` bracket note in place of contact info — a real launch blocker, now replaced with the contact email Tyler supplied (`tiffanynoellechacon@gmail.com`).
2. **New `/contact/` page.** Restrained, on-brand, no form/backend — a direct mailto link, covering reader questions, podcast/media inquiries, speaking opportunities, and business inquiries. Added to the footer's Explore column. Old `/contact-me/` now redirects to it. Added to the sitemap.
3. **Homepage podcast section made evergreen.** Removed the visible "Episode details coming soon — pending current episode info." placeholder and the gradient placeholder art. Now shows the real Clean Romance Podcast cover art (supplied by Tyler in this conversation) and general, non-time-sensitive show copy linking out to thecleanromancepodcast.com — nothing that needs per-episode upkeep.
4. **Found during the re-audit, not in Tyler's original list: every "Learn More" link on `/books/` and all three `/series/` pages was a disabled, non-functional placeholder** ("Learn more — page coming soon"), even though real detail pages exist for every one of those books. This wasn't visible as a broken link in the earlier link-integrity check because there was no `<a href>` at all to flag — just a disabled `<span>` — so it only surfaced by reading the actual rendered page text, which is exactly what this pass's placeholder re-audit was for. Root cause: `BookCard.astro` has always supported an `href` prop to render a real link, but `/books/index.astro` and all three series pages (`love-in-starlight-valley.astro`, `sports-in-the-sunshine-state.astro`, `equestrian-dreams.astro`) never passed it. This is likely the single highest-impact fix in either R6 or R6.1 — it affected the main "My Books" page and every series page's "Start Here," reading-order shelf, and "flagship" book cards, meaning a reader browsing by series or by the books list had no way to click through to any book's own page. Fixed by passing `href={`/books/${b.slug}/`}` (conditionally `null` for the one genuinely-unannounced book, "Book Three," which correctly keeps its "Coming Soon" badge and disabled state).

Also explicitly verified per Tyler's request: **Promise You the Moon's Amazon CTA renders its real `<a rel="sponsored noopener noreferrer">Preorder Now</a>` link**, not a `Preorder Now — link coming soon` disabled fallback — that page has real Amazon affiliate data in `catalog.js` and was never actually affected.

A full re-audit (details below, under **READY**) searched both `src/` and the built `dist/` output for `ADD BEFORE LAUNCH`, `TODO`, `FIXME`, `integration pending`, `pending current`, `page coming soon`, `link coming soon`, and similar. The only remaining match is the literal, legitimate "Book Three" catalog status (an actually-unannounced future book, correctly shown as "Coming Soon" with a disabled action) — left alone, per instruction, as real content rather than a development placeholder.

---

## READY (verified, no changes needed)

**Deployment situation.** Astro 4.16, fully static (no adapter, no server-rendered routes, no `export const prerender = false` or API routes anywhere in `src/`). No environment variables are read anywhere in the codebase. Build command: `npm run build`. Output directory: `dist`. Node 18.17+/20.3+/22+ required by Astro 4.16; pinned to 22 in `.nvmrc` and `netlify.toml`.

**Site-wide audit (25 routes, including the new Contact page).** Every route builds successfully and returns HTTP 200. Every page has exactly one `<h1>`, a sensible heading hierarchy, a meta description, a correct self-referential canonical URL, Open Graph and Twitter Card tags, and a favicon. No duplicate `id` attributes, no images missing `alt` text, no horizontal overflow at 1440px or 390px, no browser console or page errors, and a visible keyboard-focus outline reachable by Tab on every page tested.

**Internal links.** Every internal link and same-page/cross-page `#anchor` link was checked against the actual built HTML, re-verified after the R6.1 fixes. No dead full-page links anywhere on the site. Four pages' `#newsletter` footer link doesn't resolve on that specific page — see **Known, low-severity, left as-is** below; harmless no-ops, not broken links.

**Amazon & BookFunnel links.** Every book's `retail` data checked against how it renders: Amazon links carry `rel="sponsored noopener noreferrer"`, `target="_blank"`, and the required disclosure, both per-book and sitewide in the footer. BookFunnel links carry `target="_blank" rel="noopener noreferrer"` with no false disclosure. Promise You the Moon's Amazon CTA specifically re-verified per Tyler's request (see **R6.1** above). No URLs changed or invented.

**Performance.** Total built site is ~2.8MB. Every image has explicit `width`/`height` (no layout shift), book covers lazy-load by default except each book's own above-the-fold hero cover. All self-hosted `@font-face` rules use `font-display: swap`. Nothing here needed changing.

**Placeholder/dev-language re-audit (R6.1).** Searched `src/` and the built `dist/` for `ADD BEFORE LAUNCH`, `TODO`, `FIXME`, `integration pending`, `pending current`, `page coming soon`, `link coming soon`. Only legitimate match: "Book Three" (an actually-unannounced future book), correctly shown as "Coming Soon" — not a development placeholder, left as-is.

---

## FIXED (launch-blocking bugs found and corrected, R6 + R6.1)

1. **Favicon/site icon — missing sitewide.** Built a Tiffany-Blue monogram and wired it into `BaseLayout.astro`.
2. **Dead `/free-book/` link — sitewide, in the header.** Repointed to `/#newsletter`.
3. **Disabled "Full series page — coming soon" placeholder — homepage.** Replaced with real links to the 3 series pages.
4. **Missing Newsletter section — "What Is Clean Romance?" article.** Added, for consistency with every other content page. **Correction to R5-Report.md:** that report's QA section stated the Newsletter component was "confirmed intact and unchanged on both new pages" — inaccurate for this page specifically (it was never included there). Flagging plainly.
5. **Canonical domain — `astro.config.mjs`.** Changed from `www.tiffanynoellechacon.com` to `https://tiffanynoellechacon.com`, per Tyler's instruction and confirmed by the redirect-map research.
6. **Missing meta descriptions — all 3 series pages.** Added, using each series' own existing, already-approved `tagline`.
7. **Dead `/privacy-policy/` and `/terms/` links — sitewide, in the footer.** Built both pages.
8. **No 404 page.** Built one, on-brand.
9. **No sitemap or robots.txt.** Built `/sitemap.xml` (hand-written endpoint — the official `@astrojs/sitemap` integration crashed the build against this project's pinned Astro 4.16, so this is a small dependency-free endpoint instead — needs a manual update if a route is ever added or removed) and `/robots.txt`.
10. **No deployment configuration.** Added `netlify.toml` and `.nvmrc`. Hardened `.gitignore` against ever committing a `.env` file.
11. **Newsletter form had no live endpoint.** Now a real link to Tyler's BookFunnel "newsletter builder" page for Pucks & Pranks (his stated preference), matching his existing BookFunnel → Kit pipeline. See git history for the full reasoning (Featured book, per-book link separation, unused URLs recorded for future use).
12. **Bonus content redistributed from the old grab-bag page to the 6 specific books it actually belongs to** (Comeback Play, Off the Bench, Jump, Fall, Cowboy Christmas Distraction, Soar), via a new `BonusContent.astro` component. Off Course and Pucks & Pranks deliberately excluded (already have a free, no-email button). The multi-author holiday anthology excluded entirely — doesn't fit any single book page; flagged for Tyler.
13. **[R6.1] Visible legal-page placeholders.** `[ADD BEFORE LAUNCH: ...]` bracket notes on Privacy Policy and Terms replaced with Tyler's supplied contact email.
14. **[R6.1] No contact mechanism anywhere on the site.** New `/contact/` page (mailto link, no form). Footer updated. `/contact-me/` now redirects there. Added to sitemap.
15. **[R6.1] Homepage podcast section had a visible "coming soon" placeholder and no real artwork.** Made evergreen — real cover art, general show copy, external link only.
16. **[R6.1] Sitewide broken book navigation.** `/books/` and all 3 series pages' book cards had no working "Learn More" link to any book's real detail page — see **R6.1** section above for the full explanation. This is the most consequential fix in this pass.

**Known, low-severity, left as-is:** `/books/`, `/privacy-policy/`, `/terms/`, and `/contact/` don't include the `<Newsletter />` section, so the footer's `#newsletter` link is a harmless no-op on those four pages (it simply doesn't scroll anywhere). For `/books/`, this matches a deliberate decision from an earlier phase (the recovered legacy page genuinely had no newsletter section). For the legal and contact pages, a newsletter pitch didn't seem like the right call on a utility page — flagging rather than silently deciding.

---

## BLOCKERS (need your input before or at launch)

1. **Privacy Policy and Terms of Use are conservative starter drafts — not legal advice.** They describe only what this site actually does, with nothing fabricated, and now have a real contact email. Still worth a quick look from an actual lawyer before or shortly after launch.

2. **Six pieces of old-site content still have no home on the new site** (the blog, a book club guide, a media/speaking page, a launch-team page, an events section, and the multi-author holiday anthology) — see `R6-Redirect-Map.md`'s "Preserve Before Launch" list. None of it was migrated automatically, per your instruction; this is the list to decide from.

3. **Actual deployment requires your login.** Connecting a hosting account, linking the GitHub repo, and pointing the domain all have to happen in accounts only you can access. Everything on this end is prepared so those steps are as short as possible — see `R6-Launch-Checklist.md`. Per your instruction, the custom domain is **not** being pointed anywhere yet — this build is meant for GitHub + a temporary Netlify URL for final live QA only.

---

## TIFFANY MUST DO (short and actionable)

1. Skim the redirect map's "needs decision" list and say keep/drop/rebuild-later for each: old blog, launch-team page, book club guide, media/speaking page, events page.
2. Decide if/where "A Stocking Filled With Carrots" (the multi-author holiday anthology) should appear on the site.
3. Have someone glance at the Privacy Policy / Terms pages before (or soon after) launch.
4. Create a Netlify account, connect the GitHub repo, and deploy to a temporary URL — exact steps in `R6-Launch-Checklist.md`. Do the final live QA pass there before pointing the real domain at it.

---

## AFTER LAUNCH (deliberately deferred, not needed to ship)

- A dedicated `/free-book/` landing page, richer than the current `/#newsletter` anchor.
- Real brand icon art, if wanted, to replace the monogram favicon.
- Google Search Console setup + submitting `/sitemap.xml`.
- Choosing and installing an analytics tool — none is installed today.
- Deciding the fate of the old blog/media/events/anthology content flagged above.
- If a route is ever added or removed, `src/pages/sitemap.xml.js`'s route list needs a matching manual update.
- Continuing the Reading Room article roadmap (already planned separately in `Reading-Room-Content-Roadmap.md`) — out of scope for this phase.
- A real contact form/backend, if ever wanted beyond the direct mailto link.

---

## What this phase did not touch

Per the brief's explicit scope limits: no new Reading Room articles, no redesign of the homepage/Books/About/Find Your Next Read pages, no new features beyond the explicitly-requested Contact page, and no broad refactoring. Every change above is either a genuine bug fix or new deployment scaffolding — nothing already-approved was restructured.
