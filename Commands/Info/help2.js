const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../config.json');

module.exports = { 
    name: 'help', 
    description: 'Gives all available bot commands',
    options: [
      {
        name: "module",
        description: "Select a module",
        type: "STRING",
        required: true,
        choices: [
          { name: "Anime", value: "Anime" },
          { name: "Information", value: "Information" },
          { name: "Overlay", value: "Overlay" },
          { name: "Memes", value: "Memes" },
          { name: "System", value: "System" }
        ]
      }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
      const module = interaction.options.getString();

      switch(module) {
        case "Anime" : {
          const embed = new MessageEmbed()
          .setAuthor("Anime commands!")
          .setColor("PURPLE")
          .setDescription("*Gives action to your friends such as hugs, pats :). Have fun!*")
          .setFields(
            { name: "Commands", value: "\`\`\`/hug | /pat | /wink\`\`\`" }
          )
          .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
          interaction.reply({ embeds: [embed], ephemeral: true })
        }
      }


    }
}