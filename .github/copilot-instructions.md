# CodingHabit - GitHub Copilot Instructions

## 🎯 Project Overview

**CodingHabit** is a gamified habit-tracking platform by DailyCoding that turns daily GitHub commits into a competitive accountability game.

### Core Concept
- 2-10 players compete to maintain the longest daily commit streak
- Players share a single GitHub repository (future: per-user repos)
- Automatic tracking of commits via GitHub integration
- Financial penalties for missing commits create accountability

### Debt Mechanism
When a player fails to commit for a day, they owe money to EACH other player:
- **Example**: 3 players, debt = $1, Player A fails → Player A owes $2 total ($1 to each of the 2 other players)

**Debt Modes** (configured per habit):
1. **Accumulative**: Each subsequent fail costs more
   - 1st fail = $1, 2nd fail = $2, 3rd fail = $3
   - Total debt after 3 fails = $6 (must be paid to EACH other player)
2. **Non-accumulative**: Each fail costs the same flat amount

## Build, Test, and Lint Commands

```bash
# Package manager: pnpm (NOT npm or yarn)
pnpm install              # Install dependencies
pnpm run dev              # Start dev server (http://localhost:3000)
pnpm run build            # Build for production
pnpm run start            # Start production server
pnpm run lint             # Run ESLint

# First-time setup (requires Node 24.13.0)
corepack enable
corepack prepare pnpm@latest --activate
```

**Note**: No test suite currently configured.

## Architecture Overview

### Project Structure

This is a Next.js TypeScript application with a **clean architecture** approach:

```
coding-habit/
├── app/                    # Next.js 13+ app router
│   ├── (public)/          # Public routes (auth pages)
│   ├── (protected)/       # Protected routes (habit pages)
│   └── api/               # API route handlers
│       ├── auth/          # Authentication endpoints
│       ├── check-commits/ # Commit verification
│       ├── debt/          # Debt calculations
│       ├── sendMail/      # Email notifications
│       └── user/          # User management
├── domain/                # Domain layer (services)
│   └── services/          # Business logic (authService, userServices)
├── infrastructure/        # Infrastructure layer
│   ├── auth/             # JWT & password utilities
│   ├── cache/            # Redis caching (Upstash)
│   ├── db/               # Database connection (Neon PostgreSQL)
│   ├── mail/             # Email service (Resend)
│   └── repositories/     # Data access layer
├── services/              # External API services
│   ├── GitHub/           # GitHub API (commits, contributors)
│   ├── DB_Neon/          # Database queries
│   └── Redis/            # Cache operations
├── components/            # React components
│   ├── layout/           # Page-specific layouts
│   │   └── habit/        # HabitForm and habit-related components
│   └── ui/               # Reusable UI components
├── utils/                 # Utilities
│   ├── mappers/          # Data transformation (habitMapper)
│   ├── constants.ts      # App constants (HABIT_CONFIG)
│   └── helpers.ts        # Helper functions
└── types/                 # TypeScript type definitions (Habit, User, etc.)
```

### Key Architectural Patterns

**Clean Architecture Layers**:
- **Domain**: Pure business logic, no framework dependencies
- **Infrastructure**: External dependencies (DB, auth, cache)
- **Services**: Third-party API integrations (GitHub, Resend)
- **App**: Next.js routes and UI components

**Data Flow**:
1. User submits form → Component
2. Component calls mapper (`habitMapper`) → Transforms FormData to domain entity
3. Domain service validates and processes → Business rules
4. Repository persists data → Infrastructure layer
5. External services sync → GitHub API, email, etc.

**Important**: The `domain/` layer should never import from `infrastructure/`, `services/`, or `app/`. Dependencies flow inward.

## Key Conventions

### 1. Path Aliases

Use `@/*` for absolute imports from the `coding-habit/` directory:

```typescript
// ✅ Correct
import { Habit } from '@/types'
import { HABIT_CONFIG } from '@/utils/constants'

// ❌ Avoid
import { Habit } from '../../types'
```

### 2. Constants Usage

**Always use constants from `@/utils/constants.ts`** - never hardcode values:

```typescript
// ✅ Correct
import { HABIT_CONFIG } from '@/utils/constants'
if (participants.length > HABIT_CONFIG.MAX_PARTICIPANTS) { }

// ❌ Never hardcode
if (participants.length > 10) { }
```

Current constants:
- `HABIT_CONFIG.MAX_PARTICIPANTS`: 10
- `HABIT_CONFIG.MIN_PARTICIPANTS`: 2

### 3. Repository Format

GitHub repositories are stored in **"owner/repo"** format (not full URLs):

```typescript
// ✅ Correct format in Habit.repoName
"microsoft/vscode"

// ❌ Not stored
"https://github.com/microsoft/vscode"
```

The `RepoInput` component (in `components/`) handles URL parsing automatically and supports both formats.

### 4. Creator Participant Pattern

The habit creator is **always the first participant** in the array:

```typescript
// habitMapper.ts adds creator automatically
const habit: Habit = {
  participants: [creatorUsername, ...otherParticipants],
  // ...
}
```

UI shows creator with "(Tú)" badge and prevents removal.

### 5. Server-Only Code

Database and auth code uses `'server-only'` directive:

```typescript
import 'server-only'
// Ensures code never bundles to client
```

Use this in files under `infrastructure/db/`, `infrastructure/auth/`, and any file accessing environment variables.

### 6. Environment Variables

```typescript
// ✅ Access in server components or API routes only
process.env.DATABASE_URL
process.env.JWT_SECRET

// ❌ Never access in client components
```

Required env vars (`.env.development.local`):
- `DATABASE_URL` - Neon PostgreSQL connection
- `JWT_SECRET` - Auth token signing
- `UPSTASH_REDIS_REST_URL` - Redis cache
- `UPSTASH_REDIS_REST_TOKEN` - Redis auth
- Email service variables for Resend

### 7. External Service Patterns

**GitHub API** (`services/GitHub/`):
- `commitService.ts` - Fetch commits with date filtering
- `contributorsService.ts` - Verify repo contributors
- Uses Octokit library

**Database** (`services/DB_Neon/`):
- SQL queries using Neon serverless driver
- Always parameterize queries (SQL injection prevention)
- Connection via `infrastructure/db/neondb.ts`

**Cache** (`services/Redis/`):
- Upstash Redis for session/temporary data

**Email** (`infrastructure/mail/`):
- Resend for transactional emails

### 8. Debt Calculation Logic

Two modes (configured per habit):

**Accumulative**: Fails get progressively more expensive
```
1st fail = $1 × (players - 1)
2nd fail = $2 × (players - 1)
3rd fail = $3 × (players - 1)
Total owed after 3 fails = $6 per player
```

**Non-accumulative**: Flat rate per fail
```
Each fail = $1 × (players - 1)
```

**Important**: A player owes the debt amount to **each other player**, not split among them.

## Coding Standards & Workflow

### CRITICAL - User Learning Philosophy
- User wants to LEARN, not just get things done
- **Always explain WHY and HOW** after making changes in chat
- User checks browser console for habit object on form submit
- Dev server should stay detached at localhost:3000

### Code Comments Policy
- **Minimize comments** - Code should be self-explanatory
- Only add comments for complex logic that truly needs clarification
- **NO obvious comments** like "// Call the save function" or "// TODO: Implement later"
- **Explain changes in the chat response**, not in code comments
- User reads the chat, not the code comments

### Styling Philosophy
- **Focus on logic and functionality first** - Styling is not a priority in this phase
- UI should be functional and usable, but don't spend time on polish
- **Don't ask about styling details** - Just make it work and look decent
- Once all functionality is complete, styling will be done part by part
- Use basic Tailwind classes for layout and usability

### Git Workflow
- **Always pull before starting work**: `git pull` at session start
- **Pull before pushing**: Check for remote changes
- **Commit frequently**: Small, atomic commits
- **Commit messages**: Short and simple (4-8 words max)
  - ✅ Good: "Fix debt parsing in habitMapper"
  - ✅ Good: "Add saveHabit placeholder function"
  - ❌ Bad: Long explanatory messages
- **NO co-author trailers**: Skip "Co-authored-by: Copilot" footer
- **Group related changes**: When user says "commit this", make ONE commit, not multiple

### Development Workflow
1. Pull latest changes from remote
2. Start dev server detached: `pnpm run dev`
3. Make changes while explaining reasoning
4. User tests at http://localhost:3000/habit
5. User verifies habit object in browser console on form submit
6. Commit changes with short message
7. Pull before pushing

## Current Implementation Status

### ✅ Completed
- Habit creation form fully functional on frontend
- Creator auto-display (shown first with "(Tú)" badge, cannot be removed)
- Username input with validation (GitHub username format)
- Repository input with URL parsing (supports both full URL and "owner/repo" format)
- Participant limit enforced in UI (MAX_PARTICIPANTS)
- Form validates all fields correctly
- `habitMapper` includes creator as first participant
- Repository stored as "owner/repo" format in Habit.repoName
- User authentication (JWT-based)
- Database schema (Neon PostgreSQL)
- GitHub API integration (commits, contributors)

### ⚠️ Known Limitations
- Initial commit validation flow not yet implemented
- Habit status field exists in DB but not fully utilized in UI flow
- Timezone handling is habit-level (future: per-user timezones for international fairness)

### 🔮 Future Enhancements
- Initial commit validation flow (verify all participants are repo contributors)
- Generate habit access code for sharing
- Per-user repository option (instead of shared repo)
- Per-user timezone handling for international fairness

## Testing the Habit Creation Flow

When user tests the habit creation:
1. User opens http://localhost:3000/habit in browser
2. User fills out the form
3. User submits and checks browser console
4. Console should log complete habit object with:
   - All form fields
   - Creator as first element in participants array
   - RepoName in "owner/repo" format

## Important Files Reference

### Core Components
- `components/layout/habit/HabitForm.tsx` - Main form with all habit inputs
- `components/UsernameInput.tsx` - Participant username management
- `components/RepoInput.tsx` - GitHub repository input with URL parsing

### Pages & Logic
- `app/(protected)/habit/page.tsx` - Habit creation page
- `utils/mappers/habitMapper.ts` - Transforms FormData → Habit (adds creator to participants)
- `types/index.ts` - Core types: Habit, User, etc.
- `utils/constants.ts` - HABIT_CONFIG constants

### Services
- `services/GitHub/contributorsService.ts` - GitHub API for contributors
- `services/GitHub/commitService.ts` - GitHub API for commits
- `domain/services/authService.ts` - Authentication business logic
- `domain/services/userServices.ts` - User business logic

### Infrastructure
- `infrastructure/db/neondb.ts` - Database connection
- `infrastructure/auth/jwt.ts` - JWT token handling
- `infrastructure/auth/password.ts` - Password hashing
- `infrastructure/repositories/userRepository.ts` - User data access

## Session Management Files

### `todo.md` - **THIS IS CRITICAL**
- **Purpose**: The central tracking system for ALL work - completed tasks, current session tasks, future tasks, and user ideas
- **Structure**:
  - "Issues to Fix Before New Features" - Bugs and blockers
  - "Current Session Tasks" - Active work for this session
  - "Future Session Tasks" - Backlog for upcoming sessions
- **Status**: This file is gitignored and NEVER committed
- **Agent Role**: 
  - **ALWAYS read this file at the start of every session** to understand what needs to be done
  - Update checkboxes as tasks are completed
  - Add new tasks when user explicitly asks or when new work is identified
  - This is where user writes down ideas and tracks everything

### `agentcontext.md`
- **Purpose**: Historical context from previous sessions
- **Status**: Gitignored, for reference only

## Resources

- **Production**: https://coding-habit.vercel.app/signin
- **Kanban Board**: https://github.com/orgs/DailyCodingSoft/projects/1
- **Company Email**: dailycoding48@gmail.com
- **Database**: Neon PostgreSQL (serverless)
- **Cache**: Upstash Redis
- **Deployment**: Vercel

## Starting a New Session

1. **Read `todo.md` first** - This is the central tracking system. Check:
   - Current Session Tasks - What we're working on now
   - Issues to Fix - Any blockers or bugs
   - Future Session Tasks - What's coming up
2. Pull latest changes: `git pull`
3. Review this file for project context if needed
4. Ask user what they want to work on (or continue with todo.md tasks)
5. Explain your approach before implementing
6. Make changes and explain WHY and HOW in chat
7. Update `todo.md` checkboxes as tasks are completed

---

**Last Updated**: 2026-02-17  
**Current Phase**: Habit creation form complete, auth system implemented  
**Next Priority**: Initial commit validation flow + habit access code generation
