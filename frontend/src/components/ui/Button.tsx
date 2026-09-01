import type { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import type {
  ButtonProps as MuiButtonProps,
  ButtonTypeMap,
} from '@mui/material/Button';

export type ButtonProps<
  RootComponent extends ElementType = ButtonTypeMap['defaultComponent'],
> = MuiButtonProps<RootComponent, { component?: RootComponent }>;

const StyledButton = styled(MuiButton)({
  textTransform: 'none',
  fontSize: '16px',
});

export function Button<
  RootComponent extends ElementType = ButtonTypeMap['defaultComponent'],
>({ variant, ...props }: ButtonProps<RootComponent>) {
  return <StyledButton variant={variant ?? 'contained'} {...props} />;
}
