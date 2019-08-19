import React from 'react';
import { connect } from 'react-redux';
import { selectChannel, addChannelsListener } from './chatActions';
import { selectChannels, selectCurrentChannel } from './chatSelectors';
import PropTypes from 'prop-types';
import ChannelContent from './components/ChannelContent';

function channelsState(state) {
  return {
    channels: selectChannels(state),
    currentChannel: selectCurrentChannel(state)
  };
}
const channelsActions = { selectChannel, addChannelsListener };
function ChannelsContainer(props) {
  React.useEffect(() => 
    props.addChannelsListener(props.currentGuild), []);
  return <ChannelContent {...props}/>;
}

ChannelsContainer.propTypes = {
  channels: PropTypes.object,
  currentChannel: PropTypes.string
};

export default connect(
  channelsState,
  channelsActions
)(ChannelsContainer);