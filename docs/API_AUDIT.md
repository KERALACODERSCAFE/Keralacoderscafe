# API Audit

## Summary

The project has one internal API route, one server action, and several client-side calls to GitHub and TMDB. The GitHub proxy previously accepted arbitrary endpoint text through `endpoint`; it now allows only repository contributor/stat endpoint shapes and validates query parameters.

## API Inventory

| API/Endpoint | Type | File | Method | Purpose | Env Vars | Risk | Fix Needed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/api/github?endpoint=...` | Internal API route | `app/api/github/route.ts` | GET | Server-side proxy to selected GitHub REST endpoints | `GITHUB_TOKEN` | Previously allowed arbitrary GitHub API paths; public query parameter could proxy unintended endpoints | Fixed: endpoint allowlist, `per_page` validation, 400/403/500 responses, safer unknown error handling |
| `repos/{owner}/{repo}/contributors?per_page=...` via `/api/github` | Internal GitHub proxy target | `app/components/Contributors.tsx`, `app/contributors/page.tsx`, `app/[slug]/page.tsx` | GET | Fetch contributor lists | `GITHUB_TOKEN` through proxy | GitHub rate limits; client assumes array fallback | Acceptable after proxy allowlist |
| `repos/{owner}/{repo}/stats/punch_card` via `/api/github` | Internal GitHub proxy target | `app/[slug]/page.tsx` | GET | Project hourly commit punch-card | `GITHUB_TOKEN` through proxy | GitHub may return 202 while computing stats; UI falls back to retry/mock | Acceptable; 202 handled |
| `repos/{owner}/{repo}/stats/commit_activity` via `/api/github` | Internal GitHub proxy target | `app/repos/[owner]/[repo]/stats/contributors/page.tsx` | GET | Repository contribution graph | `GITHUB_TOKEN` through proxy | Dynamic owner/repo route can request any valid GitHub repo stats, but not arbitrary API endpoints | Acceptable; endpoint shape is restricted |
| `https://api.github.com/repos/KERALACODERSCAFE/.../contributors` | Direct external API call | `app/components/Hero.tsx`, `app/events/[id]/page.tsx` | GET | Contributor previews and live lists | None | Client-side unauthenticated calls may rate-limit and duplicate proxy behavior | Suggested: route these through `/api/github` for consistent rate-limit behavior |
| `https://api.github.com/repos/{repoPath}/stats/contributors` | Direct external API call | `app/events/[id]/page.tsx` | GET | Weekly project activity heatmap | None | Repo path is derived from project data, but fetch bypasses proxy token/cache | Suggested: route through `/api/github` |
| `https://api.themoviedb.org/3/configuration` | Direct external API call | `app/components/PageLoader.tsx` | GET | TMDB image configuration for intro loader | `NEXT_PUBLIC_TMDB_API_KEY` | Public API key is exposed by design; missing key returns empty loader content | Documented in `.env.example` |
| `https://api.themoviedb.org/3/discover/{movie|tv}` | Direct external API call | `app/components/PageLoader.tsx` | GET | Poster grid content for intro loader | `NEXT_PUBLIC_TMDB_API_KEY` | Optional visual dependency; failures are caught | Documented in `.env.example` |
| `getCommunityInvite()` | Server action | `app/actions/community.ts` | Server action | Validates join gate answers and returns WhatsApp or Telegram link | `TELEGRAM_INVITE_LINK` | WhatsApp invite is hardcoded; Telegram can be empty if env missing | `.env.example` added; consider moving WhatsApp link to env later |
| Google Analytics `gtag/js?id=G-RNVWKJQTT5` | External script | `app/layout.tsx` | GET/script | Analytics | None | Public measurement ID; acceptable, but consent/privacy requirements depend on deployment | No code fix applied |

## Internal API Route Details

### `GET /api/github`

Query:

- `endpoint`: required. Allowed endpoint shapes:
  - `repos/{owner}/{repo}/contributors`
  - `repos/{owner}/{repo}/stats/commit_activity`
  - `repos/{owner}/{repo}/stats/contributors`
  - `repos/{owner}/{repo}/stats/punch_card`
- `per_page`: allowed only inside the endpoint query for contributor endpoints; must be an integer from 1 to 100.

Responses:

- `200`: JSON returned by GitHub.
- `202`: `{ "message": "Data is being processed by GitHub" }`.
- `400`: missing endpoint.
- `403`: endpoint shape or query parameter is not allowed.
- GitHub non-OK status: `{ "error": "GitHub API error: ..." }` with GitHub status.
- `500`: unexpected proxy error.

Security notes:

- Server token is never sent to the browser.
- The proxy no longer accepts arbitrary GitHub paths.
- The route includes a `User-Agent` header and `next: { revalidate: 3600 }`.

## Environment Variables

| Variable | Scope | Documented | Notes |
| --- | --- | --- | --- |
| `GITHUB_TOKEN` | Server only | Yes, `.env.example` | Optional but recommended for GitHub rate limits |
| `TELEGRAM_INVITE_LINK` | Server only | Yes, `.env.example` | Used when state is not Kerala |
| `NEXT_PUBLIC_TMDB_API_KEY` | Client public | Yes, `.env.example` | Optional; public by `NEXT_PUBLIC_` convention |

No secrets were added.
