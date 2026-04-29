@AGENTS.md

# AI Interview Trainer

## What this app does

Users paste a job description, AI generates technical interview questions tailored to the role.
The user answers each question one at a time, receives streaming AI feedback per answer,
and gets a final summary with score and improvement areas at the end.

## Current phase

Phase 1 — core AI loop, no auth, no DB yet.
Working on: interview session flow and UI.

## Styling conventions

- Use shadcn CSS variable colors — never hardcode hex or rgb values
- CORRECT: `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`
- WRONG: `bg-white`, `text-gray-500`, `bg-[#ffffff]`
- Tailwind CSS v4 — use v4 syntax, not v3
- Spacing: use Tailwind scale (`p-4`, `gap-2`) not arbitrary values (`p-[14px]`)
- Dark mode is handled automatically via CSS variables — no need for `dark:` prefix on color classes

## Tech stack

- Next.js 16 + TypeScript
- Tailwind CSS + shadcn/ui (Radix based)
- Vercel AI SDK v6 + Groq (llama-3.3-70b-versatile)
- Zustand for interview session state
- Supabase for auth and database (Phase 2)
- Framer Motion for animations (Phase 3)
- next-intl for i18n
- next-themes for light/dark mode

## Project structure

```
app/
  api/                        ← Route Handlers (AI calls only)
    generate-questions/
      route.ts
    evaluate-answer/
      route.ts
  (app)/                      ← protected routes (main app)
    page.tsx                  ← job description input
  (auth)/                     ← auth routes
    login/
      page.tsx
  demo/                       ← public demo page (no auth needed)
    page.tsx
  layout.tsx                  ← root layout
  globals.css

components/
  common/                     ← shared custom components
  ui/                         ← shadcn components only, do not add custom files here

store/
  interview-store.ts          ← Zustand store

lib/
  ai.ts                       ← centralized AI model config
  prompts.ts                  ← all system prompts and prompt templates
  schemas.ts                  ← all Zod schemas and inferred types
  sample-jds.ts               ← sample job descriptions for demo/testing
  utils.ts                    ← shadcn cn() utility

actions/                      ← Server Actions (Supabase reads/writes only)
  session-actions.ts
  question-actions.ts

providers/                    ← React context providers
  theme-provider.tsx

messages/                     ← i18n translation files
  en.json
  pl.json

i18n/                         ← next-intl config
  request.ts

proxy.ts                      ← Next.js 16 middleware (renamed from middleware.ts)
```

## Architecture rules — IMPORTANT

- AI calls (streaming, structured output) → Route Handlers ONLY
- Database reads/writes → Server Actions ONLY
- Never expose API keys to the client
- Never call Supabase directly from Route Handlers
- Route Handlers are for HTTP concerns, not business logic

## Key conventions

- File names: kebab-case (e.g. `interview-store.ts`, `job-description-input.tsx`)
- Component names: PascalCase (e.g. `JobDescriptionInput`)
- Route-specific components: co-locate in `_components/` folder inside the route
- Shared components: `components/common/`
- shadcn components: `components/ui/` — never add custom files here
- Always use `@/` path alias, never relative imports like `../../`
