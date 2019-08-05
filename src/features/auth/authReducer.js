import { createReducer } from "../../common/utils/reducerUtils";
import * as TYPES from './authConstants';

const initialState = {
  user: null
};

function socialSignIn(state, payload) {
  return {
    user: payload.user
  };
}


export default createReducer(initialState, {
  [TYPES.SOCIAL_USER_RECEIVED]: socialSignIn
});