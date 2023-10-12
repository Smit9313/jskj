import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button color="inherit" component={Link} to="/products">Product</Button>
          <Stack direction='row' spacing={2}>
          <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to='/register'>Register</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
