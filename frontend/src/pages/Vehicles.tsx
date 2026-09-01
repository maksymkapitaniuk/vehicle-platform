import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../components/ui/Button';
import { VehiclesGrid } from '../components/data/VehiclesGrid';
import { Loader } from '../components/ui/Loader';
import { ErrorBlock } from '../components/error/ErrorBlock';
import { useVehicles } from '../hooks/useVehicles';

export function Vehicles() {
  const { vehicles, loading, error } = useVehicles();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <Typography variant="h5">Vehicles:</Typography>
        <Button component={Link} to="/create-vehicle">
          Create a Vehicle
        </Button>
      </Box>
      {error && <ErrorBlock error={error} />}
      {loading && <Loader message="Loading vehicles' data..." />}
      <VehiclesGrid vehicles={vehicles} />
    </Box>
  );
}
