const { CommandInteraction, MessageEmbed } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../Structures/config.json');
const axios = require("axios");

module.exports = { 
    name: 'pat', 
    description: 'Pats someone ;3',
    options: [
        {
            name: "target",
            description: "Pick a user to pat ! :3",
            type: "USER",
            required: true
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

        const url = "https://some-random-api.ml/animu/pat";


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
        .setAuthor(`${interaction.user.tag} pats ${target.user.tag} o(≧口≦)o`)
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        interaction.reply({ embeds: [embed] })
    }
}