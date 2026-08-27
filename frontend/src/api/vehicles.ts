import { Vehicle } from '../dto/Vehicle';
import type { VehicleDtoType, VehicleType } from '../dto/Vehicle';

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

export async function createVehicle(dto: VehicleDtoType) {
  const createRes = await fetch(`${VEHICLES_API_URL}/vehicles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  return createRes.ok;
}

export async function updateVehicle(id: string, dto: Partial<VehicleDtoType>) {
  const updateRes = await fetch(`${VEHICLES_API_URL}/vehicles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  return updateRes.ok;
}

export async function deleteVehicle(id: string) {
  const deleteRes = await fetch(`${VEHICLES_API_URL}/vehicles/${id}`, {
    method: 'DELETE',
  });

  return deleteRes.ok;
}
