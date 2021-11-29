const { CommandInteraction, MessageEmbed, Client, MessageButton, MessageActionRow } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../Structures/config.json');

module.exports = { 
    name: 'help', 
    description: 'Gives all available bot commands',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

      const embed = new MessageEmbed()
      .setAuthor("Commands information", client.user.avatarURL({ format: "png" }))
      .setDescription("\`Hello fellas 👋, Here is all the available commands category. If you found something wrong about the commands, please report it to our support server below.\`\n ")
      .addFields(
        {
          name: "> 🍙・Anime Commands",
          value: "```/baka | /bite | /anime_quote | /blush | /cuddle | /dance | /slap```"
        },
        {
          name: "> 📷・Image Commands",
          value: "```/blur | /gay | /simpcard | /stupid | /youtube```"
        },
        {
          name: "> 📌・Information Commands",
          value: "```/botinfo | /reddit | /zoo | /status | /translate | /lyric | /hexcolor | /steam | /github```"
        },
        {
          name: "> 😂・Fun Commands",
          value: "```/emojify | /wouldyourather | /pokemon```"
        },
        {
          name: "> 📟・System Commands",
          value: "```/giveaway start | /giveaway actions | /music play | /music volume | /music settings```"
        }
      )
      .setColor("GREEN")
      .setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
      .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

      const ss = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setURL("https://discord.gg/Qev2exTvMd")
          .setEmoji("<:Zlynn_Server:911608880436498453>")
          .setLabel("Support Server"),
      );

      interaction.reply({ fetchReply: true, embeds: [embed], components: [ss] })
    }
}