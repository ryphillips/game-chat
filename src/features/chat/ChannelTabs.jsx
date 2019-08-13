import React from 'react';
import MessageContainer from './MessageContainer';
import { databaseRef } from '../../data/firebase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChannelTabsStyles from './styles/ChannelTabsStyles';
import { connect } from 'react-redux';

const channelState = (state) => {
  return {
    channels: state.chat.channels.data,
    currentChannel: stat.chat.channels.currentChannel
  };
};
const channelActions = {
  selectChannel: Actions.selectChannel,
  receiveChannel: Actions.receiveChannel
};

export default function ChannelDrawer(props) {
  const classes = ChannelTabsStyles();
  React.useEffect(() => {
    (async function handleChannels() {
      databaseRef.ref(`guilds/${props.currentGuild}/channels`)
        .on('child_added', function(snapshot) {
          props.receiveChannel(snapshot.val())
        }).catch(console.error);
    })();
  }, [props.currentGuild]);

  const channelTabs = Object.keys(props.channels).map((channelId, index) => {
    const channelName = Object.values(props.channels)[index];
    return (
      <ListItem button
        onClick={(_) => props.selectChannel(channelId)}
        selected={channelId === props.currentChannel}
        key={channelId}>
        <ListItemText primary={'# '  + channelName} />
      </ListItem>
    )
  });

  const channelContent = Object.keys(props.channels).map(channelId => (
    <div>
      {channelId === props.currentChannel ?
        <MessageContainer user={props.user} channelId={props.currentChannel} />
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

export default connect(channelActions, channelState)(channelTabs);