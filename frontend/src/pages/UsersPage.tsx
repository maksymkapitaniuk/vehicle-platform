import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../components/ui/Button';
import { UsersGrid } from '../components/data/UsersGrid';
import { Loader } from '../components/ui/Loader';
import { ErrorBlock } from '../components/error/ErrorBlock/ErrorBlock';
import { useUsers } from '../hooks/useUsers';

export function UsersPage() {
  const { users, loading, error } = useUsers();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <Typography variant="h5">Users:</Typography>
        <Button component={Link} to="/create-user">
          Create a User
        </Button>
      </Box>
      {error && <ErrorBlock error={error} />}
      {loading && <Loader message="Loading users' data..." />}
      <UsersGrid users={users} />
    </Box>
  );
}
