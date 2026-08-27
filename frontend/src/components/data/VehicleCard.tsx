import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { VehicleType } from '../../dto/Vehicle';

export interface VehicleCardProps {
  vehicle: VehicleType;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card sx={{ minWidth: { xs: '200px', md: '300px' } }}>
      <CardContent sx={{ pt: 2, pb: 1 }}>
        <Typography variant="h6">{vehicle.model}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{vehicle.make}</Typography>
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
          to={`/vehicles/${vehicle._id}`}
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
