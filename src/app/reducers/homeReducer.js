import { combineReducers } from 'redux';
import authReducer from '../../features/auth/authReducer';

export default combineReducers({
  auth: authReducer,
});