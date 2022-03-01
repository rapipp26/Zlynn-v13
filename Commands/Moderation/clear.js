const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const { execute } = require('../Info/help2');

module.exports = { 
    name: 'purge', 
    description: 'Deletes a specified number of message from a channel or user',
    permission: "MANAGE_MESSAGES",
    cooldown: 5,
    options: [
        {
            name: "amount",
            description: "Select the amount of message to delete from a channel or target",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Select a target to clear their messages",
            type: "USER",
            required: false
        }
    ],

    async execute(interaction, client) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target")

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK")

        if (Amount > 100 || Amount < 0)
        return interaction.reply({ embed: [new MessageEmbed()
        .setTitle("⚠ An error occurred ⚠")
        .setColor("YELLOW")
        .setDescription(`The amount must be between 0 and 100`)
        .setFooter("🔍")
        .setTimestamp()]});

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`${client.config.delete} **|** Cleared \`${messages.size}\` messages from ${Target}`)
                interaction.reply({ embed: [Response] })
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`${client.config.delete} **|** Cleared \`${messages.size}\` messages from this channel`)
                interaction.reply({ embeds: [Response] })
            })
        }
    }
}