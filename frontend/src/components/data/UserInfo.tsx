import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ErrorBlock } from '../error/ErrorBlock/ErrorBlock';
import { useSendRequest } from '../../hooks/useSendRequest';
import { Button } from '../ui/Button';
import type { UserType } from '../../dto/User';

export interface UserInfoProps {
  user: UserType;
}

export function UserInfo({ user }: UserInfoProps) {
  const navigate = useNavigate();

  const {
    sendRequest: deleteUser,
    response: deleteResponse,
    loading: deletingUser,
    error: errorDeletingUser,
  } = useSendRequest({ requestTarget: 'user', method: 'DELETE' });

  useEffect(() => {
    if (deleteResponse) {
      navigate('/users');
    }
  }, [deleteResponse, navigate]);

  async function handleDeleteUser() {
    await deleteUser({ entityId: user.id });
  }

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography sx={{ color: 'text.secondary' }}>Name:</Typography>
        <Typography variant="h6">{user.name}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography sx={{ color: 'text.secondary' }}>Email:</Typography>
        <Typography>{user.email}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography sx={{ color: 'text.secondary' }}>Birth Date:</Typography>
        <Typography sx={{ fontStyle: 'italic' }}>
          {user.birthDate.toDateString()}
        </Typography>
      </Stack>

      {errorDeletingUser && <ErrorBlock error={errorDeletingUser} />}

      <Stack direction="row" spacing={1}>
        <Button
          component={Link}
          to={`/update-user/${user.id}`}
          startIcon={<EditIcon />}
          color="info"
          disabled={deletingUser}
        >
          Edit User
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteUser}
          disabled={deletingUser}
        >
          Delete User
        </Button>
      </Stack>
    </>
  );
}
