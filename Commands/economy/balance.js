const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const schema = require("../../Schemas/economyDB")
module.exports = { 
    name: 'cash', 
    description: 'Give details and actions about cash',
    options: [
        {
            name: "check",
            description: "Check the users cash",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "target",
                    description: "Provide the user to check their balance",
                    type: "USER",
                    required: false
                },
            ]
        },
        {
            name: "deposit",
            description: "Deposit some cash to your bank account",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "amount",
                    description: "Provide the amount to deposit",
                    type: "INTEGER",
                    required: true
                },
            ]
        },
        {
            name: "withdraw",
            description: "Withdraw some balance to your wallet",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "amount",
                    description: "Provide the amount to withdraw",
                    type: "INTEGER",
                    required: true
                },
            ]
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, user } = interaction;

        let subc = options.getSubcommand();
        let target = options.getUser("target");
        let amount = options.getInteger("amount")
        if(!target) target = user;

        schema.findOne({ userId : target.id }, async(err, docs) => {
            if(err) throw err;
            if(!docs) docs = await schema.create({ userId: target.id })

            switch(subc) {
                case "check" :
                    const embed = new MessageEmbed()
                    .setAuthor(`${target.tag}'s money`)
                    .setColor("GREEN")
                    .addFields(
                        {
                            name: "Wallet/Cash",
                            value: `\`\`\`js\n${docs.cash.toLocaleString()}\n\`\`\``,
                            inline: true
                        },
                        {
                            name: "Bank Account",
                            value: `\`\`\`js\n${docs.bank.toLocaleString()}\n\`\`\``,
                            inline: true
                        }
                    )
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    return interaction.reply({ embeds: [embed] })
                
                case "deposit" :
                    if(docs.coins < amount) return interaction.reply({ content: `${client.config.false1} Your cash is less than the amount you want to deposit`, ephemeral: true})

                    docs.bank += amount
                    docs.cash -= amount 
                    await docs.save();
                    return interaction.reply({ content: `${client.config.true1} Successfully deposited \`${amount.toLocaleString()}\` to your bank account`})

                case "withdraw" :
                        if(docs.bank < amount) return interaction.reply({ content: `${client.config.false1} Your bank account balance is less than the amount you want to withdraw`, ephemeral: true })
    
                        docs.bank -= amount
                        docs.cash += amount 
                        await docs.save();
                        return interaction.reply({ content: `${client.config.true1} Successfully withdraw \`${amount.toLocaleString()}\` to your wallet` })
                }
            })
        }
    }