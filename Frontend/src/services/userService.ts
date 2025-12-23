import api from '@/lib/api';
import { User } from '@/types';

export const userService = {
  getAll: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },
};

