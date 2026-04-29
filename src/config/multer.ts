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
  destination: function (req: any, file, cb) {
    const uploadPath = getUploadPath();
    cb(null, uploadPath);
  },

  filename: function (req: any, file, cb) {
    const fileData = getFilename(file);
    if (fileData) {
      req.filepath = fileData.relativePath;
      req.year = fileData.year;
      req.month = fileData.month;
      cb(null, fileData.filename);
    } else {
      cb(null, '');
    }
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});
