import React from 'react';
import { connect } from 'react-redux';
import * as Actions from './chatActions';
import { selectChannels, selectCurrentChannel } from './chatSelectors';
import PropTypes from 'prop-types';
import ChannelContent from './components/ChannelContent';

const channelState = (state) => {
  return {
    channels: selectChannels(state),
    currentChannel: selectCurrentChannel(state)
  };
};
const channelActions = {
  selectChannel: Actions.selectChannel,
  addChannelsListener: Actions.addChannelsListener,
};
function ChannelContainer(props) {
  React.useEffect(() =>
    props.addChannelsListener(props.currentGuild), []);
  return <ChannelContent {...props}/>;
}
ChannelContainer.propTypes =  {
  channels: PropTypes.object,
  currentChannel: PropTypes.string
};

export default connect(channelState, channelActions)(ChannelContainer);