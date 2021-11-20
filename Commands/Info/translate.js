const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown, piano, human, setting } = require ('../../config.json');
const translate = require('@iamtraction/google-translate')

module.exports = { 
    name: 'translate', 
    description: 'Translate a language that you dont understand',
    options: [
        {
            name: "text",
            description: "Provide a text to translate",
            type: "STRING",
            required: true
        },
        {
            name: "language",
            description: "Type a language ISO code",
            type: "STRING",
            required: true
        }
    ],

    async execute(interaction, client) {
        const embed = new MessageEmbed();
        const text = interaction.options.getString("text")
        const lang = interaction.options.getString("language")

        translate(text , { to: lang }).then(res => {
            embed.setAuthor("Translate 🌎", client.user.avatarURL({ format: "png" }))
            .addFields(
                {
                    name: "Text",
                    value: `${text}`
                },
                {
                    name: "Translated text",
                    value: `${res.text}`
                }
            )
            .setColor("RANDOM")
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
            interaction.reply({ embeds: [embed] })
          }).catch(err => {
            embed.setTitle("⚠ An error occurred ⚠")
            .setColor("YELLOW")
            .setDescription("Please provide a valid ISO 639-1 Codes, you can check it by pressing the button below.")
            .setFooter("❗")
            .setTimestamp();

            const ss = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setStyle("LINK")
                .setURL("https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes")
                .setEmoji("🔎")
                .setLabel("ISO 639-1 Codes"),
            );
            interaction.reply({ fetchReply: true, embeds: [embed], components: [ss] })
          });
    }
}