import express from 'express';
import {
  changePassword,
  getLoginSessions,
  login,
  refresh,
  signup
} from '../controllers/auth.controller';
import validate from '../middlewares/validate';
import {
  signupSchema,
  loginSchema,
  changePasswordSchema
} from '../validations/auth.validation';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/signup', validate(signupSchema), signup);
router.post(
  '/change-password',
  verifyToken,
  validate(changePasswordSchema),
  changePassword
);
router.get('/refresh', verifyToken, refresh);
router.get('/login-sessions', verifyToken, getLoginSessions);

export default router;
