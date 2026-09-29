
# KIZUNA 絆

KIZUNA is a modern manga discovery web application designed to help users explore manga through search, filters, curated discovery, and AI-assisted recommendations.

The project combines a responsive React frontend, a Jikan-compatible manga API, and a separate AI service for natural-language manga discovery and Persian synopsis translation.

---

## Features

### Manga Discovery
- Browse trending manga
- Horizontal trending carousel
- Discover manga by genre
- Random manga discovery
- Responsive manga cards
- Detailed manga pages
- Character and cast information

### Advanced Search
Users can search and refine manga using multiple filters, including:

- Title or keyword
- Genre
- Manga type
- Publication status
- Minimum score
- Sorting options
- Pagination

Search state is synchronized with URL query parameters, allowing filtered searches to be preserved and shared.

### Manga Details

Each manga has a dedicated detail page containing:

- Cover artwork
- Title and alternative title
- Score
- Status
- Chapters and volumes
- Genres
- Synopsis
- Author information
- Publication information
- Ranking and popularity
- Themes
- Demographics
- Characters and their roles

### AI Manga Finder

KIZUNA includes an AI-powered discovery experience.

Instead of manually selecting filters, users can describe what they want in natural language.

Example:

> I want a dark psychological manga with mystery and a high rating.

The AI service interprets the request and converts it into structured manga search preferences. Those preferences are then used with the manga API to retrieve relevant results.

This keeps AI interpretation separate from manga data retrieval.

### AI Persian Translation

Manga synopsis text can be translated into Persian directly from the manga detail page.

Translations are requested only when the user chooses to translate the synopsis and are cached in the component during the current page session to avoid unnecessary repeated AI requests.

### Theme Support

KIZUNA supports:

- Dark theme
- Light theme
- Persistent theme preference
- Theme-specific brand assets

### Responsive Design

The interface is designed for:

- Desktop
- Tablet
- Mobile

Layouts, navigation, cards, search controls, detail panels, AI forms, and carousels adapt to different screen sizes.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React

### Manga API

The project uses a local Jikan-compatible REST API for manga data.

The API provides endpoints for:

- Manga search
- Manga details
- Top manga
- Manga genres
- Random manga
- Manga characters

### AI Service

The AI functionality runs through a separate Express server.

The frontend never communicates with the AI provider directly.

Architecture:

React Frontend
      |
      | HTTP
      v
Express AI Server
      |
      | OpenAI-compatible API
      v
ArvanCloud AI Gateway
      |
      v
AI Model
This architecture keeps the AI API credentials outside the browser and separates AI responsibilities from the frontend.

---

## Application Architecture

The project separates API access, business logic, UI components, pages, and feature-specific logic.

src/
├── api/
│   ├── client.ts
│   ├── endpoints.ts
│   └── manga.api.ts
│
├── app/
│   └── router.tsx
│
├── assets/
│   └── brand/
│
├── components/
│   ├── ai/
│   ├── common/
│   ├── genre/
│   ├── home/
│   ├── layout/
│   ├── manga/
│   └── search/
│
├── config/
│   └── env.ts
│
├── features/
│   └── translation/
│
├── hooks/
│
├── pages/
│   ├── ai/
│   ├── home/
│   ├── manga/
│   ├── not-found/
│   └── search/
│
├── services/
│   ├── ai.service.ts
│   └── manga.service.ts
│
├── types/
│
├── utils/
│
├── index.css
└── main.tsx
The main data flow is:

Page / Component
       |
       v
Service Layer
       |
       v
API Layer
       |
       v
Backend API
This structure prevents UI components from being tightly coupled to API implementation details.

---

## Routes
| Route | Description |
|---|---|
| / | Home and discovery |
| /search | Manga search and filtering |
| /manga/:id | Manga details |
| /ai | AI-powered manga discovery |
| * | Custom 404 page |

---

## Environment Variables

Create a .env file in the project root:

VITE_API_URL=http://localhost:3000/v4
VITE_AI_API_URL=http://localhost:3001
An `.env.example file can be used as a reference.

Do not commit private API credentials to the repository.

The AI server should keep its provider credentials in its own environment file.

---

## Running the Project

KIZUNA uses three local services during development:

``text
Manga API       → http://localhost:3000
AI Server       → http://localhost:3001
Frontend        → http://localhost:5173

### 1. Start the Manga API

Open a terminal in the manga backend project.

Install dependencies:

bash
npm install

Create the backend environment configuration if required, then run:

bash
npm run start:dev

The manga API should now be available at:

text
http://localhost:3000

---

### 2. Start the AI Server

Open another terminal and navigate to:

bash
cd ai-server

Install its dependencies if necessary:

bash
npm install

Create:

text
ai-server/.env

and configure the required AI provider credentials.

Then start the AI server:

bash
npm run dev

It should run at:

text
http://localhost:3001

Never expose or commit the AI API key.

---

### 3. Start the Frontend

Open another terminal in the KIZUNA project root.

Install dependencies:

bash
npm install

Start Vite:

bash
npm run dev

Open:

text
http://localhost:5173

---

## Production Check

Before committing or deploying changes, run:

bash
npm run lint

and:

bash
npm run build

Both commands should complete successfully.

---

## UX Highlights

KIZUNA includes several UX improvements beyond basic manga browsing:

- Smooth route scroll behavior
- Hash-based section navigation
- Mobile navigation
- Swipeable trending carousel
- Previous/next carousel controls
- Loading skeletons
- Empty states
- Error states
- Responsive filter controls
- Persistent theme selection
- Custom 404 experience
- AI loading and error feedback
- Responsive Persian RTL translation display

---

## Security

AI credentials are not stored in frontend source code.

Sensitive environment files such as:

text
.env
ai-server/.env
`

should remain excluded from Git.

Only public configuration values required by the frontend use the `VITE_` prefix.

---

## Project Concept

The name KIZUNA (絆) represents connection or bonds.

The project applies that concept to manga discovery: instead of presenting users with only a static catalog, KIZUNA provides multiple paths for connecting readers with stories they may enjoy.

These include traditional search, genre exploration, trending discovery, random discovery, and natural-language AI-assisted discovery.

---

## Status

Current implementation includes:

- Manga browsing
- Search and filtering
- Manga detail pages
- Character display
- Trending carousel
- Genre discovery
- Random discovery
- AI manga finder
- AI Persian synopsis translation
- Dark and light themes
- Responsive layouts
- Custom 404 page
- Loading and error states

The project passes both linting and production build checks.