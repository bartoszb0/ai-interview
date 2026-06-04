@AGENTS.md

# AI Interview Trainer

## What this app does

Users paste a job description, AI generates technical interview questions tailored to the role.
The user answers each question one at a time, receives streaming AI feedback per answer,
and gets a final summary with score and improvement areas at the end.

## Styling conventions

- Use shadcn CSS variable colors — never hardcode hex or rgb values
- CORRECT: `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`
- WRONG: `bg-white`, `text-gray-500`, `bg-[#ffffff]`, `text-white/80`
- Tailwind CSS v4 — use v4 syntax, not v3
- Spacing: use Tailwind scale (`p-4`, `gap-2`) not arbitrary values (`p-[14px]`)
- Dark mode is handled automatically via CSS variables — no need for `dark:` prefix on color classes

## Tech stack

- Next.js 16 + TypeScript
- Tailwind CSS + shadcn/ui (Radix based)
- Vercel AI SDK v6 + Groq
- Zustand for interview session state
- Supabase for auth and database (Phase 2)
- Framer Motion for animations (Phase 3)
- next-themes for light/dark mode

## Project structure

```
app/
  api/                        ← Route Handlers (AI calls only)
    generate-questions/
      route.ts                ← generates question list from job description
    evaluate-answer/
      route.ts                ← evaluates answer, decides follow_up vs next_question
    answer/
      route.ts                ← generates a sample AI answer (dev helper)
    summary/
      route.ts                ← generates post-interview debrief report
  (auth)/                     ← auth routes (Phase 2 — forms exist, no logic yet)
    login/
      page.tsx
    register/
      page.tsx
    layout.tsx
  interview/                  ← interview session
    page.tsx
    _components/
      InterviewHeader.tsx     ← fixed top bar: title, progress bar, exit
      AiQuestion.tsx          ← interviewer bubble with avatar
      FollowupQuestion.tsx    ← indented follow-up card (shown when decision=follow_up)
      AnswerInput.tsx         ← textarea + submit (delegates to hooks)
      JobDescriptionInput.tsx ← paste JD + sample buttons
      PageHero.tsx            ← pre-interview hero text
      SamplesBtns.tsx         ← sample JD quick-load buttons
      BrowseJobsBtn.tsx       ← link back to job listings
      SummaryScreen.tsx       ← post-interview debrief
  _components/                ← home page (job listings) components
    Navbar.tsx
    SearchFilters.tsx
    SortSelect.tsx
    ListingsHeader.tsx
    JobsList.tsx
    JobListing.tsx
    JobListSkeleton.tsx
    ActiveListing.tsx
    PaginationControls.tsx
    ProfileBtn.tsx
    NoFilters.tsx
  page.tsx                    ← home page: job listings with filters
  layout.tsx                  ← root layout
  globals.css

hooks/                        ← custom hooks (need state or other hooks internally)
  useEvaluateAnswer.ts        ← fetch + store logic for answer evaluation
  useGenerateQuestions.ts     ← fetch + store logic for question generation
  useGenerateAnswer.ts        ← fetch logic for AI-generated sample answer
  useSpeechRecognition.ts     ← Web Speech API wrapper

components/
  common/                     ← shared custom components
  ui/                         ← shadcn components only, do not add custom files here

store/
  interview-store.ts          ← Zustand store (interview session state only)

lib/
  ai.ts                       ← centralized AI model config
  prompts/
    interview.ts              ← question generation system prompt
    evaluate.ts               ← answer evaluation system prompt
    summary.ts                ← post-interview debrief system prompt
    generate-answer.ts        ← sample answer generation system prompt
  sample-jds.ts               ← sample job descriptions for testing
  api.ts                      ← Himalayas jobs API fetch helper
  utils.ts                    ← shadcn cn() utility

schemas/                      ← Zod schemas and inferred types
types/
  questionRecord.ts           ← QuestionRecord type (question + exchanges + summary)

constants/                    ← filter option lists (seniority, country, sort, etc.)

providers/                    ← React context providers
  theme-provider.tsx

proxy.ts                      ← Next.js 16 middleware (renamed from middleware.ts)
```

## Architecture rules — IMPORTANT

- AI calls (structured output, text generation) → Route Handlers ONLY
- Database reads/writes → Server Actions ONLY (Phase 2)
- Never expose API keys to the client
- Route Handlers are for HTTP concerns only
- Hooks = logic that needs `useState`, `useRef`, or other hooks; plain functions otherwise

## Key conventions

- File names: kebab-case (e.g. `interview-store.ts`, `job-description-input.tsx`)
- Component names: PascalCase (e.g. `JobDescriptionInput`)
- Route-specific components: co-locate in `_components/` folder inside the route
- Shared components: `components/common/`
- shadcn components: `components/ui/` — never add custom files here
- Always use `@/` path alias, never relative imports like `../../`
- Zod schemas live in `schemas/`, inferred types in `types/`
- Import prompts directly from their file, e.g. `@/lib/prompts/evaluate` — no barrel index
