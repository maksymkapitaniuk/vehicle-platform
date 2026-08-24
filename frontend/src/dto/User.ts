import z from 'zod';

export const User = z.object({
  id: z.number(),
  name: z.string().min(2).max(50),
  email: z.email(),
  birthDate: z.date().min(new Date('1900-01-01')).max(new Date()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserType = z.infer<typeof User>;

export const UserDto = User.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string(),
});

export type UserDtoType = z.infer<typeof UserDto>;
