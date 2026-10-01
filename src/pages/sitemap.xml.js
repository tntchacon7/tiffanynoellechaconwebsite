// [R6 ADDITION] Hand-written sitemap endpoint — see astro.config.mjs for why
// this replaces the official @astrojs/sitemap integration (version mismatch
// with this project's pinned Astro 4.16 crashed the build). This is the
// entire route list for the site as of R6 launch prep, built the same static
// way any other Astro page/endpoint is: no server, no runtime dependency.
//
// IMPORTANT: this list must be updated by hand whenever a route is added or
// removed (documented in R6-Launch-Readiness-Report.md under AFTER LAUNCH —
// revisiting this if/when new Reading Room articles are added post-launch).
const ROUTES = [
  "/",
  "/about/",
  "/contact/",
  "/books/",
  "/books/off-course/",
  "/books/jump/",
  "/books/fall/",
  "/books/soar/",
  "/books/the-cowboy-christmas-distraction/",
  "/books/shoot-the-moon/",
  "/books/promise-you-the-moon/",
  "/books/pucks-and-pranks/",
  "/books/off-the-bench/",
  "/books/the-comeback-play/",
  "/books/a-christmas-courtship/",
  "/books/a-holly-jolly-christmas-cubicle/",
  "/series/equestrian-dreams/",
  "/series/love-in-starlight-valley/",
  "/series/sports-in-the-sunshine-state/",
  "/find-your-next-read/",
  "/clean-romance/",
  "/clean-romance/what-is-clean-romance/",
  "/privacy-policy/",
  "/terms/",
];

const SITE = "https://tiffanynoellechacon.com";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((path) => `  <url><loc>${SITE}${path}</loc></url>`).join("\n")}
</urlset>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
