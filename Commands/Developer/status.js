const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const cool = ["768378164942471188", "495488613811879946"];
const config = require("../../Structures/config.json");

module.exports = {
  name: "activity",
  description: "Sets the activity for the bot. (Only for devs)",
  options: [
    {
      name: "type",
      description: "Choose between adding or removing the role from member.",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "add",
          value: "add",
        },
        {
          name: "remove",
          value: "remove",
        },
      ],
    },
    {
      name: "activity",
      description: "Choose the activity.",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "WATCHING",
          value: "watching",
        },
        {
          name: "PLAYING",
          value: "playing",
        },
        {
          name: "LISTENING",
          value: "listening",
        },
      ],
    },
    {
      name: "value",
      description: "Enter activity text.",
      type: "STRING",
      required: true,
    },
  ],

  async execute(interaction, client) {
    if (cool.includes(interaction.member.id)) {
      const type = interaction.options.getString("type");
      const activity = interaction.options.getString("activity");
      const text = interaction.options.getString("value");

      const embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`${config.true1} **|** *Succesfully changed the bot presence/activity status o(*^＠^*)o*`)
      const embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`${config.true1} **|** *Succesfully remove the bot presence/activity status o(*^＠^*)o*`)

      switch (type) {
        case "add":
          {
            await client.user.setActivity({
              type: `${activity.toUpperCase()}`,
              name: `${text}`,
            });
            interaction.reply({ embeds: [embed] });
          }
          break;
        case "remove": {
          await client.user.setPresence({ activity: null });
          interaction.reply({ embeds: [embed2] });
          break;
        }
      }
    }
  },
};
