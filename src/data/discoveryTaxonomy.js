// =============================================================================
// FIND YOUR NEXT READ — discovery taxonomy (feature-local, additive only)
// =============================================================================
// Per Tyler's explicit R4 approval: these mapping tables live ONLY here, not
// in catalog.js. Nothing in catalog.js is modified by this feature. Every
// `values` array below is an exact, verbatim match against real fields in
// catalog.js (tropes / setting / sport) — re-verified against the live file
// immediately before this feature was built. Where a reader-facing choice
// groups more than one exact catalog value (Grumpy/Sunshine, Workplace
// Romance, Holiday Romance, and the 5 Setting buckets), that merge was
// explicitly proposed and approved by Tyler — see
// Find-Your-Next-Read-Taxonomy.md, "Final Group 1" and Section 2.
//
// IMPORTANT: this taxonomy only ever supplies reader-facing LABELS for
// matching/discovery. The books' own detail pages continue to render each
// book's exact, unmerged `tropes` values verbatim — nothing here changes
// what's displayed there.

// -----------------------------------------------------------------------------
// Group 1 — "What kind of romance are you craving?" (multi-select, weight 3)
// -----------------------------------------------------------------------------
export const TROPE_CHOICES = [
  { id: "enemies-to-lovers", label: "Enemies to Lovers", values: ["Enemies to lovers"] },
  { id: "grumpy-sunshine", label: "Grumpy/Sunshine", values: ["Grumpy/sunshine", "Reverse grumpy/sunshine"] }, // [APPROVED MERGE]
  { id: "friends-to-lovers", label: "Friends to Lovers", values: ["Friends to more"] }, // [APPROVED LABEL] catalog value is literally "Friends to more"
  { id: "second-chance", label: "Second Chance", values: ["Second chance"] },
  { id: "marriage-of-convenience", label: "Marriage of Convenience", values: ["Marriage of convenience"] },
  { id: "forced-proximity", label: "Forced Proximity", values: ["Forced proximity"] },
  { id: "workplace-romance", label: "Workplace Romance", values: ["Workplace romance", "Workplace rom-com"] }, // [APPROVED MERGE]
  { id: "holiday-romance", label: "Holiday Romance", values: ["Christmas romance", "Christmas in the city", "Home for the holidays"] }, // [APPROVED MERGE]
  { id: "love-triangle", label: "Love Triangle", values: ["Love triangle"] }, // [APPROVED ADDITION]
];

// -----------------------------------------------------------------------------
// Group 2 — "Where do you want to escape to?" (multi-select, weight 2)
// -----------------------------------------------------------------------------
export const SETTING_CHOICES = [
  {
    id: "equestrian-florida",
    label: "Equestrian Florida",
    values: [
      "Equestrian world in Florida",
      "Equestrian world in Florida/Wellington",
      "Equestrian world",
      "Equestrian/cowboy setting",
    ],
  },
  {
    id: "starlight-valley",
    label: "Starlight Valley",
    values: ["Starlight Valley, Blue Ridge Mountains", "Starlight Valley, Blue Ridge Mountains (small-town romance)"],
  },
  { id: "florida-sports", label: "Florida Sports", values: ["Tampa, FL", "Miami, Florida"] },
  { id: "small-town-carolina", label: "Small-Town Carolina", values: ["Cypress City, North Carolina"] },
  { id: "christmas-nyc", label: "Christmas in NYC", values: ["New York City"] },
];

// -----------------------------------------------------------------------------
// Group 3 — "Any sport on the page?" (multi-select, weight 2, shown from the start)
// -----------------------------------------------------------------------------
export const SPORT_CHOICES = [
  { id: "equestrian", label: "Equestrian", values: ["Equestrian show jumping"] },
  { id: "bull-riding", label: "Bull Riding", values: ["Bull riding"] },
  { id: "football", label: "Football", values: ["Football"] },
  { id: "hockey", label: "Hockey", values: ["Hockey"] },
  { id: "pickleball", label: "Pickleball", values: ["Pickleball"] },
];

// -----------------------------------------------------------------------------
// Group 4 — "Anything else you're craving?"
// Free Read + Standalone are HARD CONSTRAINTS (filter the candidate pool).
// Start a Series is a PREFERENCE boost (+1), not a constraint.
// -----------------------------------------------------------------------------
export const EXTRA_CHOICES = [
  { id: "free-read", label: "Free Read", kind: "constraint" },
  { id: "standalone", label: "Standalone", kind: "constraint" },
  { id: "start-series", label: "Start a Series", kind: "preference", weight: 1 },
];

export const WEIGHTS = {
  trope: 3,
  setting: 2,
  sport: 2,
};
