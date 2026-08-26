import { Link, useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser } from '../api/users';
import { useUser } from '../hooks/useUser';

export function User() {
  const { id: userId_str } = useParams();
  const userId = Number(userId_str);
  const navigate = useNavigate();

  const { user } = useUser(userId);

  async function handleDeleteUser() {
    const res = await deleteUser(userId);

    if (res) {
      navigate('/users');
    }
  }

  if (!user) {
    return <Typography>Loading user info...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography>Name:</Typography>
        <Typography variant="h6">{user.name}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography>Email:</Typography>
        <Typography>{user.email}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography>Birth Date:</Typography>
        <Typography sx={{ fontStyle: 'italic' }}>
          {user.birthDate.toDateString()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button
          component={Link}
          to={`/update-user/${userId}`}
          startIcon={<EditIcon />}
          variant="contained"
          color="info"
          sx={{
            textTransform: 'none',
            fontSize: '16px',
          }}
        >
          Edit User
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          color="error"
          sx={{
            textTransform: 'none',
            fontSize: '16px',
          }}
          onClick={handleDeleteUser}
        >
          Delete User
        </Button>
      </Stack>
    </Box>
  );
}
