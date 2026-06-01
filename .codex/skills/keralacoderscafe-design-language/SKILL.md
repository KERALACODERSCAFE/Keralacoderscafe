---
name: keralacoderscafe-design-language
description: Apply the Kerala Coders Cafe website design language to new or existing Next.js/Tailwind pages, sections, cards, dashboards, community pages, event pages, project pages, team pages, contributor cards, join flows, and UI components while preserving the current KCC neo-brutalist Kerala developer community brand.
---

# Kerala Coders Cafe Design Language

Use this skill when designing or extending Kerala Coders Cafe pages and components. Preserve the existing identity: Kerala-first, open-source, energetic, community-led, and deliberately handmade rather than corporate-polished.

## Core Principles

- Build useful community UI first: events, projects, teams, join flows, contributor cards, status panels, and project progress sections.
- Keep the interface bold, readable, and playful without changing the brand into a generic SaaS or dark gradient product.
- Use neo-brutalist structure: thick black borders, hard offset shadows, strong uppercase labels, paper-like panels, sticker tags, dotted grids, and visible interaction states.
- Prefer local Tailwind tokens from `app/globals.css` before inventing new colors.
- Preserve routing, layout rhythm, animations, and Kerala Coders Cafe naming.

## Color And Theme

- Base: white or warm paper backgrounds (`bg-white`, `bg-[#FDFBF7]`, `bg-[#fef9ea]`).
- Ink: black text and borders (`text-black`, `border-black`).
- Primary accents: `#FFE66D` / `bg-kcc-gold`, `#A5FFD6` / `bg-kcc-green`, `#FF6B6B` / `bg-kcc-accent`.
- Supporting accents already used in the site: `#00D9C0`, `#FFD166`, `#6dfe9c`, `#A18CE5`, `#42A5F5`.
- Use black panels with yellow or green accents for high-energy data/status sections.
- Avoid beige-only palettes, soft glassmorphism, purple gradient hero sections, and corporate blue SaaS styling.

## Typography

- Use bold uppercase labels with tight tracking for badges, buttons, nav, and status text.
- Use large, dense, black display headings with strong line-height, often with highlighted last words in yellow/accent blocks.
- Body copy should stay readable and confident: `font-bold`, `leading-relaxed`, `text-black/70` or `text-white/70`.
- Malayalam or Kerala-specific copy should feel celebratory and local; do not flatten it into generic startup language.

## Layout

- Use full-width sections with strong separators: `border-t-4 border-black`, generous vertical padding, and max width around `max-w-[1280px]`.
- Prefer grids that become horizontal scroll/snap on mobile when content is card-heavy.
- Use offset panels and sticker labels instead of nested cards.
- Keep mobile first: one-column stacks, horizontal overflow only when it is intentional, and avoid text clipping.
- Hero sections should show the brand or project immediately with clear action paths.

## Components

- Cards: thick black borders, white or accent background, hard shadow such as `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`, subtle rotation only when it adds handmade energy.
- Buttons: uppercase, black borders, hard shadows, hover translate by 1-4px, active pressed state.
- Badges: small uppercase labels with border and shadow; use them for status, stage, source, and category.
- Contributor/project cards: include avatar/icon, rank or metadata, direct action, and clear source/status labels.
- Nav/footer: compact, high-contrast, community links prominent, no marketing fluff.
- Empty/loading/error states: preserve the same brutalist frame and provide clear text.

## Animation

- Use direct, physical motion: small translations, rotations returning to zero, pulsing dots, marquee strips, and reveal-on-scroll.
- Keep animations short and purposeful. Avoid slow ambient gradients or heavy blur effects.
- For React 19/Next 16, avoid synchronous `setState` in effects; use event callbacks, async callbacks, or CSS when possible.

## Do And Don't

- Do reuse `bg-kcc-gold`, `bg-kcc-green`, `bg-kcc-accent`, `border-brutalist`, `shadow-brutalist`, `neo-brutalist-grid`, and existing component patterns.
- Do keep labels concrete: "Active Building", "Live From GitHub", "Submit Idea", "Member Showcase".
- Do document new API/env dependencies and never hardcode secrets.
- Don't redesign the entire site for a single new page.
- Don't remove the black-border paper identity.
- Don't add generic stock visuals where clear product/project/community visuals are needed.
- Don't invent fake contact emails, API keys, community numbers, or metrics.

## Example Component Prompt

Create a KCC Events section that lists upcoming workshops and open-source build sessions. Match the existing Kerala Coders Cafe neo-brutalist design with warm paper background, black borders, yellow/green/red accent badges, hard offset shadows, mobile-first cards, and clear empty/loading states. Preserve existing route and component patterns.

## Tailwind Patterns

```tsx
<section className="border-t-4 border-black bg-[#FDFBF7] px-6 py-24 md:px-12">
  <div className="mx-auto max-w-[1280px]">
    <span className="inline-block border-2 border-black bg-kcc-green px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
      Active Building
    </span>
    <h2 className="mt-6 text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-tight text-black">
      Community
      <span className="ml-3 inline-block -rotate-2 border-4 border-black bg-kcc-gold px-4 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        Projects
      </span>
    </h2>
    <article className="mt-10 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-2xl font-black uppercase tracking-tight">Toddy Finder Sprint</h3>
      <p className="mt-3 font-bold leading-relaxed text-black/70">Map, verify, and ship a Kerala community tool together.</p>
    </article>
  </div>
</section>
```
