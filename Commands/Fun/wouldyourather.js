const { CommandInteraction, MessageEmbed }     = require("discord.js");
const axios                                    = require("axios");
const { true1, false1, arrow, reply1, reply2, thumbsdown, thumbsup } = require ('../../Structures/config.json');

module.exports = {
    name: "wouldyourather",
    description: 'Gives a "Would you rather" question',
    cooldown: 10,
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const embed     = new MessageEmbed();
        const response = await axios.get(`https://api.leoapi.xyz/fun/wouldyourather`);

        if (response.data.error) {
            embed.setTitle("⚠ An error occured ⚠")
                .setColor("YELLOW")
                .setDescription(`${response.data.error}`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        }
            
        try {
            embed.setAuthor("Would you rather..? 🤨")
            .setColor("RANDOM")
            .addFields( { name: "Option 1", value: `${response.data.option_1}`}, { name: "Option 2", value: `${response.data.option_2}`} )
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            await interaction.reply({ embeds: [embed], fetchReply: true }).then((m) => {
                m.react("1️⃣")
                m.react("2️⃣")
            })
        } catch (error) {
            embed.setTitle("⚠ An error occured ⚠")
                .setColor("YELLOW")
                .setDescription(`${error}`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}