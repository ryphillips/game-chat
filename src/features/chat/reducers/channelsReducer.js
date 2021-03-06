import { createReducer } from "../../../common/utils/reducerUtils";

const initialState = {
  data: {},
  currentChannel: null
};

export default createReducer(initialState, {
  ['CHANNEL_RECEIVED']:
  function(state, payload) {
    return {
      ...state,
      data: payload.channels
    };
  },

  ['CHANNEL_SELECTED']:
  function(state, payload) {
    return {
      ...state,
      currentChannel: payload.channel
    };
  }
});