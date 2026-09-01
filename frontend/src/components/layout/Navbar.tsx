import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Button } from '../ui/Button';
import logo from '../../assets/logo.svg';

export function Navbar() {
  return (
    <AppBar position="static" color="default">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 0 }}>
          <Link to="/vehicles">
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ mx: 4, cursor: 'pointer' }}
            />
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 4 }}>
          <Button component={Link} to="/users" variant="text" color="clean">
            Users
          </Button>

          <Button component={Link} to="/vehicles" variant="text" color="clean">
            Vehicles
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
