import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { connect } from 'react-redux';
import * as Actions from './chatActions';
import { databaseRef } from '../../firebase';
import {
  List,
  Drawer,
  Divider,
  IconButton,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListItem,
  ListItemIcon,
  ListItemText,
  InboxIcon,
  MailIcon
} from '@material-ui/core'
import ToggleDisplay from '../../common/components/toggleDisplay';
import ChatTopNav from './components/ChatTopNav';
import GuildsDrawerStyles from './styles/GuildsDrawerStyles';
import ChannelsContainer from './ChannelsContainer';

const guildsState = (state) => {
  return {
    guilds: state.chat.guilds.data,
    currentGuild: state.chat.guilds.currentGuild,
  };
}
const guildsActions = {
  onGuildClicked: Actions.selectGuild,
  onGuildsReceived: Actions.receiveGuilds
};

function GuildDrawer(props) {
  const classes = GuildsDrawerStyles();
  const theme = useTheme();
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

  const guildTabs = Object.values(props.guilds).map((guild, index) => {
    const currKey = Object.keys(props.guilds)[index];
    console.log(props.currentGuild)
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

  const guildContent = Object.keys(props.guilds).map((guildId, index) => {
    if (props.currentGuild !== guildId) return null;
    return (
      <ToggleDisplay show={props.currentGuild === guildId}>
        <ChannelsContainer user={props.user} currentGuild={props.currentGuild} />
      </ToggleDisplay>
    );
  });

  return (
    <div className={classes.root}>
      <ChatTopNav
        {...props}
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })
        }}
        open={open}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? 
              <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {guildTabs}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {guildContent}
      </main>
    </div>
  );
}

export default connect(guildsState, guildsActions)(GuildDrawer)
