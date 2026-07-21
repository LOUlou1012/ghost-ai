# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Authentication and route protection

## Current Goal

- Define the next planned feature unit here (project creation/persistence, per `context/project-overview.md`'s "Authentication and Projects" feature).

## Completed

- Design system & UI primitives (`context/feature-specs/01-design-system.md`): shadcn/ui initialized (`radix-nova` style, Lucide icons, Geist fonts), `components/ui/{button,card,dialog,input,tabs,textarea,scroll-area}.tsx` added, `lucide-react` installed, `lib/utils.ts` `cn` helper in place, dark theme tokens wired into `app/globals.css`.
- Editor chrome (`context/feature-specs/02-editor.md`): `components/editor/editor-navbar.tsx` (fixed-height navbar, left/center/right sections, sidebar toggle button swapping `PanelLeftOpen`/`PanelLeftClose`), `components/editor/project-sidebar.tsx` (floating, absolutely-positioned overlay that slides in from the left via `translate-x`, doesn't push content, `Tabs` for "My Projects"/"Shared" with empty placeholder states, full-width "New Project" button), and `components/editor/editor-dialog.tsx` (reusable dialog pattern wrapping `components/ui/dialog.tsx` with `title`/`description`/`footer` props, `rounded-3xl` per modal radius convention — no concrete dialogs built yet, per spec).
- Editor layout composition: `components/editor/editor-shell.tsx` (client component) owns `isSidebarOpen`/`isDialogOpen` state and composes `EditorNavbar` + `ProjectSidebar` + `EditorDialog` around `{children}` inside a `relative` flex container (navbar on top, sidebar/main in a `relative flex-1` row below it so the sidebar overlay anchors correctly). Verified with a headless-Chromium script (not `chromium-cli`, which wasn't available in this environment; used Playwright directly against `Google Chrome.app`) confirming the toggle opens/closes the sidebar without pushing canvas content and produces no console errors.
- Route restructure: moved editor content from `/` to `/editor` (`app/editor/page.tsx`, `app/editor/layout.tsx`) since the upcoming auth spec (`context/feature-specs/03-auth.md`) gives `/` its own redirect logic and gives sign-in/sign-up a completely different (non-editor) layout. `EditorShell` moved out of the root `app/layout.tsx` into `app/editor/layout.tsx`, so the navbar/sidebar chrome only wraps `/editor`, not the whole app. Root `app/layout.tsx` is back to a plain server-component shell (fonts + globals only). Root `app/page.tsx` is a temporary unconditional `redirect("/editor")` — a placeholder standing in for the real authenticated/unauthenticated redirect that `03-auth.md` will implement.
- Authentication (`context/feature-specs/03-auth.md`): `proxy.ts` at the project root (this Next.js version renamed `middleware.ts` to `proxy.ts` — see `AGENTS.md`) wraps every route in `clerkMiddleware`, calling `auth.protect()` for everything except `createRouteMatcher`-matched public routes (sign-in/sign-up, driven by `NEXT_PUBLIC_CLERK_SIGN_IN_URL`/`NEXT_PUBLIC_CLERK_SIGN_UP_URL`). `app/layout.tsx` wraps the app in `ClerkProvider` using `lib/clerk-appearance.ts`, which sets `theme: dark` from `@clerk/ui/themes` and maps Clerk's `variables` (colorPrimary, colorBackground, colorBorder, fontFamily, borderRadius, ...) onto the app's existing `var(--...)` design tokens instead of hardcoding colors. `app/(auth)/layout.tsx` is a route-group shell (doesn't affect URLs) giving `/sign-in` and `/sign-up` a two-panel layout on large screens (compact Ghost-icon wordmark, tagline, text-only feature list on the left; centered Clerk form on the right) that collapses to form-only below `lg`, per spec — no gradients, hero sections, feature cards, or scroll-heavy layouts. `app/(auth)/sign-in/[[...sign-in]]/page.tsx` and `.../sign-up/[[...sign-up]]/page.tsx` render Clerk's default `<SignIn />`/`<SignUp />` components unmodified. Root `app/page.tsx` now does a real `auth()`-based redirect: signed-in → `/editor`, signed-out → `/sign-in`. `components/editor/editor-navbar.tsx` right section now renders Clerk's `<UserButton />` for profile/logout.

## In Progress

- None yet.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- `EditorShell` mounts `EditorDialog` in a controlled-but-closed state (`isDialogOpen`/`setIsDialogOpen`) with a placeholder `title="Dialog"` — nothing triggers it open yet since no concrete dialog content is defined in any spec. The next feature unit that needs a real dialog (e.g. project creation) should replace this placeholder wiring rather than add a second dialog instance.

## Architecture Decisions

- `app/globals.css` defines the `ui-context.md` design tokens (`--bg-base`, `--text-primary`, etc.) in `:root` and maps shadcn's semantic tokens (`--background`, `--card`, `--primary`, ...) onto them, so generated `components/ui/*` files stay untouched while matching the dark theme.
- The `bg-base` utility is defined via a standalone `@utility bg-base { background-color: var(--bg-base); }` rather than a `--color-base` theme token — registering `base` in Tailwind's shared color namespace also generates `.text-base`, which collides with and silently replaces Tailwind's built-in `text-base` font-size utility (broke default text sizing across shadcn components, e.g. `CardTitle`). Avoid reusing Tailwind's reserved scale names (`base`, `sm`, `lg`, `xl`, `2xl`, ...) as design-token names in the shared color theme namespace.
- `03-auth.md` said to "define public routes using the existing sign-in and sign-up env vars," but `.env.local` only had `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`/`CLERK_SECRET_KEY` — no sign-in/up URL vars existed yet. Added `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up` to `.env.local` using Clerk's own fixed, non-negotiable env var names (confirmed in `@clerk/nextjs`'s source) rather than inventing custom ones — this satisfies "do not rename or invent new ones" in spirit, since these are the only names Clerk's SDK reads for this purpose.

## Session Notes

- Verified with a temporary `/design-check` page (removed after use) rendering all seven components plus a headless Chrome screenshot; caught and fixed the `text-base` collision described above before removing the page.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.
- Verified the editor chrome with a temporary `/editor-check` page (removed after use) and headless Chrome screenshots of the sidebar open/closed and the dialog pattern rendered; `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass.
- `EditorNavbar` and `ProjectSidebar` are controlled components (`isSidebarOpen`/`isOpen` + callbacks) with no shared state of their own — now composed by `editor-shell.tsx` per the note above.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass after wiring `EditorShell` into `app/layout.tsx`; verified live via `npm run dev` + a Playwright screenshot script (see Completed).
- After moving editor content to `/editor` and `EditorShell` to `app/editor/layout.tsx`: `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass; verified live that `/` redirects to `/editor` and the sidebar toggle still works there, with no console errors (Playwright + `Google Chrome.app`, same approach as above).
- Auth: installed `@clerk/ui` (not previously a dependency). `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass, and the build's route table confirms `ƒ Proxy (Middleware)` is registered. Verified live via `npm run dev`: `curl` against `/` and `/editor` both 307-redirect unauthenticated requests to `/sign-in?redirect_url=...`; Playwright (`--channel chrome`, headless shell wasn't installed in this environment) screenshots of `/sign-in` and `/sign-up` at 1440×900 and 390×844 confirm the two-panel/form-only responsive split, dark theme, and CSS-variable-driven Clerk styling render correctly with no dev-server console errors.
