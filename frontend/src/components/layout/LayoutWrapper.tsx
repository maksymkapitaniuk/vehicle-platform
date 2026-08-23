import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Navbar } from './Navbar';

export function LayoutWrapper() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
