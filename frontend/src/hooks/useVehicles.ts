import { useState, useEffect } from 'react';
import { useDataStore } from '../store/useDataStore';
import { getVehicles } from '../api/vehicles';
import { processUnknownError } from '../util/errors';
import type { AppError } from '../util/errors';

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
        const vehiclesData = await getVehicles();
        setVehicles(vehiclesData);
      } catch (err) {
        setError(processUnknownError(err));
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, [setVehicles]);

  return { vehicles, loading, error };
}
