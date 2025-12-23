import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate, registerValidation, loginValidation } from '../utils/validation.js';

const router = express.Router();

router.post('/register', validate(registerValidation), authController.register);
router.post('/login', validate(loginValidation), authController.login);
router.post('/refresh', authController.refresh);
router.get('/me', authenticate, authController.getMe);

export default router;

