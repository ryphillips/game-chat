import { createReducer } from "../../../common/utils/reducerUtils";

const initialState = {
  data: []
}

export default createReducer(initialState, {
  ['MESSAGE_RECEIVED']:
  function(state, payload) {
    return {
      ...state,
      data: [...state.data, payload.message]
    };
  }
});