const path = require('path');
const root = path.dirname(require.main.filename);

const Discord = require('discord.js');
const fs = require('fs');
const config = require('./../config/config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(root + '/commands').filter(file => file.endsWith('js'));

bot.on('ready', () => {
  console.log(`${bot.user.tag} spin cycle started`);
});

bot.on('message', (message) => {
  if (!message.content.startsWith(config.DISCORD_BOT.PREFIX) || message.author.bot) return;

  const [command, ...args] = message.content
    .trim()
    .toLowerCase()
    .substr(config.DISCORD_BOT.PREFIX.length)
    .split(/\s+/);

  switch (command) {
    case 'help':
      bot.commands.get('help').execute(message, args)
      break;
    case 'ping':
      bot.commands.get('ping').execute(message, args)
      break;

    default:
      break;
  }
});

bot.login(config.DISCORD_BOT.TOKEN);

commandFiles.forEach(file => {
  const command = require(`${root}/commands/${file}`);
  bot.commands.set(command.name, command);
});
