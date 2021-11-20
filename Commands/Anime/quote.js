const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown, piano, human, setting } = require ('../../config.json');

module.exports = { 
    name: 'anime_quote', 
    description: 'Gets some quotes from and anime character',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new MessageEmbed();

        try {
            const response = await axios.get(`https://some-random-api.ml/animu/quote`);

            embed.setAuthor("Anime quotes <3!", client.user.avatarURL({ format: "png" }))
            .addFields(
                {
                    name: "Character",
                    value: `${response.data.characther}`,
                    inline: true
                },
                {
                    name: "Anime",
                    value: `${response.data.anime}`,
                    inline: true
                }, 
                {
                    name: "Sentence",
                    value: `${response.data.sentence}`
                }
            )
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            interaction.reply({ embeds: [embed] })
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