# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Foundation: design system and UI primitives

## Current Goal

- Define the next planned feature unit here.

## Completed

- Design system & UI primitives (`context/feature-specs/01-design-system.md`): shadcn/ui initialized (`radix-nova` style, Lucide icons, Geist fonts), `components/ui/{button,card,dialog,input,tabs,textarea,scroll-area}.tsx` added, `lucide-react` installed, `lib/utils.ts` `cn` helper in place, dark theme tokens wired into `app/globals.css`.

## In Progress

- None yet.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- `app/globals.css` defines the `ui-context.md` design tokens (`--bg-base`, `--text-primary`, etc.) in `:root` and maps shadcn's semantic tokens (`--background`, `--card`, `--primary`, ...) onto them, so generated `components/ui/*` files stay untouched while matching the dark theme.
- The `bg-base` utility is defined via a standalone `@utility bg-base { background-color: var(--bg-base); }` rather than a `--color-base` theme token — registering `base` in Tailwind's shared color namespace also generates `.text-base`, which collides with and silently replaces Tailwind's built-in `text-base` font-size utility (broke default text sizing across shadcn components, e.g. `CardTitle`). Avoid reusing Tailwind's reserved scale names (`base`, `sm`, `lg`, `xl`, `2xl`, ...) as design-token names in the shared color theme namespace.

## Session Notes

- Verified with a temporary `/design-check` page (removed after use) rendering all seven components plus a headless Chrome screenshot; caught and fixed the `text-base` collision described above before removing the page.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.
