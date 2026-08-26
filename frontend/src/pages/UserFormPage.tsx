import Container from '@mui/material/Container';
import { UserForm } from '../components/forms/UserForm';
import type { FormMode } from '../components/forms/types/FormMode';

export interface UserFormPageProps {
  mode: FormMode;
}

export function UserFormPage({ mode }: UserFormPageProps) {
  return (
    <Container>
      <UserForm mode={mode} />
    </Container>
  );
}
