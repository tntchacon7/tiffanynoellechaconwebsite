# Find Your Next Read — Revised Taxonomy & Worked Examples

Final validation step before coding, per your feedback. Every mapping below was re-pulled directly from the live `catalog.js` via a script (not from memory), so what's shown is the actual current data. Still no code written.

Book Three remains excluded from every table below (no tropes, no blurb, unusable) — unchanged from R3.

---

## 1. "What kind of romance are you craving?" — individual tropes only, no bundling

Each row below maps to **one exact `tropes` string**, verbatim, no combining of different reader preferences into one choice.

| Reader-facing choice | Exact `tropes` value | Matches |
|---|---|---|
| Enemies to Lovers | `"Enemies to lovers"` | Fall, Soar, Pucks & Pranks |
| Grumpy/Sunshine | `"Grumpy/sunshine"` | The Cowboy Christmas Distraction |
| Friends to Lovers | `"Friends to more"` | Jump |
| Second Chance | `"Second chance"` | Pucks & Pranks, The Comeback Play |
| Marriage of Convenience | `"Marriage of convenience"` | Promise You the Moon |
| Forced Proximity | `"Forced proximity"` | The Cowboy Christmas Distraction, A Holly Jolly Christmas Cubicle |
| Workplace Romance | `"Workplace romance"` | A Holly Jolly Christmas Cubicle |
| Holiday Romance | `"Christmas romance"` | A Christmas Court(ship), A Holly Jolly Christmas Cubicle |

Note on "Friends to Lovers": the catalog's exact string is **"Friends to more,"** not "Friends to lovers." I've used your requested reader-facing label but want to flag the underlying value doesn't literally say "lovers" — confirm you're OK with that label, or I'll display the exact catalog wording instead.

### Coverage problem with the literal 8 above

Checked every one of the 12 usable books against this exact-match-only table. **Three books get zero Group-1 matches under strictly literal mapping:**

- **Off Course** — its tropes are `"Unrequited love"` and `"Love triangle"`, neither of which is in the list above.
- **Shoot the Moon** — its trope is `"Reverse grumpy/sunshine"`, a *different exact string* from `"Grumpy/sunshine"`.
- **Off the Bench** — its tropes are `"Reverse grumpy/sunshine"` and `"Workplace rom-com"` — again, different exact strings from what's in the table (`"Grumpy/sunshine"` and `"Workplace romance"`).

That means, as written, three books (including one of your four free entry-point reads) would be undiscoverable through this group. I'm not merging anything on my own judgment — flagging these as explicit yes/no decisions for you:

| Proposed merge/addition | What it would combine | Effect if approved |
|---|---|---|
| **Merge "Reverse Grumpy/Sunshine" into "Grumpy/Sunshine"** | `"Grumpy/sunshine"` (Cowboy Christmas Distraction) + `"Reverse grumpy/sunshine"` (Shoot the Moon, Off the Bench) | One "Grumpy/Sunshine" choice would match all 3 books. Reader-facing: this treats "he's grumpy, she's sunshine" and "she's grumpy, he's sunshine" as the same trope for discovery purposes, which they arguably are — but it is a merge, not a literal match, so I'm not doing it silently. |
| **Merge "Workplace Rom-Com" into "Workplace Romance"** | `"Workplace romance"` (A Holly Jolly Christmas Cubicle) + `"Workplace rom-com"` (Off the Bench) | One "Workplace Romance" choice would match both books instead of just one. |
| **Add "Love Triangle" as a 9th choice** | New literal row: `"Love triangle"` → Off Course only | Gives Off Course a Group-1 match without merging anything. (`"Unrequited love"` is another option for the same purpose, also Off Course only — pick one or both.) |
| **Expand "Holiday Romance"** | Currently only literal `"Christmas romance"`. Could also fold in `"Christmas in the city"` (Cowboy Christmas Distraction) and/or `"Home for the holidays"` (A Christmas Court(ship), already covered via its own "Christmas romance" tag) | Would add Cowboy Christmas Distraction as a third Holiday Romance match. |

**My recommendation, for your approval:** approve the Reverse Grumpy/Sunshine merge (it's the same trope told from the other character's point of view, and it closes two of the three coverage gaps at once) and add Love Triangle as a 9th choice (closes the third gap, zero merging involved). That gives full 12-book coverage across 9 individual, non-bundled choices — within your 6–10 range. The Workplace and Holiday expansions are optional polish, not required for coverage, so I'd leave those for you to decide either way.

## 2. "Where do you want to escape to?" — setting

| Reader-facing choice | Source `setting` values it groups | Matches |
|---|---|---|
| Equestrian Florida | `"Equestrian world in Florida"`, `"Equestrian world in Florida/Wellington"`, `"Equestrian world"`, `"Equestrian/cowboy setting"` | Off Course, Jump, Fall, Soar, The Cowboy Christmas Distraction |
| Starlight Valley | `"Starlight Valley, Blue Ridge Mountains"`, `"Starlight Valley, Blue Ridge Mountains (small-town romance)"` | Shoot the Moon, Promise You the Moon |
| Florida Sports | `"Tampa, FL"`, `"Miami, Florida"` | Pucks & Pranks, Off the Bench, The Comeback Play |
| Small-Town Carolina | `"Cypress City, North Carolina"` | A Christmas Court(ship) |
| Christmas in NYC | `"New York City"` | A Holly Jolly Christmas Cubicle |

All 12 usable books land in exactly one bucket — full coverage, no gaps. This reuses the normalization you already approved in principle; only the reader-facing labels changed to your wording.

## 3. "Any sport on the page?" — shown from the start, contributes nothing if skipped

| Reader-facing choice | Exact `sport` value | Matches |
|---|---|---|
| Equestrian | `"Equestrian show jumping"` | Off Course, Jump, Fall, Soar |
| Bull Riding | `"Bull riding"` | The Cowboy Christmas Distraction |
| Football | `"Football"` | Off the Bench, The Comeback Play |
| Hockey | `"Hockey"` | Pucks & Pranks |
| Pickleball | `"Pickleball"` | A Christmas Court(ship) |

Three books have `sport: null` (Shoot the Moon, Promise You the Moon, A Holly Jolly Christmas Cubicle) — they simply never score points from this group, which is expected and matches the real data (they're not sports books). I'm assuming this group is multi-select like the other two, for consistency — flag if you'd rather it be single-select.

## 4. "Anything else?" (working label for the practical/start group)

| Reader-facing choice | Verified logic | Matches |
|---|---|---|
| Free Read | `freeRead === true` | Off Course, Shoot the Moon, Pucks & Pranks, A Holly Jolly Christmas Cubicle |
| Standalone | `series === null` | The Comeback Play, A Christmas Court(ship), A Holly Jolly Christmas Cubicle |
| Start a Series | `series.position.isPrequel === true` | Off Course, Shoot the Moon, Pucks & Pranks |

**On "Start a Series" and your question about recommended-start vs. optional-prequel:** this is *not* a gap. All three prequel books carry the exact verified label `"Prequel novella · Start Here"` in `series.position.label` — the catalog itself explicitly marks them as the recommended entry point, not just numerically first. So `isPrequel === true` is a direct, literal read of data that already says "Start Here," not an assumption on my part. (If a future series were added without a labeled prequel, this signal wouldn't exist for it — but that's not the case for any of the current 3 series.)

"Complete Series Only" removed per your note. Open naming question: "Anything else?" is my placeholder — "How do you want to start?" doesn't fit anymore since two of the three choices aren't really about starting. Open to your call here.

## 5. Revised page structure

1. Intro
2. Chooser (all 4 groups, sport visible from the start)
3. Results area — shows "Your Best Match(es)" / "You Might Also Like" once something's selected; before any selection, a compact prompt only (e.g., "Pick a few things above — or jump to our free starter reads below" with an anchor link down to section 4). No empty section, no book cards shown here until the reader engages.
4. Free-read / start-here discovery — the curated row of entry-point books (the 3 series "Start Here" prequels + A Holly Jolly Christmas Cubicle as the free standalone), always visible, independent of the chooser.
5. Newsletter

## 6. Ranking, ties, and series-order display

**Weights** (unchanged in kind, "Complete Series Only" swapped for "Start a Series" at the same weight):

```
score(book) =
    (# selected Group-1 matches) × 3
  + (# selected Group-2 matches) × 2
  + (# selected Group-3 sport matches) × 2
  + (Free Read selected AND book.freeRead)      × 2
  + (Standalone selected AND series === null)   × 1
  + (Start a Series selected AND isPrequel)     × 1
```

Books scoring 0 are excluded from results entirely (not shown as a false match).

**Ties:** no release-year or any other artificial tiebreaker. Every book at the highest score is shown together under **"Your Best Matches"** (heading pluralizes automatically when there's more than one), each with its own match-tag explanation. Everything scoring lower but above 0 goes under "You Might Also Like." Where multiple books tie *within* either tier, I'm proposing they display in catalog order (the order they're already defined in `catalog.js`, currently: Equestrian Dreams → Love in Starlight Valley → Sports in the Sunshine State → standalones) purely for stable, predictable layout — this affects only left-to-right/top-to-bottom card order, never which tier a book appears in or whether it's called a "best" match. Flagging this as the one remaining ordering decision, since you were specific about not wanting release year to imply relevance.

**Series order on result cards:** the matched book is always shown as the match — never swapped for the series starter. If it isn't itself the "Start Here" book, a secondary line is added using verified data, e.g. *"Book Two in Equestrian Dreams · Start Here: Off Course."* Nothing about which book is "the match" changes; this is purely an added context line.

## 7. Surprise Me

Candidate pool: all 12 usable books, uniform random selection, no relevance or popularity claim — confirmed per your note.

## 8. Six worked examples

All use the literal-8 Group-1 table from Section 1 (i.e., **not** assuming you've approved the Reverse Grumpy/Sunshine merge or the Love Triangle addition) — so you can see exactly how the unmerged version behaves. Two examples call out where an approved merge would change the outcome.

**Example A — Group 1: Enemies to Lovers only**
- Fall: 3, Soar: 3, Pucks & Pranks: 3 → **three-way tie**
- **Your Best Matches:** Fall, Soar, Pucks & Pranks (all score 3)
- **You Might Also Like:** none

**Example B — Group 2: Equestrian Florida, Group 3: Equestrian, Extra: Start a Series**
- Off Course: setting 2 + sport 2 + startSeries 1 = **5**
- Jump: setting 2 + sport 2 = 4
- Fall: setting 2 + sport 2 = 4
- Soar: setting 2 + sport 2 = 4
- The Cowboy Christmas Distraction: setting 2 + sport 0 (Bull Riding ≠ Equestrian) = 2
- **Your Best Match:** Off Course (5)
- **You Might Also Like:** Jump, Fall, Soar (tied at 4)

**Example C — Group 1: Forced Proximity + Holiday Romance, Extra: Free Read**
- A Holly Jolly Christmas Cubicle: Forced Proximity 3 + Holiday Romance 3 + Free Read 2 = **8**
- The Cowboy Christmas Distraction: Forced Proximity 3 = 3
- A Christmas Court(ship): Holiday Romance 3 = 3
- **Your Best Match:** A Holly Jolly Christmas Cubicle (8)
- **You Might Also Like:** The Cowboy Christmas Distraction, A Christmas Court(ship) (tied at 3)
- *If the Reverse Grumpy/Sunshine or Holiday-expansion merges were approved, this example wouldn't change (neither trope selected here involves those merges) — included mainly to show the Free Read weight in isolation.*

**Example D — Group 1: Second Chance, Group 2: Florida Sports**
- Pucks & Pranks: trope 3 + setting 2 = **5**
- The Comeback Play: trope 3 + setting 2 = **5** → **tie**
- Off the Bench: trope 0 + setting 2 = 2
- **Your Best Matches:** Pucks & Pranks, The Comeback Play (tied at 5)
- **You Might Also Like:** Off the Bench (2)
- *If "Workplace Rom-Com" were merged into "Workplace Romance," this example still wouldn't change — Off the Bench's only trope is Reverse Grumpy/Sunshine and Workplace Rom-Com, neither selected here. Its 2-point score comes entirely from the Florida Sports setting match.*

**Example E — Group 1: Marriage of Convenience, Group 2: Starlight Valley, Extra: Standalone**
- Promise You the Moon: trope 3 + setting 2 = **5** (Standalone doesn't apply — it has a series)
- Shoot the Moon: setting 2 = 2 (Standalone doesn't apply either)
- **Your Best Match:** Promise You the Moon (5)
- **You Might Also Like:** Shoot the Moon (2)
- Shows a selected toggle ("Standalone") contributing 0 to both results without penalizing either — neither book is a standalone, so the toggle is simply inert here.

**Example F — Group 3: Football + Pickleball, Extra: Free Read**
- Off the Bench: sport 2 = 2 (not a free read)
- The Comeback Play: sport 2 = 2 (not a free read)
- A Christmas Court(ship): sport 2 = 2 (not a free read)
- **Your Best Matches:** Off the Bench, The Comeback Play, A Christmas Court(ship) (three-way tie at 2)
- **You Might Also Like:** none
- Shows multi-select within Group 3, and a selected extra (Free Read) that matches none of the results — again, 0 contribution, no penalty.

---

## Decisions I need from you before coding

1. Approve/reject the Reverse Grumpy/Sunshine merge (Section 1).
2. Approve/reject adding Love Triangle (and/or Unrequited Love) as a 9th Group-1 choice (Section 1).
3. Approve/reject the Workplace Rom-Com merge and the Holiday Romance expansion (Section 1) — optional, not needed for coverage.
4. Confirm the "Friends to Lovers" label despite the underlying value being "Friends to more" (Section 1).
5. Confirm Group 3 (sport) as multi-select (Section 3).
6. A name for the fourth chooser group, now that "Complete Series Only" is gone (Section 4) — "Anything else?" or your preference.
7. Confirm catalog-order display for ties within a tier is acceptable (Section 6).

Still waiting on your go-ahead before writing any code.
