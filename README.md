# AI Interview Trainer

Practice technical interviews against real job postings, with an AI interviewer that adapts to your answers.

**Live demo:** https://ai-interview-trainer-five.vercel.app

<img width="2276" height="1422" alt="ai1" src="https://github.com/user-attachments/assets/bab27cac-03a8-44d0-b94e-400b05426a21" />
<img width="2276" height="1422" alt="ai2" src="https://github.com/user-attachments/assets/848d16e3-0eb5-45f7-873e-5894a9fde851" />



## Overview

AI Interview Trainer turns a real job listing into a mock technical interview. It pulls live roles from the [Himalayas](https://himalayas.app) job board, reads the job description and seniority level, and generates a tailored set of questions for that specific role. You then answer one question at a time in a chat-style session, and the AI decides on each turn whether to push deeper with a follow-up or move on — the same judgment call a human interviewer makes. When the interview ends you get a scored debrief: an overall rating, what you handled well, where you fell short, and a per-question breakdown.

The questions are grounded in an actual open position rather than generic prompts, so the practice maps to roles you could really apply for.

## Features

- Browse live remote job listings with filters for seniority, role, country, and sort order
- Start an interview from any listing, or paste your own job description
- Questions generated specifically from the role's description and seniority
- Adaptive interview flow — the AI asks follow-ups or advances based on your answer
- Type or speak your answers (voice input via the Web Speech API)
- Generate a model answer for any question to see what a strong response looks like
- Scored final debrief with per-question feedback and overall improvement areas
- Light/dark mode

## How it works

1. **Browse jobs** — The home page lists real openings from the Himalayas API. Filter by seniority and role to narrow results.
2. **Select a role** — Open a listing to read the full description, then hit *Start AI Interview*. The job description and seniority are carried into the interview session. (You can also skip the board and paste any job description directly, or load a sample.)
3. **Generate questions** — The role's description is sent to the model, which returns 8–10 questions tailored to the listed skills and seniority, each tagged with a topic and difficulty.
4. **Answer one at a time** — Each answer is evaluated in the context of the conversation so far. The AI returns brief feedback and a decision: ask a follow-up (up to two per question) or move to the next question. Follow-ups are required to trace back to something you actually said.
5. **Get your debrief** — Once every question is covered, the per-question scores and notes are summarized into an overall report with concrete strengths and areas to improve.

## Technical highlights

**Structured LLM output with Zod.** Every AI call returns a validated, typed object rather than free text, using the Vercel AI SDK's `Output.object` with a Zod schema. The schemas (in `schemas/`) define the contract for each step:
- Question generation returns `{ text, topic, difficulty }[]`.
- Answer evaluation returns `{ feedback, decision, questionSummary }`, where `decision` is an enum (`follow_up` | `next_question`) that directly drives the interview's control flow, and `questionSummary` is a nullable nested schema (a 1–5 score plus `correct` / `gaps` / `improvements` arrays) populated only when a question is finalized.
- The final debrief returns `{ overallScore, whatWentWell, areasForImprovement }`.

Because the model's output is a typed object, the client can branch on it deterministically — no string parsing, no guessing.

**Adaptive follow-up flow driven by the model's decision.** The interview isn't a fixed script. After each answer, the evaluation route returns a `decision`, and the client either stays on the current question (showing the follow-up) or advances. Follow-ups are capped at two per question; the cap is enforced both in the prompt and in client logic (`hooks/useEvaluateAnswer.ts`), so a candidate who's stuck isn't drilled indefinitely.

**Stateless API with reconstructed context.** Each evaluation request is self-contained. Rather than holding a long-lived message array, the client rebuilds the conversation for the current question from stored exchanges (`questionRecords`), interleaving prior answers and feedback, and trims to the last eight messages before sending. The system prompt is rebuilt each call with the current question, seniority, and follow-up count injected in.

**Two Groq models, split by task.** `lib/ai.ts` defines two models routed by their job:
- A high-reasoning model (`openai/gpt-oss-120b`) handles question generation, answer evaluation, and the final debrief — the steps where output quality matters most.
- A fast, higher-throughput model (`meta-llama/llama-4-scout-17b-16e-instruct`) powers the "generate a sample answer" helper, where speed matters more than depth.

**Himalayas job board integration.** `lib/api.ts` queries the Himalayas search API with the active filters (seniority is mapped to the API's expected values, plus role, country, sort, and pagination). Listings are fetched in a Server Component and streamed in with `<Suspense>`; the description HTML is sanitized to plain text before being fed to the model.

**Architecture conventions.** AI calls live only in Route Handlers (`app/api/`) so API keys never reach the client. Session state is held in two Zustand stores — one for the interview itself, one for the selected listing. Fetch-and-wire logic lives in custom hooks (`hooks/`) to keep components thin and the stores limited to pure state. Zod schemas and their inferred types are colocated in `schemas/` and shared across routes, hooks, and the store.

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **AI:** Vercel AI SDK v6 (`ai`, `@ai-sdk/groq`, `@ai-sdk/react`) with Groq-hosted models
- **Validation:** Zod (structured model output + inferred types)
- **State:** Zustand
- **Styling:** Tailwind CSS v4, shadcn/ui (Radix primitives), `lucide-react` icons
- **Theming:** next-themes (system / light / dark)
- **Voice input:** Web Speech API
- **Data source:** Himalayas job board API
- **Deployment:** Vercel

## Getting started

```bash
# 1. Clone
git clone https://github.com/bartoszb0/ai-interview
cd ai-interview

# 2. Install dependencies
npm install

# 3. Add environment variables (see below)
#    create .env.local and set GROQ_API_KEY

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Scripts: `npm run dev` (development), `npm run build` (production build), `npm run start` (serve build), `npm run lint`.

## Environment variables

Create a `.env.local` file in the project root:

| Variable | Required | Description |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes | API key for Groq, used by every AI route (question generation, evaluation, sample answers, and the final summary). Read automatically by `@ai-sdk/groq`. Get one at [console.groq.com](https://console.groq.com). |

The Himalayas job board API is public and requires no key.

## Project structure

```
app/
  page.tsx          ← home: job listings with filters (Server Component)
  interview/        ← interview session (input → Q&A → summary) + co-located components
  api/              ← Route Handlers; all AI calls live here
    generate-questions/  ← JD → tailored question list
    evaluate-answer/     ← answer → feedback + follow-up/advance decision
    answer/              ← generates a model answer for a question
    summary/             ← per-question records → final debrief
  _components/      ← home page components (listings, filters, navbar)
  (auth)/           ← auth route group (Phase 2 — forms only)
components/
  ui/               ← shadcn/ui primitives
  common/           ← shared custom components
schemas/            ← Zod schemas + inferred types (one per AI contract)
store/              ← Zustand stores (interview session, active listing)
hooks/              ← fetch + state-wiring hooks, Web Speech API wrapper
lib/                ← model config, prompts, Himalayas API helper, sample JDs, utils
constants/          ← filter option lists (seniority, role, country, sort)
types/              ← shared TypeScript types (job, job response, question record)
```
