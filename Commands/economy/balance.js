const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const schema = require("../../Schemas/member-schema")
const cool = ["768378164942471188", "495488613811879946"];

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
                    type: "NUMBER",
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
                    type: "NUMBER",
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
        let Amount = interaction.options.getNumber("amount");
        if(!target) target = interaction.user;


        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        const errembed = new MessageEmbed();

        try {
        let data;
            data = await schema.findOne({ userId: target.id })
            if(!data) data = await schema.create({ userId: target.id })

        switch(subc) {
            case "check" :
            embed.setAuthor(`${target.tag}'s balance`)
            .addField("Balance", `${data.coins.toLocaleString()}`)
            .setThumbnail(target.avatarURL({ dynamic: true }))
            interaction.reply({ embeds: [embed] })
            break;

            case "add" :
            if(!cool.includes(interaction.member.id)) return interaction.reply({ content: `${config.false1} **|** You do not have premission to use this command.`, ephemeral: true})
            data.coins += Amount;
            await data.save();
            embed.setAuthor(`${target.tag}'s balance`)
            .addField("Balance", `+ ${Amount.toLocaleString()}`)
            .setThumbnail(target.avatarURL({ dynamic: true }))
            interaction.reply({ embeds: [embed] })
            break;

            case "remove" :
            if(!cool.includes(interaction.member.id)) return interaction.reply({ content: `${config.false1} **|** You do not have premission to use this command.`, ephemeral: true})
            if(Amount > data.coins) return interaction.reply({ content: `The amount assigned is more than the user's balance, their balance ${data.coins.toLocaleString()}`, ephemeral: true })
            data.coins -= Amount
            await data.save()
            embed.setAuthor(`${target.tag}'s balance`)
            .addField("Balance", `- ${Amount.toLocaleString()}`)
            .setThumbnail(target.avatarURL({ dynamic: true }))
            interaction.reply({ embeds: [embed] })    
            break;
        };
} catch (e) {
        errembed.setTitle("⚠ An error occurred ⚠")
        .setColor("YELLOW")
        .setDescription(`${e}`)
        .setFooter("🔍")
        .setTimestamp();
    interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}