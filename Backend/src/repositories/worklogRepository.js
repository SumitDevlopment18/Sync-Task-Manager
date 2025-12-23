import Worklog from '../models/Worklog.js';

export const worklogRepository = {
  async create(worklogData) {
    const worklog = new Worklog(worklogData);
    await worklog.save();
    return await this.findById(worklog._id);
  },

  async findById(id) {
    return await Worklog.findById(id)
      .populate('ticketId', 'title')
      .populate('userId', 'name email');
  },

  async findAll(filters = {}) {
    const query = {};

    if (filters.userId && filters.me) {
      query.userId = filters.userId;
    } else if (filters.userId) {
      query.userId = filters.userId;
    }

    if (filters.ticketId) {
      query.ticketId = filters.ticketId;
    }

    return await Worklog.find(query)
      .populate('ticketId', 'title')
      .populate('userId', 'name email')
      .sort({ date: -1, createdAt: -1 });
  },

  async update(id, updateData) {
    return await Worklog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('ticketId', 'title')
      .populate('userId', 'name email');
  },

  async delete(id) {
    return await Worklog.findByIdAndDelete(id);
  },

  async findByUserId(userId) {
    return await Worklog.find({ userId })
      .populate('ticketId', 'title')
      .sort({ date: -1 });
  },
};

