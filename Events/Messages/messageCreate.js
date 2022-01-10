const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require("../../Structures/config.json")
const GuildSchema = require("../../Schemas/blacklistwordDB")

module.exports = {
name: "messageCreate",
async execute(message, client) {
  if (message.author.bot) return false;

  if(message.mentions.has(client.user)) return message.reply({
    content: 
    `
    > Hi!, this bot only support \`Slash Commands\` use \`/help\` to get the commands list
    > If you dont see \`Slash Commands\` appearing, please wait for a minute. If it still do not appearing, try to re-invite by kicking me and click this button below
    https://cdn.discordapp.com/attachments/905963716883906600/930058897052553286/unknown.png
    `
  }).then((m) => {
    setTimeout(() => {
      m.delete();
    }, 10000)
  })

        let GuildData;
      try {
        GuildData = await GuildSchema.findOne({ guildId: message.guild.id })
        if(!GuildData) {
          GuildData = await GuildSchema.create({ guildId: message.guild.id })
        }
      } catch (error) {
        console.log(error)
      }

      const embed = new MessageEmbed()
      .setTitle("⚠ Warning ⚠")
      .setDescription(`Your message is blacklisted in **${message.guild}**`)
      .setColor("RED")
      .setFooter("❗")
      .setTimestamp();

      if(GuildData.BLW.some(word => message.content.toLowerCase().includes(word))) {
        message.delete()
        message.author.send({ embeds: [embed] })
      }
    }

}