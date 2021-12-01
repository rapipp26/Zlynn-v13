const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const schema = require("../../Schemas/member-schema")

module.exports = { 
    name: 'balance', 
    description: 'Give details and actions about balance',
    options: [
        {
            name: "check",
            description: "Check the users balance",
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
                    description: "Provide the user to check their balance",
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
                    description: "Provide the user to check their balance",
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
        let subc = interaction.options.getSubcommand();
        let target = interaction.options.getUser("target");
        let Amount = interaction.options.getInteger("amount")
        if(!target) target = interaction.user;


        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        const errembed = new MessageEmbed();


        let data;
        try {
            data = await schema.findOne({ guildId: interaction.guild.id, userId: target.id })
            if(!data) data = schema.create({ guildId: interaction.guild.id, userId: target.id })
        } catch (e) {
            errembed.setTitle("⚠ An error occurred ⚠")
            .setColor("YELLOW")
            .setDescription(`${e}`)
            .setFooter("🔍")
            .setTimestamp();
        interaction.editReply({embeds: [embed], ephemeral: true});
        }

        switch(subc) {
            case "check" : {
                embed.setAuthor(`${target.id}'s balance`)
                .addField("Balance", `${data.coins.toLocaleString()}`)
                .setThumbnail(target.avatarURL({ dynamic: true }))
                interaction.reply({ embeds: [embed] })
            }
            
            case "add" : {
                data.coins += Amount
                await data.save()
                embed.setAuthor(`${target.id}'s balance`)
                .addField("Balance", `+ ${Amount.toLocaleString()}`)
                .setThumbnail(target.avatarURL({ dynamic: true }))
                interaction.reply({ embeds: [embed] })
            }

            case "remove" : {
                if(Amount > data.coins) return interaction.reply({ content: `The amount assigned is more than the user's balance, their balance ${data.coins.toLocaleString()}`, ephemeral: true })
                data.coins -= Amount
                await data.save()
                embed.setAuthor(`${target.id}'s balance`)
                .addField("Balance", `- ${Amount.toLocaleString()}`)
                .setThumbnail(target.avatarURL({ dynamic: true }))
                interaction.reply({ embeds: [embed] })
            }
        }
    }
}