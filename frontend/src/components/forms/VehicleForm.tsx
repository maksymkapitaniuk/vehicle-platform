import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Loader } from '../ui/Loader';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ErrorBlock } from '../error/ErrorBlock/ErrorBlock';
import {
  getVehicleFormSchema,
  type VehicleType,
  type VehicleDtoType,
} from '../../dto/Vehicle';
import { useSendRequest } from '../../hooks/useSendRequest';
import type { FormMode } from './types/FormMode';

export interface VehicleFormProps {
  mode: FormMode;
  vehicle?: VehicleType | null | undefined;
  loading?: boolean | undefined;
}

export function VehicleForm({ mode, vehicle, loading }: VehicleFormProps) {
  const navigate = useNavigate();

  const FormSchema = getVehicleFormSchema(mode);
  type FormSchemaInputType = z.input<typeof FormSchema>;
  type FormSchemaOutputType = z.output<typeof FormSchema>;

  const {
    sendRequest: createVehicle,
    response: createResponse,
    loading: creatingVehicle,
    error: errorCreatingVehicle,
  } = useSendRequest({
    requestTarget: 'vehicle',
    method: 'POST',
  });

  const {
    sendRequest: updateVehicle,
    response: updateResponse,
    loading: updatingVehicle,
    error: errorUpdatingVehicle,
  } = useSendRequest({
    requestTarget: 'vehicle',
    method: 'PUT',
  });

  useEffect(() => {
    if (createResponse) {
      navigate('/vehicles');
    }
  }, [createResponse, navigate]);

  useEffect(() => {
    if (updateResponse) {
      if (vehicle) {
        navigate(`/vehicles/${vehicle._id}`);
      } else {
        navigate('/vehicles');
      }
    }
  }, [vehicle, updateResponse, navigate]);

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

      await createVehicle({ data: dto });
    } else {
      if (!vehicle) {
        return;
      }

      if (!isDirty) {
        return navigate(`/vehicles/${vehicle._id}`);
      }

      const dto: FormSchemaOutputType = {
        make: dirtyFields.make && data.make?.length ? data.make : undefined,
        model: dirtyFields.model && data.model?.length ? data.model : undefined,
        year: dirtyFields.year ? data.year : null,
        user_id: dirtyFields.user_id ? data.user_id : undefined,
      };

      if (!dto.make && !dto.model && !dirtyFields.year && !dto.user_id) {
        return navigate(`/vehicles/${vehicle._id}`);
      }

      await updateVehicle({ data: dto, entityId: vehicle._id });
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

      {loading && <Loader message="Loading vehicle's data..." />}

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

      {errorCreatingVehicle && <ErrorBlock error={errorCreatingVehicle} />}
      {errorUpdatingVehicle && <ErrorBlock error={errorUpdatingVehicle} />}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          size="large"
          disabled={creatingVehicle || updatingVehicle}
        >
          Back
        </Button>
        <Button
          type="submit"
          color="primary"
          size="large"
          sx={{ flexGrow: 1 }}
          disabled={
            (mode === 'update' && !vehicle) ||
            creatingVehicle ||
            updatingVehicle
          }
        >
          {mode === 'create' ? 'Create' : 'Edit'}
        </Button>
      </Box>
    </Box>
  );
}
