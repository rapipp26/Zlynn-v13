const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");

module.exports = { 
    name: 'sad', 
    description: 'Send a sad gift',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

            const embed = new MessageEmbed()
            .setAuthor(`${interaction.user.tag} needs support (っ °Д °;)っ`, client.user.avatarURL({ format: "png" }))
            .setImage(await anime.cry())
            .setColor("RANDOM")
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            interaction.reply({ embeds: [embed] })

        }
    }