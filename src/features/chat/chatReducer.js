import { createReducer } from "../../common/utils/reducerUtils";

const initialState = {/*
  typers: [],
  guilds: mockGuilds,*/
  currentGuild: 'test',/*
  currentChannel: mockGuilds[0].channels[0]*/
};

function selectGuild(state, payload) {
  return {
    ...state,
    currentGuild: payload.guild,
  };
}

function selectChannel(state, payload) {
  return {
    ...state,
    currentChannel: payload.channel
  }
}


export default createReducer(initialState, {
  ['GUILD_SELECTED']: selectGuild,

  ['CHANNEL_SELECTED']: selectChannel
});