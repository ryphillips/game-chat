import React from 'react';
import ChatInput from './ChatInput';
import Message from './Message'
import { List, Divider, CircularProgress } from '@material-ui/core';

export default function MessagesContent(props) {
  if (true/*!props.messages*/) {
    return (
    <React.Fragment>
      <Message message={{
        author: { name: 'Channel Bot' },
        text: 'Welcome to the channel start chatting!'
      }} />
      <ChatInput channelId={props.channelId} />
    </React.Fragment>
    );
  }
  const messageList = props.messages.map((message, index) => (
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
        paddingBottom: 80,
        width: "100%"
      }}>
        {messageList}
      </List>
      <ChatInput channelId={props.channelId} />
    </div>
  );
}