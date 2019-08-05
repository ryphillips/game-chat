import * as TYPES from './authConstants';

export function socialUserReceived(user) {
  return {
    type: TYPES.SOCIAL_USER_RECEIVED,
    payload: {
      user
    }
  };
}