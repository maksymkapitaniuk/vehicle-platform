import Typography from '@mui/material/Typography';

export interface LoaderProps {
  message?: string | undefined;
}

export function Loader({ message }: LoaderProps) {
  return <Typography sx={{ my: 1 }}>{message ?? 'Loading data...'}</Typography>;
}
