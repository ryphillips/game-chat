
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

export function  receiveChannel(channel) {
  return {
    type: 'CHANNEL_RECEIVED',
    payload: {
      channel
    }
  }
}

export function receiveMessage(message) {
  return {
    type: 'MESSAGE_RECEIVED',
    payload: {
      message
    }
  };
}