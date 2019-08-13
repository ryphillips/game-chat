import { createReducer } from "../../../common/utils/reducerUtils";

const initialState = {
  currentGuild: null,
  data: []
};

export default createReducer(initialState, {
  ['GUILD_SELECTED']: 
  function(state, payload) {
    return {
      ...state,
      currentGuild: payload.guild,
    };
  },

  ['GUILD_RECEIVED']:
  function(state, payload) {
    return {
      ...state,
      data: [...state.data, payload.guild]
    };
  }
});