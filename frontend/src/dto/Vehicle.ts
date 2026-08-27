import z from 'zod';
import type { FormMode } from '../components/forms/types/FormMode';
import { falsyStringToValue } from '../util/validation';

const falsyStringToNull = falsyStringToValue.bind(null, null);
const falsyStringToUndefined = falsyStringToValue.bind(null, undefined);

const VehicleMake = z
  .string()
  .min(2, {
    error: 'The make is too short (has to be at least 2 characters long).',
  })
  .max(50, {
    error: 'The make is too long (has to be at most 50 characters long).',
  });

const VehicleModel = z
  .string()
  .min(2, {
    error: 'The model is too short (has to be at least 2 characters long).',
  })
  .max(100, {
    error: 'The model is too long (has to be at most 100 characters long).',
  });

const VehicleYear = z.nullable(
  z.coerce
    .number()
    .min(1800, {
      error: 'The year of release has to be not earlier than 1800.',
    })
    .max(new Date().getFullYear(), {
      error: 'The year of release has to be not later than now.',
    }),
);

const VehicleUserId = z.coerce
  .number("Enter any positive number as vehicle's owner id")
  .positive("Enter any positive number as vehicle's owner id");

export const Vehicle = z.object({
  _id: z.string(),
  make: VehicleMake,
  model: VehicleModel,
  year: VehicleYear,
  user_id: VehicleUserId,
});

export type VehicleType = z.infer<typeof Vehicle>;

export const VehicleDto = Vehicle.omit({ _id: true });

export type VehicleDtoType = z.infer<typeof VehicleDto>;

export const CreateVehicleFormSchema = z.object({
  make: VehicleMake,
  model: VehicleModel,
  year: z.preprocess(falsyStringToNull, VehicleYear),
  user_id: z.preprocess(falsyStringToUndefined, VehicleUserId),
});

export type CreateVehicleFormSchemaInputType = z.input<
  typeof CreateVehicleFormSchema
>;
export type CreateVehicleFormSchemaOutputType = z.output<
  typeof CreateVehicleFormSchema
>;

export const UpdateVehicleFormSchema = z.object({
  make: z.preprocess(falsyStringToUndefined, z.optional(VehicleMake)),
  model: z.preprocess(falsyStringToUndefined, z.optional(VehicleModel)),
  year: z.preprocess(falsyStringToNull, VehicleYear),
  user_id: z.preprocess(falsyStringToUndefined, z.optional(VehicleUserId)),
});

export type UpdateVehicleFormSchemaInputType = z.input<
  typeof UpdateVehicleFormSchema
>;
export type UpdateVehicleFormSchemaOutputType = z.output<
  typeof UpdateVehicleFormSchema
>;

export function getVehicleFormSchema(mode: FormMode) {
  return mode === 'create' ? CreateVehicleFormSchema : UpdateVehicleFormSchema;
}
