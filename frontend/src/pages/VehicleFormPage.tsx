import Box from '@mui/material/Box';
import { VehicleForm } from '../components/forms/VehicleForm';
import type { FormMode } from '../components/forms/types/FormMode';

export interface VehicleFormPageProps {
  mode: FormMode;
}

export function VehicleFormPage({ mode }: VehicleFormPageProps) {
  return (
    <Box>
      <VehicleForm mode={mode} />
    </Box>
  );
}
