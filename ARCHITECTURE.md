# Bulletproof Vue Architecture

A production-ready Vue 3 application architecture inspired by bulletproof-react, focusing on scalability, maintainability, and developer experience.

## 🏗️ Architecture Overview

This project implements a feature-based architecture that promotes:
- **Scalability**: Easy to add new features and scale the team
- **Maintainability**: Clear separation of concerns and boundaries
- **Type Safety**: Full TypeScript support with strict validation
- **Testing**: Comprehensive testing setup with utilities
- **Security**: Built-in security measures and best practices
- **Performance**: Optimized bundling, lazy loading, and caching

## 📁 Project Structure

```
src/
├── app/                    # Application layer
│   ├── main.ts            # Application entry point
│   ├── app.vue            # Root component
│   ├── router.ts          # Vue Router configuration
│   └── provider.ts        # Global providers setup
├── components/            # Shared components
│   ├── ui/                # Base UI components
│   └── layout/            # Layout components
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   │   ├── api/           # Auth API requests
│   │   ├── components/    # Auth-specific components
│   │   ├── hooks/         # Auth query hooks
│   │   ├── stores/        # Auth state management
│   │   ├── types/         # Auth TypeScript types
│   │   └── index.ts       # Feature public API
│   └── dashboard/         # Dashboard feature
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── stores/
│       ├── types/
│       └── index.ts
├── lib/                   # Reusable libraries
│   ├── api-client.ts      # HTTP client setup
│   ├── query-client.ts    # TanStack Query setup
│   ├── error-handler.ts   # Error handling utilities
│   ├── notifications.ts   # Toast notification system
│   ├── security.ts        # Security utilities
│   └── performance.ts     # Performance utilities
├── stores/                # Global Pinia stores
├── types/                 # Shared TypeScript types
├── utils/                 # Shared utility functions
├── config/                # Configuration files
├── testing/               # Test utilities and setup
│   ├── test-utils.ts      # Testing helpers
│   ├── setup.ts           # Test environment setup
│   └── mocks/             # MSW mock handlers
└── views/                 # Route-level components
```

## 🔧 Key Technologies

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Pinia** for state management  
- **TanStack Vue Query** for server state
- **Vue Router** for routing
- **Vite** for fast development and builds
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **ESLint + Prettier** for code quality
- **MSW** for API mocking
- **Zod** for schema validation

## 🎯 Core Principles

### 1. Feature-Based Organization
Features are self-contained modules that include their own:
- API layer
- Components
- State management
- Types
- Tests

### 2. Module Boundaries
- Features cannot import from other features directly
- All external access goes through feature `index.ts` files
- Shared code lives in `lib/`, `components/`, or `utils/`

### 3. Unidirectional Data Flow
```
Shared Layer → Features → App Layer
```

### 4. Type Safety
- Strict TypeScript configuration
- Schema validation for environment variables
- API response validation
- Comprehensive type definitions

## 🚀 Getting Started

### Development Commands

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Run tests
bun test:unit
bun test:e2e

# Code quality
bun lint
bun run format
bun run type-check
```

### Adding a New Feature

1. Create feature directory structure:
```bash
mkdir -p src/features/my-feature/{api,components,hooks,stores,types}
```

2. Define types:
```typescript
// src/features/my-feature/types/index.ts
export interface MyEntity {
  id: string
  name: string
}
```

3. Create API layer:
```typescript
// src/features/my-feature/api/my-feature.ts
import { apiClient } from '@/lib'
import type { MyEntity } from '../types'

export const myFeatureApi = {
  getAll: () => apiClient.get<MyEntity[]>('/my-entities'),
  create: (data: Omit<MyEntity, 'id'>) => 
    apiClient.post<MyEntity>('/my-entities', data),
}
```

4. Create query hooks:
```typescript
// src/features/my-feature/hooks/useMyFeature.ts
import { useQuery, useMutation } from '@tanstack/vue-query'
import { myFeatureApi } from '../api'

export function useMyEntities() {
  return useQuery({
    queryKey: ['my-entities'],
    queryFn: myFeatureApi.getAll,
  })
}
```

5. Export public API:
```typescript
// src/features/my-feature/index.ts
export * from './api'
export * from './hooks'
export * from './types'
```

## 🧪 Testing Strategy

### Unit Tests
- Component testing with Vue Test Utils
- Mock external dependencies with MSW
- Use test utilities for consistent setup

### Integration Tests
- Feature-level testing
- API integration with mock server
- Store integration testing

### E2E Tests
- Critical user journeys
- Cross-browser testing with Playwright
- Real user interactions

## 🔒 Security Features

- **Environment validation** with Zod schemas
- **XSS protection** with input sanitization
- **CSRF protection** tokens
- **Secure headers** configuration
- **Authentication** state management
- **Route guards** for protected pages

## ⚡ Performance Optimizations

- **Code splitting** at route and feature level
- **Lazy loading** for non-critical routes
- **Bundle analysis** and optimization
- **Image optimization** utilities
- **Caching strategies** for API requests
- **Debouncing/throttling** utilities

## 📝 Code Quality

### ESLint Rules
- Module boundary enforcement
- Import restrictions between features
- Vue 3 best practices
- TypeScript strict rules

### File Organization
- Colocate related files
- Use index files for clean imports
- Consistent naming conventions
- Clear separation of concerns

## 🚢 Deployment

The application builds to static files that can be deployed to any CDN or static hosting service:

```bash
bun run build
```

Output in `dist/` directory is ready for deployment.

## 🤝 Contributing

1. Follow the established folder structure
2. Write tests for new features
3. Ensure type safety
4. Follow module boundary rules
5. Update documentation as needed

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [TanStack Query](https://tanstack.com/query)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react) (inspiration)

This architecture provides a solid foundation for building scalable Vue 3 applications while maintaining developer productivity and code quality.