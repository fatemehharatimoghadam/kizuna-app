
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