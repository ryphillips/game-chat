import { databaseRef } from '../../firebase';
export function selectGuild(guild) {
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

export function receiveChannels(channels) {
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

export function addChannelsListener(guildId) {
  return (dispatch) => {
    databaseRef.ref(`guilds/${guildId}/channels`)
      .on('value', function(snapshot) {
        dispatch(receiveChannels(snapshot.val()));
      });
  };
}

export function addGuildsListener(user) {
  return (dispatch) => {
    const usersGuilds = databaseRef.ref('users')
      .orderByChild('email').equalTo(user.email);
    usersGuilds.on('value', function(snapshot) {
      const firebaseUser = Object.values(snapshot.val())[0];
      dispatch(receiveGuilds(firebaseUser.guilds));
    });
  };
}

export function addMessageListener(channelId) {
  return (dispatch) => {
    const messageRef = databaseRef.ref('messages/' + channelId)
      .orderByKey().limitToLast(100);
    messageRef.on('child_added', function (snapshot) {
      dispatch(receiveMessage(snapshot.val()));
    });
  };
}

export function addMessage(text, channelId, user) {
  databaseRef.ref('messages/'+channelId)
    .push({
      text: text,
      author: user
    });
}

export function addChannel(name, )
