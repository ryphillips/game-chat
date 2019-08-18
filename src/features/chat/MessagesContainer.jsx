import React from 'react';
import { connect } from 'react-redux';
import { addMessageListener } from './chatActions';
import { selectMessages } from './chatSelectors';
import PropTypes from 'prop-types';
import MessagesContent from './components/MessagesContent';

function messagesState(state) {
  return {
    messages: selectMessages(state)
  };
}
const messagesActions = { addMessageListener }
const MessagesContainer = props => {
  React.useEffect(() =>
    props.addMessageListener(props.channelId), []);
  return (
    <MessagesContent messages={props.messages} />
  );
};
MessagesContainer.propTypes = {
  messages: PropTypes.array
};

export default connect(
  messagesState,
  messagesActions
)(MessagesContainer);