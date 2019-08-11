import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MessageContainer from './MessageContainer';
import { databaseRef } from '../../data/firebase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChannelTabsStyles from './styles/ChannelTabsStyles';

export default function ChannelDrawer(props) {
  const classes = ChannelTabsStyles();
  const [currentChannel, setCurrentChannel] = React.useState('');
  const [channels, setChannels] = React.useState([]);

  React.useEffect(() => {
    (async function handleChannels() {
      databaseRef.ref(`guilds/${props.currentGuild}/channels`)
        .once('value', function(snapshot) {
          setChannels(snapshot.val())
          setCurrentChannel(Object.keys(snapshot.val())[0]);
        }).catch(console.error);
    })();
  }, [props.currentGuild]);

  function handleChange(_, newChannel) {
    setCurrentChannel(newChannel);
  }

  const channelTabs = Object.keys(channels).map((channelId, index) => {
    const channelName = Object.values(channels)[index];
    return (
      <ListItem button
        onClick={(e) => handleChange(e, channelId)}
        selected={channelId === currentChannel}
        key={channelId}>
        <ListItemText primary={'# '  + channelName} />
      </ListItem>
    )
  });

  const channelContent = Object.keys(channels).map(channelId => (
    <div>
      {channelId === currentChannel ?
        <MessageContainer user={props.user} channel={currentChannel} />
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