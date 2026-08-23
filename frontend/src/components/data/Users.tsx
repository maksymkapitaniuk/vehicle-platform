import { useEffect } from 'react';
import { useDataStore } from '../../store/useDataStore';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { User } from './User';
import { USERS_API_URL } from '../../lib/constants';

export function Users() {
  const users = useDataStore((state) => state.users);
  const setUsers = useDataStore((state) => state.setUsers);

  useEffect(() => {
    async function fetchUsers() {
      const usersRes = await fetch(`${USERS_API_URL}/users`);
      const usersData = await usersRes.json();

      if (usersRes.ok) {
        setUsers(usersData);
      }
    }

    fetchUsers();
  }, [setUsers]);

  return (
    <Container>
      <Grid container spacing={3}>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </Grid>
    </Container>
  );
}
