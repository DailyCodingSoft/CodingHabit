# TODO

## Issues to Fix Before New Features
- [x] **Fix state management bug in habit page** ✅
  - Removed unnecessary state management
  - Created saveHabit placeholder function
  - Habit object now passed directly to save function

- [ ] **Create backend persistence for habits** (BLOCKED - waiting on DB partner)
  - Create `/api/habit/route.ts` endpoint for habit creation
  - Add `habits` table to Postgres schema (title, debt_value, is_cumulative, dates, creator_id, repo_owner, repo_name, status)
  - Add `habit_participants` junction table (habit_id, user_id/username)
  - Implement habit repository/service in infrastructure layer
  - Add database indexes for performance
  - Replace TODO in saveHabit function with actual API call

- [x] **Fix debt value parsing in habitMapper** ✅
  - Handle currency formatting correctly ($5.000 → 5000)
  - Remove $ and dots before parsing to number

- [ ] **Add authentication context**
  - Get authenticated user from session/context instead of hardcoded user
  - Ensure user is logged in before accessing habit creation page

## Current Session Tasks
- [x] **Add username input for habit participants** ✅
  - Created UsernameInput component with text input
  - Visual list displays added usernames
  - Users can add/remove participants
  - Validation for GitHub username format
  - Integrated into HabitForm with validation

- [x] **Handle creator username in participant list** ✅
  - Creator automatically displayed in participant list
  - Creator shown with "(Tú)" badge and primary color styling
  - Creator cannot be removed from list
  - Validation prevents creator from adding themselves again
  - Creator always included in habit participants

- [x] **Add repository selection input** ✅
  - Created RepoInput component with URL parsing
  - Accepts full GitHub URL or owner/repo format
  - Shows confirmation with link to verify repo
  - Warning about public repos only
  - Integrated with form validation
  - Mapper includes creator in participants list

- [x] **Update habit entity schema** ✅
  - Creator field already in Habit type
  - Repository field (repoName) already in Habit type
  - Participants field already in Habit type
  - Status field will be added when implementing validation flow

- [ ] **Implement initial commit validation flow**
  - Add `status` field to Habit type (e.g., "pending_validation", "active", "completed")
  - After habit creation, set habit status to "pending_validation"
  - Display instructions to all participants to make an initial commit to the repo
  - Create endpoint/function to check repository contributors via GitHub API
  - Compare list of repo contributors against list of participants (including creator)
  - Once all participants appear in contributors list, activate the habit (status → "active")
  - Only start daily tracking after successful validation

- [ ] **Generate habit access code after creation**
  - [x] Plan share screen flow and features
  - [ ] **Success modal after habit creation**
    - Show success message when habit is created
    - Display button to go to share screen
    - Modal appears after form submission
  - [ ] **Define access code encoding format**
    - Format: 6 characters divided as XXX-XXX (e.g., A2A-2E3)
    - Define what information encodes in the code
    - Backend generates the code
  - [ ] **Create share page `/habit/[habitId]/share`**
    - [ ] Create route structure and page component
    - [ ] Display success message for habit creation
    - [ ] Display access code prominently
    - [ ] Add "Copy to clipboard" button for code
    - [ ] Show list of participants who need to join
    - [ ] Add shareable link: `codinghabit.app/join/XXX-XXX`
    - [ ] Add "Go to Players Screen" button (routes to debt screen)
  - [ ] Create access/join page where participants can enter the code
  - [ ] Validate code and grant access to habit view
  - [ ] Backend: Add access_code field to habits table
  - [ ] Backend: Implement code generation logic

## Future Session Tasks
- [ ] **Refactor debt/players screen naming** - Current naming is confusing, standardize to "players screen" or "tracking screen"
- [ ] **Use habitId in URLs** - Implement `/habit/[habitId]/players` for players/debt screen
- [ ] Decide on timezone handling: habit-level timezone vs per-user timezone (per-user is more fair for international players)
- [ ] Implement per-user repository option (alternative to shared repo model)

