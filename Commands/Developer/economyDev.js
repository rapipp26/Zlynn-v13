const { MessageEmbed } = require(`discord.js`)
const cool = ["768378164942471188", "495488613811879946"];
const schema = require("../../Schemas/economyDB")
module.exports = {
    name: "econ",
    description: "Economy commands that can only be used by the developers ",
    options: [
        {
            name: "add",
            description: "Add balance to a user bank account",
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
                    description: "Provide the user to give their balance",
                    type: "USER",
                    required: false
                },
            ]
        },
        {
            name: "remove",
            description: "Remove balance from a user bank account",
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
                    description: "Provide the user to remove their balance",
                    type: "USER",
                    required: false
                },
            ]
        },
        {
            name: "set",
            description: "Set balance to a user bank account",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "amount",
                    description: "Provide the amount to set",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "target",
                    description: "Provide the user to give set balance",
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
        
        let subco = options.getSubcommand();
        let amount = options.getInteger("amount");
        let target = options.getUser("target");
        if(!target) target = user; 

        schema.findOne({ userId : target.id }, async(err, docs) => {
            if(err) throw err;
            if(!docs) docs = await schema.create({ userId: target.id })

        switch(subco) {
            case "add" :
            if(!cool.includes(user.id)) return interaction.reply({ content: `${client.config.false1} Only developers can use this command.`, ephemeral: true });
            const embed2 = new MessageEmbed()
            .setDescription(`${user} aka my developer has been adding **${amount.toLocaleString()}** to your \`bank account\` balance!`)
            .setFooter("You can check your bank account balance by using /cash check")
            .setColor("GREEN")
            docs.bank += amount
            await docs.save();
            try {
                target.send({ embeds: [embed2] })
            } catch (e) {
                    interaction.reply({ content: `${client.config.false1} I cant dm this user. But the money should be in their bank account.`, ephemeral: true })
                    throw e;
            }
            return interaction.reply({ content: `${client.config.true1} Successfully dm the user and add balance to their bank account!`, ephemeral: true })

            case "remove" :
                if(!cool.includes(user.id)) return interaction.reply({ content: `${client.config.false1} Only developers can use this command.`, ephemeral: true });
                if(docs.bank < amount) return interaction.reply({ content: `${client.config.false1} That user has less balance than amount the amount you want to remove`, ephemeral: true });
                const embed3 = new MessageEmbed()
                .setDescription(`${user} aka my developer has been removing **${amount.toLocaleString()}** from your \`bank account\` balance!`)
                .setFooter("You can check your bank account balance by using /cash check")
                .setColor("GREEN")
                docs.bank -= amount
                await docs.save();
                try {
                    target.send({ embeds: [embed3] })
                } catch (e) {
                    interaction.reply({ content: `${client.config.false1} I cant dm this user. But the money should be in their bank account.`, ephemeral: true })
                    throw e;
                }
                return interaction.reply({ content: `${client.config.true1} Successfully dm the user and remove balance from their bank account!`, ephemeral: true })

            case "set" :
                 if(!cool.includes(user.id)) return interaction.reply({ content: `${client.config.false1} Only developers can use this command.`, ephemeral: true });
                 const embed4 = new MessageEmbed()
                 .setDescription(`${user} aka my developer has been set your \`bank account\` balance to **${amount.toLocaleString()}** !`)
                 .setFooter("You can check your bank account balance by using /cash check")
                  .setColor("GREEN")
                 docs.bank = amount
                 await docs.save();
                 try {
                   target.send({ embeds: [embed4] })
                 } catch (e) {
                    interaction.reply({ content: `${client.config.false1} I cant dm this user. But the money should be in their bank account.`, ephemeral: true })
                    throw e;
                 }
                   return interaction.reply({ content: `${client.config.true1} Successfully dm the user and set the balance to their bank account!`, ephemeral: true })
        }
    })
    }
};