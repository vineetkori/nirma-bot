const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NzY1ODU1NjEzMDY5NTU3Nzky.X4a4nw.C7jsBPcBsDgsvljt1Ji2qW23CR0';
const prefix = '.';
const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));
commandFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
});



bot.on('ready', () => {
  console.log('Nirma cycle started');
});

bot.on('message', message => {
  let args = message.content.substr(prefix.length).split(' ');

  switch (args[0]) {
    case 'ping':
      bot.commands.get('ping').execute(message, args)
      break;

    default:
      break;
  }
});

bot.login(token);