const schema = require("../../Schemas/blacklistwordDB")
const { MessageEmbed } = require("discord.js");
const config = require("../../Structures/config.json");

module.exports = {
  name: "badword",
  description: "Blacklist a specified word.",
  permission: "ADMINISTRATOR",
  options: [{
    name: "action",
    description: "Add or remove a specified blacklist word.",
    type: "STRING",
    choices: [
      {
        name: "add",
        value: "add"
      },

      {
        name: "remove",
        value: "remove"
      }
    ],
    required: true
  },
    {
      name: "word",
      description: "The word that you want to add or remove",
      type: "STRING",
      required: true
    },
    ],
    async execute(interaction, client) {
      const { options } = interaction;

      const choice = options.getString("action")
      const word = options.getString("word")
      const embed = new MessageEmbed()
      .setDescription(`${config.false1} **|** *This word is already in the blacklisted word list ψ(｀∇´)ψ*`)
      .setColor("RED")
      const embed2 = new MessageEmbed()
      .setDescription(`${config.true1} **|** *Successfully added \`${word}\` to the blacklisted word list φ(゜▽゜*)♪*`)
      .setColor("GREEN")
      const embed3 = new MessageEmbed()
      .setDescription(`${config.false1} **|** *This word is not in the blacklisted word list ψ(｀∇´)ψ*`)
      .setColor("RED")
      const embed4 = new MessageEmbed()
      .setDescription(`${config.true1} **|** *Successfully removed **That Word** from the blacklisted word list φ(゜▽゜*)♪*`)
      .setColor("GREEN")

      let data;
      try {
        data = await schema.findOne({ guildId: interaction.guild.id })
        if(!data) {
          data = await schema.create({ guildId: interaction.guild.id })
        }
      } catch (error) {
        console.log(error)
      }

      if(choice == 'add') {
        const wordToBeAdded = word.toLowerCase()

        if(data.BLW.includes(wordToBeAdded)) return interaction.reply({ embeds: [embed] })

        await interaction.reply({ embeds: [embed2] })
        data.BLW.push(wordToBeAdded)
        await data.save()
      }

      if(choice == 'remove') {
        const wordToBeAdded = word.toLowerCase()
        if(!data.BLW.includes(wordToBeAdded)) return interaction.reply({ embeds: [embed3] })
        let array = data.BLW
        
        array = array.filter(x => x !== wordToBeAdded)
        data.BLW = array
        await interaction.reply({ embeds: [embed4] })

        await data.save()

      }
    }
}