import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { VehicleType } from '../../dto/Vehicle';

export interface VehicleCardProps {
  vehicle: VehicleType;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{vehicle.model}</Typography>
      </CardContent>
    </Card>
  );
}
