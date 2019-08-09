import { createReducer } from '../../../common/utils/reducerUtils';

const initialState = {
  messages: []
};

function addAllMessages(state, payload) {
  return  {
    
  }
}

export default createReducer(initialState, {
  ['MESSAGES_RECEIVED']: addAllMessages,

});