import { Card, CardContent, Typography } from '@mui/material';
import type { User as UserType } from '../types/User';

export interface UserProps {
  user: UserType;
}

export function User({ user }: UserProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{user.name}</Typography>
      </CardContent>
    </Card>
  );
}
