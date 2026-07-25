# Contributing to HealthConnect AI

Thank you for helping improve HealthConnect AI. This project is currently structured as a hackathon MVP, so contributions should stay focused, easy to review, and aligned with the existing architecture.

## Contribution Guidelines

- Preserve existing features and routes unless a task explicitly asks for changes.
- Keep frontend work in `frontend/` and backend work in `backend/`.
- Use mock data unless a task explicitly requires persistence or external APIs.
- Keep UI changes consistent with the current medical startup design system.
- Prefer reusable components and service functions over duplicate logic.
- Do not commit generated files such as caches, build outputs, or local environment files.

## Local Checks

Run these checks before handing off frontend changes:

```bash
cd frontend
npm run lint
npx tsc --noEmit
```

Do not run a production build unless the task explicitly requires it.

## Pull Request Checklist

- The change is scoped to the assigned task.
- Existing functionality is preserved.
- New code is typed and readable.
- Loading, error, and empty states are handled where relevant.
- Medical disclaimers remain visible for AI-assisted features.
- README or docs are updated when project usage changes.
