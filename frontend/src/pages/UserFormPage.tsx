import Container from '@mui/material/Container';
import { UserForm } from '../components/forms/UserForm';

export interface UserFormPageProps {
  mode: 'create' | 'update';
}

export function UserFormPage({ mode }: UserFormPageProps) {
  return (
    <Container>
      <UserForm mode={mode} />
    </Container>
  );
}
