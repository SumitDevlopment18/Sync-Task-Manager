import api from '@/lib/api';
import { Worklog } from '@/types';

export const worklogService = {
  getAll: async (params?: { me?: boolean; ticketId?: string }) => {
    const response = await api.get<Worklog[]>('/worklogs', { params });
    return response.data;
  },

  create: async (data: {
    ticketId: string;
    date: string; // YYYY-MM-DD
    timeSpent: number; // in minutes
    description: string;
  }) => {
    const response = await api.post<Worklog>('/worklogs', data);
    return response.data;
  },

  update: async (id: string, data: Partial<{
    date: string;
    timeSpent: number;
    description: string;
  }>) => {
    const response = await api.patch<Worklog>(`/worklogs/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/worklogs/${id}`);
  },
};

