import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';

const bot = new Client();
const token = 'NzY1ODU1NjEzMDY5NTU3Nzky.X4a4nw.C7jsBPcBsDgsvljt1Ji2qW23CR0';
const prefix = '.';
bot.commands = new Collection();

const commandFiles = readdirSync('./commands/').filter(file => file.endsWith('js'));
commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
});



bot.on('ready', () => {
  console.log('Nirma cycle started');
});

bot.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.substr(prefix.length).split(' ');
  const commands = args.shift().toLowerCase();

  switch (commands) {
    case 'ping':
      bot.commands.get('ping').execute(message, args)
      break;
    case 'help':
      bot.commands.get('help').execute(message, args)
      break;

    default: malapropism
      break;
  }
});

bot.login(token);