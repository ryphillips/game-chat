import React from 'react';
import { addMessage } from '../chatActions';
import { AppBar, TextField } from '@material-ui/core'

const ChatInput = ({ channelId }) => {
  const [currentMessage, setCurrentMessage] = React.useState('');  
  function handleTyping(event) {
    setCurrentMessage(event.target.value);
  }
  function handleSubmit(event) {
    if (event.key !== 'Enter' || !currentMessage) return;
    event.preventDefault();
    addMessage(currentMessage, channelId);
    setCurrentMessage('');
  }
  return (
    <div style={{ zIndex: 101, flexGrow: 1, position: 'fixed', width: '100%', bottom: 0 }}>
      <AppBar color="inherit" position="static" >
        <TextField style={{ marginLeft: 10, marginBottom: 10, width: '82%' }}
          id="filled-dense-multiline"
          label="Say something..."
          margin="normal"
          variant="outlined"
          color="inherit"
          multiline
          rowsMax="4"
          value={currentMessage}
          onChange={handleTyping}
          onKeyDown={handleSubmit}
          color="white"
        />
      </AppBar>
    </div>
  );
}

export default ChatInput;
