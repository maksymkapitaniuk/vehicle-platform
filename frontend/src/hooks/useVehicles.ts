import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDataStore } from '../store/useDataStore';
import { VEHICLES_API_URL } from '../util/api';
import { Vehicle, type VehicleType } from '../dto/Vehicle';
import { processHttpError, type AppError } from '../util/errors';

export function useVehicles() {
  const vehicles = useDataStore((state) => state.vehicles);
  const setVehicles = useDataStore((state) => state.setVehicles);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      setError(null);

      try {
        const vehiclesRes = await axios.get(`${VEHICLES_API_URL}/vehicles`);
        const vehiclesData = vehiclesRes.data.map((vehicle: VehicleType) =>
          Vehicle.parse(vehicle),
        );

        setVehicles(vehiclesData);
      } catch (err) {
        setError(processHttpError(err, { requestTarget: 'vehicles' }));
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, [setVehicles]);

  return { vehicles, loading, error };
}
