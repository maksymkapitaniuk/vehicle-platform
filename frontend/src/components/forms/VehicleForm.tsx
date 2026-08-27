import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Input } from '../ui/Input';
import { getVehicleFormSchema } from '../../dto/Vehicle';
import type { VehicleDtoType } from '../../dto/Vehicle';
import { createVehicle, updateVehicle } from '../../api/vehicles';
import { useVehicle } from '../../hooks/useVehicle';
import type { FormMode } from './types/FormMode';

export interface VehicleFormProps {
  mode: FormMode;
}

export function VehicleForm({ mode }: VehicleFormProps) {
  const { id: vehicleId_optional } = useParams();
  const vehicleId = vehicleId_optional ?? '';
  const navigate = useNavigate();

  const { vehicle } = useVehicle(vehicleId);

  const FormSchema = getVehicleFormSchema(mode);
  type FormSchemaInputType = z.input<typeof FormSchema>;
  type FormSchemaOutputType = z.output<typeof FormSchema>;

  const {
    control,
    handleSubmit,
    formState: { dirtyFields, errors, isDirty },
  } = useForm<FormSchemaInputType, unknown, FormSchemaOutputType>({
    resolver: zodResolver(FormSchema),
    values: vehicle
      ? { ...vehicle, year: vehicle.year === null ? '' : vehicle.year }
      : undefined,
    defaultValues: {
      make: 'Unknown',
      model: 'Unknown',
      year: '',
      user_id: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchemaOutputType> = async (data) => {
    if (mode === 'create') {
      const dto: VehicleDtoType = {
        make: data.make!,
        model: data.model!,
        year: data.year,
        user_id: data.user_id!,
      };

      const res = await createVehicle(dto);
      if (res) {
        navigate(`/vehicles/${vehicleId}`);
      }
    } else {
      if (!isDirty) {
        return navigate(`/vehicles/${vehicleId}`);
      }

      const dto: FormSchemaOutputType = {
        make: dirtyFields.make && data.make?.length ? data.make : undefined,
        model: dirtyFields.model && data.model?.length ? data.model : undefined,
        year: dirtyFields.year ? data.year : null,
        user_id: dirtyFields.user_id ? data.user_id : undefined,
      };

      if (
        !vehicleId ||
        (!dto.make && !dto.model && !dirtyFields.year && !dto.user_id)
      ) {
        return navigate(`/vehicles/${vehicleId}`);
      }

      const res = await updateVehicle(vehicleId, dto);
      if (res) {
        return navigate(`/vehicles/${vehicleId}`);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        width: '100%',
        mt: 5,
      }}
    >
      <Typography variant="h5">
        {mode === 'create' ? 'Create a Vehicle' : 'Edit Vehicle'}
      </Typography>

      <Input
        name="make"
        control={control}
        label="Make"
        type="text"
        error={errors.make}
      />

      <Input
        name="model"
        control={control}
        label="Model"
        type="text"
        error={errors.model}
      />

      <Input
        name="year"
        control={control}
        label="Year of Release"
        type="number"
        error={errors.year}
      />

      <Input
        name="user_id"
        control={control}
        label="Vehicle's owner id"
        type="number"
        error={errors.user_id}
      />

      {mode === 'update' && (
        <Typography
          variant="body2"
          sx={{ fontStyle: 'italic', color: 'text.secondary' }}
        >
          &#128712; Leave fields untouched or empty* if you do not want to edit
          them.
          <br />
          <br />
          <Typography component="span" sx={{ fontSize: '0.95em' }}>
            * Empty year means "Set year to null".
          </Typography>
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Button
          component={Link}
          to=".."
          variant="contained"
          color="secondary"
          size="large"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ flexGrow: 1 }}
        >
          {mode === 'create' ? 'Create' : 'Edit'}
        </Button>
      </Box>
    </Box>
  );
}
