# Error Audit

## Commands Run

| Command | Result |
| --- | --- |
| `npm install` | Failed in PowerShell because `npm.ps1` is blocked by execution policy |
| `npm.cmd install` | Passed; dependencies already up to date |
| `npm run lint` | Failed in PowerShell because `npm.ps1` is blocked by execution policy |
| `npm.cmd run lint` | Initially failed with 59 errors and 29 warnings |
| `npm.cmd run build` | Failed in sandbox because Google Fonts could not be fetched |
| `npm.cmd run build` with approved network access | Passed |
| `npx.cmd eslint -f json -o .next\eslint-report.json` | Captured lint audit data |
| `npm.cmd run lint` after fixes | Passed with 2 warnings |

## Issues

| Issue | File | Severity | Reason | Fix Applied / Suggested |
| --- | --- | --- | --- | --- |
| GitHub proxy accepted arbitrary endpoint text | `app/api/github/route.ts` | High | Public query parameter could proxy unintended GitHub API paths | Fixed with endpoint allowlist and query validation |
| `catch (error: any)` and other explicit `any` usage | Multiple files | Medium | Weakened type safety and failed lint | Fixed route/page/component cases with `unknown`, typed props, and typed API data |
| Synchronous `setState` inside effects | `app/[slug]/page.tsx`, `app/events/[id]/page.tsx`, `app/components/MemberProjects.tsx`, `app/components/ModelViewer.tsx`, `app/components/NavBar.tsx`, `app/components/PageLoader.tsx` | Medium | React 19 lint rule flags cascading render risk | Fixed with derived initial state, requestAnimationFrame where animation needed, handler-based updates, or removing unnecessary loading state |
| Reading returned ref object properties during render | `app/events/page.tsx`, `app/components/Projects.tsx` | Medium | React compiler lint flagged `ref` object property access | Fixed custom hook to return tuple and destructured refs/visibility |
| Internal navigation used raw `<a>` tags | `app/[slug]/page.tsx`, `app/events/[id]/page.tsx`, `app/repos/[owner]/[repo]/stats/contributors/page.tsx` | Medium | Next lint requires `Link` for internal navigation | Replaced with `next/link` |
| Unescaped apostrophes/quotes in JSX | `app/[slug]/page.tsx`, `app/events/[id]/page.tsx`, `app/components/AnnouncementPopup.tsx`, `app/components/Hero.tsx`, `app/components/Teams.tsx`, stats page | Low | JSX lint errors | Escaped entities |
| Unused imports/variables | Multiple files | Low | Lint warnings and dead code | Removed unused imports, dead constants, and unused state |
| Project card accepted `any` project prop | `app/components/ProjectCard.tsx` | Low | Avoidable type gap | Added `MemberProject` type export and used it |
| `.env.example` missing | Root | Medium | Env requirements were undocumented | Added `.env.example` with used variables |
| Code of Conduct placeholder contact | `CODE_OF_CONDUCT.md` | Medium | Placeholder `[INSERT CONTACT EMAIL]` should not ship | Replaced with explicit TODO, not a fake email |
| README clone URL mismatch | `README.md` | Low | README used old personal GitHub owner | Updated to `KERALACODERSCAFE/Keralacoderscafe` |
| Direct client GitHub calls bypass proxy | `app/components/Hero.tsx`, `app/events/[id]/page.tsx` | Low | More likely to rate-limit and duplicates proxy behavior | Suggested future cleanup; not changed broadly to avoid behavior churn |
| Zero-byte public asset | `public/image.png` | Low | Likely incomplete or unused | Documented only; not deleted |
| Manual Google font `<link>` in App Router layout | `app/layout.tsx` | Low | Lint warning from `@next/next/no-page-custom-font` | Left unchanged to avoid visual/font regression |
| `<img>` warning in stamp contributor card | `app/components/Hero.tsx` | Low | Next suggests `Image`; existing layout uses raw GitHub avatar URL inside stamp frame | Left unchanged to avoid layout churn |

## Remaining Warnings

- `app/components/Hero.tsx`: one `@next/next/no-img-element` warning.
- `app/layout.tsx`: one `@next/next/no-page-custom-font` warning.

Both are non-blocking warnings; lint exits successfully.
