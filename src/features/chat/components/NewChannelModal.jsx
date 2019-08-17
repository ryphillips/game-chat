import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddChannelModal(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(''); 
  function handleClickOpen() { setOpen(true); }
  function handleClose() { setOpen(false); }
  function handleAddChannel() {
    addChannel()
  }
  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new channel you must fill out all the fields below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel Name"
            type="name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddChannel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddChannelModal;