import express from 'express';

const router = express.Router();

const apiRoutes = {
  authentication: [
    {
      method: 'POST',
      path: '/api/auth/register',
      description: 'Register a new user (company email required)',
      auth: false,
    },
    {
      method: 'POST',
      path: '/api/auth/login',
      description: 'Login user and get access/refresh tokens',
      auth: false,
    },
    {
      method: 'POST',
      path: '/api/auth/refresh',
      description: 'Refresh access token using refresh token',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/auth/me',
      description: 'Get current authenticated user',
      auth: true,
    },
  ],
  tickets: [
    {
      method: 'POST',
      path: '/api/tickets',
      description: 'Create a new ticket (TASK or BUG)',
      auth: true,
    },
    {
      method: 'GET',
      path: '/api/tickets',
      description: 'Get all tickets (use ?assignedTo=me for my tickets)',
      auth: true,
    },
    {
      method: 'GET',
      path: '/api/tickets/:id',
      description: 'Get ticket by ID with worklogs summary',
      auth: true,
    },
    {
      method: 'PATCH',
      path: '/api/tickets/:id',
      description: 'Update ticket (assignee can update status, admin can update anything)',
      auth: true,
    },
    {
      method: 'DELETE',
      path: '/api/tickets/:id',
      description: 'Delete ticket (admin only)',
      auth: true,
      role: 'ADMIN',
    },
  ],
  worklogs: [
    {
      method: 'POST',
      path: '/api/worklogs',
      description: 'Create a worklog entry (own worklogs only)',
      auth: true,
    },
    {
      method: 'GET',
      path: '/api/worklogs',
      description: 'Get worklogs (use ?me=true for my worklogs, ?ticketId=xxx for ticket worklogs)',
      auth: true,
    },
    {
      method: 'GET',
      path: '/api/worklogs/:id',
      description: 'Get worklog by ID',
      auth: true,
    },
    {
      method: 'PATCH',
      path: '/api/worklogs/:id',
      description: 'Update worklog (own worklogs only)',
      auth: true,
    },
    {
      method: 'DELETE',
      path: '/api/worklogs/:id',
      description: 'Delete worklog (own worklogs only)',
      auth: true,
    },
  ],
  users: [
    {
      method: 'GET',
      path: '/api/users',
      description: 'Get all users (for ticket assignment)',
      auth: true,
    },
  ],
};

router.get('/', (req, res) => {
  res.json({
    message: 'Worklog & Ticket Management API',
    version: '1.0.0',
    baseUrl: `${req.protocol}://${req.get('host')}`,
    endpoints: apiRoutes,
    note: 'All protected routes require Bearer token in Authorization header',
  });
});

export default router;

