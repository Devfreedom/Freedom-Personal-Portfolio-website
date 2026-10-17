<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Instructions

### 1. Understand Before Editing

- Inspect the existing code, directory structure, assets, package.json, and Git working tree before making changes.
- Read the relevant documentation under `node_modules/next/dist/docs/` before changing Next.js functionality. Follow the installed version's APIs and conventions.
- Understand existing component responsibilities and preserve working functionality.
- Make focused, intentional changes. Avoid unrelated refactors and unnecessary rewrites.
- If an instruction conflicts with the installed framework documentation, follow the documentation and explain the difference.

### 2. Project Stack and Architecture

- Use the existing Next.js App Router, TypeScript, React, and Tailwind CSS setup.
- Respect the installed versions of Next.js, React, Tailwind CSS, and all existing dependencies.
- Use the existing `src/app/`, `src/components/`, and `public/` structure where appropriate.
- Prefer TypeScript for new components and files containing application logic.
- Keep components small, readable, and easy to maintain.
- Use Server Components by default. Add `"use client"` only when client-side interactivity or browser APIs require it.
- Do not install new dependencies unless they provide a clear benefit that existing tools cannot reasonably provide.

### 3. Portfolio Design Direction

- Build a polished, modern, developer portfolio with a dark, premium visual identity and restrained blue accents.
- Use a consistent design system for colors, typography, spacing, borders, radii, buttons, and cards.
- Prioritize clear typography, strong visual hierarchy, useful project information, and professional presentation.
- Make real projects and technical skills the main focus rather than decorative graphics or generic service cards.
- Avoid excessive gradients, glowing effects, unnecessary animations, clutter, and generic AI-generated portfolio patterns.
- Make every section feel like part of the same cohesive design.
- Do not introduce fake testimonials, client logos, statistics, awards, experience, or project results.
- Do not redesign unrelated functionality just to achieve a visual change.

### 4. Content Accuracy

- Use the portfolio owner's real identity and existing, verified contact details and social links.
- Do not invent qualifications, employment history, years of experience, proficiency levels, achievements, or educational credentials.
- Only showcase projects that can be verified from their source code, README, deployment, or another reliable source.
- Describe project features and technologies accurately.
- Include live-demo and repository links only when their destinations have been verified.
- If project information is uncertain, inspect the available evidence before writing about it.
- Never present planned features as completed features.

### 5. Responsive Design

- Design mobile-first and verify the layout at mobile, tablet, laptop, and desktop widths.
- Prevent horizontal overflow, clipped content, overlapping sections, and awkward text wrapping.
- Make navigation, buttons, project links, and contact actions usable on touchscreens.
- Ensure portrait images and project media retain appropriate proportions and do not distort.
- Do not rely on fixed pixel offsets that break at narrower viewport widths.
- Test the actual rendered page rather than assuming that responsive classes work correctly.

### 6. Accessibility and Interaction

- Use semantic HTML and a logical heading hierarchy.
- Provide descriptive alternative text for meaningful images.
- Ensure interactive controls have accessible names and can be operated with a keyboard.
- Include visible keyboard-focus styles and sufficient text/background contrast.
- Respect `prefers-reduced-motion` when implementing animations.
- Use real links for navigation and buttons for actions.
- Ensure mobile navigation, animations, and interactive components work without blocking access to the content.
- Do not add decorative animations that interfere with readability or usability.

### 7. Next.js, Images, and Performance

- Use the correct App Router conventions and APIs for the installed Next.js version.
- Use `next/image` for local or remote content images where appropriate, following the installed documentation.
- Verify every referenced image and asset exists at the expected path.
- Avoid unnecessary client-side JavaScript, duplicated state, and expensive effects.
- Keep third-party scripts and dependencies to a minimum.
- Preserve or improve existing performance and production-build behavior.
- Set meaningful page metadata, including a descriptive title and description.
- Avoid exposing secrets, private environment variables, or sensitive information in client-side code.

### 8. Verification Before Completion

- Run `npm run lint` and `npm run build` after meaningful code changes.
- Fix errors introduced by the changes rather than hiding them with broad lint suppressions or unsafe TypeScript casts.
- Test the affected interactions and check for broken links, missing images, console errors, and responsive-layout problems.
- Review the final Git diff for accidental deletions, unrelated changes, generated files, and unfinished placeholders.
- Report what changed, which checks passed or failed, and any remaining limitations.
- Never claim a check passed unless it was actually run successfully.

### 9. Git and Change Safety

- Do not commit, push, amend commits, merge branches, or open pull requests unless explicitly instructed.
- Do not discard existing user changes or overwrite unrelated work.
- Do not remove original assets or backups without explicit approval.
- Keep changes focused on the requested task.