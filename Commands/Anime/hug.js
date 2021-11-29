const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");

module.exports = { 
    name: 'hug', 
    description: 'Send a hug gift',
    options: [
        {
            name: "target",
            description: "Provide a user",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("target")

        if(!target) {
        const embed = new MessageEmbed()
        .setAuthor("Hug 🤗", client.user.avatarURL({ format: "png" }))
        .setImage(await anime.dance())
        .setColor("RANDOM")
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        interaction.reply({ embeds: [embed] })

        } else if(target) {
            const embed = new MessageEmbed()
            .setAuthor(`${interaction.user.tag} hugs ${target.user.tag} (⓿_⓿)`, client.user.avatarURL({ format: "png" }))
            .setImage(await anime.hug())
            .setColor("RANDOM")
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            interaction.reply({ embeds: [embed] })

        }
    }
}