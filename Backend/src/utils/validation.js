import { body, validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array() 
    });
  };
};

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .custom((value) => {
      const domain = process.env.COMPANY_EMAIL_DOMAIN || 'company.com';
      if (!value.endsWith(`@${domain}`)) {
        throw new Error(`Email must be from @${domain} domain`);
      }
      return true;
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const ticketValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('type').isIn(['TASK', 'BUG']).withMessage('Type must be TASK or BUG'),
  body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),
  body('description').optional().trim(),
  body('assigneeId').optional().isMongoId().withMessage('Invalid assignee ID'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
];

export const worklogValidation = [
  body('ticketId').isMongoId().withMessage('Valid ticket ID is required'),
  body('date').isISO8601().withMessage('Valid date is required (YYYY-MM-DD)'),
  body('timeSpent')
    .isInt({ min: 1 })
    .withMessage('Time spent must be a positive number (in minutes)'),
  body('description').trim().notEmpty().withMessage('Description is required'),
];

