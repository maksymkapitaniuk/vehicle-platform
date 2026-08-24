import z from 'zod';

export const User = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      error: 'The name is too short (has to be at least 2 characters long).',
    })
    .max(50, {
      error: 'The name is too long (has to be at most 50 characters long).',
    }),
  email: z.email('The provided email address is invalid.'),
  birthDate: z.coerce
    .date()
    .min(new Date('1900-01-01'), {
      error: 'The birth date has to be not earlier than 1900-01-01.',
    })
    .max(new Date(), {
      error: 'The birth date has to be not later than now.',
    }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserType = z.infer<typeof User>;

export const UserDto = User.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z
    .string()
    .min(8, 'The password is too short (has to be at least 8 characters long).')
    .max(64, 'The password is too long (has to be at most 64 characters long).')
    .regex(
      /[a-z]/,
      'The password has to contain at least 1 lowercase latin letter (a-z).',
    )
    .regex(
      /[A-Z]/,
      'The password has to contain at least 1 uppercase latin letter (A-Z).',
    )
    .regex(
      /[0-9]/,
      'The password has to contain at least 1 numeric digit (0-9)',
    ),
});

export type UserDtoType = z.infer<typeof UserDto>;
