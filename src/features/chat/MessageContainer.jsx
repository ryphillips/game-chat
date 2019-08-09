import React from 'react';
import {
  List,
  Divider,
  TextField,
  AppBar
} from '@material-ui/core';
import { databaseRef } from '../../data/firebase';
import LoadingIndicator from '../../common/components/loading';
import Message from './components/Message';

const MessageContainer = props => {
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPlace, setCurrentPlace] = React.useState(1);

  React.useEffect(() => {
    databaseRef.ref('messages/' + props.channel).orderByKey()
      .limitToLast(100)
      .on('child_added', function (snapshot, prevKey) {
        if (!snapshot.exists()) {
          setLoading(false);
          return;
        }
        setLoading(true);
        const newMessage = snapshot.val();
        messages.push(newMessage);
        setMessages(messages);
        setCurrentPlace(newMessage.placement + 1);
        setLoading(false);
      });
  }, [props.channel]);

  function handleTyping(event) {
    setCurrentMessage(event.target.value);
  }

  function handleSubmit(event) {
    if (event.key !== 'Enter' || !currentMessage) return;
    event.preventDefault();
    const { user } = props;
    databaseRef.ref('messages').child(props.channel).push({
      text: currentMessage,
      author: { name: user.name },
      placement: currentPlace
    });
    setCurrentMessage('');
  }

  if (loading) {
    return <LoadingIndicator />
  }


  const chatInputField = (
    <div style={{ zIndex: 101, flexGrow: 1, position: 'fixed', width: '100%', bottom: 0}}>
      <AppBar color="inherit"  position="static">
        <TextField style={{ marginLeft: 10, width: '82%' }}
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


  if (!messages) {
    return chatInputField;
  }


  const messageList = messages.map((message, index) => (
    <React.Fragment key={index}>
      <Message message={message} />
      <Divider variant="fullWidth" component="li" />
    </React.Fragment>
  ));

  return (
    <div>
      <List style={{
        zIndex: 100,
        paddingLeft: 10,
        paddingBottom: 80
        }}>
        { messageList }
      </List>
      { chatInputField }
    </div>
  );
};

export default MessageContainer;