import React from 'react';
import {
  Typography,
  ListItem,
  Card,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import Default from '../../../assets/discorddefault.png';


export default function Message(props) {
  const { message } = props;
  const authorSignature =
    <React.Fragment>
      <Typography
        component="span"
        variant="body2"
        style={{ display: 'inline' }}
        color="textPrimary">
        {message.author.name}
      </Typography>
    </React.Fragment>

  return (
    <Card raised style={{ margin: 5 }}>
      <ListItem button alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={message.author.name} src={message.author.avatar || Default} />
        </ListItemAvatar>
        <ListItemText
          primary={message.text}
          secondary={authorSignature} />
      </ListItem>
    </Card>
  );
}