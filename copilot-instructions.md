# CodingHabit Project - Copilot Instructions

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

## 🏗️ Technical Structure

### Key Directories
- `coding-habit/` - Main Next.js application
- `DB-Coding-Habit/` - Database schema and related files
- Documentation: `Contrato.pdf`, `FasesCodingHabit.pdf`

### Tech Stack
- **Framework**: Next.js with TypeScript
- **Package Manager**: pnpm (not npm or yarn)
- **Dev Server**: http://localhost:3000
- **Database**: PostgreSQL (implementation pending)
- **Deployment**: Vercel at https://coding-habit.vercel.app/signin

### Setup Commands
```bash
# First time setup (requires Node 24.13.0)
corepack enable
corepack prepare pnpm@latest --activate
pnpm install

# Run development server
pnpm run dev
```

## 📁 Important Files

### Core Components
- `components/layout/habit/HabitForm.tsx` - Main form with all habit inputs
- `components/UsernameInput.tsx` - Participant username management
- `components/RepoInput.tsx` - GitHub repository input with URL parsing

### Pages & Logic
- `app/(protected)/habit/page.tsx` - Habit creation page with saveHabit placeholder
- `utils/mappers/habitMapper.ts` - Transforms FormData → Habit (adds creator to participants)
- `types/index.ts` - Core types: Habit, User, etc.
- `utils/constants.ts` - HABIT_CONFIG constants

### Services
- `services/GitHub/contributorsService.ts` - GitHub API for contributors
- `services/GitHub/commitService.ts` - GitHub API for commits

## 🎨 Coding Standards & Workflow

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

## 🔧 Current Architecture State

### Key Constants (utils/constants.ts)
```typescript
HABIT_CONFIG = {
  MAX_PARTICIPANTS: 10,
  MIN_PARTICIPANTS: 2
}
```
**Always use these constants** - never hardcode these values.

### Current Implementation Status

✅ **Completed:**
- Habit creation form fully functional on frontend
- Creator auto-display (shown first with "(Tú)" badge, cannot be removed)
- Username input with validation (GitHub username format)
- Repository input with URL parsing (supports both full URL and "owner/repo" format)
- Participant limit enforced in UI (MAX_PARTICIPANTS)
- Form validates all fields correctly
- habitMapper includes creator as first participant
- Repository stored as "owner/repo" format in Habit.repoName

⏳ **In Progress / Blocked:**
- **Auth**: Currently hardcoded "Usuario creador" - needs real auth context
- **Backend**: saveHabit() is a placeholder that logs to console - waiting on DB partner
- **Status field**: Not yet added to Habit type (needed for validation flow)

🔮 **Future Enhancements:**
- Initial commit validation flow (verify all participants are repo contributors)
- Generate habit access code for sharing
- Backend API for habit persistence
- Per-user repository option
- Per-user timezone handling for international fairness

## 🗄️ Database Schema (Planned)

When DB partner is ready:
- `habits` table: title, debt_value, is_cumulative, dates, creator_id, repo_owner, repo_name, status
- `habit_participants` junction table: habit_id, user_id/username
- Proper indexes for performance
- API endpoint: `/api/habit/route.ts`

## 📋 Session Management Files

### `todo.md`
- **Purpose**: Personal task tracking for the user
- **Status**: This file is gitignored and NEVER committed
- **Agent Role**: Only modify when user explicitly asks

### `agentcontext.md`
- **Purpose**: Historical context from previous sessions
- **Status**: Gitignored, for reference only

## 🎮 Testing Workflow

When user tests the habit creation:
1. User opens http://localhost:3000/habit in browser
2. User fills out the form
3. User submits and checks browser console
4. Console should log complete habit object with:
   - All form fields
   - Creator as first element in participants array
   - RepoName in "owner/repo" format

## 📊 Project Resources

- **Production**: https://coding-habit.vercel.app/signin
- **Kanban Board**: https://github.com/orgs/DailyCodingSoft/projects/1
- **Company Email**: dailycoding48@gmail.com

## 🚀 Starting a New Session

1. Pull latest changes: `git pull`
2. Check dev server status (should be detached at :3000)
3. Review `todo.md` for current session tasks
4. Review this file for project context
5. Ask user what they want to work on
6. Explain your approach before implementing
7. Make changes and explain WHY and HOW in chat

---

**Last Updated**: 2026-02-17  
**Current Phase**: Habit creation form complete, waiting on DB implementation  
**Next Priority**: Initial commit validation flow + habit access code generation
