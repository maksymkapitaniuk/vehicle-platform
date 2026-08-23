import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export function Navbar() {
  return (
    <AppBar position="static" color="default">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 0 }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ mx: 4, cursor: 'pointer' }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 4 }}>
          <Button
            component={Link}
            to="/users"
            sx={{
              color: 'inherit',
              textTransform: 'none',
              fontSize: '16px',
            }}
          >
            Users
          </Button>

          <Button
            component={Link}
            to="/vehicles"
            sx={{
              color: 'inherit',
              textTransform: 'none',
              fontSize: '16px',
            }}
          >
            Vehicles
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
