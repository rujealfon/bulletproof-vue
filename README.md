# Bulletproof Vue

A scalable, production-ready Vue 3 application built with modern tools and following bulletproof-react architecture patterns.

## 🚀 Features

- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** for robust type safety
- **TailwindCSS** for utility-first styling
- **shadcn-vue** for beautiful, accessible UI components
- **ofetch** for modern HTTP client with interceptors
- **Zod** for runtime type validation
- **VeeValidate** for form validation
- **Pinia** for state management
- **Vue Router** for routing
- **Feature-based architecture** inspired by bulletproof-react
- **ESLint + Prettier** for code quality
- **Vitest** for unit testing
- **Playwright** for e2e testing

## 📁 Project Structure

```
src/
├── app/                # Application setup and configuration
│   ├── main.ts        # App initialization
│   ├── App.vue        # Root component
│   └── router.ts      # Router configuration
├── assets/            # Static assets
├── components/        # Shared components
│   └── ui/           # shadcn-vue UI components
├── composables/       # Shared composables
├── features/          # Feature-based modules
│   ├── auth/         # Authentication feature
│   │   ├── api/      # Auth API calls
│   │   ├── components/ # Auth components
│   │   ├── composables/ # Auth composables
│   │   ├── schemas/  # Auth validation schemas
│   │   ├── stores/   # Auth state
│   │   └── types/    # Auth types
│   └── dashboard/    # Dashboard feature
├── lib/              # Shared utilities
│   ├── api.ts        # HTTP client setup
│   ├── form.ts       # Form utilities
│   └── utils.ts      # General utilities
├── schemas/          # Global validation schemas
├── stores/           # Global Pinia stores
├── types/            # Global TypeScript types
└── views/            # Page components
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- Bun (recommended) or npm/yarn

### Setup

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Code Quality

```bash
# Run linting
bun run lint

# Run type checking
bun run type-check

# Format code
bun run format
```

### Testing

```bash
# Run unit tests
bun test:unit

# Run e2e tests
bun test:e2e

# Run e2e tests in specific browser
bun test:e2e --project=chromium
```

## 🏗️ Architecture Principles

### Feature-Based Organization
- Each feature contains its own components, API calls, state, and types
- Features are self-contained and don't cross-import from other features
- Shared code lives in `src/lib/`, `src/components/`, etc.

### Type Safety
- Full TypeScript coverage with strict configuration
- Zod schemas for runtime validation
- Type-safe API client with ofetch

### Modern Development
- Composition API with `<script setup>`
- Auto-imports for composables
- Component-scoped styling with TailwindCSS
- ESLint configuration for architectural constraints

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### TailwindCSS

The project uses TailwindCSS v4 with:
- CSS variables for theming
- shadcn-vue design tokens
- Dark mode support
- Custom animations

### API Client

The API client is configured with:
- Automatic request/response interceptors
- Authentication token management
- Error handling with proper status codes
- Retry logic for failed requests

## 📱 Demo Features

### Authentication
- Login and registration forms with validation
- Protected routes
- Token-based authentication
- Form validation with Zod schemas

### Dashboard
- Protected dashboard area
- Modern UI with shadcn-vue components
- Responsive design

## 🤝 Contributing

1. Follow the existing code style and architecture patterns
2. Add tests for new features
3. Ensure all linting and type checks pass
4. Update documentation as needed

## 📄 License

MIT
