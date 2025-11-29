# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 voting application called "Golden Gragas Awards" (Premiação Gragão de Ouro 2025). It's a full-stack web application that allows users to vote in multiple award categories and view results in real-time.

**Tech Stack:**
- Next.js 15.5.4 with App Router and Turbopack
- React 19.1.0 with TypeScript
- Prisma ORM with PostgreSQL database
- Tailwind CSS 4.0
- react-hook-form for form management
- lucide-react for icons

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server with Turbopack (http://localhost:3000)
npm run build        # Build for production with Turbopack
npm start            # Start production server
```

### Database Commands
```bash
npm run db:seed      # Populate database with initial categories and nominees
npm run db:reset     # Reset database (warning: deletes all data)
npm run db:studio    # Open Prisma Studio to view/edit database

# Manual Prisma commands (not in package.json)
npx prisma generate           # Generate Prisma Client after schema changes
npx prisma migrate dev        # Create and apply migrations in development
npx prisma migrate deploy     # Apply migrations in production
```

### Linting
```bash
npm run lint         # Run ESLint
```

## Architecture

### Database Architecture (Prisma)

The application uses a PostgreSQL database with three main models:

1. **Vote** - Stores individual user votes
   - Contains a JSON field storing all category votes
   - Tracks IP address to prevent duplicate votes (24-hour cooldown)
   - Located at: `prisma/schema.prisma:10-19`

2. **Category** - Award categories
   - Contains name, slug, description, and display order
   - Has one-to-many relationship with nominees
   - Located at: `prisma/schema.prisma:21-32`

3. **Nominee** - Candidates in each category
   - Stores nominee details (name, description, imageUrl)
   - Maintains a `voteCount` field that's incremented on each vote
   - Belongs to a category (cascading delete)
   - Located at: `prisma/schema.prisma:34-46`

**Important:** The Prisma client is initialized as a singleton in `lib/prisma.ts` to prevent connection exhaustion in development. Always import from this file: `import { prisma } from '@/lib/prisma'`

### API Routes

**POST /api/votes** (`src/app/api/votes/route.ts`)
- Accepts vote submissions for all categories
- Validates that all 10 categories are voted on
- Implements IP-based duplicate vote prevention (24-hour window)
- Updates nominee vote counts atomically
- Returns success/error status

**GET /api/votes/results** (`src/app/api/votes/results/route.ts`)
- Returns aggregated voting results grouped by category
- Calculates vote percentages for each nominee
- Includes total vote count

### Frontend Architecture

**Client Components:**
- `src/components/voting.tsx` - Main voting interface (client component)
  - Uses react-hook-form with Controller for form state
  - Hardcoded category data (note: this differs from seeded database data)
  - Sticky header with vote progress tracker
  - Category navigation sidebar
  - Real-time validation and visual feedback

**Pages:**
- `src/app/page.tsx` - Home page (renders VotingSystem component)
- `src/app/results/page.tsx` - Results display page
- `src/app/layout.tsx` - Root layout with Geist fonts

### Type Definitions

Located in `src/types/voting.ts`:
- `VoteData` - Shape of vote payload (category slug → nominee ID mapping)
- `VoteResponse` - API response structure

## Important Notes

### Current Data Discrepancy
The voting UI (`src/components/voting.tsx:6-83`) contains hardcoded categories and nominees that differ from the database seed data (`prisma/seed.ts`). The UI has custom categories like "Mamãe do Ano", "Alcoólatra do Ano", etc., while the seed data has standard award categories like "Melhor Filme", "Melhor Ator", etc.

**When modifying:** Ensure consistency between the hardcoded frontend data and database schema/seed if needed, or migrate the hardcoded data to be dynamically loaded from the database.

### Environment Variables
Required in `.env` file:
```
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### Build Configuration
- ESLint is disabled during builds (`next.config.ts:6`)
- Turbopack is enabled for both dev and build commands

### Vote Submission Flow
1. User selects nominees in all categories (client-side validation)
2. POST request to `/api/votes` with vote data
3. Server validates all 10 categories are voted
4. Server checks for duplicate votes via IP address (24h window)
5. Vote record created in database
6. Nominee vote counts updated atomically
7. Success/error response returned to client

### Styling
- Uses Tailwind CSS 4.0 with gradient backgrounds
- Design features glass-morphism effects (backdrop-blur)
- Color scheme: Purple/indigo/blue gradients with white overlays
- Responsive grid layout (mobile-first, lg:grid-cols-4)
