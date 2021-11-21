const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown, piano, human, setting } = require ('../../config.json');
const axios = require("axios");

module.exports = { 
    name: 'lyric', 
    description: 'Find provided song title lyrics',
    options: [
        {
            name: "song_title",
            description: "Provide the song title",
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
        const song = interaction.options.getString("song_title");

        try {
            const response = await axios.get(`https://some-random-api.ml/lyrics?title=${song}`)

            embed.setAuthor("Song lyrics! 🎶", client.user.avatarURL({ format: "png" }))
            .setColor("DARK_BLUE")
            .addFields(
                {
                    name: "Song Title",
                    value: `${response.data.title}`
                },
                {
                    name: "Song Author",
                    value: `${response.data.author}`,
                    inline: true
                },
                {
                    name: "Song Lyric",
                    value: `${response.data.lyrics}`
                }
            )
            //.setThumbnail(response.data.thumbnail.genius)
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

            //const ss = new MessageActionRow()
            //.addComponents(
            //  new MessageButton()
            //    .setStyle("LINK")
            //    .setURL(`${response.data.links.genius}`)
            //    .setEmoji("🎵")
            //    .setLabel("Lyrics"),
            //);

            interaction.reply({ fetchReply: true, embeds: [embed] }) //components: [ss]
        } catch (error) {
            if (error.response.data.message) {
                embed.setTitle("⚠ An error occurred ⚠")
                    .setColor("YELLOW")
                    .setDescription(error.response.data.message)
                    .setFooter("🔍")
                    .setTimestamp();
                return interaction.reply({embeds: [embed], ephemeral: true});
            }

            embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(`The connection to the API could not be established.`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}