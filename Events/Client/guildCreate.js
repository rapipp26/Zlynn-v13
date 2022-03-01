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
    .setAuthor({name:`New Guild Joined`, iconURL:client.user.displayAvatarURL()})
    .addFields(
        {name: "Guild name", value: `\`\`\`${guild.name}\`\`\``},
        {name: "Guild ID", value: `\`\`\`${guild.id}\`\`\``},
        {name: "Guild owner", value: `<@${guild.ownerId}>`},
        {name: "Guild Members", value: `\`\`\`${guild.memberCount}\`\`\``},
        {name: "Leave Guild", value: `\`\`\`/guild-leave ${guild.id}\`\`\``}
    )
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setTimestamp();

    const guild_logs = client.channels.cache
    .get("948060231332692021")
    .send({ embeds: [Log] });
  },
};
