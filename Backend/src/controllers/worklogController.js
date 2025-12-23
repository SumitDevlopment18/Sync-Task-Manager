import { worklogService } from '../services/worklogService.js';

export const worklogController = {
  async create(req, res) {
    try {
      const worklog = await worklogService.create(req.body, req.user._id.toString());
      res.status(201).json(worklog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const filters = {};
      if (req.query.me === 'true') {
        filters.me = true;
      }
      if (req.query.ticketId) {
        filters.ticketId = req.query.ticketId;
      }

      const worklogs = await worklogService.getAll(
        req.user._id.toString(),
        req.user.role,
        filters
      );
      res.json(worklogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const worklog = await worklogService.getById(
        req.params.id,
        req.user._id.toString(),
        req.user.role
      );
      res.json(worklog);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const worklog = await worklogService.update(
        req.params.id,
        req.body,
        req.user._id.toString(),
        req.user.role
      );
      res.json(worklog);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await worklogService.delete(req.params.id, req.user._id.toString(), req.user.role);
      res.json({ message: 'Worklog deleted successfully' });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },
};

