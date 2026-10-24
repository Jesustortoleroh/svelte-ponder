# Svelte Editable Components

This project was built as part of a course assignment to practice creating reusable Svelte 5 components. 

## Features
- **Login Component:** A basic login form with email and password validation.
- **InlineField Component:** An accessible, click-to-edit field that saves on blur/Enter and cancels on Escape.
- **Form State Management:** A custom composable (`useInlineEdit.svelte.ts`) that manages draft state, tracks dirty changes, and handles saving/canceling multiple edits at once.
- **Styling:** A custom "Ivy League" university theme applied to the components (Crimson, clean typography, and sharp borders).

## AI Usage Attribution
*In accordance with the Yellow Level AI Usage policy for this assignment:*
I used AI tools (specifically Claude) to assist with understanding Svelte 5 reactivity concepts (like `$state`, `$derived`, and `$bindable`), to troubleshoot TypeScript errors, and to generate the custom CSS styling. The core logic, structure, and final implementation were written, tested, and understood by me.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
