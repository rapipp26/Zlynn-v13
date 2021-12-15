const { CommandInteraction, Client, MessageEmbed, Guild, MessageActionRow, MessageButton } = require("discord.js");
const { connection } = require("mongoose");
const config = require("../../Structures/config.json")

module.exports = {
    name: "botinfo",
    description: "Shows the bot's status",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor("My information! >\"< ")
            .setDescription(`╭**Client**: \`🟢 ONLINE\` - \`${client.ws.ping}ms\`\n︱**Database**: \`${switchTo(connection.readyState)}\`\n╰**Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R> \n \n **Program**: \n🔋・**Node.js**: \`${process.version}\`\n${config.logo}・**Discord.js**: \`${require("discord.js").version}\`\n🧰・**MongoDB**: \`${require("mongoose").version}\`\n⏱・**Mongoose**: \`${require("mongoose").version}\``)
            .addField("**__Commands__**", `\`${client.commands.size}\` commands loaded.`, true)
            .addField("**__Guilds__**", `\`${client.guilds.cache.size}\` guilds connected.`, true)
            .addField("**__Users__**", `\`${client.users.cache.size}\` users connected.`, true)
            .setThumbnail(client.user.avatarURL({ format: "png", dynamic: true, size: 1024 }))
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        const row = new MessageActionRow()
        .addComponents([
            new MessageButton()
            .setStyle("LINK")
            .setLabel("Support Server")
            .setEmoji(`${config.server}`)
            .setURL("https://discord.gg/Qev2exTvMd")
        ])

        interaction.reply({ embeds: [Response], components: [row] });
    }
};

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = "🔴 DISCONNECTED";
            break;
        case 1:
            status = `🟢 CONNECTED`
            break;
        case 2:
            status = `🟡 CONNECTING`
            break;
        case 3:
            status = `🔵 DISCONNECTING`
            break;
    }
    return status;
}