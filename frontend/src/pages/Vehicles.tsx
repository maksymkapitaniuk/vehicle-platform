import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { VehicleCard } from '../components/data/VehicleCard';
import { useVehicles } from '../hooks/useVehicles';

export function Vehicles() {
  const { vehicles } = useVehicles();

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
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </Grid>
    </Container>
  );
}
