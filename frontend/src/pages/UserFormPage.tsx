import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ErrorBlock } from '../components/error/ErrorBlock/ErrorBlock';
import { UserForm } from '../components/forms/UserForm';
import type { FormMode } from '../components/forms/types/FormMode';
import { useUser } from '../hooks/useUser';

export interface UserFormPageProps {
  mode: FormMode;
}

export function UserFormPage({ mode }: UserFormPageProps) {
  const { id: userId_str } = useParams();
  const userId = Number(userId_str);

  const navigate = useNavigate();
  const onAuthError = useCallback(() => {
    navigate('/admin/login');
  }, [navigate]);

  const { user, loading, error } = useUser(userId, onAuthError);

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
