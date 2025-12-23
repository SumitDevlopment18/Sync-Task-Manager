import { worklogRepository } from '../repositories/worklogRepository.js';
import { ticketRepository } from '../repositories/ticketRepository.js';

export const worklogService = {
  async create(worklogData, userId) {
    // Verify ticket exists
    const ticket = await ticketRepository.findById(worklogData.ticketId);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Create worklog
    const worklog = await worklogRepository.create({
      ...worklogData,
      userId, // Ensure user can only create their own worklogs
    });

    return worklog;
  },

  async getAll(userId, userRole, filters = {}) {
    // If not admin and not filtering by me, only show user's worklogs
    if (userRole !== 'ADMIN' && !filters.me) {
      filters.userId = userId;
    }

    if (filters.me) {
      filters.userId = userId;
      delete filters.me;
    }

    return await worklogRepository.findAll(filters);
  },

  async getById(id, userId, userRole) {
    const worklog = await worklogRepository.findById(id);
    if (!worklog) {
      throw new Error('Worklog not found');
    }

    // Users can only view their own worklogs unless admin
    if (userRole !== 'ADMIN' && worklog.userId.toString() !== userId) {
      throw new Error('Access denied');
    }

    return worklog;
  },

  async update(id, updateData, userId, userRole) {
    const worklog = await worklogRepository.findById(id);
    if (!worklog) {
      throw new Error('Worklog not found');
    }

    // Users can only update their own worklogs
    if (worklog.userId.toString() !== userId) {
      throw new Error('You can only update your own worklogs');
    }

    return await worklogRepository.update(id, updateData);
  },

  async delete(id, userId, userRole) {
    const worklog = await worklogRepository.findById(id);
    if (!worklog) {
      throw new Error('Worklog not found');
    }

    // Users can only delete their own worklogs
    if (worklog.userId.toString() !== userId) {
      throw new Error('You can only delete your own worklogs');
    }

    await worklogRepository.delete(id);
    return { message: 'Worklog deleted successfully' };
  },
};

