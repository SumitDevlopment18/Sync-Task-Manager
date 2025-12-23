import api from '@/lib/api';
import { Ticket } from '@/types';

export const ticketService = {
  getAll: async (assignedTo?: string) => {
    const params = assignedTo ? { assignedTo } : {};
    const response = await api.get<Ticket[]>('/tickets', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Ticket>(`/tickets/${id}`);
    return response.data;
  },

  create: async (data: {
    title: string;
    description?: string;
    type: 'TASK' | 'BUG';
    priority: 'Low' | 'Medium' | 'High';
    assigneeId?: string;
    dueDate?: string;
  }) => {
    const response = await api.post<Ticket>('/tickets', data);
    return response.data;
  },

  update: async (id: string, data: Partial<{
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Blocked' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    assigneeId: string;
    dueDate: string;
  }>) => {
    const response = await api.patch<Ticket>(`/tickets/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/tickets/${id}`);
  },
};

