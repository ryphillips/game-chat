
export function selectGuild(guild)  {
  return {
    type: 'GUILD_SELECTED',
    payload: {
      guild
    }
  };
}

export function selectChannel(channel) {
  return {
    type: 'CHANNEL_SELECTED',
    payload: {
      channel
    }
  };
}

export function typing(userName) {
  return {
    type: 'TYPING',
    payload: {
      userName
    }
  };
}

export function receiveMessages(messages) {
  return {
    type: 'MESSAGES_RECEIVED',
    payload: {
      messages
    }
  };
}

export function receiveMessage(message) {
  return {
    type: 'MESSAGE_RECEIVED',
    payload: {
      message
    }
  };
}