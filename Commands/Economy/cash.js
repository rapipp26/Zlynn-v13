const { CommandInteraction, MessageEmbed, Client, Message, MessageActionRow, MessageButton } = require('discord.js');
const schema = require("../../Schemas/economyDB");
const ms = require("parse-ms");

module.exports = {
    name: "balance",
    cooldown: 5,
    description: "A simple economy command.",
    options: [
        {
            name: "user",
            description: "Mention a user to check their balance",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const { user } = interaction;
        const target = interaction.options.getUser("user")

        const row3 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("Deposit")
            .setStyle("SUCCESS")
            .setCustomId("depo")
            .setDisabled(true)
            .setEmoji(`${client.config.bank}`),
            new MessageButton()
            .setLabel("Withdraw")
            .setStyle("SUCCESS")
            .setCustomId("with")
            .setDisabled(true)
            .setEmoji(`${client.config.dollar}`),
            new MessageButton()
            .setLabel("Daily")
            .setStyle("DANGER")
            .setCustomId("dai1")
            .setEmoji(`${client.config.daily}`)
            .setDisabled(true)
        );

        if(target) {
            schema.findOne({ userId : target.id }, async(err, docs) => {
                if(err) throw err;
                if(!docs) docs = await schema.create({ userId: target.id });

                const embed2 = new MessageEmbed()
                .setAuthor({ name: `${target.tag}'s Cash Info 💳`}, client.user.displayAvatarURL({ format: "png" }))
                .setThumbnail(target.displayAvatarURL({ dynamic: true }))
                .setColor("RANDOM")
                .addFields(
                    {
                        name: `${client.config.dollar} Cash`,
                        value: `\`\`\`js\n${docs.cash.toLocaleString()}\n\`\`\``
                    },
                    {
                        name: `${client.config.bank} PiggyBank`,
                        value: `\`\`\`js\n${docs.bank.toLocaleString()}\n\`\`\``
                    }
                )
                return interaction.reply({ embeds: [embed2], components: [row3] })
            })
        } else {

        schema.findOne({ userId : user.id }, async(err, docs) => {
            if(err) throw err;
            if(!docs) docs = await schema.create({ userId: user.id });

            const embed = new MessageEmbed()
            .setAuthor({ name: `${user.tag}'s Cash Info 💳`}, client.user.displayAvatarURL({ format: "png" }))
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
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
                .setCustomId("dai1")
                .setEmoji(`${client.config.daily}`)
                .setDisabled(true)
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
                        value: `\`\`\`${tl.hours}h, ${tl.minutes}m, ${tl.seconds}s\`\`\``
                    }
                );
                await interaction.reply({ embeds: [embed], components: [row2], ephemeral: true  })
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
                await interaction.reply({ embeds: [embed], components: [row], ephemeral: true  })
            }
            //Daily button

            const filter = (i) => i.user.id === user.id
            const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 25000})

            collector.on('collect', async (i) => {
                switch(i.customId) {
                    case "depo" :
                        const d = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId("10")
                            .setLabel("+ 10")
                            .setStyle("SUCCESS"),
                            new MessageButton()
                            .setCustomId("50")
                            .setLabel("+ 50")
                            .setStyle("SUCCESS"),
                            new MessageButton()
                            .setCustomId("100")
                            .setLabel("+ 100")
                            .setStyle("SUCCESS"),
                            new MessageButton()
                            .setCustomId("done")
                            .setLabel("Done")
                            .setStyle("SUCCESS"),
                        )
                        i.reply({ content: `Please click the button below to increase the amount you want to deposit. Amount: \`${docs.withd}\`` })
                    break;
                    case "dai" :
                        docs.daily = Date.now();
                        docs.cash += ra;
                        await docs.save()
                         i.reply({ content: `${client.config.checked} Successfully claimed your daily cash for \`${ra}\``})
                    break;
                }
            })
            collector.on('end', () => {
                interaction.editReply({ embeds: [], components: [], content: `This message has been expired ${client.config.cooldown}` })
            })

    })
}
}
}