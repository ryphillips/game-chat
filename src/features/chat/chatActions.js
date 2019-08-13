
export function selectGuild(guild)  {
  return {
    type: 'GUILD_SELECTED',
    payload: {
      guild
    }
  };
}

export function receiveGuilds(guilds) {
  return {
    type: 'GUILD_RECEIVED',
    payload: {
      guilds
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

export function  receiveChannels(channels) {
  return {
    type: 'CHANNEL_RECEIVED',
    payload: {
      channels
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