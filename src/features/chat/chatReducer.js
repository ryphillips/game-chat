import { createReducer } from "../../common/utils/reducerUtils";

const initialState = {
  currentGuild: 'Friends'
}


function selectGuild(state, payload) {
  return {
    ...state,
    currentGuild: payload.guildName
  };
}

export default createReducer(initialState, {
  ['GUILD_SELECTED']: selectGuild
});