import { ticketService } from '../services/ticketService.js';

export const ticketController = {
  async create(req, res) {
    try {
      const ticket = await ticketService.create(req.body, req.user._id.toString());
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const filters = {};
      if (req.query.assignedTo) {
        filters.assignedTo = req.query.assignedTo;
      }
      const tickets = await ticketService.getAll(req.user._id.toString(), filters);
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const ticket = await ticketService.getById(req.params.id);
      res.json(ticket);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const ticket = await ticketService.update(
        req.params.id,
        req.body,
        req.user._id.toString(),
        req.user.role
      );
      res.json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await ticketService.delete(req.params.id, req.user.role);
      res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  },
};

