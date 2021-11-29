const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");

module.exports = { 
    name: 'anime_wallpaper', 
    description: 'Send an anime wallpaper',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

            const embed = new MessageEmbed()
            .setAuthor(`${interaction.user.tag} here's your wallpaper （＾∀＾●）ﾉｼ `, client.user.avatarURL({ format: "png" }))
            .setImage(await anime.wallpaper())
            .setColor("RANDOM")
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            interaction.reply({ embeds: [embed] })

        }
    }