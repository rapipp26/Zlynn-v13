const { CommandInteraction, MessageEmbed, Client, Message, MessageActionRow, MessageButton } = require('discord.js');
const schema = require("../../Schemas/economyDB");
const ms = require("parse-ms");

module.exports = {
    name: "balance",
    cooldown: 5,
    description: "A simple economy command.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        schema.findOne({ userId : interaction.user.id }, async(err, docs) => {
            if(err) throw err;
            if(!docs) docs = await schema.create({ userId: interaction.user.id });

            const embed = new MessageEmbed()
            .setAuthor({ name: `${interaction.user.tag}'s Cash Info 💳`}, client.user.displayAvatarURL({ format: "png" }))
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM");

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Deposit")
                .setStyle("SUCCESS")
                .setCustomId("depo")
                .setEmoji(`${client.config.bank}`),
                new MessageButton()
                .setLabel("Withdraw")
                .setStyle("SUCCESS")
                .setCustomId("with")
                .setEmoji(`${client.config.dollar}`),
                new MessageButton()
                .setLabel("Daily")
                .setStyle("SUCCESS")
                .setCustomId("dai")
                .setEmoji(`${client.config.daily}`),
            );

            const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Deposit")
                .setStyle("SUCCESS")
                .setCustomId("depo")
                .setEmoji(`${client.config.bank}`),
                new MessageButton()
                .setLabel("Withdraw")
                .setStyle("SUCCESS")
                .setCustomId("with")
                .setEmoji(`${client.config.dollar}`),
                new MessageButton()
                .setLabel("Daily")
                .setStyle("DANGER")
                .setCustomId("dai")
                .setEmoji(`${client.config.daily}`),
            );

            let timeout = 86400000
            let ra = Math.floor(Math.random() * 2000 ) + 500

            //Daily button
            if(timeout - (Date.now() - docs.daily) > 0) {
                let tl = ms(timeout - (Date.now() - docs.daily))
                await embed.addFields(
                    {
                        name: `${client.config.dollar} Cash`,
                        value: `\`\`\`js\n${docs.cash.toLocaleString()}\n\`\`\``
                    },
                    {
                        name: `${client.config.bank} PiggyBank`,
                        value: `\`\`\`js\n${docs.bank.toLocaleString()}\n\`\`\``
                    },
                    {
                        name: `${client.config.daily} Daily Cash`,
                        value: `**${tl.hours}h, ${tl.minutes}m, ${tl.seconds}s**`
                    }
                );
                return interaction.reply({ embeds: [embed], components: [row2] })
            } else {
                await embed.addFields(
                    {
                        name: `${client.config.dollar} Cash`,
                        value: `\`\`\`js\n${docs.cash.toLocaleString()}\n\`\`\``
                    },
                    {
                        name: `${client.config.bank} PiggyBank`,
                        value: `\`\`\`js\n${docs.bank.toLocaleString()}\n\`\`\``
                    },
                )
                .setDescription(`${client.config.checked} Your daily cash is ready! Claim it by clicking the button below.`)
                return interaction.reply({ embeds: [embed], components: [row] })
            }
            //Daily button

    })
}
}