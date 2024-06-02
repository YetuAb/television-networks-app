import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import axios from 'axios';

const ChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/channel');
      setChannels(response.data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const handleChannelClick = (id) => {
    setSelectedChannelId(id);
  };

  return (
    <Box sx={{ width: 100, backgroundColor: '#10112F', height: '100vh', marginLeft:7 }}>
      <List>
        {channels.map((channel) => (
          <ListItem
            key={channel.id}
            onClick={() => handleChannelClick(channel.id)}
            sx={{
              marginTop: 6,
              marginBottom: 5,
              cursor: 'pointer',
              color: selectedChannelId === channel.id ? 'white' : 'inherit',
              opacity: selectedChannelId === channel.id ? 1 : 0.5,
              transform: selectedChannelId === channel.id ? 'scale(1.4)' : 'scale(1)',
              transition: 'transform 0.2s, color 0.2s, opacity 0.2s',
              borderRadius: '5px',
            }}
          >
            <ListItemText primary={channel.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChannelList;
