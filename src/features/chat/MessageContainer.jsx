import React from 'react';
import { List, Card, Typography, ListItem, Divider, ListItemAvatar, ListItemText, Avatar, TextField } from '@material-ui/core';
import Default from '../../assets/discorddefault.png';
import { databaseRef } from '../../data/firebase';
import { async } from 'q';
import LoadingIndicator from '../../common/components/loading';

const MessageContainer = props => {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function handleMessages() {
      const rawMessages =
        await databaseRef.ref('messages/' + props.channel).once('value');
      setMessages(Object.values(rawMessages.val()));
      setLoading(!loading);
    }
    handleMessages();
  }, []);

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <List style={{ overflow: 'auto', height: '100%', width: '100%' }}>
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
  );
};

export default MessageContainer;