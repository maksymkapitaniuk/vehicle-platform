import Box from '@mui/material/Box';
import { ErrorBlock } from './ErrorBlock/ErrorBlock';
import type { AppError } from '../../util/errors';

export interface ErrorFallbackProps {
  error: AppError;
}

export function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <Box sx={{ px: 2, py: 4 }}>
      <ErrorBlock error={error} />
    </Box>
  );
}
