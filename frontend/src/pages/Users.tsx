import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDataStore } from '../store/useDataStore';
import { User } from '../components/data/User';
import { getUsers } from '../api/users';

export function Users() {
  const users = useDataStore((state) => state.users);
  const setUsers = useDataStore((state) => state.setUsers);

  useEffect(() => {
    async function fetchUsers() {
      const usersData = await getUsers();

      setUsers(usersData);
    }

    fetchUsers();
  }, [setUsers]);

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
          <User key={user.id} user={user} />
        ))}
      </Grid>
    </Container>
  );
}
