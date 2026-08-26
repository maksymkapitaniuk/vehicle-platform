import { Vehicle } from '../dto/Vehicle';
import type { VehicleType } from '../dto/Vehicle';

const VEHICLES_API_URL =
  import.meta.env.VITE_VEHICLES_API_URL ?? 'http://localhost:3001';

export async function getVehicles() {
  const vehiclesRes = await fetch(`${VEHICLES_API_URL}/vehicles`);
  if (!vehiclesRes.ok) {
    return [];
  }

  const vehicles = await vehiclesRes.json();
  return vehicles.map((vehicle: VehicleType) => Vehicle.parse(vehicle));
}

export async function getVehicleById(id: string) {
  const vehicleRes = await fetch(`${VEHICLES_API_URL}/vehicles/${id}`);
  if (!vehicleRes.ok) {
    return null;
  }

  const vehicle = await vehicleRes.json();
  return Vehicle.parseAsync(vehicle);
}
