# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Environment Variables Required

- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- Clerk secret key (server-side, in `.env.local`)

## Key Considerations

- Document rendering assumes 816px width (print-friendly 8.5" document width)
- Liveblocks room ID matches document ID for persistence
- Offline editing support enabled in Liveblocks extension
- Print styles configured to hide UI and normalize document layout
- Search is scoped to organization first, then personal documents
