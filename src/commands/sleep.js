const config = require('./../../config/config.json');

// TODO cancel sleep timer

let sleepers = new Map();
const msCoversion = 60000; // milliseconds
const defaultTimeout = 15; // minutes
const minTimeout = 5; // minutes
const maxTimeout = 90; // minutes
const clearCmds = ['c', 'can', 'cancel', 'clear', 'abort'];

module.exports = {
  name: 'sleep',
  description: 'Moves user to an afk channel after a specified time or 15m by default.',
  async execute(message, args) {

    const member = message.guild.member(message.member.user.id);
    const afkChannelId = config.DISCORD_BOT.AFK_CHANNEL_ID;
    const timeout = getTimeout(args);

    if (member) {
      // if timer already set
      if (sleepers.has(member.id)) {

        // if explicit cancel cmd, cancel current timer and return
        if (clearCmds.findIndex(cmd => cmd === args[0]) > -1) {
          message.reply('I see you changed your mind :eyes: Okay! Welcome back to sed reality.');

          clearTimeout(sleepers.get(member.id).timer);
          console.log('Timer cleared');

          sleepers.delete(member.id);
          console.log(`${member.user.tag} cancelled their timer`);
          return;
        }

        // if new timeout, cancel current timer and add new
        if (typeof Number(args[0]) === 'number') {
          console.log('Adding new timer');
          clearTimeout(sleepers.get(member.id).timer);
          sleepers.delete(member.id);
          // proceeds to 'if afkChannelId' to add new
        } else {
          // garbage command
          return;
        }
      }

      if (afkChannelId) {
        // If they are not in a vc
        if (!member.voice.channelID) {
          message.reply('you are not connected to a voice chat :upside_down:');
          console.log(`${member.user.tag} not connected to a voice chat.`);
          return;
        }

        // If they are already in the afk vc
        if (member.voice.channelID === afkChannelId) {
          message.reply('stop texting while sleeping, boo :eyes:');
          console.log(`${member.user.tag} already in afk vc.`);
          return;
        }

        message.reply(`night, night! :bridge_at_night: Heading to dreamland in T - ${timeout / msCoversion} minutes :rocket:`);

        const timer = setTimeout(() => {
          member.voice
            .setChannel(afkChannelId)
            .then(() => {
              member.nickname ? message.channel.send(`${member.nickname} is now asleep :zzz:`) : message.channel.send(`${member.user.username} is now asleep :zzz:`);
            })
            .catch(err => {
              message.reply('sorry, I was unable to put you to sleep. You on your own fam :upside_down:');
              console.log(err);
            });
          console.log(`${member.user.username} was moved to the afk channel!`);
        }, timeout);

        sleepers.set(member.id, timer);

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
  let timeout = defaultTimeout;
  if (args[0]) {
    if (typeof Number(args[0]) === 'number') {
      if (args[0] > minTimeout && args[0] < maxTimeout) timeout = args[0];
      if (args[0] < minTimeout) timeout = minTimeout;
      if (args[0] > maxTimeout) timeout = maxTimeout;
    }
  }

  return timeout * msCoversion;
}
