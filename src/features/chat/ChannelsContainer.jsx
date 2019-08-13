import React from 'react';
import MessagesContainer from './MessagesContainer';
import { databaseRef } from '../../data/firebase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChannelTabsStyles from './styles/ChannelTabsStyles';
import { connect } from 'react-redux';
import * as Actions from './chatActions';

const channelState = (state) => {
  return {
    channels: state.chat.channels.data,
    currentChannel: state.chat.channels.currentChannel
  };
};
const channelActions = {
  selectChannel: Actions.selectChannel,
  receiveChannels: Actions.receiveChannels
};

function ChannelContainer(props) {
  const classes = ChannelTabsStyles();
  React.useEffect(() => {
    databaseRef.ref(`guilds/${props.currentGuild}/channels`)
      .on('value', function (snapshot) {
        props.receiveChannels(snapshot.val());
      });
  }, []);

  console.log(props);

  const channelTabs = Object.keys(props.channels).map((channelId, index) => {
    const channelName = Object.values(props.channels)[index];
    return (
      <ListItem button
        onClick={(_) => props.selectChannel(channelId)}
        selected={channelId === props.currentChannel}
        key={channelId}>
        <ListItemText primary={'# ' + channelName} />
      </ListItem>
    )
  });

  const channelContent = Object.keys(props.channels).map(channelId => (
    <div>
      {channelId === props.currentChannel ?
        <MessagesContainer user={props.user} channelId={props.currentChannel} />
        : null}
    </div>
  ));

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
          paperAnchorLeft: classes.paperAnchorLeft
        }}>
        <div className={classes.toolbar} />
        <List>
          {channelTabs}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {channelContent}
      </main>
    </div>
  );
}

export default connect(channelState, channelActions)(ChannelContainer);