import { useEffect } from 'react';
import { useDataStore } from '../store/useDataStore';
import { Container, Grid } from '@mui/material';
import { Vehicle } from './Vehicle';
import { VEHICLES_API_URL } from '../lib/constants';

export function Vehicles() {
  const vehicles = useDataStore((state) => state.vehicles);
  const setVehicles = useDataStore((state) => state.setVehicles);

  useEffect(() => {
    async function fetchVehicles() {
      const vehiclesRes = await fetch(`${VEHICLES_API_URL}/vehicles`);
      const vehiclesData = await vehiclesRes.json();

      if (vehiclesRes.ok) {
        setVehicles(vehiclesData);
      }
    }

    fetchVehicles();
  }, [setVehicles]);

  return (
    <Container>
      <Grid container spacing={3}>
        {vehicles.map((vehicle) => (
          <Vehicle key={vehicle.id} vehicle={vehicle} />
        ))}
      </Grid>
    </Container>
  );
}
