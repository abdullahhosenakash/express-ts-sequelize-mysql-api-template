import multer from 'multer';
import path from 'path';
import fs from 'fs';

function getUploadPath(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  const uploadPath = path.join(process.cwd(), 'uploads', year, month);

  // folder না থাকলে create করবে
  fs.mkdirSync(uploadPath, { recursive: true });

  return uploadPath;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = getUploadPath();
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
