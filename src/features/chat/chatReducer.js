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

function addMessage(state, payload) {
  return {
    ...state,
    currentChannel: {
      ...state.currentChannel,
      messages: [...state.currentChannel.messages, payload.message]
    }
  };
}

export default createReducer(initialState, {
  ['GUILD_SELECTED']: selectGuild,
  ['MESSAGE_RECEIVED']: addMessage,
  ['CHANNEL_SELECTED']: selectChannel
});