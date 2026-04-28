import path from 'path';
import fs from 'fs';
import { env } from '../config/env';
import { Request } from 'express';
import sharp from 'sharp';

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
  if (!file) return '';

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

async function convertToWebp(req: any, _res: any, next: any) {
  try {
    if (!req.file) return next();

    const originalRelativePath = req.fileRelativePath;

    if (!req.file.mimetype.startsWith('image/')) {
      req.filelink = `/assets/${originalRelativePath}`;
      return next();
    }

    const filePath = path.join(process.cwd(), 'uploads', originalRelativePath);

    const ext = path.extname(filePath);
    const outputPath = filePath.replace(ext, '.webp');

    let quality = 80;
    let buffer: Buffer;

    const resizeOptions: sharp.ResizeOptions = {
      width: 1280,
      withoutEnlargement: true
    };

    do {
      buffer = await sharp(filePath)
        .resize(resizeOptions)
        .webp({ quality })
        .toBuffer();

      quality -= 10;
    } while (buffer.length > 200 * 1024 && quality > 20);

    await sharp(buffer).toFile(outputPath);
    console.log('convertToWebp', filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const filename = path.basename(outputPath);
    const [year, month] = originalRelativePath.split('/');

    req.filename = filename;
    req.fileRelativePath = `${year}/${month}/${filename}`;
    req.filelink = `/assets/${year}/${month}/${filename}`;

    next();
  } catch (error) {
    console.error('convertToWebp error:', error);
    try {
      if (req.fileRelativePath) {
        req.filelink = `/assets/${req.fileRelativePath}`;
      }
    } catch {}

    next();
  }
}

export { deleteUploadedFiles, getFilename, convertToWebp };
