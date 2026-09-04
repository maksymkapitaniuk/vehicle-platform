import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../ui/Button';
import { ErrorBlock } from '../error/ErrorBlock/ErrorBlock';
import { useSendRequest } from '../../hooks/useSendRequest';
import type { VehicleType } from '../../dto/Vehicle';

export interface VehicleInfoProps {
  vehicle: VehicleType;
}

export function VehicleInfo({ vehicle }: VehicleInfoProps) {
  const navigate = useNavigate();

  const {
    sendRequest: deleteVehicle,
    response: deleteResponse,
    loading: deletingVehicle,
    error: errorDeletingVehicle,
  } = useSendRequest({ requestTarget: 'vehicle', method: 'DELETE' });

  useEffect(() => {
    if (deleteResponse) {
      navigate('/vehicles');
    }
  }, [deleteResponse, navigate]);

  async function handleDeleteVehicle() {
    await deleteVehicle({ entityId: vehicle._id });
  }

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography sx={{ color: 'text.secondary' }}>Make:</Typography>
        <Typography variant="h6">{vehicle.make}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography sx={{ color: 'text.secondary' }}>Model:</Typography>
        <Typography>{vehicle.model}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography sx={{ color: 'text.secondary' }}>
          Year of release:
        </Typography>
        <Typography sx={{ fontStyle: 'italic' }}>
          {vehicle.year ?? 'Unknown'}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography sx={{ color: 'text.secondary' }}>Owner's id:</Typography>
        <Typography>{vehicle.user_id}</Typography>
      </Stack>

      {errorDeletingVehicle && <ErrorBlock error={errorDeletingVehicle} />}

      <Stack direction="row" spacing={1}>
        <Button
          component={Link}
          to={`/update-vehicle/${vehicle._id}`}
          startIcon={<EditIcon />}
          color="info"
          disabled={deletingVehicle}
        >
          Edit Vehicle
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDeleteVehicle}
          disabled={deletingVehicle}
        >
          Delete Vehicle
        </Button>
      </Stack>
    </>
  );
}
