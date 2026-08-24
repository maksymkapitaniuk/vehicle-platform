import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { VehicleType } from '../../dto/Vehicle';

export interface VehicleProps {
  vehicle: VehicleType;
}

export function Vehicle({ vehicle }: VehicleProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{vehicle.model}</Typography>
      </CardContent>
    </Card>
  );
}
