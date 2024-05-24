import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import Logo from '../assets/images/Logo.png';
import LiveTvTwoToneIcon from '@mui/icons-material/LiveTvTwoTone';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import StarIcon from '@mui/icons-material/Star';

const Sidebar = ({ selectedMenu, onMenuSelect }) => {
  const menuItems = [
    { icon: <LiveTvTwoToneIcon sx={{color:'white', marginBottom: 1, padding:1}} />, text: 'Channels', value: 'channels' },
    { icon: <StarIcon sx={{color:'white', marginBottom: 1, padding:1}} />, text: 'Favorites', value: 'favorites' },
    { icon: <WatchLaterIcon sx={{color:'white', marginBottom: 1, padding:1}}/>, text: 'Watch Later', value: 'watchLater' },
  ];

  return (
    <Box sx={{ width: 80, backgroundColor: '#10112F', height: '100vh',}}>
      <Avatar src={Logo} alt="Logo" sx={{ width: 80, height: 80, marginBottom: 20, marginTop:4 }} />
      <List>
        {menuItems.map(item => (
          <ListItem  button key={item.text} selected={selectedMenu === item.value} onClick={() => onMenuSelect(item.value)}>
            <ListItemIcon >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ display: 'none' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
