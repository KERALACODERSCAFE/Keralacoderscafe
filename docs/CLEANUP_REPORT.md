# Cleanup Report

## Files Changed

| File | Why Changed |
| --- | --- |
| `app/api/github/route.ts` | Hardened GitHub proxy with endpoint allowlist, query validation, typed errors, and safer response handling |
| `app/[slug]/page.tsx` | Fixed React lint issues, removed unused types/destructuring, escaped JSX text, and switched internal navigation to `Link` |
| `app/events/[id]/page.tsx` | Fixed React lint issues, typed GitHub stats data, escaped JSX text, and switched internal navigation to `Link` |
| `app/events/page.tsx` | Adjusted `useInView` return shape to satisfy React compiler ref rules |
| `app/components/Projects.tsx` | Adjusted `useInView` return shape and removed unused import |
| `app/components/MemberProjects.tsx` | Removed one-frame loading effect and rendered static data directly |
| `app/components/ModelViewer.tsx` | Replaced explicit `any`, derived mobile/platform state safely, and preserved 3D behavior |
| `app/components/PageLoader.tsx` | Added TMDB/Three.js types, avoided sync visibility update, and cleaned disposal logic |
| `app/components/NavBar.tsx` | Removed sync state update effect and used router navigation for cross-route hash links |
| `app/components/Footer.tsx` | Added footer link typing and removed `any` casts |
| `app/components/Hero.tsx` | Removed dead animation state/imports and escaped quote text |
| `app/components/AnnouncementPopup.tsx` | Escaped JSX apostrophe |
| `app/components/Contributors.tsx` | Removed unused accent constants |
| `app/contributors/page.tsx` | Removed unused import/constants |
| `app/components/CursorFollower.tsx` | Removed unused click event parameter |
| `app/components/Marquee.tsx` | Removed unused destructured props while keeping prop type compatibility |
| `app/components/ProjectCard.tsx` | Replaced `any` prop with `MemberProject` type |
| `app/components/Teams.tsx` | Removed unused import and escaped quote text |
| `app/projects/page.tsx` | Removed unused imports |
| `app/repos/[owner]/[repo]/stats/contributors/page.tsx` | Replaced `any`, escaped text, and used `Link` for internal navigation |
| `lib/member-projects-data.ts` | Exported `MemberProject` type |
| `.env.example` | Added documented env variables |
| `.gitignore` | Allowed `.env.example` to be tracked while keeping real `.env*` files ignored |
| `README.md` | Updated clone URL to current organization |
| `CODE_OF_CONDUCT.md` | Replaced placeholder contact with explicit TODO |
| `docs/PROJECT_AUDIT.md` | Added project structure audit |
| `docs/API_AUDIT.md` | Added API inventory and risk table |
| `docs/ERROR_AUDIT.md` | Added lint/build/error audit |
| `.codex/skills/keralacoderscafe-design-language/SKILL.md` | Added reusable local design language skill |

## Commands Run

| Command | Result |
| --- | --- |
| `npm install` | Blocked by PowerShell execution policy |
| `npm.cmd install` | Passed; dependencies up to date |
| `npm run lint` | Blocked by PowerShell execution policy |
| `npm.cmd run lint` | Initially failed, later passed with 2 warnings |
| `npm.cmd run build` | Failed inside sandbox due Google Fonts network fetch |
| `npm.cmd run build` with approved network access | Passed |
| `npx.cmd eslint -f json -o .next\eslint-report.json` | Captured initial lint report |
| `npx.cmd eslint -f json -o .next\eslint-report-after.json` | Captured intermediate lint report |
| `python init_skill.py ...` using bundled Python | Created skill folder but failed interface metadata validation after `SKILL.md` creation because short description was too long |
| `python quick_validate.py .codex\skills\keralacoderscafe-design-language` using bundled Python | Passed |

## Current Build And Lint Status

- `npm.cmd run lint`: passes with 2 warnings.
- `npm.cmd run build`: passed when allowed to access Google Fonts.
- Skill validation: passed.

## Remaining TODOs

- Replace the Code of Conduct TODO with a real enforcement contact email before relying on the report flow.
- Consider moving the hardcoded WhatsApp invite link in `app/actions/community.ts` to an environment variable.
- Consider routing the remaining direct client GitHub calls through `/api/github` for consistent caching/token behavior.
- Review whether `public/image.png` is needed; it is currently 0 bytes.
- Optional: replace the remaining raw avatar `<img>` with `next/image` if the stamp layout is verified afterward.
- Optional: replace manual Google font links/imports with `next/font` or local font assets if the visual result is verified.

## Using The New Skill Globally

The new local skill lives at:

`.codex/skills/keralacoderscafe-design-language/SKILL.md`

After review, you can copy it to your global Codex skills folder, for example:

`C:\Users\youri\.codex\skills\keralacoderscafe-design-language\SKILL.md`

I did not perform the global copy.
