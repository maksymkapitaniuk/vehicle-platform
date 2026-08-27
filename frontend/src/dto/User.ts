import z from 'zod';
import type { FormMode } from '../components/forms/types/FormMode';
import { falsyStringToValue } from '../util/validation';

const falsyStringToUndefined = falsyStringToValue.bind(null, undefined);

const UserName = z
  .string()
  .min(2, {
    error: 'The name is too short (has to be at least 2 characters long).',
  })
  .max(50, {
    error: 'The name is too long (has to be at most 50 characters long).',
  });

const UserEmail = z.email('The provided email address is invalid.');

const UserBirthDate = z.coerce
  .date()
  .min(new Date('1900-01-01'), {
    error: 'The birth date has to be not earlier than 1900-01-01.',
  })
  .max(new Date(), {
    error: 'The birth date has to be not later than now.',
  });

const UserPassword = z
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
  .regex(/[0-9]/, 'The password has to contain at least 1 numeric digit (0-9)');

export const User = z.object({
  id: z.number(),
  name: UserName,
  email: UserEmail,
  birthDate: UserBirthDate,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserType = z.infer<typeof User>;

export const UserDto = User.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: UserPassword,
});

export type UserDtoType = z.infer<typeof UserDto>;

export const CreateUserFormSchema = UserDto.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  error: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type CreateUserFormSchemaInputType = z.input<
  typeof CreateUserFormSchema
>;
export type CreateUserFormSchemaOutputType = z.output<
  typeof CreateUserFormSchema
>;

export const UpdateUserFormSchema = z
  .object({
    name: z.preprocess(falsyStringToUndefined, z.optional(UserName)),
    email: z.preprocess(falsyStringToUndefined, z.optional(UserEmail)),
    birthDate: z.preprocess(falsyStringToUndefined, z.optional(UserBirthDate)),
    password: z.preprocess(falsyStringToUndefined, z.optional(UserPassword)),
    confirmPassword: z.preprocess(
      falsyStringToUndefined,
      z.optional(z.string()),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UpdateUserFormSchemaInputType = z.input<
  typeof UpdateUserFormSchema
>;
export type UpdateUserFormSchemaOutputType = z.output<
  typeof UpdateUserFormSchema
>;

export function getUserFormSchema(mode: FormMode) {
  return mode === 'create' ? CreateUserFormSchema : UpdateUserFormSchema;
}
