import { defineConfig } from 'astro/config';

export default defineConfig({
  // [R6 FIX] Canonical production domain is non-www — per Tyler's explicit R6
  // instruction, and independently confirmed by the redirect-map research: the
  // live tiffanynoellechacon.com site's own <link rel="canonical"> self-refers
  // non-www. This value drives every page's canonical URL, sitemap entries, and
  // OG/Twitter og:url via BaseLayout.astro, so getting it right here is what
  // keeps every page's canonical correct sitewide.
  site: 'https://tiffanynoellechacon.com',
  // [R6 NOTE] Sitemap: the official @astrojs/sitemap integration's currently
  // published version expects a newer Astro major (it crashed the build
  // against this project's pinned Astro 4.16 — "Cannot read properties of
  // undefined (reading 'reduce')" inside its own build hook). Rather than
  // bump Astro mid-launch-prep (out of R6's scope and risk tolerance) or
  // pin an old sitemap version of unknown quality, this site ships a tiny
  // hand-written src/pages/sitemap.xml.ts endpoint instead — see that file.
  // Simpler, has zero dependencies, and is exactly enough for ~20 static
  // routes with no pagination.
});
