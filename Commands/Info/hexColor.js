const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'hexcolor', 
    description: 'Get info from the provided hex color',
    options: [
        {
            name: "hex_color",
            description: "Please type a hex color code",
            type: "STRING",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const color = await interaction.options.getString("hex_color");
        const axios = require("axios");
        const embed = new MessageEmbed();
        const response = await axios.get(`https://api.popcat.xyz/color/${color}`)

        if(color.includes("#")) return interaction.reply({ embeds: [new MessageEmbed()
            .setTitle("⚠ An error occurred ⚠")
            .setColor("YELLOW")
            .setDescription("Please remove `#` inside your color code, example: \n ```/hexcolor hex_color:303136```")
            .setFooter("❗")
            .setTimestamp()]})

            if (response.data.error) {
                embed.setTitle("⚠ An error occurred ⚠")
                    .setColor("YELLOW")
                    .setDescription(error.response.data.message)
                    .setFooter("🔍")
                    .setTimestamp();
                return interaction.reply({embeds: [embed], ephemeral: true});
            }

        try {
            embed.setAuthor("Colors 🌈", client.user.avatarURL({ format: "png" }))
            .addFields(
                {
                    name: "Hex",
                    value: `${response.data.hex}`
                },
                {
                    name: "Name",
                    value: `${response.data.name}`
                },
                {
                    name: "R.G.B",
                    value: `${response.data.rgb}`
                },
                {
                    name: "Brightened",
                    value: `${response.data.brightened}`
                },
            )
            .setColor(`${response.data.hex}`)
            .setThumbnail(`${response.data.color_image}`)
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

            interaction.reply({ embeds: [embed] })

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