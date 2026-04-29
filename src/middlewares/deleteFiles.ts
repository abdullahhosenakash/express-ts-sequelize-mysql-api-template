import { deleteUploadedFiles } from '../utils/file';

export function deleteFiles(req: any, res: any, next: any) {
  try {
    deleteUploadedFiles(req);
  } catch (error) {
  } finally {
    next();
  }
}
