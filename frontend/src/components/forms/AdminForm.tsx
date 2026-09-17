import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useForm,
  type Control,
  type FieldErrors,
  type SubmitHandler,
} from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ErrorBlock } from '../error/ErrorBlock/ErrorBlock';
import { useSendRequest } from '../../hooks/useSendRequest';
import {
  AdminLoginSchema,
  AdminRegisterSchema,
  type AdminRegisterInput,
} from '../../dto/Admin';
import { setAdminToken } from '../../util/auth';

export type AdminFormMode = 'login' | 'register';

export interface AdminFormProps {
  mode: AdminFormMode;
}

export function AdminForm({ mode }: AdminFormProps) {
  const navigate = useNavigate();
  const schema = mode === 'login' ? AdminLoginSchema : AdminRegisterSchema;
  type FormInput = z.input<typeof schema>;
  type FormOutput = z.output<typeof schema>;

  const { sendRequest, response, loading, error } = useSendRequest({
    requestTarget: 'admin',
    method: 'POST',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(mode === 'register' && { confirmPassword: '' }),
    },
  });

  useEffect(() => {
    if (!response) {
      return;
    }

    if (mode === 'login') {
      console.log(response);
      setAdminToken(response.data.token);
      navigate('/users', { replace: true });
    } else {
      navigate('/admin/login', { replace: true });
    }
  }, [mode, navigate, response]);

  const onSubmit: SubmitHandler<FormOutput> = async (data) => {
    const endpoint = mode === 'login' ? 'login' : 'register';
    const requestData = { email: data.email, password: data.password };
    await sendRequest({ data: requestData, entityId: endpoint });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5">
        {mode === 'login' ? 'Admin authorization' : 'Register admin'}
      </Typography>

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
        label="Password"
        type="password"
        error={errors.password}
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
      />

      {mode === 'register' && (
        <Input
          name="confirmPassword"
          control={control as unknown as Control<AdminRegisterInput>}
          label="Confirm password"
          type="password"
          error={(errors as FieldErrors<AdminRegisterInput>).confirmPassword}
          autoComplete="new-password"
        />
      )}

      {error && <ErrorBlock error={error} />}

      <Button type="submit" size="large" disabled={loading}>
        {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Register'}
      </Button>

      <Button
        component={Link}
        to={mode === 'login' ? '/admin/register' : '/admin/login'}
        variant="text"
      >
        {mode === 'login'
          ? 'Create an admin account'
          : 'Already have an account? Sign in'}
      </Button>
    </Box>
  );
}
