import * as z from 'zod';

export const CreateVehicleDto = z.strictObject({
  make: z
    .string('The make is of invalid type (has to be string).')
    .min(2, {
      error: 'The make is too short (has to be at least 2 characters long).',
    })
    .max(50, {
      error: 'The make is too long (has to be at most 50 characters long).',
    }),
  model: z
    .string('The model is of invalid type (has to be string).')
    .min(2, {
      error: 'The model is too short (has to be at least 2 characters long).',
    })
    .max(100, {
      error: 'The model is too long (has to be at most 100 characters long).',
    }),
  year: z.nullable(
    z
      .number('The year is of invalid type (has to be number).')
      .min(1800, {
        error: 'The year of release has to be not earlier than 1800.',
      })
      .max(new Date().getFullYear(), {
        error: 'The year of release has to be not later than now.',
      }),
  ),
  user_id: z.number('The user id is of invalid type (has to be number).'),
});

export const UpdateVehicleDto = CreateVehicleDto.partial();
