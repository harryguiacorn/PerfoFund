# PerfoFund

**Optimised Performance** — AI performance intelligence for capital markets.

An integrated, performance-based AI system for investment banks, pension funds, hedge fund
groups, financial institutions and capital markets. Built with **Astro 5 + Tailwind CSS v4 +
TypeScript**, deployed on **Cloudflare Workers Static Assets**.

## Stack

| Layer       | Choice                                                             |
| ----------- | ------------------------------------------------------------------ |
| Framework   | [Astro 5](https://astro.new) (zero JS by default, SEO-first)       |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Language    | TypeScript 5 (strict)                                              |
| Lint/format | [Biome 2](https://biomejs.dev)                                     |
| Hosting     | Cloudflare Pages / Workers Static Assets (`wrangler.jsonc`)        |
| CI          | GitHub Actions (lint + build)                                      |

No jQuery, no Bootstrap. Vanilla JS only (`src/scripts/main.ts`).

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # preview the production build
npm run check    # Biome lint + format check
```

Requires **Node 22+** (see `.nvmrc`).

## Project structure

```
.
├── astro.config.mjs          # Astro + Tailwind v4 + sitemap
├── wrangler.jsonc            # Cloudflare deployment config (dist/)
├── public/
│   ├── _headers              # Security + cache headers
│   ├── robots.txt
│   ├── favicon.svg
│   └── asset/                # Optimised WebP/PNG assets (~230 KB total)
├── src/
│   ├── components/           # Navbar, Hero, Product, Risk, Contact…
│   ├── layouts/              # BaseLayout (SEO, OG, JSON-LD)
│   ├── pages/                # index.astro, 404.astro
│   ├── scripts/main.ts       # Vanilla JS: nav, reveal, form
│   └── styles/global.css     # Tailwind v4 theme + design tokens
└── .github/workflows/        # ci.yml (lint + build), deploy.yml (Cloudflare)
```

## Deployment (Cloudflare Workers Static Assets)

`wrangler.jsonc` points Wrangler at `./dist`, so **the Astro build must run before
`wrangler deploy`** — otherwise Wrangler fails with:

> `The directory specified by the "assets.directory" field … does not exist: …/dist`

### Cloudflare dashboard (Workers Builds)

Set these in **Settings → Build**:

| Setting        | Value                 |
| -------------- | --------------------- |
| Build command  | `npm run build`       |
| Deploy command | `npx wrangler deploy` |

> ⚠️ If the Build command is empty, `dist/` won't exist and the deploy fails.
> Alternatively, set the Deploy command to `npm run deploy` (builds, then deploys).

### Manual deploy

```bash
npm run deploy   # npm run build && wrangler deploy
```

> Update `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt`
> to your production domain when ready.

## Content

All copy is migrated from the legacy single-page site, restructured with semantic HTML5,
proper heading hierarchy, WCAG 2.2 AA contrast and full keyboard/screen-reader support.
Legacy stock diagrams were replaced with hand-built SVG/CSS visuals; photography was
resized and converted to WebP (35 MB → ~230 KB).

## Contact form

The form posts to the existing Formspree endpoint (`https://formspree.io/f/mjvnlbdg`)
via AJAX with honeypot spam protection. To change the endpoint, update the `action`
in `src/components/Contact.astro`.

## Disclaimer

See the Disclaimer section on the site. PerfoFund Limited does not provide financial
or legal advice; site content is for informational purposes only.
