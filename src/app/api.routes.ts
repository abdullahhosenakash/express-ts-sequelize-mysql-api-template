import express from 'express';
import authRoutes from '../routes/auth.route';
import userRoutes from '../routes/user.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
