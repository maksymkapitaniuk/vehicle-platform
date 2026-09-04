import { useState, useEffect } from 'react';
import axios from 'axios';
import { VEHICLES_API_URL } from '../util/api';
import { Vehicle, type VehicleType } from '../dto/Vehicle';
import { processHttpError, type AppError } from '../util/errors';

export function useVehicle(vehicleId: string) {
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    async function fetchVehicle() {
      setLoading(true);
      setError(null);

      try {
        const vehicleRes = await axios.get(
          `${VEHICLES_API_URL}/vehicles/${vehicleId}`,
        );
        const vehicleData = Vehicle.parse(vehicleRes.data);

        setVehicle(vehicleData);
      } catch (err) {
        setError(processHttpError(err, { requestTarget: 'vehicle' }));
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
