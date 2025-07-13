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

**Environment Setup**
```bash
cp .env.example .env  # Copy environment template
# Edit .env file to configure:
# - VITE_ENABLE_MOCKING=true/false (enables MSW for API mocking)
# - VITE_API_URL (API endpoint URL)
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

**Tech Stack**: Vue 3 + TypeScript + Vite + Pinia + Tailwind CSS + ofetch + Zod

**Bulletproof Architecture**: This project follows bulletproof-react patterns adapted for Vue:

**Project Structure**:
- `src/main.ts` - App entry point with MSW setup for development
- `src/app/` - App configuration (router, stores, providers)
- `src/lib/` - Shared libraries (API client with ofetch, utilities)
- `src/components/` - Shared components organized by type:
  - `ui/` - Base UI components (Button, Input, Label)
  - `layouts/` - Layout components (MainLayout)
  - `errors/` - Error boundary components
- `src/features/` - Feature-based modules (auth, users):
  - `api/` - Feature-specific API calls
  - `components/` - Feature-specific components
  - `stores/` - Feature-specific Pinia stores
  - `types/` - Feature-specific types
  - `utils/` - Feature-specific utilities
- `src/composables/` - Shared Vue composables (useAuth, useLocalStorage)
- `src/types/` - Shared TypeScript type definitions
- `src/schemas/` - Zod validation schemas
- `src/utils/` - Shared utility functions
- `src/config/` - Environment and app configuration
- `src/testing/` - Testing utilities and MSW setup
- `src/views/` - Route-level components
- `e2e/` - Playwright end-to-end tests

**Key Technologies**:
- **Vue 3** with Composition API and TypeScript
- **Pinia** for state management with feature-based stores
- **Vue Router** with lazy loading
- **Tailwind CSS** for styling with CSS variables
- **ofetch** for HTTP client (replaces axios)
- **Zod** for runtime validation and type inference
- **VeeValidate** for form handling and validation
- **MSW** for API mocking in development and testing
- **Vitest** + **Vue Testing Library** for unit testing
- **Playwright** for E2E testing

**Development Practices**:
- Feature-based architecture with isolated modules
- Shared components library with consistent design system
- Type-safe API client with error handling
- Form validation with Zod schemas
- MSW for consistent API mocking
- Comprehensive testing setup
- ESLint rules adapted for Vue architecture

**Key Features**:
- Authentication system with JWT tokens
- User management with CRUD operations
- Mock API with realistic data using Faker.js
- Responsive design with Tailwind CSS
- Type-safe forms with validation
- Error handling and loading states
- Comprehensive test coverage