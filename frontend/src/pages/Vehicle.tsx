import { Link, useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteVehicle } from '../api/vehicles';
import { useVehicle } from '../hooks/useVehicle';

export function Vehicle() {
  const { id: vehicleId_optional } = useParams();
  const vehicleId = vehicleId_optional ?? '';
  const navigate = useNavigate();

  const { vehicle } = useVehicle(vehicleId);

  async function handleDeleteVehicle() {
    const res = await deleteVehicle(vehicleId);

    if (res) {
      navigate('/vehicles');
    }
  }

  if (!vehicle) {
    return <Typography>Loading vehicle info...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
      <Stack direction="row" spacing={1}>
        <Button
          component={Link}
          to={`/update-vehicle/${vehicleId}`}
          startIcon={<EditIcon />}
          variant="contained"
          color="info"
          sx={{
            textTransform: 'none',
            fontSize: '16px',
          }}
        >
          Edit Vehicle
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          color="error"
          sx={{
            textTransform: 'none',
            fontSize: '16px',
          }}
          onClick={handleDeleteVehicle}
        >
          Delete Vehicle
        </Button>
      </Stack>
    </Box>
  );
}
