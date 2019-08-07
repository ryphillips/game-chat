import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import MessageContainer from './MessageContainer';
import TextField from '@material-ui/core/TextField';
import Default from '../../assets/discorddefault.png';
import { databaseRef } from '../../data/firebase';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
}));

export default function ChannelTabs(props) {
  const classes = useStyles();
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [currentChannel, setCurrentChannel] = React.useState('Game2');
  const [channels, setChannels] = React.useState([]);
  React.useEffect(() => {
    databaseRef.ref(`channels/${props.currentGuild}`)
    .once('value')
    .then(snapshot => {
      const channelNames = Object.keys(snapshot.val())
      setChannels(channelNames);
    })
  }, []);

  function handleChange(event, newChannel) {
    setCurrentChannel(newChannel);
  }

  function handleTyping(event) {
    const { user, startedTyping } = props
    //startedTyping(user.name);
    setCurrentMessage(event.target.value);
  }

  function handleSubmit(event) {
    if (event.key !== 'Enter' || !currentMessage) return;
    event.preventDefault();
    const { user, addMessage, currentChannel } = props;
    /*addMessage({
      user,
      currentMessage
    });*/
    setCurrentMessage('');
  }

  const channelTabs = channels.map(channel => (
    <Tab value={channel} label={channel} icon={<FavoriteIcon />} />
  ))

  const channelContent = channels.map(channel => (
    <div>
      {channel === currentChannel ? (
        <TabContainer>
          <MessageContainer channel={currentChannel} />
          <TextField fullWidth
            id="filled-dense-multiline"
            label="Say something..."
            margin="dense"
            variant="filled"
            color="blue"
            multiline
            rowsMax="4"
            value={currentMessage}
            onChange={handleTyping}
            onKeyDown={handleSubmit}
          />
        </TabContainer>
      ) : null}
    </div>
  ));

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Tabs
          value={currentChannel}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          {channelTabs}
        </Tabs>
      </AppBar>
      { channelContent}
    </div>
  );
}