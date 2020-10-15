module.exports = {
  name: 'ping',
  description: 'Says ping!',
  async execute(message, args) {
    message.channel.send('pong!');
  }
};