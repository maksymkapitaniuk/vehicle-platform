import Container from '@mui/material/Container';
import { VehicleForm } from '../components/forms/VehicleForm';

export interface VehicleFormPageProps {
  mode: 'create' | 'update';
}

export function VehicleFormPage({ mode }: VehicleFormPageProps) {
  return (
    <Container>
      <VehicleForm mode={mode} />
    </Container>
  );
}
