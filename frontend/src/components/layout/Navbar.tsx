import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button } from '../ui/Button';
import logo from '../../assets/logo.svg';
import { clearAdminToken, getAdminToken } from '../../util/auth';

export function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(getAdminToken());

  function handleLogout() {
    clearAdminToken();
    navigate('/admin/login');
  }

  return (
    <AppBar position="static" color="default">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 4 }}>
            <Link to="/vehicles">
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ cursor: 'pointer' }}
              />
            </Link>
            <Button component={Link} to="/users" variant="text" color="clean">
              Users
            </Button>

            <Button
              component={Link}
              to="/vehicles"
              variant="text"
              color="clean"
            >
              Vehicles
            </Button>
          </Box>
          {isLoggedIn && (
            <Button
              variant="text"
              color="clean"
              onClick={handleLogout}
              sx={{ flexGrow: 0 }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
