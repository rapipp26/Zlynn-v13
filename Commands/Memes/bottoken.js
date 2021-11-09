const { CommandInteraction, MessageEmbed } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../config.json');
const axios = require("axios");
module.exports = { 
    name: 'token', 
    description: 'Get a bot token',
    options: [
        {
            name: "bot",
            description: "Pick a bot to leak the token",
            type: "USER",
            required: true,
        },
    ] ,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("bot")

        const errembed = new MessageEmbed()
        .setColor("NAVY")
        .setDescription(`${false1} **|** *An error occured while running this command ╰（‵□′）╯*`);
        const notbotembed = new MessageEmbed()
        .setColor("NAVY")
        .setDescription(`${false1} **|** *That user is not a bot ￣へ￣*`);

        const url = "https://some-random-api.ml/bottoken";


        let data, response; 

        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return interaction.reply({ embeds: [errembed] })
        }

        const embed = new MessageEmbed()
        .setAuthor("Token leaked!! 😱😱")
        .setColor("DARK_RED")
        .addField("Client",`${reply1} ${target}`)
        .setFooter(`Executed by ${interaction.user.tag}`)
        .setTimestamp()

        if(!target.user.bot){
            interaction.reply({ embeds: [notbotembed] })
        } else {
            embed.addField(`${reply1} ${target.user.tag}'s token`, `${data.token}`)
        }
        interaction.reply({ embeds: [embed] })
    }
}