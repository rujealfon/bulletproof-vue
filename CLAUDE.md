# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: This project uses Bun instead of npm/yarn
```bash
bun install           # Install dependencies
bun dev              # Start development server with hot reload (Vite)
bun run build        # Type-check and build for production
bun run preview      # Preview production build locally
```

**Testing**
```bash
bun test:unit        # Run unit tests with Vitest
bun test:e2e         # Run end-to-end tests with Playwright
bun test:e2e --project=chromium  # Run e2e tests on specific browser
bun test:e2e --debug  # Run e2e tests in debug mode
npx playwright install  # Install browsers for first e2e test run
```

**Code Quality**
```bash
bun lint             # Run all linters (oxlint + eslint)
bun run lint:oxlint  # Run oxlint for correctness checks
bun run lint:eslint  # Run eslint with auto-fix
bun run format       # Format code with Prettier
bun run type-check   # Type checking with vue-tsc
```

## Architecture Overview

**Tech Stack**: Vue 3 + TypeScript + Vite + Pinia

**Project Structure**:
- `src/main.ts` - App entry point, sets up Vue app with Pinia store and router
- `src/router/index.ts` - Vue Router configuration with lazy loading for About page
- `src/stores/` - Pinia stores (Composition API style, e.g., `counter.ts`)
- `src/views/` - Route-level components (HomeView, AboutView)
- `src/components/` - Reusable Vue components
- `src/assets/` - Static assets and global CSS
- `e2e/` - Playwright end-to-end tests
- `src/components/__tests__/` - Vitest unit tests

**Key Configurations**:
- Uses `@` alias for `src/` directory (configured in vite.config.ts)
- Dual linting setup: oxlint for correctness + eslint for style/vue rules
- TypeScript with strict type checking via vue-tsc
- Vitest with jsdom environment for unit testing
- Playwright configured for Chromium, Firefox, and WebKit testing

**Development Practices**:
- Pinia stores use Composition API style with `defineStore` function syntax
- Vue Router uses lazy loading for non-critical routes
- Component tests located in `__tests__` folders alongside components
- Separate TypeScript configs for different contexts (app, node, vitest)