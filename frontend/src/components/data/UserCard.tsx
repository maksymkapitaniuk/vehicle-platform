import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import type { UserType } from '../../dto/User';

export interface UserCardProps {
  user: UserType;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card sx={{ minWidth: { xs: '200px', md: '300px' } }}>
      <CardContent sx={{ pt: 2, pb: 1 }}>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </CardContent>
      <CardActions
        sx={{
          px: 2,
          pt: 1,
          pb: 2,
        }}
      >
        <Button
          component={Link}
          to={`/users/${user.id}`}
          variant="contained"
          sx={{
            px: 1,
            py: 0,
            textTransform: 'none',
            fontSize: '16px',
          }}
        >
          More...
        </Button>
      </CardActions>
    </Card>
  );
}
