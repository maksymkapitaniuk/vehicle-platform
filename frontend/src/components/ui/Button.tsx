import type { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import MuiButton, {
  type ButtonProps as MuiButtonProps,
  type ButtonTypeMap,
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
