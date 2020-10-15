// refer https://rythmbot.co/features#list

module.exports = {
  name: 'help',
  description: 'Helper Embed',
  async execute(message, args) {
    message.author.send({
      embed: {
        color: 0xFF033E,
        title: "Nirma Commands",
        description: "Use . before commands. Happy listening!",
        fields: [{
          name: "play",
          value: "Plays a song with the given name or url."
        }
        ],
        footer: {
          text: "Contact @DarkPandemonium#5125 if you're facing issues"
        }
      }
    });
  }
};