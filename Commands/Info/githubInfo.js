const axios = require('axios');
const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'github', 
    description: 'Get github information by providing they\'re name',
    options: [
        {
            name: "name",
            description: "Provide the github name",
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
        const embed = new MessageEmbed();
        const name = interaction.options.getString("name");
        const response = await axios.get(`https://api.popcat.xyz/github/${name}`)

        if(response.data.error) {
            embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(`User not found`)
                .setFooter("🔍")
                .setTimestamp();
           interaction.reply({embeds: [embed], ephemeral: true});
        } // Credit to chad andrew#3033 :mengontol:

        try {
            embed.setAuthor("Github Information 🕹", client.user.avatarURL({ format: "png" }))
            .setThumbnail(`${response.data.avatar}`)
            .setColor("LUMINOUS_VIVID_PINK")
            .setDescription(`${response.data.bio}`)
            .addFields(
                {
                    name: "Name",
                    value: `${response.data.name}`,
                    inline: true
                },
                {
                    name: "Company",
                    value: `${response.data.company}`,
                    inline: true
                },
                {
                    name: "Location",
                    value: `${response.data.location}`,
                    inline: true
                },
                {
                    name: "Email",
                    value: `${response.data.email}`,
                    inline: true
                },
                {
                    name: "Twitter",
                    value: `${response.data.twitter}`,
                    inline: true
                },
                {
                    name: "Public Repo",
                    value: `${response.data.public_repos}`,
                    inline: true
                },
                {
                    name: "Public Gists",
                    value: `${response.data.public_gists}`,
                    inline: true
                },
                {
                    name: "Followers",
                    value: `${response.data.followers}`,
                    inline: true
                },
                {
                    name: "Following",
                    value: `${response.data.following}`,
                    inline: true
                },
                {
                    name: "Created At",
                    value: `${response.data.created_at}`,
                    inline: true
                },
                {
                    name: "Updated At",
                    value: `${response.data.updated_at}`,
                    inline: true
                },
            )
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

            const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setStyle("LINK")
                .setURL(`${response.data.url}`)
                .setEmoji("<:Zlynn_Server:911608880436498453>")
                .setLabel("Github Url"),
            );

            interaction.reply({ embeds: [embed], components: [row] })

        } catch (error) {
            embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(`The connection to the API could not be established.`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        };
    }
}