import { Card, CardContent, Typography } from '@mui/material';
import type { Vehicle as VehicleType } from '../types/Vehicle';

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
