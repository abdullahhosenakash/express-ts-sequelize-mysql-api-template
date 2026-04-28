import express from 'express';
import { upload } from '../config/multer';
import { convertToWebp } from '../utils/file';

const router = express.Router();

router.post(
  '/single',
  upload.single('file'),
  convertToWebp,
  (req: any, res) => {
    res.json({
      file: req.filelink
    });
  }
);

export default router;
