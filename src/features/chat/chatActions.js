
export function selectGuild(guildName)  {
  return {
    type: 'GUILD_SELECTED',
    payload: {
      guildName
    }
  };
}