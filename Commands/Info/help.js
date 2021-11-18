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
          { name: "Images", value: "Images" },
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
      const module = interaction.options.getString("module");

      if(module === "Anime") {
        const embed = new MessageEmbed()
        .setAuthor("Anime commands!")
        .setColor("PURPLE")
        .setDescription("*Gives action to your friends such as hugs, pats :). Have fun!*")
        .setFields(
          { name: "🍙 Commands", value: "\`\`\`/hug | /pat | /wink\`\`\`" }
        )
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed], ephemeral: true })
      }

      if(module === "Information") {
        const embed = new MessageEmbed()
        .setAuthor("Information commands!")
        .setColor("FUCHSIA")
        .setDescription("*You can get information from this command module, more future coming soon :)*")
        .setFields(
          { name: "⚙ Commands", value: "\`\`\`/botinfo | /reddit | /status | /zoo | /help\`\`\`" }
        )
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed], ephemeral: true })
      }

      if(module === "Images") {
        const embed = new MessageEmbed()
        .setAuthor("Images commands!")
        .setColor("BLURPLE")
        .setDescription("*Put overlays to your friend's profile picture, have fun using this commands :)*")
        .setFields(
          { name: "📷 Commands", value: "\`\`\`/gay | /simpcard | /stupid | /blur | /youtube  \`\`\`" }
        )
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed], ephemeral: true })
      }

      if(module === "Memes") {
        const embed = new MessageEmbed()
        .setAuthor("Memes commands!")
        .setColor("WHITE")
        .setDescription("*The best module to having fun with your friends :)*")
        .setFields(
          { name: "🐸 Commands", value: "\`\`\`/emojify | /simpcard | /stupid | /wouldyourather | /youtube\`\`\`" }
        )
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed], ephemeral: true })
      }

      if(module === "System") {
        const embed = new MessageEmbed()
        .setAuthor("System commands!")
        .setColor("DARK_GOLD")
        .setDescription("*Moderate your server using this module :)*")
        .setFields(
          { name: "🔧 Commands", value: "\`\`\`/giveaway start | /giveaway actions | /music play | /music volume | /music settings \`\`\`" }
        )
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        interaction.reply({ embeds: [embed], ephemeral: true })
      }


    }
}