# Reading Room Research — R5

Tiffany Noelle Chacon author site · R5 (Clean Romance Reading Room foundation)

This document records two separate things, per the R5 brief: (1) what was independently verified for the cornerstone article, "What Is Clean Romance?," and (2) preliminary research for the next content wave (Part 14). Nothing in Part 2 of this document is a recommendation — it's landscape research only, clearly marked by verification status, with no article built from it in R5.

---

## Part 1 — Fact-checking for "What Is Clean Romance?"

The podcast transcript (Tiffany and Sarah Hickner discussing the topic on The Clean Romance Podcast) was the primary editorial source for tone, real anecdotes, and the practical distinctions the article draws. Where the article makes a claim that's externally checkable — as opposed to Tiffany's own editorial perspective or personal promise — it was verified against independent sources below.

| Claim in the article | Verification | Source |
|---|---|---|
| There is no single, universally agreed-upon industry definition of "clean romance" | **VERIFIED** — multiple independent sources confirm ongoing, unresolved disagreement over the term's exact boundaries | [Kristin Holt, "Myriad Definitions of 'Sweet Romance' and/or 'Clean Romance'"](https://www.kristinholt.com/archives/161) |
| Amazon created a "Clean & Wholesome Romance" category | **VERIFIED** — live, real Amazon storefront/bestseller category | [Amazon Best Sellers: Best Clean & Wholesome Romance](https://www.amazon.com/Best-Sellers-Clean-Wholesome-Romance/zgbs/digital-text/11650867011) |
| "Closed door" doesn't reliably mean intimacy happens off-page — an independent source confirms the term is genuinely used both ways (implied off-page intimacy, and no intimacy at all), and that the "off-page intimacy" reading is the misleading default the name itself invites | **VERIFIED that both readings exist and that the term is ambiguous** — the article's specific claim that *most* closed-door books have no door to close at all is Tiffany's own first-hand editorial observation from the clean-romance community, not an externally-quantified statistic (no source measures this split), so it's presented in the article as her perspective, not as external verified data | [Book Riot, "What Is a Closed Door Romance?"](https://bookriot.com/what-is-a-closed-door-romance/) |
| "Fade to black" is a narrower technique than "closed door" generally — it specifically implies something is happening, off-page | **LIKELY / consistent with general usage** — corroborated by how the term is used across multiple romance-reader reference sources, though (per the brief) usage isn't perfectly standardized author-to-author | [Guide to Romance Book Acronyms & Terms](https://forevershereads.com/romance-novel-terms-acronyms/), [What is a 'fade to black' romance? — Notes from Starsheep](https://countingstarsheep.com/what-is-a-fade-to-black-romance/) |
| "No spice" / spice ratings are informal, reader/community-driven shorthand rather than a formal publishing classification | **VERIFIED** — the pattern of usage (Goodreads lists, reader blogs, a fan-run "spice scale," no retailer or publisher classification body) itself demonstrates this; no formal industry body defines or enforces spice ratings | [Goodreads "no-spice-romance" tag](https://www.goodreads.com/list/tag/no-spice-romance), [Romance Book Spice Ratings Explained](https://travelerswife4life.com/book-spice-ratings/) |
| "Clean" is used as a broader content signal (language + content generally) where "closed door" refers specifically to sexual content | **VERIFIED** — directly corroborated | [Book Riot, "What Is a Closed Door Romance?"](https://bookriot.com/what-is-a-closed-door-romance/) (citing the Romance Writers of Australia glossary's distinction) |
| Tiffany's personal content promise ("Kisses Only. No explicit scenes. Ever.") and per-book content flags (`cleanKissesOnly`, `noProfanity`, `sensitiveNotes`) | **VERIFIED against the site's own approved catalog data** — not an external-research claim; drawn directly from `src/data/catalog.js`, which is Tyler-approved source data, not invented for this article | `src/data/catalog.js` |

A claim was deliberately **not** made in the article: that "clean" necessarily implies no violence, no difficult themes, or a lighter emotional register. The article explicitly says the opposite — clean is about explicit content and language, not subject matter — because several of Tiffany's own books (per `catalog.js`'s `sensitiveNotes`) deal with real trauma, which would contradict a claim that "clean" means "light."

No academic citations, footnotes, or a "sources" list were added to the live article page itself — per Part 8 ("do not clutter the finished article with academic-style citations unless they genuinely improve the reader experience"), the verification work lives here instead.

---

## Part 2 — Preliminary research for the next content wave (Part 14)

**Scope note:** this is landscape and search-intent research only, to inform *future* article planning (see Reading-Room-Content-Roadmap.md). No book below is being recommended, and none should be treated as verified-clean. A book appearing in a search result, a Goodreads shelf, a directory site, or a retailer category is **not** verification that it meets Tiffany's or the Reading Room's content standard — per the brief's explicit instruction, that requires direct confirmation (ideally Tiffany having read it, or a clear, credible author/publisher content statement corroborated by reader reports).

### Search-result landscape (all four priority subgenres)

A meaningful "clean romance discovery" content ecosystem already exists and is actively maintained by other sites — most notably:

- **nospicebooks.com** — a dedicated clean/closed-door romance directory, browsable by subgenre (it has both a "sports-romance" and a "hockey-romance" browse page already). This is the closest existing competitor to what the Reading Room's future browse pages would do.
- **travelerswife4life.com** — a review blog with existing "Closed Door Sports Romance" and "Closed Door Hockey Romance" recommendation posts.
- **thegrowinglibrary.com** — has a "65 Clean Hockey Romance Books" list, suggesting hockey romance specifically has enough clean-romance supply to support a long list (useful signal for prioritization).
- **Goodreads** has active "Clean Romance Trope: Sports Romance" and "sports-romance-clean" shelves, meaning readers are actively organizing and searching for this cross-section today.
- **Amazon** has a live "Clean & Wholesome Romance" category, but it isn't broken out by sport/subgenre at the top level, which is a specific content gap a well-built Reading Room guide could fill.

Takeaway: search and reader-community demand for "clean + sport" content clearly exists and is being served today by directory/list sites rather than by individual authors' own sites — which is exactly the gap the Reading Room's roadmap (Part 13) is aimed at.

### Candidate authors/books surfaced (unverified — for future research only)

| Subgenre | Name surfaced | Status | Note |
|---|---|---|---|
| Clean hockey romance | Emma St. Clair | **LIKELY / NEEDS VERIFICATION** | Surfaced repeatedly as an author associated with clean/closed-door hockey romance (including her own site publishing a "Clean Hockey Romance Books" roundup). Her own books would need direct verification (not just her own marketing) before appearing in any future Reading Room recommendation. |
| Clean equestrian romance | Carly Kade ("In The Reins" series) | **UNVERIFIED** | Surfaced via an Amazon listing for an equestrian romance series; no content-level verification attempted. |
| Clean sports/football romance | (no single standout author name surfaced; mostly aggregator/list content, not author-level) | **UNVERIFIED** | The football-specific searches returned mostly third-party list posts (She Reads Romance Books, Goodreads shelves) rather than a small number of clearly-dominant clean-football-romance authors — this subgenre may be thinner than hockey or general sports romance and would need more research before an article is prioritized. |

No further candidates were pursued — going deeper (reading sample chapters, checking author statements, cross-referencing reader reviews for undisclosed content) is next-phase work, not R5 work, per the brief.

### Internal linking opportunities (for future articles)

Once written, the four priority guides (sports, hockey, football, equestrian) would naturally cross-link:
- Hockey and football guides → a general "sports romance" hub article, if one is written
- Equestrian guide → Tiffany's own Equestrian Dreams series (via `/find-your-next-read/` or direct book links) — she has first-party authority here as a five-time national equestrian champion, which is a distinct edge over generic list sites
- All four → the cornerstone "What Is Clean Romance?" guide, and → the Reading Room hub

This is expanded per-article in Reading-Room-Content-Roadmap.md.
