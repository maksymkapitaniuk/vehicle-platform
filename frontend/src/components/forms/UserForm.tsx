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
  getUserFormSchema,
  type UserType,
  type UserDtoType,
} from '../../dto/User';
import { useSendRequest } from '../../hooks/useSendRequest';
import { formatDateForInput } from '../../util/date';
import type { FormMode } from './types/FormMode';

export interface UserFormProps {
  mode: FormMode;
  user?: UserType | null | undefined;
  loading?: boolean | undefined;
}

export function UserForm({ mode, user, loading }: UserFormProps) {
  const navigate = useNavigate();

  const FormSchema = getUserFormSchema(mode);
  type FormSchemaInputType = z.input<typeof FormSchema>;
  type FormSchemaOutputType = z.output<typeof FormSchema>;

  const {
    sendRequest: createUser,
    response: createResponse,
    loading: creatingUser,
    error: errorCreatingUser,
  } = useSendRequest({
    requestTarget: 'user',
    method: 'POST',
  });

  const {
    sendRequest: updateUser,
    response: updateResponse,
    loading: updatingUser,
    error: errorUpdatingUser,
  } = useSendRequest({
    requestTarget: 'user',
    method: 'PUT',
  });

  useEffect(() => {
    if (createResponse) {
      navigate('/users');
    }
  }, [createResponse, navigate]);

  useEffect(() => {
    if (updateResponse) {
      if (user) {
        navigate(`/users/${user.id}`);
      } else {
        navigate('/users');
      }
    }
  }, [user, updateResponse, navigate]);

  const {
    control,
    handleSubmit,
    formState: { dirtyFields, errors, isDirty },
  } = useForm<FormSchemaInputType, unknown, FormSchemaOutputType>({
    resolver: zodResolver(FormSchema),
    values: user
      ? {
          ...user,
          birthDate: formatDateForInput(user.birthDate),
        }
      : undefined,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchemaOutputType> = async (data) => {
    if (mode === 'create') {
      const dto: UserDtoType = {
        name: data.name!,
        email: data.email!,
        password: data.password!,
        birthDate: data.birthDate!,
      };

      await createUser({ data: dto });
    } else {
      if (!user) {
        return;
      }

      if (!isDirty) {
        return navigate(`/users/${user.id}`);
      }

      const dto: Partial<UserDtoType> = {
        name: dirtyFields.name && data.name?.length ? data.name : undefined,
        email: dirtyFields.email && data.email?.length ? data.email : undefined,
        birthDate: dirtyFields.birthDate ? data.birthDate : undefined,
        password:
          dirtyFields.password && data.password?.length
            ? data.password
            : undefined,
      };

      if (!dto.name && !dto.email && !dto.birthDate && !dto.password) {
        return navigate(`/users/${user.id}`);
      }

      await updateUser({ data: dto, entityId: user.id });
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
        {mode === 'create' ? 'Create a User' : 'Edit User'}
      </Typography>

      {loading && <Loader message="Loading user's data..." />}

      <Input
        name="name"
        control={control}
        label="Name"
        type="text"
        error={errors.name}
      />

      <Input
        name="email"
        control={control}
        label="Email"
        type="email"
        error={errors.email}
        autoComplete="username"
      />

      <Input
        name="password"
        control={control}
        label={mode === 'create' ? 'Password' : 'New Password'}
        type="password"
        error={errors.password}
        autoComplete="new-password"
      />

      <Input
        name="confirmPassword"
        control={control}
        label={mode === 'create' ? 'Confirm Password' : 'Confirm new Password'}
        type="password"
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      <Input
        name="birthDate"
        control={control}
        label="Birth Date"
        type="date"
        error={errors.birthDate}
      />

      {mode === 'update' && (
        <Typography
          variant="body2"
          sx={{ fontStyle: 'italic', color: 'text.secondary' }}
        >
          &#128712; Leave fields untouched or empty if you do not want to edit
          them.
        </Typography>
      )}

      {errorCreatingUser && <ErrorBlock error={errorCreatingUser} />}
      {errorUpdatingUser && <ErrorBlock error={errorUpdatingUser} />}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          size="large"
          disabled={creatingUser || updatingUser}
        >
          Back
        </Button>
        <Button
          type="submit"
          color="primary"
          size="large"
          sx={{ flexGrow: 1 }}
          disabled={
            (mode === 'update' && !user) || creatingUser || updatingUser
          }
        >
          {mode === 'create' ? 'Create' : 'Edit'}
        </Button>
      </Box>
    </Box>
  );
}
