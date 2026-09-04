import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from '../../ui/Button';
import {
  NotFoundError,
  ValidationError,
  type AppError,
} from '../../../util/errors';
import { ErrorBlockMessage } from './ErrorBlockMessage';

export interface ErrorBlockProps {
  error: AppError;
  onTryAgain?: () => void;
}

export function ErrorBlock({ error, onTryAgain }: ErrorBlockProps) {
  const heading =
    error instanceof NotFoundError
      ? 'No data found'
      : error instanceof ValidationError
        ? 'Validation Error'
        : 'An error occured';

  return (
    <Paper
      sx={{
        px: 4,
        py: 2,
        bgcolor: 'error.main',
        color: 'error.text',
        borderRadius: 4,
      }}
    >
      <Typography variant="h5">{heading}</Typography>
      <ErrorBlockMessage error={error} />
      {onTryAgain && <Button onClick={onTryAgain}>Try again</Button>}
    </Paper>
  );
}
