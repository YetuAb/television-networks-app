import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

const ChannelItem = ({ channel }) => {
  return (
    <ListItem>
      {/*<ListItemAvatar>
        <Avatar src={channel.logo} />
      </ListItemAvatar>*/}
      <ListItemText primary={channel.name} />
    </ListItem>
  );
};

export default ChannelItem;
