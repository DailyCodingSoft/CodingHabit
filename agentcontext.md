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

### Code Comments
- **Minimize comments** - Code should be self-explanatory
- Only add comments for complex logic that truly needs clarification
- **NO obvious comments** like "// Call the save function" or "// TODO: Implement later"
- Explain changes in the chat response AFTER completing them, not in code

### Git Workflow
- **Always pull before starting work** - Run `git pull` at the start of each session
- **Pull before pushing** - Always check for remote changes before pushing
- **Commit frequently** - Small, atomic commits are better than large ones
- **Commit messages**: Short and simple
  - ✅ Good: "Fix debt parsing in habitMapper"
  - ✅ Good: "Add saveHabit placeholder function"
  - ❌ Bad: "Fixed the debt value parsing issue in habitMapper.ts where currency formatting was causing NaN values by removing dollar signs and dots"
- **NO co-author trailers** - Skip the "Co-authored-by: Copilot" footer

## Session History

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
