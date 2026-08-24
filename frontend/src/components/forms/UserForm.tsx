import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserDto, type UserDtoType } from '../../dto/User';
import { createUser, updateUser } from '../../api/users';

export interface UserFormProps {
  mode: 'create' | 'update';
}

export function UserForm({ mode }: UserFormProps) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const requiredFormSchema = UserDto.extend({
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  const formSchema =
    mode === 'create' ? requiredFormSchema : requiredFormSchema.partial();

  type FormSchemaInputType = z.input<typeof formSchema>;

  type FormSchemaOutputType = z.output<typeof formSchema>;

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaInputType, unknown, FormSchemaOutputType>({
    resolver: zodResolver(formSchema),
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
        navigate('/users');
      }
    } else {
      const dto: Partial<UserDtoType> = { ...data };
      const id_num = Number(userId);

      if (!id_num) {
        return;
      }

      const res = await updateUser(id_num, dto);
      if (res) {
        navigate('/users');
      }
    }
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mt: 5,
      }}
    >
      <Typography variant="h5">Create a User</Typography>

      <TextField
        label="Name"
        variant="outlined"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="username"
      />

      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="new-password"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        autoComplete="new-password"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Birth Date"
        type="date"
        variant="outlined"
        {...register('birthDate')}
        error={!!errors.birthDate}
        helperText={errors.birthDate?.message}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      <Button type="submit" variant="contained" color="primary" size="large">
        Create
      </Button>
    </Container>
  );
}
