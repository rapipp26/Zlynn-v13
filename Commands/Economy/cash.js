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

        const { user } = interaction

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
                await interaction.reply({ embeds: [embed], components: [row2] })
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
                await interaction.reply({ embeds: [embed], components: [row] })
            }
            //Daily button

            const filter = (i) => i.user.id === user.id
            const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 25000})

            collector.on('collect', async (i) => {
                switch(i.customId) {
                    case "depo" :
                        await i.reply({ content: `Please type how many cash do you want to deposit.`});
                        const fil = msg => msg.author.id === user.id;
                         i.channel.awaitMessages({ filter: fil, max: 1 }).then(async col => {
                            if(col.first[0].content === NaN) return interaction.followUp({ content: `${client.config.cancel} Please input a valid number.`})
                            if(docs.cash < col.first[0].content) return interaction.followUp({ content: `${client.config.cancel} Your cash is less than the amount you want to deposit`, ephemeral: true})

                            docs.bank += col.first[0].content;
                            docs.cash -= col.first[0].content;
                            await docs.save();
                            return interaction.followUp({ content: `${client.config.checked} Successfully deposited \`${col.first[0].content.toLocaleString()}\` to your bank account`})
                        })
                        i.update({ embeds: [], components: [], content: `This message has been expired ${client.config.cooldown}`})
                    break;
                    case "with" :
                        await i.reply({ content: `Please type how many cash do you want to withdraw.`});
                        const fil1 = msg => msg.author.id === user.id;
                         i.channel.awaitMessages({ filter: fil1, max: 1 }).then(async col => {
                            if(col.first[0].content === NaN) return interaction.followUp({ content: `${client.config.cancel} Please input a valid number.`})
                            if(docs.bank < col.first[0].content) return interaction.followUp({ content: `${client.config.cancel} Your money in PiggyBank is less than the amount you want to withdraw`, ephemeral: true})

                            docs.cash += col.first[0].content;
                            docs.bank -= col.first[0].content;
                            await docs.save();
                            return interaction.followUp({ content: `${client.config.checked} Successfully deposited \`${col.first[0].content.toLocaleString()}\` to your bank account`})
                        })
                        i.update({ embeds: [], components: [], content: `This message has been expired ${client.config.cooldown}`})
                    break; 
                    case "dai" :
                        docs.daily = Date.now();
                        docs.cash += ra;
                        await docs.save()
                         i.reply({ content: `${client.config.checked} Successfully claimed your daily cash for \`${ra}\``})
                        i.update({ embeds: [], components: [], content: `This message has been expired ${client.config.cooldown}`})
                    break;
                }
            })
            collector.on('end', () => {
                interaction.editReply({ embeds: [], components: [], content: `This message has been expired ${client.config.cooldown}` })
            })

    })
}
}