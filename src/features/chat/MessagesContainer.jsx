import React from 'react';
import {
  List,
  Divider,
  TextField,
  AppBar,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { databaseRef } from '../../firebase';
import LoadingIndicator from '../../common/components/loading';
import Message from './components/Message';
import { addMessageListener } from './chatActions';
import { selectMessages } from './chatSelectors';

const messagesState = (state) => {
  return {
    messages: selectMessages(state)
  };
}
const messagesActions = { addMessageListener }

const MessageContainer = props => {
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  React.useEffect(function() {
    props.addMessageListener(props.channelId);
    setLoading(false);
  }, []);
  function handleTyping(event) {
    setCurrentMessage(event.target.value);
  }
  function handleSubmit(event) {
    if (event.key !== 'Enter' || !currentMessage) return;
    event.preventDefault();
    databaseRef.ref('messages/'+props.channelId).push({
      text: currentMessage,
      author: { name: 'Jon Snow' }
    });
    setCurrentMessage('');
  }

  if (loading) return <LoadingIndicator />

  const chatInputField = (
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
        />
      </AppBar>
    </div>
  );

  if (!props.messages) return chatInputField;

  const messageList = props.messages.map((message, index) => (
    <React.Fragment key={index}>
      <Message message={message}  />
      <Divider variant="fullWidth" component="li" />
    </React.Fragment>
  ));

  return (
    <div>
      <List style={{
        zIndex: 100,
        paddingLeft: 10,
        paddingBottom: 80,
        width: "100%"
      }}>
        {messageList}
      </List>
      {chatInputField}
    </div>
  );
};

export default connect(messagesState, messagesActions)(MessageContainer);