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
            }
        })
    }
}