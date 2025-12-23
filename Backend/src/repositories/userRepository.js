import User from '../models/User.js';

export const userRepository = {
  async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() });
  },

  async findById(id) {
    return await User.findById(id).select('-passwordHash');
  },

  async findAll() {
    return await User.find().select('-passwordHash').sort({ name: 1 });
  },

  async create(userData) {
    const user = new User(userData);
    await user.save();
    return await User.findById(user._id).select('-passwordHash');
  },

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).select('-passwordHash');
  },
};

