import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { getUserFormSchema } from '../../dto/User';
import type { UserDtoType } from '../../dto/User';
import { createUser, updateUser } from '../../api/users';
import { useUser } from '../../hooks/useUser';
import { formatDateForInput } from '../../util/date';
import type { FormMode } from './types/FormMode';

export interface UserFormProps {
  mode: FormMode;
}

export function UserForm({ mode }: UserFormProps) {
  const { id: userId_str } = useParams();
  const userId = Number(userId_str);
  const navigate = useNavigate();

  const { user } = useUser(userId);

  const FormSchema = getUserFormSchema(mode);
  type FormSchemaInputType = z.input<typeof FormSchema>;
  type FormSchemaOutputType = z.output<typeof FormSchema>;

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

      const res = await createUser(dto);
      if (res) {
        navigate(`/users/${userId}`);
      }
    } else {
      if (!isDirty) {
        return navigate(`/users/${userId}`);
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

      if (
        !userId ||
        (!dto.name && !dto.email && !dto.birthDate && !dto.password)
      ) {
        return navigate(`/users/${userId}`);
      }

      const res = await updateUser(userId, dto);
      if (res) {
        return navigate(`/users/${userId}`);
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
        {mode === 'create' ? 'Create a User' : 'Edit User'}
      </Typography>

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

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Button onClick={() => navigate(-1)} variant="outlined" size="large">
          Back
        </Button>
        <Button type="submit" color="primary" size="large" sx={{ flexGrow: 1 }}>
          {mode === 'create' ? 'Create' : 'Edit'}
        </Button>
      </Box>
    </Box>
  );
}
