const { CommandInteraction, MessageEmbed }     = require("discord.js");
const axios                                    = require("axios");
const { true1, false1, arrow, reply1, reply2, thumbsdown, thumbsup } = require ('../../Structures/config.json');

module.exports = {
    name: "emojify",
    description: 'Gives the emoji from the text that you typed',
    cooldown: 10,
    options: [
        {
            name: "text",
            description: "Provide a text to emojified",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const text = interaction.options.getString("text") || "";
        const embed     = new MessageEmbed();
        const response = await axios.get(`https://api.leoapi.xyz/text/emojify?text=${text}`);

        if (response.data.error) {
            embed.setTitle("⚠ An error occured ⚠")
                .setColor("YELLOW")
                .setDescription(`${response.data.error}`)
                .setFooter("🔍")
                .setTimestamp();
            return interaction.reply({embeds: [embed], ephemeral: true});
        }
            
        try {

            interaction.reply({ content: `${response.data.emojified}`, fetchReply: true })
        } catch (error) {

            embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(`The connection to the API could not be established.`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}