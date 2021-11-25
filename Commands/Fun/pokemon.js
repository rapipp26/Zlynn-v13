const axios = require('axios');
const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'pokemon', 
    description: 'Gets pokemon information by providing the name',
    options: [
        {
            name: "name",
            description: "Provide the pokemon name",
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
        const pokemon = interaction.options.getString("name")
        const response = await axios.get(`https://some-random-api.ml/pokedex?pokemon=${pokemon}`)
        const embed = new MessageEmbed();

        if (response.data.error) {
            embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(response.data.error)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        };
        try {
            embed.setAuthor("Pokemon! 🐢", client.user.avatarURL({ format: "png" }))
            .setDescription(`${response.data.description}`)
            .setColor("RANDOM")
            .addFields(
                {
                    name: 'Name',
                    value: `${response.data.name}`,
                    inline: true
                },
                {
                    name: 'Id',
                    value: `${response.data.id}`,
                    inline: true
                },
                {
                    name: 'Type',
                    value: `${response.data.type.join(", ")}`,
                    inline: true
                },
                {
                    name: 'Species',
                    value: `${response.data.species.join(", ")}`,
                    inline: true
                },
                {
                    name: 'Abilities',
                    value: `${response.data.abilities.join(", ")}`,
                    inline: true
                },
                {
                    name: 'Height',
                    value: `${response.data.height}`,
                    inline: true
                },
                {
                    name: 'Weight',
                    value: `${response.data.weight}`,
                    inline: true
                },
                {
                    name: 'Gender',
                    value: `${response.data.gender.join(", ")}`,
                    inline: true
                },
                {
                    name: 'Egg Groups',
                    value: `${response.data.egg_groups.join(", ")}`,
                    inline: true
                },
                {
                    name: 'Statistic',
                    value: `HP : ${response.data.stats.hp}\nAttack : ${response.data.stats.attack}\nDefense : ${response.data.stats.defense}\nSp Attack : ${response.data.stats.sp_atk}\n Sp Defense: ${response.data.stats.sp_def}\nSpeed : ${response.data.stats.speed}\nTotal : ${response.data.stats.total}`,
                    inline: true
                },
            )
            .setThumbnail(`${response.data.sprites.animated}`)
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            await interaction.deferReply()
            interaction.editReply({ embeds: [embed] })
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