import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../ui/Button';
import { deleteUser } from '../../api/users';
import type { UserType } from '../../dto/User';

export interface UserInfoProps {
  user: UserType;
}

export function UserInfo({ user }: UserInfoProps) {
  const navigate = useNavigate();

  async function handleDeleteUser() {
    const res = await deleteUser(user.id);

    if (res) {
      navigate('/users');
    }
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
      <Stack direction="row" spacing={1}>
        <Button
          component={Link}
          to={`/update-user/${user.id}`}
          startIcon={<EditIcon />}
          color="info"
        >
          Edit User
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteUser}
        >
          Delete User
        </Button>
      </Stack>
    </>
  );
}
