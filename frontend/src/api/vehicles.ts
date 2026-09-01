import axios from 'axios';
import { Vehicle } from '../dto/Vehicle';
import type { VehicleDtoType, VehicleType } from '../dto/Vehicle';
import { processHttpError } from '../util/errors';

const VEHICLES_API_URL =
  import.meta.env.VITE_VEHICLES_API_URL ?? 'http://localhost:3001';

export async function getVehicles() {
  try {
    const vehiclesRes = await axios.get(`${VEHICLES_API_URL}/vehicles`);
    return vehiclesRes.data.map((vehicle: VehicleType) =>
      Vehicle.parse(vehicle),
    );
  } catch (err) {
    throw processHttpError(err, { requestTarget: 'vehicles' });
  }
}

export async function getVehicleById(id: string) {
  try {
    const vehicleRes = await axios.get(`${VEHICLES_API_URL}/vehicles/${id}`);
    return Vehicle.parse(vehicleRes.data);
  } catch (err) {
    throw processHttpError(err, { requestTarget: 'vehicle' });
  }
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
