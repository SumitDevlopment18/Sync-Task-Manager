import { ticketRepository } from '../repositories/ticketRepository.js';

export const ticketService = {
  async create(ticketData, reporterId) {
    const ticket = await ticketRepository.create({
      ...ticketData,
      reporterId,
    });

    // Calculate total time spent
    const totalTimeSpent = await ticketRepository.calculateTotalTimeSpent(ticket._id);
    return { ...ticket.toObject(), totalTimeSpent };
  },

  async getAll(userId, filters = {}) {
    const tickets = await ticketRepository.findAll({
      ...filters,
      userId,
    });

    // Add total time spent to each ticket
    const ticketsWithTime = await Promise.all(
      tickets.map(async (ticket) => {
        const totalTimeSpent = await ticketRepository.calculateTotalTimeSpent(ticket._id);
        return { ...ticket.toObject(), totalTimeSpent };
      })
    );

    return ticketsWithTime;
  },

  async getById(id) {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const totalTimeSpent = await ticketRepository.calculateTotalTimeSpent(id);
    return { ...ticket.toObject(), totalTimeSpent };
  },

  async update(id, updateData, userId, userRole) {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    // Check permissions
    const isAssignee = ticket.assigneeId?.toString() === userId;
    const isAdmin = userRole === 'ADMIN';

    // Only assignee can update status, admin can update anything
    if (updateData.status && !isAssignee && !isAdmin) {
      throw new Error('Only assignee or admin can update ticket status');
    }

    if (!isAdmin && updateData.assigneeId && ticket.assigneeId?.toString() !== userId) {
      throw new Error('Only admin can reassign tickets');
    }

    const updatedTicket = await ticketRepository.update(id, updateData);
    const totalTimeSpent = await ticketRepository.calculateTotalTimeSpent(id);
    return { ...updatedTicket.toObject(), totalTimeSpent };
  },

  async delete(id, userRole) {
    if (userRole !== 'ADMIN') {
      throw new Error('Only admin can delete tickets');
    }

    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    await ticketRepository.delete(id);
    return { message: 'Ticket deleted successfully' };
  },
};

