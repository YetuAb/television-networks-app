import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';

const AddDialog = ({ open, onClose, selectedSection, formValues, handleInputChange, handleAddClick }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedSection === 'Channel' ? 'Add Channel' : 'Add Program'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {selectedSection === 'Channel' ? 'Please enter the channel details.' : 'Please enter the program details.'}
        </DialogContentText>
        {selectedSection === 'Channel' && (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              name="name"
              fullWidth
              value={formValues.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Status"
              name="status"
              fullWidth
              value={formValues.status}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Hidden"
              name="hidden"
              fullWidth
              value={formValues.hidden}
              onChange={handleInputChange}
            />
          </>
        )}
        {selectedSection === 'Program' && (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              name="title"
              fullWidth
              value={formValues.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Duration"
              name="duration"
              fullWidth
              value={formValues.duration}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Description"
              name="description"
              fullWidth
              value={formValues.description}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Status"
              name="status"
              fullWidth
              value={formValues.status}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Video URL"
              name="videoUrl"
              fullWidth
              value={formValues.videoUrl}
              onChange={handleInputChange}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleAddClick} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
