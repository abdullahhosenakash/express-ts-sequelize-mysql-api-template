import express from 'express';
import { upload } from '../config/multer';
import { convertToWebp } from '../utils/file';
import { deleteFiles } from '../middlewares/deleteFiles';

const router = express.Router();

router.post(
  '/single',
  upload.single('file'),
  convertToWebp,
  (req: any, res: any) => {
    deleteFiles(req, res, () => {
      res.json({
        filelink: req.filelink
      });
    });
  }
);

export default router;
