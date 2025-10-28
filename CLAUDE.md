# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment Setup

### Prerequisites
Before running the project, you need to set up accounts and obtain API keys:

1. **Convex** (Backend Database)
   - Create account at https://dashboard.convex.dev
   - Create a new project
   - Copy your deployment URL and deployment name

2. **Clerk** (Authentication)
   - Create account at https://dashboard.clerk.com
   - Create a new application
   - Copy your Publishable Key and Secret Key

3. **Liveblocks** (Real-time Collaboration)
   - Create account at https://liveblocks.io
   - Create a new project
   - Copy your Secret Key

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then update `.env` with your actual credentials:

**Important**: Never commit `.env` to version control. The `.env.example` file shows the required variables without secrets.

## Project Overview

Docs Clone is a Google Docs-like collaborative document editor built with Next.js, featuring real-time co-editing, rich text formatting, and team collaboration. It uses Tiptap for the rich text editor, Liveblocks for real-time collaboration, Convex as the database backend, and Clerk for authentication.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:3008)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Auth & Database Stack

- **Authentication**: Clerk handles user authentication and team/organization management
- **Database**: Convex provides a real-time backend with TypeScript support
- **Real-time Collaboration**: Liveblocks handles concurrent editing and user presence
- **Middleware**: `src/middleware.ts` protects routes using Clerk middleware - only `/sign-in` and `/sign-up` are public

### Data Flow & Key Patterns

**Document Loading**:
- Server-side preloading in `src/app/documents/[documentId]/page.tsx` uses Convex `preloadQuery` with Clerk tokens
- Document data model in `convex/schema.ts`: stores title, owner, organization context, and Liveblocks room ID
- Authorization checks in `convex/documents.ts` ensure users can only access their own or organization documents

**Real-time Collaboration**:
- `src/app/documents/[documentId]/room.tsx` wraps document with Liveblocks `LiveblocksProvider` and `RoomProvider`
- Uses room ID matching the document ID for Liveblocks synchronization
- Storage state tracks document margins (`leftMargin`, `rightMargin`)
- User resolution and mention suggestions configured in room setup
- Auth endpoint at `/api/liveblocks-auth` handles Liveblocks token generation

**Editor Architecture**:
- `src/app/documents/[documentId]/_components/editor.tsx` configures Tiptap editor with extensive extensions
- Editor instance stored in global store (`src/store/use-editor-store.ts`) using Zustand for cross-component access
- Liveblocks extension (`useLiveblocksExtension`) provides conflict-free real-time sync
- Custom extensions for font size and line height in `src/extensions/`

### File Organization

- `src/app/` - Next.js app router pages and layouts
  - `(auth)/` - Sign-in/sign-up routes
  - `(home)/` - Document listing and dashboard
  - `documents/[documentId]/` - Editor page with real-time collaboration
  - `api/` - API routes (Liveblocks auth endpoint)
- `src/components/` - Reusable React components and UI primitives (Radix UI based)
- `src/extensions/` - Custom Tiptap editor extensions
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities and constants
- `src/store/` - Global state management (Zustand)
- `convex/` - Backend functions and schema

### Document Querying & Search

- `convex/documents.ts` provides queries with role-based filtering (owner vs. organization)
- Full-text search on document titles using Convex search index
- Pagination support built into queries
- Search filtering respects organization boundaries for team collaboration

### UI Components & Styling

- Radix UI for accessible component primitives
- Shadcn/ui patterns for higher-level components
- Tailwind CSS for styling with custom responsive utilities
- Editor toolbar in `src/app/documents/[documentId]/_components/toolbar/` has modular button components
- Grid/table view toggle for documents on home page

## Important Patterns

### Convex Mutations & Queries

- All server functions use `ctx.auth.getUserIdentity()` to get authenticated user
- Throw `ConvexError` for authorization failures
- Document ownership verified before mutations (only owner can delete/update)
- Organization context used to scope document access across teams

### Editor State Management

- Zustand store holds single editor instance reference
- Multiple hooks trigger store updates: onCreate, onUpdate, onSelection, onTransaction, onFocus, onBlur
- Toolbar buttons read editor state from store to show current formatting
- Custom extensions follow Tiptap patterns for commands and attributes

### Type Safety

- TypeScript strict mode enabled
- Path alias `@/*` maps to `src/*`
- Convex generates types in `convex/_generated/`
- React 19 with strict component typing

## Key Considerations

- Document rendering assumes 816px width (print-friendly 8.5" document width)
- Liveblocks room ID matches document ID for persistence
- Offline editing support enabled in Liveblocks extension
- Print styles configured to hide UI and normalize document layout
- Search is scoped to organization first, then personal documents

## Libraries & Dependencies

### Core Framework
- `Next.js` (^15.2.0) - React framework for production with App Router
- `React` (^19.0.0) - UI library with strict component typing
- `TypeScript` (^5) - Type-safe JavaScript development

### Editor & Text Processing
- `@tiptap/react` (^2.11.5) - Headless rich text editor framework built on ProseMirror
- `@tiptap/starter-kit` (^2.11.5) - Core Tiptap extensions bundle
- `@tiptap/pm` (^2.11.5) - ProseMirror core library
- `@tiptap/extension-color` (^2.11.5) - Text color support
- `@tiptap/extension-font-family` (^2.11.5) - Font family formatting
- `@tiptap/extension-highlight` (^2.11.5) - Text highlighting
- `@tiptap/extension-image` (^2.11.5) - Image insertion
- `@tiptap/extension-link` (^2.11.5) - Link support
- `@tiptap/extension-table` (^2.11.5) - Table formatting
- `@tiptap/extension-text-align` (^2.11.5) - Text alignment
- `@tiptap/extension-text-style` (^2.11.5) - Inline style support
- `@tiptap/extension-underline` (^2.11.5) - Underline formatting
- `tiptap-extension-resize-image` (^1.2.1) - Resizable images
- `lucide-react` (^0.477.0) - Icon library

### Real-time Collaboration
- `@liveblocks/react` (^2.21.0) - React hooks and context for Liveblocks
- `@liveblocks/react-tiptap` (^2.21.0) - Liveblocks integration with Tiptap
- `@liveblocks/react-ui` (^2.21.0) - Liveblocks UI components
- `@liveblocks/client` (^2.21.0) - Liveblocks client library
- `@liveblocks/node` (^2.21.0) - Liveblocks Node.js utilities

### Backend & Database
- `convex` (^1.21.0) - TypeScript-first serverless backend platform

### Authentication & Authorization
- `@clerk/nextjs` (^6.12.6) - Next.js integration for Clerk authentication

### UI Components & Styling
- `@radix-ui/react-dialog` (^1.1.6) - Modal dialog primitive
- `@radix-ui/react-dropdown-menu` (^2.1.6) - Dropdown menu primitive
- `@radix-ui/react-label` (^2.1.2) - Form label primitive
- `@radix-ui/react-menubar` (^1.1.6) - Menu bar primitive
- `@radix-ui/react-separator` (^1.1.2) - Separator primitive
- `@radix-ui/react-tooltip` (^1.1.8) - Tooltip primitive
- `class-variance-authority` (^0.7.1) - Type-safe CSS class composition
- `clsx` (^2.1.1) - Utility for constructing conditional className strings
- `tailwind-merge` (^3.0.2) - Merge Tailwind CSS classes intelligently
- `tailwindcss-animate` (^1.0.7) - Animation utilities for Tailwind CSS
- `Tailwind CSS` (^4) - Utility-first CSS framework

### State Management
- `zustand` (^5.0.3) - Lightweight state management library
- `nuqs` (^2.4.1) - URL search parameters state sync

### Forms & Validation
- `react-hook-form` (^7.54.2) - Performant form state management
- `@hookform/resolvers` (^4.1.2) - Form validation resolvers
- `zod` (^3.24.2) - TypeScript-first schema validation

### Additional Utilities
- `date-fns` (^4.1.0) - Modern date utility library
- `react-color` (^2.19.3) - Color picker component
- `react-icons` (^5.5.0) - Icon library with multiple icon sets
- `sonner` (^2.0.1) - Toast notification system
- `embla-carousel-react` (^8.5.2) - Carousel/slider component
- `next-themes` (^0.4.4) - Theme management for Next.js
- `usehooks-ts` (^3.1.1) - TypeScript React hooks utilities
