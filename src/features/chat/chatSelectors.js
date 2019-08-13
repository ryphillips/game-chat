import { createSelector } from 'reselect';

export const selectCurrentGuild = createSelector(
  state => state.chat.guilds,
  guilds => guilds.currentGuild
);

export const selectGuilds = createSelector(
  state => state.chat.guilds,
  guilds => guilds.data
);

export const selectCurrentChannel = createSelector(
  state => state.chat.channels,
  channels => channels.currentChannel
);

export const selectChannels = createSelector(
  state => state.chat.channels,
  channels => channels.data
);

export const selectMessages = createSelector(
  state => state.chat.messages,
  messages => messages.data
);