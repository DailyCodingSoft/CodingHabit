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
- [ ] **Add username input for habit participants**
  - Create text input component for typing GitHub usernames
  - Implement visual list to display added usernames
  - Allow adding multiple users to the habit (beyond the creator)
  - Add ability to remove users from the list before submitting
  - Add "Validate Usernames" button to check if usernames exist on GitHub

- [ ] **Add repository selection input**
  - Create input field for GitHub repository URL
  - Parse repo link to extract owner and repository name
  - Display confirmation to user showing parsed owner/repo
  - Show warning/notice that only PUBLIC repositories are supported in this version
  - Validate that the repository exists and is accessible

- [ ] **Update habit entity schema**
  - Add `creator` field (user who created the habit)
  - Add `repository` field (owner/repo info)
  - Add `participants` field (array of GitHub usernames in the habit - must include creator)
  - Add `status` field to track habit state (e.g., "pending_validation", "active", "completed")

- [ ] **Implement initial commit validation flow**
  - After habit creation, set habit status to "pending_validation"
  - Display instructions to all participants to make an initial commit to the repo
  - Create endpoint/function to check repository contributors via GitHub API
  - Compare list of repo contributors against list of participants (including creator)
  - Once all participants appear in contributors list, activate the habit (status → "active")
  - Only start daily tracking after successful validation

## Future Session Tasks
- [ ] Decide on timezone handling: habit-level timezone vs per-user timezone (per-user is more fair for international players)
- [ ] Implement per-user repository option (alternative to shared repo model)

