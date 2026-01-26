# GitHub Copilot Instructions

## Project Context
This is a Next.js project called CodingHabit, the main Idea for this project is to let the user create daily dinamics with friends, often with the purpose of creating a new habit, at first the app will focus on coding, but the idea is to expand it to other types of habits in the future.

## General Preferences

### developer mindset
- Prefer to stick to the prompt requirements strictly
- Avoid adding unnecessary features or code
- simple solutions for simple problems
- components should do one thing and do it well
- if a html block has too much logic, consider creating different components
- if consider the prompt requirements are not enough, ask for clarification
- if consider the prompt can be improved, suggest improvements but ask first

### Code Style
- always prefer better practices, readability and maintainability over clever or short code
- Use TypeScript with strict typing
- Prefer functional components with hooks over class components
- Use arrow functions for component definitions
- Always include proper type annotations
- Use `const` by default, only use `let` when necessary

### React/Next.js Conventions
- Always use "use client" directive for client components
- Import types from `@/types` using path aliases
- Keep components in their respective folders (ui, layout)
- Prefer composition over complex prop drilling
- Use semantic HTML elements

### State Management
- Use useState for local component state
- Keep API calls in dedicated functions
- Handle loading and error states explicitly
- Update local state optimistically when possible

### Naming Conventions
- Components: PascalCase (e.g., `DebtUpdatePopup`)
- Functions: camelCase (e.g., `handleUpdateDebt`)
- Types/Interfaces: PascalCase with descriptive names
- Constants: UPPER_SNAKE_CASE (e.g., `DEBT_KEYS`)
- Files: PascalCase for components, camelCase for utilities

### Styling
- Use Tailwind CSS utility classes
- Maintain dark theme consistency
- Apply hover states for interactive elements
- Global styles are a priority for common elements
- Mordern and minimalistis design are prioritized
- avoid AI like designs (cliche)

### API & Data Handling
- Use Redis keys pattern: `USER_KEY` format
- Always validate data before making API calls
- Handle async operations with try-catch
- Use proper HTTP methods (POST for updates, GET for reads)
- Parse numbers explicitly with `Number()` when needed

### Error Handling
- Show user-friendly alerts for validation errors
- Log errors to console for debugging
- Provide fallback values (e.g., `?? 0` for optional values)
- Gracefully handle missing data

### Comments & Documentation
- Use Spanish comments for TODOs and inline explanations
- Keep English for code and variable names
- Document complex logic with brief comments
- Use TODO comments for future improvements

## Component Structure Template

```tsx
"use client";

import { useState } from "react";
import { TypeName } from "@/types";
import OtherComponent from "@/components/...";

type ComponentNameProps = {
    propName: string;
    onAction: (param: type) => void;
}

export default function ComponentName({ propName, onAction }: ComponentNameProps) {
    const [state, setState] = useState<type>(initialValue);

    const handleAction = () => {
        // Logic here
    };

    return (
        <div className="tailwind classes">
            {/* JSX content */}
        </div>
    );
}
```

## Do's
- Always provide proper TypeScript types
- Use map() with proper keys for lists
- Implement proper z-index layering for modals/popups
- Close resources and cleanup in useEffect when needed
- Validate user input before processing
- Use semantic and accessible HTML

## Don'ts
- Don't use `any` type unless absolutely necessary
- Don't mutate state directly, always use setState
- Don't forget to add keys to mapped elements
- Don't hardcode values that should be configurable
- Don't skip error handling for async operations
- Don't create unnecessary re-renders

## Common Patterns in This Project

### User Management
```tsx
const users: { id: PersonKey; user: User }[] = [
    { id: 'keyName', user: userObject },
];
```

### API Calls
```tsx
const response = await fetch('/api/endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value })
});
```

### Popup/Modal Pattern
```tsx
const [isOpen, setIsOpen] = useState(false);
<Button onClick={() => setIsOpen(true)} />
<Popup isOpen={isOpen} onClose={() => setIsOpen(false)} />
```

## Additional Notes
- Focus on maintainability and readability
- Keep components small and focused
- Separate concerns (UI, logic, data fetching)
- Think about future scalability when making decisions
