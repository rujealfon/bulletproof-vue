# Features

This directory contains feature-based modules following the bulletproof architecture pattern.

## Structure

Each feature should follow this structure:

```
src/features/feature-name/
├── api/           # Feature-specific API requests
├── assets/        # Feature-specific assets (optional)
├── components/    # Feature-scoped components
├── stores/        # Feature state stores
├── types/         # Feature-specific types
├── utils/         # Feature-specific utilities (optional)
└── index.ts       # Public API of the feature
```

## Rules

1. **Independence**: Features should be independent and not import from other features directly
2. **Public API**: All external access to a feature should go through its `index.ts` file
3. **Unidirectional flow**: Features can import from shared layers (`components`, `lib`, `utils`, `types`) but not from the `app` layer
4. **Colocation**: Keep feature-specific code within the feature folder

## Example

```typescript
// ✅ Good - importing from shared layer
import { apiClient } from '@/lib'
import type { BaseEntity } from '@/types'

// ✅ Good - importing from the same feature
import { useAuthStore } from './stores'
import type { User } from './types'

// ❌ Bad - importing from another feature directly
import { usePostsStore } from '../posts/stores'

// ✅ Good - importing from another feature's public API
import { usePostsStore } from '@/features/posts'
```

## Benefits

- **Scalability**: Easy to add, remove, or modify features
- **Maintainability**: Clear boundaries and responsibilities
- **Team collaboration**: Multiple developers can work on different features
- **Code reuse**: Shared utilities and components are accessible
- **Testing**: Features can be tested in isolation