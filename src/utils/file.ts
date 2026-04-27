import path from 'path';
import fs from 'fs';
import { env } from '../config/env';
import { Request } from 'express';

function getFilePathFromUrl(url: string): string | null {
  try {
    if (!url) return null;

    // external URL skip
    if (url.startsWith('http') && !url.startsWith(env.api)) {
      return null;
    }

    // example: /uploads/2026/04/file.jpg
    let relativePath = url;

    if (url.startsWith(env.api)) {
      relativePath = url.replace(env.api, '');
    }

    // remove leading slash
    relativePath = relativePath.replace(/^\/+/, '');

    return path.join(process.cwd(), relativePath);
  } catch {
    return null;
  }
}

function deleteUploadedFiles(req: Request) {
  try {
    const old_files = JSON.parse(req.body?.old_files || '[]');
    const uploaded_filename = req.file?.filename;

    if (!Array.isArray(old_files) || old_files.length === 0) return;

    for (const url of old_files) {
      const filePath = getFilePathFromUrl(url);

      if (!filePath) continue;

      try {
        const filename = path.basename(filePath);

        // নতুন upload করা file delete না করতে
        if (uploaded_filename && filename === uploaded_filename) continue;

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      } catch {
        // silently ignore
      }
    }
  } catch {
    // silently ignore
  }
}

function getFilename(file: Express.Multer.File) {
  if (!file) return null;

  const ext = path.extname(file.originalname);
  const nameWithoutExt = path.basename(file.originalname, ext);

  const now = new Date();
  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  const uploadDir = path.join(process.cwd(), 'uploads', year, month);

  // ensure folder exists
  fs.mkdirSync(uploadDir, { recursive: true });

  let baseName = nameWithoutExt;
  let filename = '';
  let count = 1;

  while (true) {
    const filePath = path.join(uploadDir, baseName + ext);

    if (fs.existsSync(filePath)) {
      baseName = `${nameWithoutExt}_copy${count}`;
      count++;
    } else {
      filename = baseName + ext;
      break;
    }
  }

  return filename;
}

export { deleteUploadedFiles, getFilename };
