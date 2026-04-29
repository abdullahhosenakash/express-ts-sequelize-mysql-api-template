import { z } from 'zod';

export const sendEmailSchema = z.object({
  body: z.object({
    email: z
      .string({ error: 'Email is required' })
      .email({ message: 'Invalid email' })
  })
});
