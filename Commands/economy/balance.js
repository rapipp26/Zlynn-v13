const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const schema = require("../../Schemas/economyDB")
const cool = ["768378164942471188", "495488613811879946"];

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
            name: "add",
            description: "Add balance to a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "amount",
                    description: "Provide the amount to add",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "target",
                    description: "Provide the user to check their cash",
                    type: "USER",
                    required: false
                },
            ]
        },
        {
            name: "remove",
            description: "Remove balance from a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "amount",
                    description: "Provide the amount to remove",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "target",
                    description: "Provide the user to check their cash",
                    type: "USER",
                    required: false
                },
            ]
        }
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
                    .setAuthor(`${target.tag}'s cash`)
                    .setColor("GREEN")
                    .addFields(
                        {
                            name: "Wallet/Cash",
                            value: `\`\`\`js\n${docs.cash.toLocaleString()}\n\`\`\``,
                            inline: true
                        },
                        {
                            name: "Bank Account",
                            value: `\`\`\`js\n${docs.bank.toLocaleString()}\n\`\`\``
                        }
                    )
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    return interaction.reply({ embeds: [embed] })

                case "add" :
                if(!cool.includes(user.id)) return interaction.reply({ content: `${client.config.false1} Only developers can use this command.`});
                const embed2 = new MessageEmbed()
                .setDescription(`${user} aka my developer has been adding ${amount.toLocaleString()} to your bank!`)
                .setColor("GREEN")
                docs.bank += amount
                await docs.save();
                try {
                    target.send({ embeds: [embed2] })
                } catch (e) {
                    return interaction.reply({ content: `${client.config.false1} I cant dm this user.`, ephemeral: true })
                }
                interaction.reply({ content: `${client.config.true1} Successfully dm the user and add cash to they're bank!`})
            }
        })

    }
}