const config = require('./../../config/config.json');

// refer https://rythmbot.co/features#list

module.exports = {
  name: 'help',
  description: 'Helper Embed',
  async execute(message, args) {
    message.author.send({
      embed: {
        color: 0xFF033E,
        title: 'Nirma Commands',
        description: `Use ${config.DISCORD_BOT.PREFIX} before commands. Please do not spam commands. Happy listening!`,
        fields: [{
          name: 'sleep',
          value: `Disconnects you from a voice channel after 15m so you can sleep in peace. Use \'${config.DISCORD_BOT.PREFIX}sleep x\' to set x minutes till you\'re afk\'d. Eg ${config.DISCORD_BOT.PREFIX}sleep 25. You can cancel the timer by entering \'${config.DISCORD_BOT.PREFIX}sleep c/cancel/clear/abort\'`
        }
        ],
        footer: {
          text: 'Contact @DarkPandemonium#5125 for support.'
        }
      }
    });
  }
};