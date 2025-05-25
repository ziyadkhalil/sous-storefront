## Table of Contents

- [Getting Started](#getting-started)
- [Building for Production](#building-for-production)
- [Technical Architecture](#technical-architecture)
  - [Frontend Framework](#frontend-framework)
  - [Routing & Data Flow](#routing-data-flow)
  - [File Structure & Organization](#file-structure-organization)
  - [UI Components](#ui-components)
  - [Performance Optimizations](#performance-optimizations)
  - [Testing](#testing)

## Getting Started

### Installation

Install the dependencies:

```bash
yarn
```

### Development

Start the development server with HMR:

```bash
yarn dev
```

Your application will be available at `http://localhost:5173`.

### E2E Testing

Install Playwright:

```bash
npx playwright install
```

Run the tests:

```bash
yarn test:e2e
```

Or using the UI:

```bash
yarn test:e2e --ui
```

## Building for Production

Create a production build:

```bash
yarn build
```

## Technical Architecture

### Frontend Framework

- Built with React 19 using the latest features and improvements
- Utilizes React Router 7 for client-side routing and server-side rendering
- Uses TanStack Query for data fetching and caching
- Uses Zustand for client-side state management
- Uses Tailwind CSS for styling
- Uses Radix UI for accessible components
- Implements TypeScript for enhanced type safety and developer experience

### Routing & Data Flow

- File-based routing system with dynamic route segments
- Static rendering (SSG) and server-side rendering (SSR) support through React Router
- Route configurations defined in `app/routes.ts`
- Client-side state management using Zustand
- Data fetching with TanStack Query (React Query)

### File Structure & Organization

- The application follows a clear and organized file structure:

```
├── app/
│ ├── root.tsx
│ ├── routes/
│ ├── components/
│ ├── hooks/
│ ├── types.ts
│ ├── api.ts
│ └── utils.ts
```

#### Key Directories and Files

- **`app/components/`**: Contains all reusable components

  - Each component has its own directory with component file, styles, and tests

- **`app/routes/`**: Route-specific components and logic

  - Each route is isolated in its own directory
  - Contains route-specific components, hooks, data loading, and mutations
    - Route-specific components go in `app/routes/[route]/components`
    - Route-specific hooks go in `app/routes/[route]/hooks`

- **`app/root.tsx`**: Root component

  - App entry point
  - Contains the main layout and navigation
  - Defines Providers

- **`app/hooks/`**: Custom React hooks

  - Shared business logic and state management
  - API integration hooks

- **`app/types.ts`**: Shared types

- **`app/utils.ts`**: Utility functions

- **`app/api.ts`**: API client configuration

#### Development Guidelines

1. **Component Organization**

   - Place shared components in `app/components/`
   - Route-specific components go in their respective route directories
   - Each component should be self-contained with its styles and tests

2. **State Management**

   - Use React hooks for local state
   - Implement global state in `app/hooks/`
   - Follow the principle of lifting state up when needed

3. **Type Safety**

   - Define types in `app/types.ts`
   - Avoid using `any` type

4. **Testing**

   - Unit tests alongside components
   - E2E tests in the `e2e/` directory

5. **Asset Management**
   - Static assets in `public/`

This structure promotes:

- Clear separation of concerns
- Easy navigation and maintenance
- Scalable architecture
- Consistent development patterns
- Efficient code reuse

### UI Components

- Custom accessible UI components built with Radix UI primitives
- Tailwind CSS for styling with custom utility classes
- Mobile-first responsive design patterns throughout the application
- Component-driven development approach

### Performance Optimizations

- Code splitting and lazy loading
- Optimized asset loading
- Static rendering (SSG) and server-side rendering (SSR) with React Router for improved initial load times
- Client-side data revalidation using TanStack Query to keep content active and up-to-date
- Intersection Observer for efficient pagination and infinite scroll

### Testing

- End-to-end testing with Playwright
- Comprehensive test coverage for critical user flows
- Includes tests for checkout process and navigation
