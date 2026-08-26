import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { UserCard } from '../components/data/UserCard';
import { useUsers } from '../hooks/useUsers';

export function Users() {
  const { users } = useUsers();

  return (
    <Container>
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
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
    </Container>
  );
}
