import { combineReducers } from 'redux';
import authReducer from '../../features/auth/authReducer';
import chatReducer from '../../features/chat/reducers';

export default combineReducers({
  auth_: authReducer,
  chat: chatReducer,
});