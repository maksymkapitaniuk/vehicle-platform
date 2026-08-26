import { useState, useEffect } from 'react';
import { getVehicleById } from '../api/vehicles';
import type { VehicleType } from '../dto/Vehicle';

export function useVehicle(vehicleId: string) {
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchVehicle() {
      setLoading(true);
      setError(null);

      try {
        const vehicleData = await getVehicleById(vehicleId);
        setVehicle(vehicleData);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle();
  }, [vehicleId]);

  return { vehicle, loading, error };
}
