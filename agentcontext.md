# Agent Context for CodingHabit Repository

## Session Management Files

### `todo.md`
- **Purpose**: Personal task tracking file for the user across coding sessions
- **Usage**: Contains tasks dictated by the user - only add items when explicitly instructed
- **Structure**: 
  - "Current Session Tasks" - active work for this session
  - "Future Session Tasks" - backlog for upcoming sessions
- **Important**: This file is gitignored and should NEVER be committed to the remote repository
- **Agent Role**: Only modify this file when the user explicitly asks to add, update, or remove tasks

## Coding Standards & Workflow

### CRITICAL - Read This First
- User wants to LEARN, not just get things done
- Explain WHY and HOW after making changes in chat
- User checks browser console for habit object on submit
- Dev server runs at localhost:3000 (keep detached)

### Code Comments
- **Minimize comments** - Code should be self-explanatory
- Only add comments for complex logic that truly needs clarification
- **NO obvious comments** like "// Call the save function" or "// TODO: Implement later"
- Explain changes in the chat response AFTER completing them, not in code
- User reads the chat, not the code comments

### Git Workflow
- **Always pull before starting work** - Run `git pull` at the start of each session
- **Pull before pushing** - Always check for remote changes before pushing
- **Commit frequently** - Small, atomic commits are better than large ones
- **Commit messages**: Short and simple (4-8 words max)
  - ✅ Good: "Fix debt parsing in habitMapper"
  - ✅ Good: "Add saveHabit placeholder function"
  - ✅ Good: "Add max participants limit"
  - ❌ Bad: "Fixed the debt value parsing issue in habitMapper.ts where currency formatting was causing NaN values by removing dollar signs and dots"
- **NO co-author trailers** - Skip the "Co-authored-by: Copilot" footer
- When user says "commit this", group related changes into ONE commit, not multiple

### Development Workflow
- **Dev server**: `pnpm run dev` detached at http://localhost:3000
- **VS Code**: User follows along, open with `code .`
- **Test**: User checks localhost:3000/habit in browser
- **Console**: User verifies habit object logs on form submit

### Key Project Constants
- **HABIT_CONFIG** (`utils/constants.ts`): MAX_PARTICIPANTS: 10, MIN_PARTICIPANTS: 2
- Use these constants throughout, never hardcode

### Current Architecture State
- **Auth**: Hardcoded "Usuario creador" - needs real auth context
- **Creator**: Always first in participants array
- **Repo format**: "owner/repo" in Habit.repoName
- **Participant limit**: UI enforced with HABIT_CONFIG.MAX_PARTICIPANTS
- **Backend**: saveHabit() placeholder logs to console, ready for API
- **GitHub Services**: contributorsService & commitService exist in services/GitHub/

### Important Files
- `components/layout/habit/HabitForm.tsx` - Form with all inputs
- `app/(protected)/habit/page.tsx` - Has saveHabit placeholder
- `utils/mappers/habitMapper.ts` - FormData → Habit (adds creator to participants)
- `types/index.ts` - Habit, User types
- `utils/constants.ts` - HABIT_CONFIG

## Session History

### Session 2026-02-16 (Habit Creation Form - Complete)
**What we accomplished:**
- Built complete UsernameInput component with validation
- Implemented creator auto-display (cannot be removed, shown with "(Tú)" badge)
- Created RepoInput component with URL parsing (supports both full URL and owner/repo format)
- Added warning for public repos only
- Created HABIT_CONFIG constants (MAX_PARTICIPANTS: 10, MIN_PARTICIPANTS: 2)
- Enforced participant limit in UI with visual feedback
- Updated habitMapper to include creator in participants array and extract repo info
- Fixed merge conflict with remote changes (commitService.ts updates)

**Current state:**
- Habit creation form is FULLY FUNCTIONAL on frontend
- All fields validate correctly
- Console.log shows complete habit object on submit
- Creator automatically included as first participant
- Repository parsing works for both formats

**Blocked items:**
- Backend persistence waiting on DB partner
- Authentication context needs implementation (using hardcoded "Usuario creador")

**IMPORTANT for next session:**
- When user submits form, habit object logs to console with all fields
- Participants array includes creator as first element
- RepoName stored as "owner/repo" format

### Session 2026-02-15 (Initial Setup)
**What we accomplished:**
- Created session management files (`todo.md`, `agentcontext.md`)
- Added session files to `.gitignore` 
- Fixed debt value parsing bug in `habitMapper.ts` - now correctly handles currency format ($5.000 → 5000)
- Refactored habit page to remove state management bug - replaced `useState` with direct `saveHabit()` function call
- Added `saveHabit` placeholder function ready for DB implementation
- Established coding standards and git workflow guidelines

**Key decisions:**
- DB persistence blocked - waiting on partner, using placeholder function with console.logs
- Timezone handling deferred to future (per-user vs habit-level)
- Per-user repository support deferred to future

**Next steps:**
- Start implementing current session tasks (username input, repo selection, entity updates)
- Initial commit validation flow

## Project Overview: CodingHabit by DailyCoding

**CodingHabit** is a gamified habit-tracking platform that turns daily GitHub commits into a competitive accountability game.

### Core Concept
- 2-10 players compete to maintain the longest daily commit streak
- Players share a single GitHub repository (future: support per-user repos)
- Automatic tracking of commits via GitHub integration
- Financial penalties for missing commits create accountability

### Debt Mechanism
When a player fails to commit for a day, they owe money to EACH other player:
- **Example**: 3 players, debt = $1, Player A fails → Player A owes $2 total ($1 to each of the 2 other players)

**Debt Modes** (configured per habit):
1. **Accumulative**: Each subsequent fail costs more
   - 1st fail = $1, 2nd fail = $2, 3rd fail = $3
   - Total debt after 3 fails = $1 + $2 + $3 = $6
   - Must be paid to EACH other player
2. **Non-accumulative**: Each fail costs the same flat amount

### Key Entities
- **Habit**: The game session configuration
  - Number of players (2-10)
  - Linked GitHub repository
  - Debt amount per fail
  - Debt mode (accumulative/non-accumulative)
  - Timezone (habit-level, or per-user for fairness - see todo)
  - Duration/end date

- **Player**: Participant in a habit
  - Commit tracking
  - Debt calculations
  - Streak statistics

### Platform Features
- Create and configure habits
- Direct GitHub repo integration
- Automatic daily commit verification
- Automatic debt calculation when players miss commits
- End-of-habit statistics: total debt owed/received, longest streak, win/loss record

### Technical Structure
- `coding-habit/` - Main application directory
- `DB-Coding-Habit/` - Database schema and related files
- Documentation: `Contrato.pdf`, `FasesCodingHabit.pdf`, `README.md`

### Future Enhancements
- Per-user repository option (instead of shared repo)
- Per-user timezone handling for more fairness across time zones
