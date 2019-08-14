import React from 'react';
import {
  List,
  Divider,
  TextField,
  AppBar,
} from '@material-ui/core';
import { connect } from 'react-redux';
import LoadingIndicator from '../../common/components/loading';
import Message from './components/Message';
import { addMessageListener } from './chatActions';
import { selectMessages } from './chatSelectors';
import ChatInput from './ChatInput';


const messagesState = (state) => {
  return {
    messages: selectMessages(state)
  };
}
const messagesActions = { addMessageListener }

const MessageContainer = props => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(function() {
    props.addMessageListener(props.channelId);
    setLoading(false);
  }, []);

  if (loading) return <LoadingIndicator />
  if (!props.messages) return null

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
      <ChatInput channelId={props.channelId} />
    </div>
  );
};

export default connect(messagesState, messagesActions)(MessageContainer);