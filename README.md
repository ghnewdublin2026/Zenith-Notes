# Zenith Notes

> A modular journaling platform for managing cognitive load and emotional energy.

## Overview

Zenith Notes is built around the **"Low Friction, High Utility"** philosophy — every note capture takes under 30 seconds. The app is structured around a daily dashboard that links intentions (The Big 3), interstitial logs, and energy tracking into a single relational data model.

## Architecture

### MVP Stack
- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend/BaaS:** Supabase (PostgreSQL + Real-time subscriptions)
- **Authentication:** Supabase Auth (Magic Link + Google OAuth)
- **Hosting:** Vercel

### Full-Stack (Phase 3+)
- **Mobile:** React Native (iOS/Android)
- **API Layer:** GraphQL (Apollo)
- **AI/ML:** OpenAI Whisper API (Voice-to-Text) + GPT-4o (Categorisation)
- **Vector DB:** Pinecone (Semantic search of past notes)

## Project Structure

```
app/
├── (auth)/
│   └── login/page.tsx          # Magic Link Entry
├── dashboard/
│   ├── [date]/page.tsx         # Dynamic date: /dashboard/2026-03-05
│   └── page.tsx                # Redirects to current date
└── layout.tsx                  # Auth Guard & Supabase Provider

src/
├── components/
│   └── InterstitialInput.tsx   # Real-time capture component
├── hooks/
│   └── useDailyLog.ts          # Data fetching hook
├── lib/
│   └── intentionMatcher.ts     # Keyword-based intention matching
└── types/
    └── index.ts                # TypeScript interfaces

supabase/
└── migrations/
    ├── 001_initial_schema.sql  # Core tables + RLS
    └── 002_evidence_of_progress.sql  # Phase 2 migration
```

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment variable template:

```bash
cp .env.local.example .env.local
```

3. Fill in your Supabase credentials in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the database migrations in your Supabase project SQL editor.

5. Start the development server:

```bash
npm run dev
```

## Implementation Roadmap

| Phase | Focus | Key Tasks |
|-------|-------|-----------|
| **Phase 1: The Core (MVP)** | Data & Auth | Setup Supabase; SQL schema for `profiles`, `entries`, `intentions`; Magic Link auth; 30-second text input UI |
| **Phase 2: Contextualizing** | Energy & Interstitials | `energy_logs` table; time-blocked UI for Interstitial Logging; local-first caching |
| **Phase 3: The Intelligence** | Voice & Synthesis | OpenAI Whisper integration; daily "Evidence of Progress" summary; Wind-Down prompt engine |
| **Phase 4: Optimization** | Insights & Security | AES-256 client-side encryption; Pinecone vector search; Energy vs. Productivity charts |

## Authentication Plan

- **Primary:** Magic Link (email-based, passwordless)
- **Secondary:** OAuth 2.0 (Google/Apple one-tap)
- **Security:** JWT stored in `HttpOnly` cookies (XSS mitigation)
- **Data Isolation:** PostgreSQL Row-Level Security (RLS) policies

## Security & Privacy

- End-to-End Encryption (E2EE) for "Brain Dump" sections using AES-256
- Zero-Knowledge Storage option (server reads only metadata)
- RLS ensures users can only `SELECT/INSERT/UPDATE` their own data
