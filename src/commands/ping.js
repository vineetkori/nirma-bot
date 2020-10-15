module.exports = {
  name: 'ping',
  description: 'Says ping!',
  execute(message, args) {
    message.channel.send('pong!');
  }
};