import express from 'express';
import { getUsers } from '../controllers/user.controller';
import verifyRole from '../middlewares/verifyRole';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/all', verifyToken, verifyRole, getUsers);

export default router;
