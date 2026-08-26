import Container from '@mui/material/Container';
import { VehicleForm } from '../components/forms/VehicleForm';
import type { FormMode } from '../components/forms/types/FormMode';

export interface VehicleFormPageProps {
  mode: FormMode;
}

export function VehicleFormPage({ mode }: VehicleFormPageProps) {
  return (
    <Container>
      <VehicleForm mode={mode} />
    </Container>
  );
}
