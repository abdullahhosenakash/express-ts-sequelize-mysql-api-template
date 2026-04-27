import { z } from 'zod';

export const signupSchema = z.object({
  body: z.object({
    name: z
      .string({ error: 'Name is required' })
      .min(3, { message: 'Name must be at least 3 characters' }),
    email: z
      .string({ error: 'Email is required' })
      .email({ message: 'Invalid email' }),
    phone: z
      .string({ error: 'Phone is required' })
      .min(10, { message: 'Phone must be at least 10 characters' }),
    password: z
      .string({ error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ error: 'Email is required' })
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),

    password: z
      .string({ error: 'Password is required' })
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    old_password: z
      .string({ error: 'Old password is required' })
      .min(1, { message: 'Old password is required' })
      .min(8, { message: 'Old password must be at least 8 characters' }),

    new_password: z
      .string({ error: 'New password is required' })
      .min(1, { message: 'New password is required' })
      .min(8, { message: 'New password must be at least 8 characters' })
  })
});
