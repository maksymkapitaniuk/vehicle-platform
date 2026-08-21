export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number | null;
  user_id: number;
};

export type CreateVehicleDto = Omit<Vehicle, 'id'>;

export type UpdateVehicleDto = Partial<CreateVehicleDto>;
