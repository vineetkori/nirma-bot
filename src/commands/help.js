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
          name: "sleep",
          value: "Moves you the afk channel after 15m so you can sleep in peace. Use '.sleep x' to set x minutes till you're afk'd. Eg .sleep 25"
        }
        ],
        footer: {
          text: "Contact @DarkPandemonium#5125 for support."
        }
      }
    });
  }
};