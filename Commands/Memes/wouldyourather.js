const { CommandInteraction, MessageEmbed }     = require("discord.js");
const axios                                    = require("axios");
const { true1, false1, arrow, reply1, reply2, thumbsdown, thumbsup } = require ('../../config.json');

module.exports = {
    name: "wouldyourather",
    description: 'Gives a "Would you rather" question',
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const subreddit = interaction.options.getString("subreddit") || "";
        const embed     = new MessageEmbed();
            
        try {
            const response = await axios.get(`https://api.leoapi.xyz/fun/wouldyourather`);
            
            embed.setAuthor("Would you rather..? 🤨")
            .setColor("RANDOM")
            .addFields( { name: "Option 1", value: `${response.data.option_1}`}, { name: "Option 2", value: `${response.data.option_2}`} )
            .setFooter(`Executed  by ${interaction.user.tag}`)
            .setTimestamp()
            const message = await interaction.reply({ embeds: [embed], fetchReply: true })
            message.react("1️⃣")
            message.react("2️⃣")
        } catch (error) {
            if (error.response.data.message) {
                embed.setTitle("⚠ An error occured ⚠")
                    .setColor("YELLOW")
                    .setDescription(error.response.data.message)
                    .setFooter("🔍")
                    .setTimestamp();
                return interaction.reply({embeds: [embed], ephemeral: true});
            }

            embed.setTitle("⚠ An error occured ⚠")
                .setColor("YELLOW")
                .setDescription(`The connection to the API could not be established.`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}