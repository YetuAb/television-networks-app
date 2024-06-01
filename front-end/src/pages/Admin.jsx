import React, { useState, useEffect } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Menu, MenuItem } from '@mui/material';
import { Dashboard as DashboardIcon, Tv as ChannelIcon, Movie as ProgramIcon, CloudDownload as ExportIcon, FilterList as FilterIcon, Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import DashboardLogo from '../assets/images/DashboardLogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Channel from '../components/Channel';
import AddDialog from '../components/AddDialog';
import Program from '../components/Program';

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    status: false,
    hidden: false,
    title: '',
    duration: '',
    description: '',
    videoUrl: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = window.localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.post('http://localhost:5000/userData', null, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.data) {
          setUserData(response.data.data);
        } else if (response.data === 'token expired') {
          alert('Token expired, login again');
          window.localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          alert('Unauthorized. Please log in again.');
          window.localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    getUserData();
  }, [navigate]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleSearch = async (query) => {
    try {
      const endpoint = selectedSection === 'Channel' ? 'channel/search' : 'programs/search';
      const response = await axios.get(`http://localhost:5000/${endpoint}`, {
        params: { query },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAddClick = async () => {
    try {
      if (selectedSection === 'Channel') {
        await axios.post('http://localhost:5000/channel', {
          name: formValues.name,
          status: formValues.status,
          hidden: formValues.hidden,
        });
      } else if (selectedSection === 'Program') {
        await axios.post('http://localhost:5000/programs', {
          title: formValues.title,
          duration: formValues.duration,
          description: formValues.description,
          status: formValues.status,
          videoUrl: formValues.videoUrl,
        });
      }
      handleDialogClose();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
          <img src={DashboardLogo} alt="DashboardLogo" style={{ height: '45px', marginRight: '1px' }} />
          <Typography variant="h6">T-Movie</Typography>
        </Box>
        <List>
          <ListItem
            button
            key="Dashboard"
            selected={selectedSection === 'Dashboard'}
            onClick={() => handleSectionClick('Dashboard')}
            sx={{
              ...(selectedSection === 'Dashboard' && {
                backgroundColor: '#000222',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              }),
            }}
          >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            key="Channel"
            selected={selectedSection === 'Channel'}
            onClick={() => handleSectionClick('Channel')}
            sx={{
              ...(selectedSection === 'Channel' && {
                backgroundColor: '#000222',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              }),
            }}
          >
            <ListItemIcon><ChannelIcon /></ListItemIcon>
            <ListItemText primary="Channel" />
          </ListItem>
          <ListItem
            button
            key="Program"
            selected={selectedSection === 'Program'}
            onClick={() => handleSectionClick('Program')}
            sx={{
              ...(selectedSection === 'Program' && {
                backgroundColor: '#000222',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              }),
            }}
          >
            <ListItemIcon><ProgramIcon /></ListItemIcon>
            <ListItemText primary="Program" />
          </ListItem>
        </List>
      </Drawer>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box component="main" sx={{ bgcolor: '#000222', p: 2, flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', ml: 1 }}>{selectedSection}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 1 }}>
            <Button onClick={handleMenuClick}>
              <NotificationsIcon sx={{ color: 'white' }} />
            </Button>
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
              <MenuItem onClick={handleLogout} sx={{ color: 'Red' }}><ListItemIcon><ExitToAppIcon /></ListItemIcon>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff', p: 1 }}>
          <SearchBar onSearch={handleSearch} />
          <Button variant='filled' startIcon={<ExportIcon />} color="primary">Export</Button>
          <Button variant='filled' startIcon={<FilterIcon />} color="primary">Add Filter</Button>
          {selectedSection === 'Dashboard' ? (
            <Button variant="contained" 
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}>Add Filter</Button>
          ) : (
            <Button 
              sx={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: '#333',
              },
              }}
              variant='filled' color="primary" onClick={handleDialogOpen}>
              {selectedSection === 'Channel' ? 'Add Channel' : 'Add Program'}
            </Button>
          )}
        </Box>
        {selectedSection === 'Dashboard' && <Dashboard />}
        {selectedSection === 'Channel' && (
          <Channel searchResults={searchResults} /> 
        )}
        {selectedSection === 'Program' && (
          <Program searchResults={searchResults} /> 
        )}
      </Box>
      <AddDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        selectedSection={selectedSection}
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleAddClick={handleAddClick}
      />
    </Box>
  );
};

export default Admin;
