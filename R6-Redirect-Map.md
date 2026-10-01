# R6 Redirect Map

Tiffany Noelle Chacon author site · R6 (Launch Readiness)

This document maps every meaningful URL on the **current live site** (tiffanynoellechacon.com, a WordPress + Elementor + WooCommerce build) to its equivalent on the **new site** being launched. It was produced by directly crawling and fetching the live site (its own sitemap XML files, its homepage navigation, and Google's index of it), not by guessing from old slugs.

The live redirects below are already implemented in `netlify.toml` (see that file) so they go live automatically the moment the new site is deployed and the domain is pointed at it. Nothing here requires a manual step beyond what's already in the config, **except** the five items marked "NEEDS TIFFANY DECISION," which have an interim redirect in place but a real decision still pending.

**Confirmed:** the live site's own `<link rel="canonical">` tag self-refers to `https://tiffanynoellechacon.com/` — non-www — which matches the new site's configured canonical domain (`astro.config.mjs`).

---

## Redirect map

| Old URL | Classification | New destination / notes |
|---|---|---|
| `/` | Same URL | `/` |
| `/about/` | Same URL | `/about/` |
| `/product/jump/` | Redirect | `/books/jump/` |
| `/product/fall/` | Redirect | `/books/fall/` |
| `/product/soar/` | Redirect | `/books/soar/` |
| `/product/off-the-bench/` | Redirect | `/books/off-the-bench/` |
| `/jump-the-novel/` | Redirect | `/books/jump/` (JUMP promo/gateway page, not distinct content) |
| `/off-the-bench-teaser/` | Redirect | `/books/off-the-bench/` (chapter-teaser page for the same book) |
| `/what-sport-are-you/` | Redirect | `/books/pucks-and-pranks/` (promo page for the free hockey novella, now published as *Pucks & Pranks*) |
| `/guessthesport/` | Redirect | `/books/pucks-and-pranks/` (contest tied to the same novella's launch) |
| `/reviewjump/` | Redirect | `/books/jump/` ("leave a review" CTA; no dedicated reviews page on the new site) |
| `/glossary/` | Redirect | `/series/equestrian-dreams/` (horse-terms glossary specific to the JUMP/equestrian series) |
| `/product-category/equine-fiction/` | Redirect | `/series/equestrian-dreams/` |
| `/shop/` | Redirect | `/books/` (closest "browse all books" equivalent — the new site isn't WooCommerce; purchases route to Amazon/BookFunnel from each book page) |
| `/product-category/sports-romance/` | Redirect | `/books/` (this category covered only one book at capture time; the new site has several sports titles across two series, so routing broadly avoids under-representing it) |
| `/cart/` | Safe 404 | WooCommerce artifact — no cart on the new static site |
| `/checkout/` | Safe 404 | Same |
| `/my-account/` | Safe 404 | WordPress login page — no user accounts on the new site |
| `/product-category/uncategorized/` | Safe 404 | Default empty WooCommerce category |
| `/product-tag/action/` | Safe 404 | Auto-generated WooCommerce tag archive, single product, no unique content |
| `/category/writing/` | Safe 404 | Auto-generated WP category archive, thin/duplicate of blog content |
| `/category/books/` | Safe 404 | Auto-generated WP category archive, thin/duplicate content |
| `/fullwidth-page/` | Safe 404 | Unused Elementor demo page — confirmed still Lorem Ipsum, never real content |
| `/portfolio-2-columns/` | Safe 404 | Elementor demo template, generic placeholder items, not linked in nav |
| `/portfolio-3-columns/`, `/portfolio-isotope/`, `/portfolio-1-column/` | Safe 404 | Same demo-portfolio family (pattern-matched, not individually fetched — see verification gaps below) |
| `/event/jump-book-launch-tampa/` | Safe 404 | One-time past in-person signing, no ongoing value |
| `/event/jump-book-launch-wellington-fl/` | Safe 404 | Same |
| `/prime-day/` | Safe 404 | Seasonal 2025 Amazon Prime Day roundup post, time-limited content |
| `/blog-2/` | Safe 404 | Orphaned duplicate Elementor blog-template page, not linked in main nav |
| `/launch-team/` | **Needs Tiffany decision** | JUMP launch-team signup (2022 promo, prizes, email capture). Interim redirect → `/books/jump/`. Decide: does the new site want an active launch-team mechanism? |
| `/writing/` (nav label "Blog") | **Needs Tiffany decision** | No blog section exists on the new site at all. See content-preservation list below. Interim redirect → `/books/` is **not** yet configured — this one currently has no redirect in `netlify.toml` pending Tiffany's call on whether a blog is coming back. |
| `/contact-me/` | Redirect (resolved in R6.1) | A real `/contact/` page now exists (restrained, no form — a direct email link), so this redirects there. |
| `/jump-book-club-guide/` | **Needs Tiffany decision** | Discussion questions + printable bookmarks, gated by a form. Interim redirect → `/books/jump/`, but the book-club-guide feature itself isn't migrated. |
| `/media-speaking/` | **Needs Tiffany decision** | Press/speaking-engagement hub. Interim redirect → `/about/`. |
| `/bonus-content-freebies/` | Redirect (resolved) | Its 8 items were redistributed to their own book pages (Comeback Play, Off the Bench, Jump, Fall, Cowboy Christmas Distraction, Soar, plus the existing Off Course/Pucks & Pranks free-read buttons) — see R6-Launch-Readiness-Report.md. Redirects → `/books/` as the closest single landing spot. One item, a multi-author holiday anthology ("A Stocking Filled With Carrots"), didn't fit any single book page and is still a Tiffany decision — see below. |
| `/events/` | **Needs Tiffany decision** | Currently shows "no upcoming events." Safe to 404 as-is, but confirm Tiffany doesn't want an events page revived for future signings. |
| `/what-i-wish-i-knew-before-self-publishing/` | Keep temporarily | Real blog post — no blog section on the new site. See content-preservation list. |
| `/plotting-techniques/` | Keep temporarily | Real blog post — same. |
| `/worldbuilding/` | Keep temporarily | Real blog post — same. |

---

## Old content with no equivalent on the new site ("Preserve Before Launch" list)

- **The entire blog** (`/writing/` index + 4 posts): "10 Things I Wish I Knew Before Self-Publishing," "5 Plotting Techniques for Novelists," a Worldbuilding article, and a Prime Day roundup. The new site has no blog route.
- **Book club guide** (`/jump-book-club-guide/`) — discussion questions + printable bookmarks, gated by a form.
- **Media/speaking page** (`/media-speaking/`) — press release + speaking-topics pitch.
- **Horse-terms glossary** (`/glossary/`) — equestrian vocabulary reference tied to the JUMP series.
- **JUMP launch team page** (`/launch-team/`) — promo/email-capture page with launch-specific prizes.
- **Events page + 2 past event pages** — no events section on the new site.
- **"Leave a review" page** (`/reviewjump/`) — curated links to Goodreads/Amazon/B&N/BookBub/BAM/Audible for reviews.
- **"A Stocking Filled With Carrots"** — a multi-author holiday anthology (Tiffany, Sarah Hickner, Alex Flynn, Natalie Keller Reinert, Linda Shantz) that appeared on the old bonus-content page. It isn't one of Tiffany's solo titles, so it has no natural book page to live on in the new structure — left out for now, pending Tiffany's call on whether/where it should appear (and whether it's still current).

None of this content has been migrated automatically — per the brief's explicit instruction not to auto-migrate old content. This is the list to hand to Tiffany so she can decide what's worth rebuilding after launch.

---

## What could not be verified

- **www → non-www redirect behavior at the HTTP level.** Research here used only page-fetching tools (no raw HTTP header access), so it could confirm both hosts currently serve matching content and canonical tags, but not whether `www.tiffanynoellechacon.com` actually issues a 301 to non-www today. **Recommend verifying this manually** (e.g. `curl -I https://www.tiffanynoellechacon.com`) and, regardless of the old site's behavior, making sure the new host is configured to 301 www → non-www explicitly (see the Launch Checklist).
- **Full completeness of the old blog archive.** The WordPress sitemap listed exactly 4 posts; Google's own index of this small site appears incomplete (several real, live pages didn't surface in `site:` search at all). The sitemap XML was treated as the more authoritative source, but a manually-known, unlinked URL could theoretically still exist that neither method surfaced.
- **`/portfolio-3-columns/`, `/portfolio-isotope/`, `/portfolio-1-column/`** — not individually fetched (all three pattern-match the sibling `/portfolio-2-columns/` and `/fullwidth-page/`, both confirmed unused Elementor demo templates, not linked in nav). Worth a quick manual spot-check if 100% certainty is wanted.
- **Exact link targets for the old site's "Quizzes" and "Book Clubs" nav items** — inferred with high confidence from page content/context, but the raw nav HTML wasn't fully captured, so the exact hrefs weren't independently confirmed link-by-link.
- Password-protected, unpublished, or `noindex`-flagged old pages (e.g. `/cart/` carries a `noindex` tag) were intentionally excluded, since this map focuses on previously-indexed URLs.
