import { useState, useEffect } from 'react';
import { getVehicleById } from '../api/vehicles';
import type { VehicleType } from '../dto/Vehicle';
import { processUnknownError } from '../util/errors';
import type { AppError } from '../util/errors';

export function useVehicle(vehicleId: string) {
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    async function fetchVehicle() {
      setLoading(true);
      setError(null);

      try {
        const vehicleData = await getVehicleById(vehicleId);
        setVehicle(vehicleData);
      } catch (err) {
        setError(processUnknownError(err));
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    }

    if (vehicleId) {
      fetchVehicle();
    }
  }, [vehicleId]);

  return { vehicle, loading, error };
}
