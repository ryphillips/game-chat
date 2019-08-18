import React from 'react';
import { connect } from 'react-redux';
import { addGuildsListener, selectGuild } from  './chatActions';
import ChatTopNav from './components/ChatTopNav';
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
  onGuildClicked: selectGuild,
  addGuildsListener
};

function GuildsContainer(props) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => props.addGuildsListener(props.user), []);
  return (
    <React.Fragment>
      <ChatTopNav open={open} {...props}
        handleDrawerOpen={() => setOpen(true)} />
      <GuildContent open={open} {...props}
        handleDrawerClose={() => setOpen(false)} />
    </React.Fragment>
  );
}
GuildsContainer.propTypes = {
  guilds: PropTypes.object,
  currentGuild: PropTypes.string
};

export default connect(
  guildsState,
  guildsActions
)(GuildsContainer);
