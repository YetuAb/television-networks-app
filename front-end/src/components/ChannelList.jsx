import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText,   } from '@mui/material';
import axios from 'axios';

const ChannelList = () => {
  const [channels, setChannels] = useState([]);

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

  return (
    <List>
      {channels.map((channel) => (
        <ListItem key={channel.id}>
          <ListItemText primary={channel.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChannelList;
