import React from 'react';
import MessagesContainer from './MessagesContainer';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChannelTabsStyles from './styles/ChannelTabsStyles';
import { connect } from 'react-redux';
import * as Actions from './chatActions';
import { selectChannels, selectCurrentChannel } from './chatSelectors';
import { ListItemIcon, Typography } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBoxRounded';
import { Chat } from '@material-ui/icons';

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
  const classes = ChannelTabsStyles();
  React.useEffect(() =>
    props.addChannelsListener(props.currentGuild), []);
  const channelKeys = Object.keys(props.channels);
  const channelData = Object.values(props.channels);

  const channelTabs = channelKeys.map((channelId, index) => (
    <ListItem button key={channelId}
      onClick={(_) => props.selectChannel(channelId)}
      selected={channelId === props.currentChannel}>
      <ListItemIcon>
        <Chat />
      </ListItemIcon>
      <Typography align="left" variant="subtitle1" component="h1">
        {'# '+channelData[index].name}
      </Typography>
    </ListItem>
  ));

  const channelContent = channelKeys.map(channelId => (
    <React.Fragment key={channelId}>
      {channelId !== props.currentChannel ? null :
        <MessagesContainer user={props.user}
          channelId={channelId} />}
    </React.Fragment>
  ));

  

  const handleChannelAdd = () => { };

  const addChannel = (
    <ListItem button
      onClick={(_) => handleChannelAdd()}
      key={'ADD_CHANNEL'}>
      <ListItemIcon  >
        <AddBox />
      </ListItemIcon>
      <ListItemText secondary={'Add a Channel'} />
    </ListItem>
  );

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
        <List>
          {addChannel}
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