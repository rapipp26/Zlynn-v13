const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require("../../Structures/config.json")
const GuildSchema = require("../../Schemas/blacklistwordDB")

module.exports = {
name: "messageCreate",
async execute(message, client) {
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