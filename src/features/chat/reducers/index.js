import { combineReducers } from "redux";
import guildReducer from "./guildReducer";
import channelReducer from './channelReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
  guilds: guildReducer,
  channels: channelReducer,
  messages: messagesReducer
});