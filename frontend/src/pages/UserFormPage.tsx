import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ErrorBlock } from '../components/error/ErrorBlock';
import { UserForm } from '../components/forms/UserForm';
import type { FormMode } from '../components/forms/types/FormMode';
import { useUser } from '../hooks/useUser';

export interface UserFormPageProps {
  mode: FormMode;
}

export function UserFormPage({ mode }: UserFormPageProps) {
  const { id: userId_str } = useParams();
  const userId = Number(userId_str);

  const { user, loading, error } = useUser(userId);

  return (
    <Box>
      {error ? (
        <ErrorBlock error={error} />
      ) : (
        <UserForm mode={mode} user={user} loading={loading} />
      )}
    </Box>
  );
}
