import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDataStore } from '../store/useDataStore';
import { Vehicle } from '../components/data/Vehicle';
import { getVehicles } from '../api/vehicles';

export function Vehicles() {
  const vehicles = useDataStore((state) => state.vehicles);
  const setVehicles = useDataStore((state) => state.setVehicles);

  useEffect(() => {
    async function fetchVehicles() {
      const vehiclesData = await getVehicles();

      setVehicles(vehiclesData);
    }

    fetchVehicles();
  }, [setVehicles]);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <Typography variant="h5">Vehicles:</Typography>
        <Button
          component={Link}
          to="/create-vehicle"
          variant="contained"
          sx={{ textTransform: 'none', fontSize: '16px' }}
        >
          Create a Vehicle
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {vehicles.map((vehicle) => (
          <Vehicle key={vehicle._id} vehicle={vehicle} />
        ))}
      </Grid>
    </Container>
  );
}
