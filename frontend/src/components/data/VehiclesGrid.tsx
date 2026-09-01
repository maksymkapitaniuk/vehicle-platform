import Grid from '@mui/material/Grid';
import { VehicleCard } from './VehicleCard';
import type { VehicleType } from '../../dto/Vehicle';

export interface VehiclesGridProps {
  vehicles: VehicleType[];
}

export function VehiclesGrid({ vehicles }: VehiclesGridProps) {
  return (
    <Grid container spacing={3}>
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle._id} vehicle={vehicle} />
      ))}
    </Grid>
  );
}
