# Worklog & Ticket Management Frontend

A modern React frontend for the Internal Worklog & Ticket Management Tool (Jira-Lite).

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **Axios** for API calls

## Features

- 🔐 Authentication (Login/Register with company email)
- 📋 Ticket Management (Create, view, update tickets)
- ⏱️ Worklog Tracking (Log time spent on tickets)
- 👥 Team Overview (Admin dashboard)
- 🎨 Modern UI with shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui components
│   └── Layout.tsx   # Main layout with navigation
├── contexts/        # React contexts
│   └── AuthContext.tsx
├── lib/             # Utilities
│   ├── api.ts       # Axios instance with interceptors
│   └── utils.ts     # Helper functions
├── pages/           # Page components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── CreateTicket.tsx
│   ├── TicketDetail.tsx
│   ├── Worklogs.tsx
│   └── TeamOverview.tsx
├── services/        # API service functions
│   ├── ticketService.ts
│   ├── worklogService.ts
│   └── userService.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Pages

- **Login/Register** - Authentication page
- **Dashboard** - View tickets assigned to you
- **Create Ticket** - Create new task or bug tickets
- **Ticket Detail** - View and manage individual tickets
- **My Worklogs** - View and manage your worklogs
- **Team Overview** - Admin-only team statistics and overview

## API Integration

The frontend expects the backend API to be running at the URL specified in `VITE_API_BASE_URL`. The API should implement the following endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user
- `GET /tickets` - Get all tickets
- `GET /tickets/:id` - Get ticket by ID
- `POST /tickets` - Create ticket
- `PATCH /tickets/:id` - Update ticket
- `DELETE /tickets/:id` - Delete ticket
- `GET /worklogs` - Get worklogs
- `POST /worklogs` - Create worklog
- `PATCH /worklogs/:id` - Update worklog
- `DELETE /worklogs/:id` - Delete worklog
- `GET /users` - Get all users

## Authentication

The app uses JWT tokens stored in localStorage:
- `accessToken` - Short-lived access token
- `refreshToken` - Long-lived refresh token

The API client automatically:
- Adds the access token to all requests
- Refreshes the token when it expires (401 response)
- Redirects to login if refresh fails

## User Roles

- **ADMIN** - Can view all tickets, assign tickets, delete tickets, and access team overview
- **MEMBER** - Can create tickets, log their own work, and view assigned tickets

