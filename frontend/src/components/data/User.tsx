import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { UserType } from '../../dto/User';

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
