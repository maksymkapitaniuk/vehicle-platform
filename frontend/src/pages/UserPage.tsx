import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserInfo } from '../components/data/UserInfo';
import { Loader } from '../components/ui/Loader';
import { ErrorBlock } from '../components/error/ErrorBlock/ErrorBlock';
import { useUser } from '../hooks/useUser';

export function UserPage() {
  const { id: userId_str } = useParams();
  const userId = Number(userId_str);

  const { user, loading, error } = useUser(userId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">User Info:</Typography>
      {loading && <Loader message="Loading user's data..." />}
      {error && <ErrorBlock error={error} />}
      {user && <UserInfo user={user} />}
    </Box>
  );
}
