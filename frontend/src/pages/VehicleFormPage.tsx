import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ErrorBlock } from '../components/error/ErrorBlock/ErrorBlock';
import { VehicleForm } from '../components/forms/VehicleForm';
import type { FormMode } from '../components/forms/types/FormMode';
import { useVehicle } from '../hooks/useVehicle';

export interface VehicleFormPageProps {
  mode: FormMode;
}

export function VehicleFormPage({ mode }: VehicleFormPageProps) {
  const { id: vehicleId_optional } = useParams();
  const vehicleId = vehicleId_optional ?? '';

  const { vehicle, loading, error } = useVehicle(vehicleId);

  return (
    <Box>
      {error ? (
        <ErrorBlock error={error} />
      ) : (
        <VehicleForm mode={mode} vehicle={vehicle} loading={loading} />
      )}
    </Box>
  );
}
