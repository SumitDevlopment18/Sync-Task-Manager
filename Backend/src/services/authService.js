import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/userRepository.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

export const authService = {
  async register(name, email, password) {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await userRepository.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
      user,
      accessToken,
      refreshToken,
    };
  },

  async login(email, password) {
    // Find user with password hash
    const User = (await import('../models/User.js')).default;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Return user without password
    const userWithoutPassword = await userRepository.findById(user._id);

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  },

  async refreshToken(refreshToken) {
    const { verifyRefreshToken } = await import('../utils/jwt.js');
    
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await userRepository.findById(decoded.userId);

      if (!user) {
        throw new Error('User not found');
      }

      const newAccessToken = generateAccessToken(user._id.toString());

      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  },
};

