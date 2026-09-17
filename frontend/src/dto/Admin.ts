import z from 'zod';

export const AdminEmail = z.email('The provided email address is invalid.');
export const AdminPassword = z
  .string()
  .min(8, 'The password is too short (has to be at least 8 characters long).')
  .max(64, 'The password is too long (has to be at most 64 characters long).')
  .regex(/[a-z]/, 'The password must contain a lowercase letter.')
  .regex(/[A-Z]/, 'The password must contain an uppercase letter.')
  .regex(/[0-9]/, 'The password must contain a numeric digit.');

export const AdminLoginSchema = z.object({
  email: AdminEmail,
  password: z.string().min(1, 'The password is required.'),
});

export const AdminRegisterSchema = z
  .object({
    email: AdminEmail,
    password: AdminPassword,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type AdminLoginInput = z.input<typeof AdminLoginSchema>;
export type AdminLoginOutput = z.output<typeof AdminLoginSchema>;
export type AdminRegisterInput = z.input<typeof AdminRegisterSchema>;
export type AdminRegisterOutput = z.output<typeof AdminRegisterSchema>;
