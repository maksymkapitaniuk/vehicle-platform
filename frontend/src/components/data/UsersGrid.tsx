import Grid from '@mui/material/Grid';
import { UserCard } from './UserCard';
import type { UserType } from '../../dto/User';

export interface UsersGridProps {
  users: UserType[];
}

export function UsersGrid({ users }: UsersGridProps) {
  return (
    <Grid container spacing={3}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Grid>
  );
}
