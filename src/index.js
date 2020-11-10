const config = require('./../config/config.json');
const Discord = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

const bot = new Discord.Client();
bot.commands = new Map();

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

  if (!bot.commands.get(command)) return;

  switch (command) {
    case 'help':
      bot.commands.get('help').execute(message, args);
      break;
    case 'ping':
      bot.commands.get('ping').execute(message, args);
      break;
    case 'sleep':
      bot.commands.get('sleep').execute(message, args);
      break;
    case 'afk':
      bot.commands.get('afk').execute(message, args);
      break;

    default:
      break;
  }
});

bot.login(config.DISCORD_BOT.TOKEN);

(async function registerCommands(dir = 'commands') {
  // Read the directory/file
  let files = await fs.readdir(path.join(__dirname, dir));
  // Loop through each file
  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) { // If file is a drectory, recusively call registerCommands()
      registerCommands(path.join(dir, file));
    } else {
      if (file.endsWith('.js')) {
        let commandName = file.substr(0, file.indexOf('.js'));
        let commandModule = require(path.join(__dirname, dir, file));

        bot.commands.set(commandName, commandModule);
      }
    }
  }
})()
  .then(() => console.log('Registered all models successfully'))
  .catch(err => {
    console.log(err);
    process.exit();
  });
