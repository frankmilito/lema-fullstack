# Implementation Notes

This document describes the implementation details, architecture decisions, and features added to the web developer assignment project.

## Architecture

### Frontend Structure

The frontend follows a **feature-based architecture** that promotes scalability, maintainability, and clear separation of concerns:

```
src/
├── app/                          # App-level configuration
│   ├── providers/                # Context providers (QueryClient, etc.)
│   └── router/                   # Route configuration
│
├── features/                     # Feature-based organization
│   ├── users/
│   │   ├── api/                  # API calls specific to users
│   │   │   ├── queries.ts        # React Query hooks
│   │   │   └── endpoints.ts      # API endpoint definitions
│   │   ├── components/           # Feature-specific components
│   │   ├── types/                # TypeScript types
│   │   └── pages/                # Pages for this feature
│   │
│   └── posts/
│       ├── api/
│       │   ├── queries.ts
│       │   ├── mutations.ts
│       │   └── endpoints.ts
│       ├── components/
│       ├── schemas/               # Validation schemas
│       ├── types/
│       └── pages/
│
├── shared/                       # Shared/common code
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Basic UI elements
│   │   ├── layout/               # Layout components
│   │   └── feedback/             # Error/Loading states
│   ├── utils/                    # Utility functions
│   └── constants/                # App constants
│
└── assets/                       # Static assets
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@app/*` → `src/app/*`
- `@features/*` → `src/features/*`
- `@shared/*` → `src/shared/*`
- `@assets/*` → `src/assets/*`

**Example:**
```typescript
// Instead of:
import { Button } from '../../../shared/components/ui';

// Use:
import { Button } from '@shared/components/ui';
```

## Components

### Typography Component

A reusable Typography component similar to Material UI's Typography, with the following variants:

- **h1** - Main page titles (`text-2xl sm:text-3xl`)
- **h2** - Section/modal titles (`text-xl sm:text-2xl`)
- **h3** - Card titles (`text-base sm:text-lg`)
- **body** - Regular paragraph text (`text-xs sm:text-sm`)
- **label** - Form labels (`text-sm sm:text-md`)
- **error** - Error messages (`text-xs sm:text-sm`, red color)

**Usage:**
```tsx
<Typography variant="h1">Page Title</Typography>
<Typography variant="body">Regular text</Typography>
<Typography variant="error">Error message</Typography>
```

### UI Components

All UI components are located in `shared/components/ui/`:

- **Button** - Multiple variants (primary, secondary, tertiary, ghost, outline) and sizes
- **Typography** - Consistent text styling across the app
- **Modal** - Accessible modal dialog with focus management
- **Spinner** - Loading indicator
- **EmptyMessage** - Empty and error state messages
- **Pagination** - Table pagination controls
- **Table** - Reusable data table component

## Storybook

Storybook has been integrated for component documentation and development. Stories are co-located with their components in the `shared/components/ui/` directory.

### Running Storybook

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`.

### Story Files

- `Button/Button.stories.tsx`
- `Typography/Typography.stories.tsx`
- `Modal/Modal.stories.tsx`
- `Spinner/Spinner.stories.tsx`
- `EmptyMessage/EmptyMessage.stories.tsx`

### Storybook Configuration

- **Path aliases** are configured in `.storybook/main.ts` using `viteFinal`
- **CSS** is imported in `.storybook/preview.ts` to ensure Tailwind styles are available
- Stories use the same path aliases as the main application

## Features Implemented

### Users Feature

- **UsersPage** - Displays paginated list of users
- **UserTable** - Reusable table component for user data
- **API Integration** - React Query hooks for fetching users and user count
- **Pagination** - 4 users per page with navigation controls

### Posts Feature

- **UserPostsPage** - Displays all posts for a selected user
- **PostCard** - Individual post display component
- **PostForm** - Form for creating new posts with validation
- **AddPostCard** - Card component for adding new posts
- **DeletePostButton** - Modal for post deletion confirmation
- **API Integration** - React Query hooks for fetching, creating, and deleting posts

## Technical Decisions

### State Management

- **React Query** for server state management
- Optimistic updates for post deletion
- Proper cache invalidation and refetching strategies

### Styling

- **Tailwind CSS** for utility-first styling
- Custom color tokens (`primary-100`, `primary-200`)
- Responsive design with mobile-first approach
- Consistent spacing and typography scale

### Code Organization

- **Feature-based structure** for better scalability
- **Shared components** for reusability
- **Path aliases** for cleaner imports
- **TypeScript** for type safety throughout

### Testing

- Jest and React Testing Library for unit tests
- Component tests for critical UI components
- Storybook for visual testing and documentation

## Development Workflow

1. **Feature Development**: Create features in `features/` directory
2. **Shared Components**: Add reusable components to `shared/components/ui/`
3. **Stories**: Create Storybook stories alongside components
4. **Types**: Define types in feature-specific `types/` directories
5. **API**: Organize API calls in feature `api/` directories

## Path Alias Configuration

Path aliases are configured in:
- `tsconfig.app.json` - TypeScript path resolution
- `vite.config.ts` - Vite build configuration
- `.storybook/main.ts` - Storybook configuration

This ensures consistent import paths across development, build, and Storybook environments.

