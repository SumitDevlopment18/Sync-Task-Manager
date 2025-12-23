import express from 'express';
import { ticketController } from '../controllers/ticketController.js';
import { authenticate } from '../middleware/auth.js';
import { validate, ticketValidation } from '../utils/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', validate(ticketValidation), ticketController.create);
router.get('/', ticketController.getAll);
router.get('/:id', ticketController.getById);
router.patch('/:id', ticketController.update);
router.delete('/:id', ticketController.delete);

export default router;

