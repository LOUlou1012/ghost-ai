# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Foundation: design system and UI primitives

## Current Goal

- Define the next planned feature unit here.

## Completed

- Design system & UI primitives (`context/feature-specs/01-design-system.md`): shadcn/ui initialized (`radix-nova` style, Lucide icons, Geist fonts), `components/ui/{button,card,dialog,input,tabs,textarea,scroll-area}.tsx` added, `lucide-react` installed, `lib/utils.ts` `cn` helper in place, dark theme tokens wired into `app/globals.css`.
- Editor chrome (`context/feature-specs/02-editor.md`): `components/editor/editor-navbar.tsx` (fixed-height navbar, left/center/right sections, sidebar toggle button swapping `PanelLeftOpen`/`PanelLeftClose`), `components/editor/project-sidebar.tsx` (floating, absolutely-positioned overlay that slides in from the left via `translate-x`, doesn't push content, `Tabs` for "My Projects"/"Shared" with empty placeholder states, full-width "New Project" button), and `components/editor/editor-dialog.tsx` (reusable dialog pattern wrapping `components/ui/dialog.tsx` with `title`/`description`/`footer` props, `rounded-3xl` per modal radius convention — no concrete dialogs built yet, per spec).
- Editor layout composition: `components/editor/editor-shell.tsx` (client component) owns `isSidebarOpen`/`isDialogOpen` state and composes `EditorNavbar` + `ProjectSidebar` + `EditorDialog` around `{children}` inside a `relative` flex container (navbar on top, sidebar/main in a `relative flex-1` row below it so the sidebar overlay anchors correctly). Mounted in `app/layout.tsx`, which stays a server component — `EditorShell` is the only client boundary. Verified with a headless-Chromium script (not `chromium-cli`, which wasn't available in this environment; used Playwright directly against `Google Chrome.app`) confirming the toggle opens/closes the sidebar without pushing canvas content and produces no console errors.

## In Progress

- None yet.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- `EditorShell` mounts `EditorDialog` in a controlled-but-closed state (`isDialogOpen`/`setIsDialogOpen`) with a placeholder `title="Dialog"` — nothing triggers it open yet since no concrete dialog content is defined in any spec. The next feature unit that needs a real dialog (e.g. project creation) should replace this placeholder wiring rather than add a second dialog instance.

## Architecture Decisions

- `app/globals.css` defines the `ui-context.md` design tokens (`--bg-base`, `--text-primary`, etc.) in `:root` and maps shadcn's semantic tokens (`--background`, `--card`, `--primary`, ...) onto them, so generated `components/ui/*` files stay untouched while matching the dark theme.
- The `bg-base` utility is defined via a standalone `@utility bg-base { background-color: var(--bg-base); }` rather than a `--color-base` theme token — registering `base` in Tailwind's shared color namespace also generates `.text-base`, which collides with and silently replaces Tailwind's built-in `text-base` font-size utility (broke default text sizing across shadcn components, e.g. `CardTitle`). Avoid reusing Tailwind's reserved scale names (`base`, `sm`, `lg`, `xl`, `2xl`, ...) as design-token names in the shared color theme namespace.

## Session Notes

- Verified with a temporary `/design-check` page (removed after use) rendering all seven components plus a headless Chrome screenshot; caught and fixed the `text-base` collision described above before removing the page.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.
- Verified the editor chrome with a temporary `/editor-check` page (removed after use) and headless Chrome screenshots of the sidebar open/closed and the dialog pattern rendered; `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.
- `EditorNavbar` and `ProjectSidebar` are controlled components (`isSidebarOpen`/`isOpen` + callbacks) with no shared state of their own — now composed by `editor-shell.tsx` per the note above.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass after wiring `EditorShell` into `app/layout.tsx`; verified live via `npm run dev` + a Playwright screenshot script (see Completed).
