# Project Audit

## Summary

Kerala Coders Cafe is a Next.js 16.2.0 App Router project using React 19.2.4, Tailwind CSS 4, Framer Motion, Lenis, Lucide icons, and Three.js / React Three Fiber. The package manager is npm, with `package-lock.json` present.

The app is a community website with a neo-brutalist Kerala developer community identity: thick black borders, hard shadows, warm paper backgrounds, yellow/green/red accents, animated marquee/loader elements, GitHub contributor data, project pages, event/project detail pages, and a join gate.

## Framework And Package Manager

| Item | Value |
| --- | --- |
| Framework | Next.js 16.2.0 |
| Router | App Router |
| React | 19.2.4 |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss` |
| Package manager | npm |
| Lockfile | `package-lock.json` |

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `next dev` | Start local development server |
| `build` | `next build` | Create production build |
| `start` | `next start` | Start production server after build |
| `lint` | `eslint` | Lint codebase |

No `typecheck` or `format` script is currently defined.

## Main Routes

| Route | File | Rendering |
| --- | --- | --- |
| `/` | `app/page.tsx` | Static |
| `/[slug]` | `app/[slug]/page.tsx` | Dynamic project detail |
| `/api/github` | `app/api/github/route.ts` | Dynamic API route |
| `/contributors` | `app/contributors/page.tsx` | Static client page |
| `/events` | `app/events/page.tsx` | Static client page |
| `/events/[id]` | `app/events/[id]/page.tsx` | Dynamic event/project detail |
| `/join` | `app/join/page.tsx` | Static |
| `/manifest.webmanifest` | `app/manifest.ts` | Static metadata route |
| `/projects` | `app/projects/page.tsx` | Static |
| `/repos/[owner]/[repo]/stats/contributors` | `app/repos/[owner]/[repo]/stats/contributors/page.tsx` | Dynamic stats page |
| `/teams` | `app/teams/page.tsx` | Static |

## App Router Structure

- `app/layout.tsx`: root metadata, fonts, JSON-LD, analytics scripts, nav, loader, announcement popup, smooth scroll wrapper, floating CTA.
- `app/page.tsx`: homepage composition using `Marquee`, `Hero`, `Mission`, `Contributors`, `Projects`, `Guidelines`, `MemberProjects`, and `Footer`.
- `app/actions/community.ts`: server action for join-gate invite logic.
- `app/api/github/route.ts`: GitHub API proxy, now endpoint-allowlisted.
- Feature route folders: `contributors`, `events`, `join`, `projects`, `teams`, `repos`, and dynamic `[slug]`.

## Components Structure

- `app/components`: primary site components for hero, nav, footer, project cards, loaders, 3D model viewer, contributor lists, teams, guidelines, and visual helpers.
- `components/ui`: shared visual wrappers/background components.
- `lib`: project and member-project data, project detail content, utilities, and font helpers.
- `app/utils`: local utility alias for class merging.

## Public Assets

| Asset | Notes |
| --- | --- |
| `public/logo.png` | Logo/icon asset |
| `public/community-focus.jpg` | Project/community feature image |
| `public/founder.jpg` | Founder image, currently not used by `Teams` visual card |
| `public/toddy-cover.jpg` | Toddy Finder visual |
| `public/toddy-bottle.jpg` | Toddy Finder visual |
| `public/models/toddy.glb` | 3D model used by `ModelViewer` |
| `public/*.svg` | Default/template SVGs still present |
| `public/image.png` | 0-byte file; likely unused or incomplete |

## Config Files

| File | Purpose |
| --- | --- |
| `next.config.js` | Image remote patterns and redirect from `/events-opensource_projects` to `/events` |
| `eslint.config.mjs` | ESLint configuration |
| `postcss.config.mjs` | Tailwind PostCSS setup |
| `tsconfig.json` | TypeScript path aliases and compiler settings |
| `components.json` | shadcn-style component config |
| `app/manifest.ts` | PWA manifest metadata |
| `.env.example` | Added documented env variables |

## Environment Variables Used

| Variable | Used In | Purpose | Required |
| --- | --- | --- | --- |
| `GITHUB_TOKEN` | `app/api/github/route.ts` | Optional server-side GitHub token to reduce rate limits | Optional |
| `TELEGRAM_INVITE_LINK` | `app/actions/community.ts` | Telegram fallback invite link for non-Kerala join flow | Optional but recommended |
| `NEXT_PUBLIC_TMDB_API_KEY` | `app/components/PageLoader.tsx` | Optional TMDB poster loader API key | Optional |

## External Services

- GitHub REST API: contributor and repository stats.
- Google Fonts: `next/font/google` plus manual stylesheet links/imports for some display fonts/icons.
- Google Analytics: `G-RNVWKJQTT5` in `app/layout.tsx`.
- TMDB API: optional loader poster content in `PageLoader`.
- WhatsApp invite link: hardcoded reveal after successful join verification.
- Telegram invite link: server env fallback.
- Google Forms: project submission links.
