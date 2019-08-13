import React from 'react';
import { connect } from 'react-redux';
import * as Actions from './chatActions';
import { databaseRef } from '../../firebase';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/MailRounded';
import InboxIcon from '@material-ui/icons/InboxRounded';
import ToggleDisplay from '../../common/components/toggleDisplay';
import ChatTopNav from './components/ChatTopNav';
import GuildsDrawerStyles from './styles/GuildsDrawerStyles';
import ChannelsContainer from './ChannelsContainer';
import GuildContent from './components/GuildsContent';
import { selectGuilds, selectCurrentGuild } from './chatSelectors';

const guildsState = (state) => {
  return {
    guilds: selectGuilds(state),
    currentGuild: selectCurrentGuild(state)
  };
}
const guildsActions = {
  onGuildClicked: Actions.selectGuild,
  onGuildsReceived: Actions.receiveGuilds
};

function GuildContainer(props) {
  const classes = GuildsDrawerStyles();
  const [open, setOpen] = React.useState(false);
  function handleDrawerOpen() {
    setOpen(true);
  }
  function handleDrawerClose() {
    setOpen(false);
  }

  React.useEffect(() => {
    const usersGuilds = databaseRef.ref('users')
      .orderByChild('email').equalTo(props.user.email);
    usersGuilds.on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      const firebaseUser = Object.values(snapshot.val())[0];
      props.onGuildsReceived(firebaseUser.guilds);
    });
  }, [])

  const keys = Object.keys(props.guilds);
  const guildTabs = Object.values(props.guilds).map((guild, index) => {
    const currKey = keys[index];
    return (
      <ListItem button
        onClick={() => {
          props.onGuildClicked(currKey);
          setOpen(false);
        }}
        selected={props.currentGuild === currKey}
        key={currKey}>
        <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={guild} />
      </ListItem>
    );
  });

  const guildContent = keys.map((guildId, index) => {
    if (props.currentGuild !== guildId) return null;
    return (
      <ToggleDisplay key={guildId} show={props.currentGuild === guildId}>
        <ChannelsContainer user={props.user}
          currentGuild={props.currentGuild} />
      </ToggleDisplay>
    );
  });

  return (
    <div className={classes.root}>
      <ChatTopNav open={open}
        {...props}
        classes={classes}
        handleDrawerOpen={handleDrawerOpen} />
      <GuildContent open={open}
        classes={classes}
        guildTabs={guildTabs}
        guildContent={guildContent}
        handleDrawerClose={handleDrawerClose} />
    </div>
  );
}

export default connect(guildsState, guildsActions)(GuildContainer)
