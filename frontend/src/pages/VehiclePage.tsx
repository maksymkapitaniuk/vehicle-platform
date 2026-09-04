import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { VehicleInfo } from '../components/data/VehicleInfo';
import { Loader } from '../components/ui/Loader';
import { ErrorBlock } from '../components/error/ErrorBlock/ErrorBlock';
import { useVehicle } from '../hooks/useVehicle';

export function VehiclePage() {
  const { id: vehicleId_optional } = useParams();
  const vehicleId = vehicleId_optional ?? '';

  const { vehicle, loading, error } = useVehicle(vehicleId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Vehicle Info:</Typography>
      {loading && <Loader message="Loading vehicle's data..." />}
      {error && <ErrorBlock error={error} />}
      {vehicle && <VehicleInfo vehicle={vehicle} />}
    </Box>
  );
}
