import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Switch,Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [editingProgram, setEditingProgram] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    id: '',
    title: '',
    duration: '',
    description: '',
    status: false,
    videoUrl: ''
  });

  useEffect(() => {
    fetchPrograms();
  }, []);
  
  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/programs');
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };
  
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/programs/${id}`, { status: !currentStatus });
      fetchPrograms();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/programs/${id}`);
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormValues(program);
    setDialogOpen(true);
  };

  const handleToggleVisibility = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/programs/${id}`, { status: !currentStatus });
      fetchPrograms();
    } catch (error) {
      console.error('Error updating visibility:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingProgram(null);
  };

  const handleSave = async () => {
    try {
      const { id, title, duration, description, status, videoUrl } = formValues;
      await axios.put(`http://localhost:5000/programs/${id}`, {
        title,
        duration,
        description,
        status,
        videoUrl
      });
      fetchPrograms();
      handleDialogClose();
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell>{program.id}</TableCell>
                <TableCell>{program.title}</TableCell>
                <TableCell>{program.duration}</TableCell>
                <TableCell>{program.description}</TableCell>
                <TableCell>
                  <Switch
                    checked={program.status}
                    onChange={() => handleToggleStatus(program.id, program.status)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleToggleVisibility(program.id, program.status)}>
                    {program.status ? <VisibilityOffIcon  /> : <VisibilityIcon />}
                  </IconButton>
                  <IconButton onClick={() => handleEdit(program)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(program.id)}>
                    <DeleteIcon sx={{color:'red'}}/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Program</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Duration"
            name="duration"
            value={formValues.duration}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Video URL"
            name="videoUrl"
            value={formValues.videoUrl}
            onChange={handleInputChange}
            fullWidth
          />
          <Switch
            checked={formValues.status}
            onChange={(e) => setFormValues({ ...formValues, status: e.target.checked })}
            name="status"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Program;
