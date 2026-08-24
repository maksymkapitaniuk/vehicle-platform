import * as z from 'zod';

export const CreateVehicleDto = z
  .object({
    make: z.string().min(2).max(50),
    model: z.string().min(2).max(100),
    year: z.optional(z.number().min(1800).max(new Date().getFullYear())),
    user_id: z.number(),
  })
  .strict();

export const UpdateVehicleDto = CreateVehicleDto.partial();
