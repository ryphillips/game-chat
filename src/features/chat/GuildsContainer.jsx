import React from 'react';
import { connect } from 'react-redux';
import * as Actions from './chatActions';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ToggleDisplay from '../../common/components/toggleDisplay';
import ChatTopNav from './components/ChatTopNav';
import GuildsDrawerStyles from './styles/GuildsDrawerStyles';
import ChannelsContainer from './ChannelsContainer';
import GuildContent from './components/GuildsContent';
import { selectGuilds, selectCurrentGuild } from './chatSelectors';
import { Forum } from '@material-ui/icons';

const guildsState = (state) => {
  return {
    guilds: selectGuilds(state),
    currentGuild: selectCurrentGuild(state)
  };
};
const guildsActions = {
  onGuildClicked: Actions.selectGuild,
  addGuildsListener: Actions.addGuildsListener
};

function GuildContainer(props) {
  const classes = GuildsDrawerStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  React.useEffect(() => props.addGuildsListener(props.user), []);
  const keys = Object.keys(props.guilds);
  const guilds = Object.values(props.guilds)

  const guildTabs = guilds.map((guild, i) => {
    const currKey = keys[i];
    return (
      <ListItem button key={currKey}
        onClick={() => {
          props.onGuildClicked(currKey);
          setOpen(false);
        }}
        selected={props.currentGuild === currKey} >
        <ListItemIcon>
          <Forum />
        </ListItemIcon>
        <ListItemText primary={guild} />
      </ListItem>
    );
  });

  const guildContent = keys.map((guildId) => (
    <React.Fragment key={guildId} >
      {props.currentGuild !== guildId ? null :
        <ToggleDisplay show={props.currentGuild === guildId}>
          <ChannelsContainer user={props.user}
            currentGuild={props.currentGuild} />
        </ToggleDisplay>}
    </React.Fragment>
  ));

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
