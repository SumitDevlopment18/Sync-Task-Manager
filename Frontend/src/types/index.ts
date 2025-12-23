export type UserRole = 'ADMIN' | 'MEMBER';

export type TicketType = 'TASK' | 'BUG';

export type TicketStatus = 'Open' | 'In Progress' | 'Blocked' | 'Done';

export type Priority = 'Low' | 'Medium' | 'High';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  type: TicketType;
  status: TicketStatus;
  priority: Priority;
  assigneeId?: string;
  assignee?: User;
  reporterId: string;
  reporter?: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  totalTimeSpent?: number; // in minutes
}

export interface Worklog {
  id: string;
  ticketId: string;
  ticket?: Ticket;
  userId: string;
  user?: User;
  date: string; // YYYY-MM-DD
  timeSpent: number; // in minutes
  description: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

