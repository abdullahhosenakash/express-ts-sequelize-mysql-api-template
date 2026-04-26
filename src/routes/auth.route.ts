import express from 'express';
import { login, signup } from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import { createUserSchema, loginSchema } from '../validations/user.validation';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/signup', validate(createUserSchema), signup);

export default router;
