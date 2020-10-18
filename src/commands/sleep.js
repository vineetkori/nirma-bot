const config = require('./../../config/config.json');

// TODO cancel sleep timer

let sleepers = [];
const defaultTimeout = 50;
const msCoversion = 100;

module.exports = {
  name: 'sleep',
  description: 'Moves user to an afk channel after a specified time or 15m by default.',
  async execute(message, args) {

    const member = message.guild.member(message.member.user.id);
    const afkChannelId = config.DISCORD_BOT.AFK_CHANNEL_ID;

    if (member) {
      // timer already set, cancel current and add new timer
      // cancel
      if (afkChannelId) {
        // If they are not in a vc
        if (!member.voice.channelID) {
          message.reply('you are not connected to a voice chat :upside_down:');
          console.log(`${member.user.tag} not connected to a voice chat.`);
          return;
        }

        // If they are already in the afk vc
        if (member.voice.channelID === afkChannelId) {
          message.reply('stop texting while sleeping :eyes:');
          console.log(`${member.user.tag} already in afk vc.`);
          return;
        }

        message.reply(`Night, night, little ${member.user.username}!`);
        setTimeout(() => {
          member.voice
            .setChannel(afkChannelId)
            .then(() => {
              member.nickname ? message.channel.send(`${member.nickname} is sleeping now :zzz:`) : message.channel.send(`${member.user.username} is sleeping now :zzz:`);
            })
            .catch(err => {
              message.reply('sorry, I was unable to put you to sleep. You on your own fam :upside_down:');
              console.log(err);
            });
          console.log(`${member.user.username} was moved to the afk channel!`);
        }, getTimeout(args));
      } else {
        message.channel.send('Sorry fam, I was unable to do that :open_mouth:');
        console.log('Afk channel does not exist');
      }
    } else {
      message.channel.send('Sorry fam, I was unable to do that :anguished:');
      console.log('Guild member does not exist.');
    }

  }
};

function getTimeout(args) {
  const timeout = Number(args[0]);
  console.log(`User sleeping for ${timeout}m`);
  if (typeof timeout === 'number' && timeout > 0 && timeout < 90) return timeout * msCoversion;
  return defaultTimeout * msCoversion;
}
