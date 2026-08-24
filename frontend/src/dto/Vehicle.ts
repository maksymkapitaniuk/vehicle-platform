import z from 'zod';

export const Vehicle = z.object({
  _id: z.string(),
  make: z.string().min(2).max(50),
  model: z.string().min(2).max(100),
  year: z.optional(z.number().min(1800).max(new Date().getFullYear())),
  user_id: z.number(),
});

export type VehicleType = z.infer<typeof Vehicle>;

export const VehicleDto = Vehicle.omit({ _id: true });

export type VehicleDtoType = z.infer<typeof VehicleDto>;
