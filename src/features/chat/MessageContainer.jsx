import React from 'react';
import {
  List,
  Card,
  Typography,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField
} from '@material-ui/core';
import Default from '../../assets/discorddefault.png';
import { databaseRef } from '../../data/firebase';
import LoadingIndicator from '../../common/components/loading';

const MessageContainer = props => {
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPlace, setCurrentPlace] = React.useState();

  React.useEffect(() => {
    databaseRef.ref('messages/' + props.channel).orderByKey()
      .on('value', function (snapshot) {
        if (!snapshot.exists()) return;
        const hotMessages = Object.values(snapshot.val());
        const placementUpdate =
          hotMessages[hotMessages.length - 1].placement + 1;
        setCurrentPlace(placementUpdate);
        setMessages(hotMessages);
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
    <TextField fullWidth
      id="filled-dense-multiline"
      label="Say something..."
      margin="dense"
      variant="filled"
      color="blue"
      multiline
      rowsMax="4"
      value={currentMessage}
      onChange={handleTyping}
      onKeyDown={handleSubmit}
    />
  );

  if (!messages) {
    return chatInputField;
  }

  return (
    <div >
      <List fullWidth style={{ overflow: 'auto', zIndex: 100, }}>
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            <Card raised style={{ margin: 5 }}>
              <ListItem button alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={message.author.name} src={message.author.avatar || Default} />
                </ListItemAvatar>
                <ListItemText
                  primary={message.text}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ display: 'inline' }}
                        color="textPrimary">
                        {message.author.name}
                      </Typography>
                    </React.Fragment>} />
              </ListItem>
            </Card>
            <Divider variant="fullWidth" component="li" />
          </React.Fragment>
        ))}
      </List>
      { chatInputField }
    </div>
  );
};

export default MessageContainer;