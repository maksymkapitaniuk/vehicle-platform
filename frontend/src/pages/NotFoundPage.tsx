import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export function NotFoundPage() {
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
        There is no page by the given path. Please, double-check the specified
        url.
      </Typography>
    </Paper>
  );
}
