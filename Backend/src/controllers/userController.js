import { userRepository } from '../repositories/userRepository.js';

export const userController = {
  async getAll(req, res) {
    try {
      const users = await userRepository.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

