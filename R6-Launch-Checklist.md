# R6 Launch Checklist

The exact steps to take this site live at tiffanynoellechacon.com. Everything up to the point of needing your own logins is already done — this is the minimal remaining list, in order.

## Before you start

The newsletter form and contact page are both fully wired up now — nothing to decide there. The only open items are in `R6-Launch-Readiness-Report.md`'s BLOCKERS section (mainly: which old-site content, if any, you want rebuilt later) and none of them block deploying to a temporary URL for QA.

## 1. Push this source to GitHub

If it isn't already up to date on GitHub (per your note that R5's source is backed up there), push everything in this delivered ZIP, including the new `netlify.toml`, `.nvmrc`, and the new pages/report files.

## 2. Create a Netlify account and connect the repo

Recommended host: **Netlify**. Reasoning: free static hosting with a generous limit, one-click GitHub auto-deploy (push to `main` → live in about a minute), free automatic SSL on a custom domain, and this project's redirects/build settings already live in `netlify.toml` in the repo — nothing extra to configure by hand in Netlify's dashboard.

1. Go to netlify.com and sign up (GitHub login is easiest).
2. "Add new site" → "Import an existing project" → connect your GitHub account → select this repo.
3. Netlify will read `netlify.toml` automatically and detect the build command (`npm run build`) and publish directory (`dist`) — you shouldn't need to type anything in manually, but confirm they match before deploying.
4. Click Deploy. You'll get a temporary `*.netlify.app` URL.

## 3. QA on the temporary URL

Before touching your real domain, click through the temporary `*.netlify.app` URL:
- Homepage, a book page, a series page, Find Your Next Read, the Reading Room article, About, Contact.
- Confirm "Learn More" on a few book cards (on `/books/` and each series page) actually goes to that book's page.
- Confirm the newsletter "Send Me the Free Book" button opens the Pucks & Pranks BookFunnel page.
- Confirm the Privacy Policy, Terms, and Contact pages all show the real contact email (not a bracketed placeholder).
- Confirm the podcast section on the homepage shows the real cover art and links out to thecleanromancepodcast.com — no "coming soon" text.
- Try a couple of the old-site URLs from `R6-Redirect-Map.md` (e.g. `/product/jump/`, `/contact-me/`) and confirm they redirect correctly.

If anything looks wrong here, it's much cheaper to fix before the domain is live than after.

## 4. Point your domain at Netlify

Only do this once step 3 looks good.

1. In Netlify: Site settings → Domain management → Add a custom domain → enter `tiffanynoellechacon.com`.
2. Netlify will show you the exact DNS records to add (either nameserver delegation, or an A/CNAME pair — Netlify's own instructions at this step are specific to your registrar and accurate; follow what it shows you there rather than generic instructions).
3. Also add `www.tiffanynoellechacon.com` as a domain alias in the same screen, and set it to redirect to the non-www version (Netlify has a toggle for this) — this matches the canonical domain this site is configured for.
4. Wherever your domain is currently registered/managed (this project doesn't have access to that account), update the DNS records Netlify gave you. This can take anywhere from a few minutes to a few hours to fully propagate.
5. Netlify auto-provisions a free SSL certificate once DNS points to it — no separate step needed, just a short wait after DNS updates.

## 5. Final check on the live domain

Once `tiffanynoellechacon.com` is serving the new site:
- Confirm it loads over `https://` with a valid certificate (padlock, no browser warning).
- Confirm `https://www.tiffanynoellechacon.com` redirects to the non-www version.
- Spot-check 2–3 of the redirected old URLs again on the real domain.
- Check `https://tiffanynoellechacon.com/sitemap.xml` and `https://tiffanynoellechacon.com/robots.txt` both load.

## 6. After launch (not urgent, but don't forget)

- Submit `https://tiffanynoellechacon.com/sitemap.xml` to Google Search Console (needs a Google account tied to the domain — separate from Netlify).
- Decide on the "needs decision" old content (blog, launch-team page, book club guide, media/speaking, events, and the holiday anthology) — see `R6-Redirect-Map.md`.
- Consider analytics, if you want it — none is installed today.
