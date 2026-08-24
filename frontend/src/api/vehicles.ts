const VEHICLES_API_URL =
  import.meta.env.VITE_VEHICLES_API_URL ?? 'http://localhost:3001';

export async function getVehicles() {
  const vehiclesRes = await fetch(`${VEHICLES_API_URL}/vehicles`);
  if (!vehiclesRes.ok) {
    return [];
  }

  return vehiclesRes.json();
}
