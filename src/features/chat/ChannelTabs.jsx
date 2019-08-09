import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MessageContainer from './MessageContainer';
import { databaseRef } from '../../data/firebase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 170;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    display: 'flex',
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'fixed'
  },
  paperAnchorLeft: {
    position: 'fixed',
    marginLeft: theme.spacing(10) - 5
  },
  content: {
    width: '100%',
    paddingLeft: theme.spacing(10),
  },
  toolbar: theme.mixins.toolbar,
}));


export default function ChannelDrawer(props) {
  const classes = useStyles();
  const [currentChannel, setCurrentChannel] = React.useState('');
  const [channels, setChannels] = React.useState([]);

  React.useEffect(() => {
    (async function handleChannels() {
      const rawChannels = await databaseRef.ref(`channels/${props.currentGuild}`).once('value')
      const channelNames = Object.keys(rawChannels.val())
      setChannels(channelNames);
    })();
  }, []);

  function handleChange(_, newChannel) {
    setCurrentChannel(newChannel);
  }

  const channelTabs = channels.map(channel => (
    <ListItem button
      onClick={() => setCurrentChannel(channel)}
      selected={channel === currentChannel}
      key={channel}>
      <ListItemText primary={'# '  + channel} />
    </ListItem>
  ));

  const channelContent = channels.map(channel => (
    <div>
      {channel === currentChannel ? (
        <MessageContainer user={props.user} channel={currentChannel} />
      ) : null}
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
        }}
      >
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