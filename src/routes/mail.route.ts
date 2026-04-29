import express from 'express';
import sendEmail from '../email/sendMail';
import validate from '../middlewares/validate';
import { sendEmailSchema } from '../validations/mail.validation';

const router = express.Router();

router.post(
  '/testing',
  validate(sendEmailSchema),
  async (req: any, res: any, next: any) => {
    try {
      await sendEmail(
        req?.body?.email,
        'Testing Mail...',
        `<h1 style='color:green; padding:10px;'>Connection is ok!</h1>`
      );

      res.status(200).json({
        message: 'Successfully sent!'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
