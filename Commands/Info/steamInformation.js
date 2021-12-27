const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'steam', 
    description: 'Get steam games or app by providing the name',
    cooldown: 10,
    options: [
        {
            name: "name",
            description: "Provide the game or app name",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const name = await interaction.options.getString("name");
        const axios = require("axios");
        const embed = new MessageEmbed();
        const response = await axios.get(`https://api.popcat.xyz/steam?q=${name}`)

        if(response.data.error) {
            embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(response.data.error)
                .setFooter("🔍")
                .setTimestamp();
           interaction.reply({embeds: [embed], ephemeral: true});
        } // Credit to chad andrew#3033 :mengontol:

        try {
            embed.setAuthor("Steam information 🎮", client.user.avatarURL({ format: "png"} ))
            .setDescription(`${response.data.description}`)
            .setThumbnail(`${response.data.thumbnail}`)
            .setColor("RANDOM")
            .addFields(
                {
                    name: "Name",
                    value: `${response.data.name}`
                },
                {
                    name: "Price",
                    value: `${response.data.price}`
                },
                {
                    name: "Developer",
                    value: `${response.data.developers.join(", ")}`
                },
            )
            .setImage(`${response.data.banner}`)
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

            const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setStyle("LINK")
                .setURL(`${response.data.website}`)
                .setEmoji("<:Zlynn_Server:911608880436498453>")
                .setLabel("App/Game Website"),
            );

            interaction.reply({ fetchReply: true, embeds: [embed], components: [row] })

        } catch (error) {
            embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(`${error}`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}