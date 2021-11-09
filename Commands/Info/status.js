const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready.js")
const { reply1, reply2 } = require("../../config.json")


module.exports = {
    name: "status",
    description: "Gives the bot status and information",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const Response = new MessageEmbed()
        .setAuthor("My status and information!")
        .setColor("PURPLE")
        .addFields(
            {
                name: "🤖・Client",
                value: `${reply1} \`🟢 ONLINE\``
            },
            {
                name: "🏓・Ping",
                value: `${reply1} \`${client.ws.ping}ms\``
            },
            {
                name: "⏲・Uptime",
                value: `${reply1} <t:${parseInt(client.readyTimestamp / 1000)}:R>`
            },
            {
                name: "🏬・Database",
                value: `${reply1} \`${switchTo(connection.readyState)}\``
            }
        )
        .setFooter(`Executed by ${interaction.user.tag}`)
        .setTimestamp();
        interaction.reply({ embeds: [Response] })

    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `🔴 DISCONNECTED`
        break;
        case 1 : status = `🟢 CONNECTED`
        break;
        case 2 : status = `🟠 CONNECTING`
        break; 
        case 3 : satus = `🟣 DISCONNECTING`
        break;
    }
    return status; 
}