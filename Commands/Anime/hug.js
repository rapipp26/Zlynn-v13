const { CommandInteraction, MessageEmbed } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../config.json');
const axios = require("axios");

module.exports = { 
    name: 'hug', 
    description: 'Hug someone or hug yourself',
    options: [
        {
            name: "target",
            description: "Pick a user to hug ! <3",
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

        const errembed = new MessageEmbed()
        .setColor("NAVY")
        .setDescription(`${false1} **|** *An error occured while running this command ╰（‵□′）╯*`);

        const url = "https://some-random-api.ml/animu/hug";


        let data, response; 

        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return interaction.reply({ embeds: [errembed] })
        }

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(data.link)
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        if(target) {
            embed.setAuthor(`${interaction.user.tag} hugs ${target.user.tag} <3 !!`)
        } else {
            embed.setAuthor(`${interaction.user.tag} need hugs.. :C`)
        }

        interaction.reply({ embeds: [embed] })
    }
}