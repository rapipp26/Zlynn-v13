const { Client, MessageEmbed, Message, Guild } = require("discord.js");

module.exports = {
  name: "guildCreate",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  execute(guild, client) {

    const Log = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`__The bot has joined a new guild__`)
    .setAuthor({name:`${client.user.tag}`, iconURL:client.user.displayAvatarURL()})
    .addFields(
        {name: "Guild name", value: `\`\`\`${guild.name}\`\`\``, inline: true},
        {name: "Guild ID", value: `\`\`\`${guild.id}\`\`\``, inline: true},
        {name: "Guild owner", value: `<@${guild.ownerId}>`, inline: true},
        {name: "Members", value: `\`\`\`${guild.memberCount}\`\`\``},
        {name: "Number of servers the bot is in", value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true},
        {name: "Leave Guild", value: `/guild-leave \`${guild.id}\``}
    )
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setTimestamp();

    const guild_logs = client.channels.cache
    .get("948060231332692021")
    .send({ embeds: [Log] });
  },
};
