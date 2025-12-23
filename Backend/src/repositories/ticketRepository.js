import Ticket from '../models/Ticket.js';

export const ticketRepository = {
  async create(ticketData) {
    const ticket = new Ticket(ticketData);
    await ticket.save();
    return await this.findById(ticket._id);
  },

  async findById(id) {
    return await Ticket.findById(id)
      .populate('assigneeId', 'name email')
      .populate('reporterId', 'name email');
  },

  async findAll(filters = {}) {
    const query = {};
    
    if (filters.assignedTo === 'me') {
      query.assigneeId = filters.userId;
    } else if (filters.assignedTo) {
      query.assigneeId = filters.assignedTo;
    }

    return await Ticket.find(query)
      .populate('assigneeId', 'name email')
      .populate('reporterId', 'name email')
      .sort({ createdAt: -1 });
  },

  async update(id, updateData) {
    return await Ticket.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('assigneeId', 'name email')
      .populate('reporterId', 'name email');
  },

  async delete(id) {
    return await Ticket.findByIdAndDelete(id);
  },

  async calculateTotalTimeSpent(ticketId) {
    const Worklog = (await import('../models/Worklog.js')).default;
    const mongoose = (await import('mongoose')).default;
    const ticketObjectId = typeof ticketId === 'string' ? new mongoose.Types.ObjectId(ticketId) : ticketId;
    const result = await Worklog.aggregate([
      { $match: { ticketId: ticketObjectId } },
      { $group: { _id: null, total: { $sum: '$timeSpent' } } },
    ]);
    return result.length > 0 ? result[0].total : 0;
  },
};

