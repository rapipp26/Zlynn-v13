const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");

module.exports = { 
    name: 'waifu', 
    description: 'Send a ur waifu gift',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

            const embed = new MessageEmbed()
            .setAuthor(`${interaction.user.tag} waifu is... `, client.user.avatarURL({ format: "png" }))
            .setImage(await anime.kiss())
            .setColor("RANDOM")
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            interaction.reply({ embeds: [embed] })

        }
    }