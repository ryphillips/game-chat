import { createReducer } from "../../common/utils/reducerUtils";
import * as TYPES from './authConstants';

function socialSignIn(state, payload) {
  return {
    user: payload.user
  };
}
export default createReducer({ user: null }, {
  [TYPES.SOCIAL_USER_RECEIVED]: socialSignIn
});