import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, ListItemIcon, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/userData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: 2 }}>
      <Typography variant="h6">12:00 PM</Typography>
      <Typography>Sunny 25°C</Typography>
      <Box>
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 1 }}>
            <Button onClick={handleMenuClick}>
              <AccountCircleIcon sx={{ color: 'white' }} />
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{userData && userData.username}</MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
