import express from 'express';
import authRoutes from '../routes/auth.route';
import userRoutes from '../routes/user.route';
import uploadRoutes from '../routes/uploads.route';
import mailRoutes from '../routes/mail.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/upload', uploadRoutes);
router.use('/mail', mailRoutes);

export default router;
