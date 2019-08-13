import { combineReducers } from "redux";
import guildReducer from "./guildsReducer";
import channelReducer from './channelsReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
  guilds: guildReducer,
  channels: channelReducer,
  messages: messagesReducer
});