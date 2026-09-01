import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UsersGrid } from '../components/data/UsersGrid';
import { Loader } from '../components/ui/Loader';
import { ErrorBlock } from '../components/error/ErrorBlock';
import { useUsers } from '../hooks/useUsers';

export function Users() {
  const { users, loading, error } = useUsers();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <Typography variant="h5">Users:</Typography>
        <Button
          component={Link}
          to="/create-user"
          variant="contained"
          sx={{ textTransform: 'none', fontSize: '16px' }}
        >
          Create a User
        </Button>
      </Box>
      {error && <ErrorBlock error={error} />}
      {loading && <Loader message="Loading users' data..." />}
      <UsersGrid users={users} />
    </Box>
  );
}
