const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu, Collection } = require("discord.js");
const schema = require("../../Schemas/economyDB");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(!interaction.isButton()) return;
        const { customId, user } = interaction;

        if(!["10w","50w","100w","donew"].includes(customId)) return;

        schema.findOne({ userId : user.id }, async(err, docs) => {
            switch(customId) {
                case "10w" :
                    docs.withd += 10
                    docs.save()
                    interaction.update({ content: `Please click the button below to increase the amount you want to deposit. Amount: \`${docs.withd}\``, ephemeral: true })
                break;
                case "50w" :
                    docs.withd += 50
                    docs.save()
                    interaction.update({ content: `Please click the button below to increase the amount you want to deposit. Amount: \`${docs.withd}\``, ephemeral: true })
                break;
                case "100w" :
                    docs.withd += 100
                    docs.save()
                    interaction.update({ content: `Please click the button below to increase the amount you want to withdraw. Amount: \`${docs.withd}\``, ephemeral: true })
                break;
                case "donew" :
                    if(docs.cash < docs.withd) return interaction.followUp({ content: `${client.config.cancel} Your money in PiggyBank is less than the amount you want to withdraw`, ephemeral: true })
                    interaction.update({ content: `${client.config.checked} Successfully withdraw \`${docs.withd}\``, ephemeral: true, components: [] })
                    docs.cash += docs.withd
                    docs.bank -= docs.withd
                    docs.withd = 0
                    docs.save()
                break;
            }
        })
        
    }
}