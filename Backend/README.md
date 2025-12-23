# Worklog & Ticket Management Backend

A Node.js backend API for the Internal Worklog & Ticket Management Tool (Jira-Lite).

## Tech Stack

- **Node.js 22** with ES Modules
- **Express.js** for REST API
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-validator** for request validation

## Features

- 🔐 JWT-based authentication (Access + Refresh tokens)
- 📋 Ticket Management (CRUD operations)
- ⏱️ Worklog Tracking
- 👥 User Management
- 🔒 Role-based access control (Admin/Member)
- ✅ Request validation
- 🛡️ Security best practices

## Getting Started

### Prerequisites

- Node.js 22+ (using nvm: `nvm use 22`)
- MongoDB (local or remote)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/worklog-ticket-manager

JWT_ACCESS_SECRET=your-super-secret-access-token-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

COMPANY_EMAIL_DOMAIN=company.com
```

3. Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Project Structure

```
src/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/             # Request handlers
│   ├── authController.js
│   ├── ticketController.js
│   ├── worklogController.js
│   └── userController.js
├── middleware/
│   └── auth.js              # Authentication & authorization middleware
├── models/                  # Mongoose models
│   ├── User.js
│   ├── Ticket.js
│   └── Worklog.js
├── repositories/            # Data access layer
│   ├── userRepository.js
│   ├── ticketRepository.js
│   └── worklogRepository.js
├── routes/                  # API routes
│   ├── authRoutes.js
│   ├── ticketRoutes.js
│   ├── worklogRoutes.js
│   └── userRoutes.js
├── services/                # Business logic layer
│   ├── authService.js
│   ├── ticketService.js
│   └── worklogService.js
├── utils/                   # Utility functions
│   ├── jwt.js
│   └── validation.js
└── server.js                # Application entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user (company email required)
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)

### Tickets

- `POST /api/tickets` - Create ticket (protected)
- `GET /api/tickets` - Get all tickets (protected)
  - Query: `?assignedTo=me` - Get tickets assigned to current user
- `GET /api/tickets/:id` - Get ticket by ID (protected)
- `PATCH /api/tickets/:id` - Update ticket (protected)
- `DELETE /api/tickets/:id` - Delete ticket (admin only)

### Worklogs

- `POST /api/worklogs` - Create worklog (protected)
- `GET /api/worklogs` - Get worklogs (protected)
  - Query: `?me=true` - Get current user's worklogs
  - Query: `?ticketId=xxx` - Get worklogs for a ticket
- `GET /api/worklogs/:id` - Get worklog by ID (protected)
- `PATCH /api/worklogs/:id` - Update worklog (own worklogs only)
- `DELETE /api/worklogs/:id` - Delete worklog (own worklogs only)

### Users

- `GET /api/users` - Get all users (protected)

## Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## User Roles

- **ADMIN**: Can view all tickets/worklogs, assign tickets, delete tickets
- **MEMBER**: Can create tickets, log own work, view assigned tickets

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Company email domain validation for registration
- Role-based access control
- Request validation with express-validator
- Users can only modify their own worklogs
- Only assignees or admins can update ticket status

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_ACCESS_SECRET` - Secret for access tokens
- `JWT_REFRESH_SECRET` - Secret for refresh tokens
- `JWT_ACCESS_EXPIRES_IN` - Access token expiration (default: 15m)
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: 7d)
- `COMPANY_EMAIL_DOMAIN` - Required email domain for registration

## Development

The server uses Node.js watch mode for auto-reload during development:
```bash
npm run dev
```

## Production

For production, use:
```bash
npm start
```

Make sure to:
- Set `NODE_ENV=production`
- Use strong, unique secrets for JWT
- Use a secure MongoDB connection
- Enable proper CORS configuration
- Use environment variables for all sensitive data

