import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { ErrorBoundary } from '../error/ErrorBoundary';
import { Navbar } from './Navbar';

export function LayoutWrapper() {
  return (
    <ErrorBoundary>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </ErrorBoundary>
  );
}
