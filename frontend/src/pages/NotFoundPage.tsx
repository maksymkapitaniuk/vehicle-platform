import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-start',
        px: 4,
        py: 2,
        bgcolor: 'error.main',
        color: 'error.secondary',
        borderRadius: 4,
      }}
    >
      <Typography variant="h5">
        There is no page by the given path. Please, double-check the specified
        url.
      </Typography>
      <Button
        onClick={() => navigate(-1)}
        size="large"
        variant="outlined"
        color="error.light"
        startIcon={<ArrowBackIosNewIcon />}
      >
        Go Back
      </Button>
    </Paper>
  );
}
