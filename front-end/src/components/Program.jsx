import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

const Program = ({ searchResults }) => {
  const [programs, setPrograms] = useState([]);
  const [editingProgram, setEditingProgram] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (searchResults.length === 0) {
      fetchPrograms();
    } else {
      setPrograms(searchResults);
    }
  }, [searchResults]);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/programs');
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const toggleProgramStatus = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/programs/${id}`, { status: !currentStatus });
      fetchPrograms();
    } catch (error) {
      console.error('Error toggling program status:', error);
    }
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      await axios.put(`http://localhost:5000/programs/${id}`, { hidden: !currentVisibility });
      fetchPrograms();
    } catch (error) {
      console.error('Error toggling program visibility:', error);
    }
  };

  const deleteProgram = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/programs/${id}`);
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handleEditClick = (program) => {
    setEditingProgram(program);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProgram(null);
  };

  const handleDialogSave = async () => {
    try {
      await axios.put(`http://localhost:5000/programs/${editingProgram.id}`, {
        title: editingProgram.title,
        duration: editingProgram.duration,
        description: editingProgram.description,
        status: editingProgram.status,
        videoUrl: editingProgram.videoUrl,
        category: editingProgram.category,
        type: editingProgram.type,
        hidden: editingProgram.hidden,
      });
      fetchPrograms();
      handleDialogClose();
    } catch (error) {
      console.error('Error updating program:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProgram((prevProgram) => ({
      ...prevProgram,
      [name]: value,
    }));
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell>{program.title}</TableCell>
                <TableCell>{program.duration}</TableCell>
                <TableCell>{program.description}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {program.status ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
                    <Typography variant="body2" color={program.status ? 'primary' : 'error'}>
                      {program.status ? 'Active' : 'Deactive'}
                    </Typography>
                    <Switch
                      checked={program.status}
                      onChange={() => toggleProgramStatus(program.id, program.status)}
                      color="primary"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title={program.hidden ? 'Unhide' : 'Hide'}>
                    <IconButton onClick={() => toggleVisibility(program.id, program.hidden)}>
                      {program.hidden ? <VisibilityOffIcon color="action" /> : <VisibilityIcon color="action" />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditClick(program)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteProgram(program.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Program</DialogTitle>
        <DialogContent>
          <DialogContentText>Update the program details below:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={editingProgram?.title || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            type="text"
            fullWidth
            value={editingProgram?.duration || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editingProgram?.description || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={editingProgram?.status || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="videoUrl"
            label="Video URL"
            type="text"
            fullWidth
            value={editingProgram?.videoUrl || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={editingProgram?.category || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            value={editingProgram?.type || ''}
            onChange={handleInputChange}
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

export default Program;
