# Prompt for AI (Cursor)

## Project Title
Internal Worklog & Ticket Management Tool (Jira‑Lite)

---

## 1. Objective

Build a lightweight internal task, bug, and worklog tracking system for a single organization. The system should allow company users to log in using their company email, create and assign tickets, and log daily work against those tickets.

The focus is **simplicity, clarity, and speed**, not feature parity with Jira.

---

## 2. Core Requirements (Strict MVP Scope)

### Authentication
- Email + password login
- Only allow registration using company email domain (e.g. `@company.com`)
- JWT‑based authentication (Access + Refresh tokens)
- Password hashing using bcrypt

### User Roles
- **Admin**
  - View all tickets and worklogs
  - Assign tickets to any user
  - Delete tickets (optional)

- **Member**
  - Create tickets
  - Log their own work
  - View tickets assigned to them

---

## 3. Ticket Management

Tickets represent both tasks and bugs.

### Ticket Fields
- Title (string, required)
- Description (string, optional, markdown supported)
- Type: `TASK | BUG`
- Status:
  - Open
  - In Progress
  - Blocked
  - Done
- Priority: Low | Medium | High
- Assignee (User)
- Reporter (User)
- Due date (optional)
- CreatedAt / UpdatedAt

### Ticket Rules
- Any logged‑in user can create a ticket
- Tickets can be assigned to any teammate
- Assignee can update ticket status
- Admin can update or delete any ticket

---

## 4. Worklog Management (Critical Feature)

Worklogs track how much time a user spends on a ticket.

### Worklog Fields
- Ticket ID (required)
- User ID (required)
- Date (YYYY‑MM‑DD)
- Time spent (minutes or hours)
- Description (what work was done)
- CreatedAt

### Worklog Rules
- Users can **only create/edit their own worklogs**
- Worklogs must always be linked to a ticket
- Admin can view all worklogs
- Ticket should expose total time spent (calculated)

---

## 5. User Interface Expectations

### Pages
- Login / Register
- Dashboard (My Tickets)
- Create Ticket
- Ticket Detail (status, assignee, comments optional)
- My Worklogs
- Team Overview (Admin only)

### UX Principles
- Clean, minimal UI
- Fast navigation
- No complex configuration screens

---

## 6. API Design Expectations

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

### Tickets
- `POST /tickets`
- `GET /tickets?assignedTo=me`
- `GET /tickets/:id`
- `PATCH /tickets/:id`
- `DELETE /tickets/:id` (admin)

### Worklogs
- `POST /worklogs`
- `GET /worklogs?me=true`
- `GET /worklogs?ticketId=xxx`

All APIs must be protected via JWT middleware.

---

## 7. Database Schema (High‑Level)

### User
- id
- name
- email
- role (ADMIN | MEMBER)
- passwordHash
- createdAt

### Ticket
- id
- title
- description
- type
- status
- priority
- assigneeId
- reporterId
- dueDate
- createdAt
- updatedAt

### Worklog
- id
- ticketId
- userId
- date
- timeSpent
- description
- createdAt

---

## 8. Tech Stack Instructions

### Backend
- Node.js
- Express or Fastify
- MongoDB (preferred) or PostgreSQL
- JWT authentication
- Clean controller‑service‑repository structure

### Frontend
- React (Vite or Next.js)
- **Tailwind CSS** for styling
- **shadcn/ui** as the primary component library
- Radix UI (via shadcn) for accessibility
- Axios or fetch for API calls

UI must be built using shadcn/ui components (Button, Card, Table, Dialog, Input, Select, Badge, etc.) with Tailwind utility classes for layout and spacing.

---

## 9. Security & Best Practices

- Hash all passwords
- Validate request bodies
- Restrict access based on user role
- Ensure users cannot modify others’ worklogs
- Proper error handling with clear messages

---

## 10. Explicit Non‑Goals (Do NOT Build)

- Sprints
- Custom workflows
- Notifications
- Integrations
- Public signup
- Multi‑organization support

---

## 11. Output Expectations from Cursor

- Fully working backend APIs
- Functional frontend UI
- Clear project structure
- Environment variable support
- README with setup instructions

---

## Final Instruction to AI

Build this system **exactly as specified**, prioritizing correctness, security, and simplicity. Do not add extra features unless explicitly requested.

