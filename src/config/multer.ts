import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getFilename } from '../utils/file';

function getUploadPath(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  const uploadPath = path.join(process.cwd(), 'uploads', year, month);

  fs.mkdirSync(uploadPath, { recursive: true });

  return uploadPath;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = getUploadPath();
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const name = getFilename(file);
    cb(null, name);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});
