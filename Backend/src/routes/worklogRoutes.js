import express from 'express';
import { worklogController } from '../controllers/worklogController.js';
import { authenticate } from '../middleware/auth.js';
import { validate, worklogValidation } from '../utils/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', validate(worklogValidation), worklogController.create);
router.get('/', worklogController.getAll);
router.get('/:id', worklogController.getById);
router.patch('/:id', worklogController.update);
router.delete('/:id', worklogController.delete);

export default router;

