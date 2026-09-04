import { useState, type HTMLInputTypeAttribute } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type FieldPath,
  type FieldError,
  type Merge,
  type FieldErrorsImpl,
} from 'react-hook-form';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
  TextFieldProps<'outlined'>,
  'name' | 'type' | 'variant' | 'error' | 'helperText'
> {
  name: TName;
  control: Control<TFieldValues>;
  type: HTMLInputTypeAttribute;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<object>> | undefined;
}

export function Input<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, type, error, ...props }: InputProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);

  if (type === 'password') {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            error={!!error}
            helperText={error?.message}
            slotProps={
              props.slotProps
                ? { ...props.slotProps }
                : {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }
            }
            {...field}
            {...props}
          />
        )}
      />
    );
  } else {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            type={type}
            error={!!error}
            helperText={error?.message}
            slotProps={
              type === 'date' && !props.slotProps
                ? {
                    inputLabel: {
                      shrink: true,
                    },
                  }
                : undefined
            }
            {...field}
            {...props}
          />
        )}
      />
    );
  }
}
