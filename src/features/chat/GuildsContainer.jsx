import React from 'react';
import { connect } from 'react-redux';
import * as Actions from './chatActions';
import ChatTopNav from './components/ChatTopNav';
import GuildsDrawerStyles from './styles/GuildsDrawerStyles';
import GuildContent from './components/GuildsContent';
import { selectGuilds, selectCurrentGuild } from './chatSelectors';
import PropTypes from 'prop-types';

function guildsState(state) {
  return {
    guilds: selectGuilds(state),
    currentGuild: selectCurrentGuild(state)
  };
}
const guildsActions = {
  onGuildClicked: Actions.selectGuild,
  addGuildsListener: Actions.addGuildsListener
};

function GuildContainer(props) {
  const classes = GuildsDrawerStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  React.useEffect(() => 
    props.addGuildsListener(props.user), []);
  return (
    <div className={classes.root}>
      <ChatTopNav open={open}
        {...props}
        classes={classes}
        handleDrawerOpen={handleDrawerOpen} />
      <GuildContent open={open}
        classes={classes}
        {...props}
        handleDrawerClose={handleDrawerClose} />
    </div>
  );
}

GuildContainer.propTypes = {
  guilds: PropTypes.object,
  currentGuild: PropTypes.string
};

export default connect(
  guildsState,
  guildsActions
)(GuildContainer)
