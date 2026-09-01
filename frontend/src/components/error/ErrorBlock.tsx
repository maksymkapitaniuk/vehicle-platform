import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NotFoundError } from '../../util/errors';
import type { AppError } from '../../util/errors';

export interface ErrorBlockProps {
  error: AppError;
  onTryAgain?: () => void;
}

export function ErrorBlock({ error, onTryAgain }: ErrorBlockProps) {
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
      <Typography variant="h5">
        {error instanceof NotFoundError ? 'No data found' : 'An error occured'}
      </Typography>
      <Typography>{error.message}</Typography>
      {onTryAgain && (
        <Button
          variant="contained"
          sx={{ textTransform: 'none', fontSize: '16px' }}
          onClick={onTryAgain}
        >
          Try again
        </Button>
      )}
    </Paper>
  );
}
