import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const Channel = () => {
  const [channels, setChannels] = useState([]);
  const [editingChannel, setEditingChannel] = useState(null);
  const [open, setOpen] = useState(false);

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

  const toggleChannelStatus = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/channel/${id}`, { status: !currentStatus });
      fetchChannels();
    } catch (error) {
      console.error('Error toggling channel status:', error);
    }
  };

  const deleteChannel = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/channel/${id}`);
      fetchChannels();
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
  };

  const handleEditClick = (channel) => {
    setEditingChannel(channel);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setEditingChannel(null);
  };

  const handleDialogSave = async () => {
    try {
      await axios.put(`http://localhost:5000/channel/${editingChannel.id}`, {
        name: editingChannel.name,
        status: editingChannel.status,
      });
      fetchChannels();
      handleDialogClose();
    } catch (error) {
      console.error('Error updating channel:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingChannel((prevChannel) => ({
      ...prevChannel,
      [name]: value,
    }));
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      await axios.put(`http://localhost:5000/channel/${id}`, { hidden: !currentVisibility });
      fetchChannels();
    } catch (error) {
      console.error('Error toggling channel visibility:', error);
    }
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channels.map((channel) => (
              <TableRow key={channel.id}>
                <TableCell>{channel.name}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {channel.status ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
                    <Typography variant="body2" color={channel.status ? 'primary' : 'error'}>
                      {channel.status ? 'Active' : 'Deactive'}
                    </Typography>
                    <Switch
                      checked={channel.status}
                      onChange={() => toggleChannelStatus(channel.id, channel.status)}
                      color="primary"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title={channel.hidden ? 'Unhide' : 'Hide'}>
                    <IconButton onClick={() => toggleVisibility(channel.id, channel.hidden)}>
                      {channel.hidden ? <VisibilityOffIcon color="action" /> : <VisibilityIcon color="action" />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditClick(channel)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteChannel(channel.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Edit Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this channel, please change the name and status here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editingChannel ? editingChannel.name : ''}
            onChange={handleInputChange}
          />
          <Switch
            checked={editingChannel ? editingChannel.status : false}
            onChange={() => setEditingChannel((prev) => ({ ...prev, status: !prev.status }))}
            color="primary"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Channel;
