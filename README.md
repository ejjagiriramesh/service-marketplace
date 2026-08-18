# ServiceHub — Local Services Marketplace (Frontend)

A fully wired, runnable React app implementing the platform-first frontend
architecture: routing, layouts, an API layer, React Query, auth, and the
**Services** business module built on top of reusable **shared/** and
**core/** capabilities — so Real Estate, Jobs, Buy/Sell and B2B can reuse the
same foundation later without rewriting it.

Every screen runs on **dummy data** (see `src/core/api/db.js`) served through
a **mock API client** that simulates real network latency, so the loading /
error / empty states you'll see are the same ones a live backend would
trigger. Requests, favorites, and your logged-in user persist to
`localStorage`, so refreshing the page or coming back later keeps your data —
it behaves like a real app, not a throwaway demo.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173). Resize your
browser to a phone width, or open dev tools device mode — this is a
mobile-first layout (max-width 420px, bottom tab bar), same as the doc's
"local-service usage will likely be heavily mobile-oriented" note.

Login is mocked: any email + a 6+ character password signs you in
(`priya@example.com` / `demo123` is pre-filled).

## What's implemented

**Customer journey** — Home → Categories → Search & filter → Provider
profile → 5-step request wizard (service → address → date/time → notes →
confirm) → confirmation → My Requests (status tabs, call/message actions) →
Saved providers → Account.

**Provider journey** — Account → "Continue as provider" → Provider Dashboard
(today/pending/earnings, job inbox with Accept / Decline / Mark completed).

**Auth** — Login & Register pages using React Hook Form + Zod validation,
`ProtectedRoute` / `PublicRoute` guards, and an `AuthProvider` context.

## Architecture

```
src/
├── app/            # App shell: router, providers (theme/query/auth/favorites), config
├── core/           # Platform-agnostic: mock+real API clients, auth service, generic hooks/utils
├── shared/         # Reusable UI: buttons, cards, status pills, TopBar/BottomNav, address & media pickers
├── layouts/         # AppLayout (customer), PublicLayout (auth), ProviderLayout
└── features/
    ├── auth/        # Login/Register pages + Zod schemas
    └── services/    # The Phase-1 business module: pages, components, hooks, api, schemas
```

The one rule this follows throughout, per the architecture doc:

> `features/services` may use `shared`, `core`, and platform capabilities.
> `shared` must never depend on `features/services`.

That's why the ticket-card chrome lives in `shared/cards/TicketCard.jsx` and
`features/services/components/ProviderCard.jsx` just composes it — when
Real Estate or Jobs ship, they reuse the same primitive instead of
reinventing it.

## Swapping in a real backend

1. Set `VITE_API_URL` in a `.env` file (see `.env.example`).
2. In `src/app/config/appConfig.js`, set `useMockApi: false`.
3. In each `src/features/services/api/*.js` file, replace the `mockRequest(...)`
   body with an `axiosClient.get/post(...)` call — `src/core/api/axiosClient.js`
   is already configured with a base URL and an auth-token interceptor.
4. Do the same in `src/core/auth/authService.js` for real login/register.

No page, hook, or component needs to change — they only ever import from
`features/services/api/*` and `core/auth/authService.js`.

## Notable choices vs. the original doc

- **Tailwind + a small custom "Dispatch Docket" design system** instead of
  Material UI, to keep the bundle light for a dummy-data prototype. The
  `shared/components/*` folder plays the same role your `AppButton`,
  `AppCard`, etc. would — swapping the underlying kit only touches that
  folder.
- **React Query + a mock client** stands in for a real backend; the
  interface (`useQuery`/`useMutation` hooks per feature) is what you'd keep
  either way.
- Provider-side pages are scoped to **Dashboard** (with an inbox of
  requests) for this pass — Provider Onboarding, Services management, and
  Availability editing follow the identical
  `pages/provider/*` + `hooks` + `api` pattern and are straightforward to
  add next.

## Stack

React 18 · React Router 6 · TanStack Query 5 · Axios · React Hook Form +
Zod · Tailwind CSS · lucide-react · Vite
